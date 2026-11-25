"use client";

import { useEffect, useMemo, useState } from "react";
import { Mail, Phone, Search, Stethoscope } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api";
import { useAuthGuard } from "../../hooks/useAuthGuard";

interface DoctorRecord {
  doctor_id: number;
  department_id: number | null;
  first_name: string;
  last_name: string;
  specialization: string | null;
  phone: string | null;
  email: string | null;
}

interface DepartmentRecord {
  department_id?: number;
  department_Id?: number;
  department_name: string;
}

export default function DoctorsPage() {
  const { isChecking } = useAuthGuard({ requireAuth: true });
  const [doctors, setDoctors] = useState<DoctorRecord[]>([]);
  const [departments, setDepartments] = useState<DepartmentRecord[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isChecking) return;

    let active = true;
    const loadDoctors = async () => {
      setLoading(true);
      setError("");

      try {
        const [doctorRecords, departmentRecords] = await Promise.all([
          apiClient<DoctorRecord[]>("/doctor", { requiresAuth: true }),
          apiClient<DepartmentRecord[]>("/department", { requiresAuth: true }),
        ]);
        if (!active) return;

        setDoctors(doctorRecords);
        setDepartments(departmentRecords);
      } catch (err: unknown) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load doctors. Please try again."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadDoctors();
    return () => {
      active = false;
    };
  }, [isChecking]);

  const departmentNames = useMemo(
    () =>
      new Map(
        departments.map((department) => [
          department.department_id ?? department.department_Id,
          department.department_name,
        ])
      ),
    [departments]
  );

  const filteredDoctors = doctors.filter((doctor) => {
    const departmentName = doctor.department_id
      ? departmentNames.get(doctor.department_id) ?? ""
      : "";
    return `${doctor.first_name} ${doctor.last_name} ${doctor.specialization ?? ""} ${departmentName} ${doctor.phone ?? ""} ${doctor.email ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  if (isChecking) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#0B1220]">
        <p className="text-sm text-slate-400">Verifying session...</p>
      </div>
    );
  }

  return (
    <main className="min-h-[calc(100vh-5rem)] space-y-7 bg-[#0B1220] p-5 text-white md:p-8">
      <div>
        <h1 className="text-3xl font-bold">Doctors</h1>
        <p className="mt-2 text-sm text-slate-400">
          View the hospital doctor directory and contact information.
        </p>
      </div>

      <Card className="border-slate-700 bg-[#172337] text-white shadow-none">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm text-slate-400">Total Doctors</p>
            <p className="mt-2 text-3xl font-bold">
              {loading ? "..." : doctors.length}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Registered hospital doctors
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400">
            <Stethoscope size={24} />
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-slate-700 bg-[#172337] text-white shadow-none">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 p-5">
          <div>
            <h2 className="font-semibold">Doctor List</h2>
            <p className="mt-1 text-xs text-slate-400">
              Names, departments, specialties, and contact details
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search doctors..."
              aria-label="Search doctors"
              className="border-slate-600 bg-[#0B1220] pl-9 text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="border-b border-red-500/30 bg-red-500/10 px-5 py-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-slate-700 text-slate-400">
              <tr className="text-xs">
                <th className="px-5 py-4 font-medium">Doctor</th>
                <th className="px-5 py-4 font-medium">Department</th>
                <th className="px-5 py-4 font-medium">Specialization</th>
                <th className="px-5 py-4 font-medium">Phone</th>
                <th className="px-5 py-4 font-medium">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-slate-400">
                    Loading doctors...
                  </td>
                </tr>
              ) : filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <tr
                    key={doctor.doctor_id}
                    className="transition hover:bg-slate-700/20"
                  >
                    <td className="px-5 py-4 font-medium text-slate-200">
                      Dr. {doctor.first_name} {doctor.last_name}
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {doctor.department_id
                        ? departmentNames.get(doctor.department_id) ??
                          `Department ${doctor.department_id}`
                        : "—"}
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {doctor.specialization || "—"}
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {doctor.phone ? (
                        <span className="inline-flex items-center gap-2">
                          <Phone size={14} className="text-teal-400" />
                          {doctor.phone}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {doctor.email ? (
                        <span className="inline-flex items-center gap-2">
                          <Mail size={14} className="text-teal-400" />
                          {doctor.email}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-slate-500">
                    {error
                      ? "Doctor records could not be loaded."
                      : search
                      ? "No matching doctors found."
                      : "No doctors available yet."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </main>
  );
}
