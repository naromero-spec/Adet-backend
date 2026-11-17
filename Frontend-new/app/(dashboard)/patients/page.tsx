
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Plus,
  Search,
  X,
  UserPlus,
  AlertCircle,
} from "lucide-react";

import { apiClient } from "@/lib/api";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Patient {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
}

const initialForm: Patient = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "Male",
  phone: "",
  email: "",
  address: "",
  emergencyContact: "",
  emergencyPhone: "",
};

export default function PatientsPage() {
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [form, setForm] = useState<Patient>(initialForm);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPatient = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await apiClient("/patient", {
        method: "POST",
        requiresAuth: true,
        body: JSON.stringify(form),
      });

      setPatients((previous) => [form, ...previous]);
      setForm(initialForm);
      setShowForm(false);
      setSuccess("Patient successfully added!");

    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to add patient. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.firstName} ${patient.lastName}`;
    return (
      fullName.toLowerCase().includes(search.toLowerCase()) ||
      patient.phone.includes(search)
    );
  });

  return (
    <main className="min-h-screen bg-[#0B1220] p-5 md:p-8">

      <div className="mb-8">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold text-white">
              Patients
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Manage and view registered patients.
            </p>
          </div>        

          <Button
            type="button"
            onClick={() => {
              setError("");
              setSuccess("");
              setShowForm(true);
            }}
            className=" gap-2 rounded-lg
          border border-teal-400/20
          bg-gradient-to-r from-[#0B1220] via-[#115E59] to-[#0D9488]
          text-white shadow-md shadow-teal-900/20
          transition-all duration-200
          hover:-translate-y-0.5
          hover:brightness-110
          hover:shadow-lg hover:shadow-teal-500/20
          active:scale-95"
          >
            <Plus size={18} />
            Add Patient
          </Button>


        </div>
      </div>

      {success && (
        <div className="mb-5 rounded-lg border border-teal-500/30 bg-teal-500/10 p-3 text-sm text-teal-400">
          {success}
        </div>
      )}

      <div className="mb-6 grid gap-4 sm:grid-cols-2">

        <Card className="border-slate-700 bg-[#172337] text-white">
          <CardContent className="flex items-center justify-between p-5">

            <div>
              <p className="text-sm text-slate-400">
                Total Patients
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {patients.length}
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Recently added patients
              </p>
            </div>

            <div className="rounded-xl bg-teal-500/10 p-3 text-teal-400">
              <Users size={25} />
            </div>

          </CardContent>
        </Card>

      </div>

      <Card className="border-slate-700 bg-[#172337] text-white">

        <CardHeader>
          <CardTitle className="text-lg">
            Patient List
          </CardTitle>
        </CardHeader>

        <CardContent>

          <div className="mb-5 flex items-center gap-2">
            <Search size={18} className="text-slate-400" />

            <Input
              placeholder="Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-slate-600 bg-[#0B1220] text-white placeholder:text-slate-500"
            />
          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[650px] text-left text-sm">

              <thead>
                <tr className="border-b border-slate-700 text-slate-400">
                  <th className="p-3">Patient Name</th>
                  <th className="p-3">Date of Birth</th>
                  <th className="p-3">Gender</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Email</th>
                </tr>
              </thead>

              <tbody>

                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient, index) => (
                    <tr
                      key={`${patient.email}-${index}`}
                      className="border-b border-slate-700/60 hover:bg-slate-700/20"
                    >
                      <td className="p-3 font-medium text-slate-200">
                        {patient.firstName} {patient.lastName}
                      </td>

                      <td className="p-3 text-slate-400">
                        {patient.dateOfBirth}
                      </td>

                      <td className="p-3 text-slate-400">
                        {patient.gender}
                      </td>

                      <td className="p-3 text-slate-400">
                        {patient.phone || "—"}
                      </td>

                      <td className="p-3 text-slate-400">
                        {patient.email || "—"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-10 text-center text-slate-500"
                    >
                      <Users className="mx-auto mb-3 text-slate-600" size={30} />
                      {search
                        ? "No matching patients found."
                        : "No patients added yet."}
                    </td>
                  </tr>
                )}

              </tbody>

            </table>
          </div>

        </CardContent>
      </Card>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">

          <div className="my-auto w-full max-w-2xl rounded-2xl border border-slate-700 bg-[#172337] shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-700 p-5">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-teal-500/10 p-3 text-teal-400">
                  <UserPlus size={23} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-white">
                    Add New Patient
                  </h2>

                  <p className="text-xs text-slate-400">
                    Enter the patient's information.
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
                aria-label="Close form"
              >
                <X size={20} />
              </button>

            </div>

            <form onSubmit={handleAddPatient}>

              <div className="grid gap-5 p-5 sm:grid-cols-2">

                <div className="space-y-2">
                  <Label className="text-slate-300">
                    First Name *
                  </Label>

                  <Input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    required
                    className="border-slate-600 bg-[#0B1220] text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">
                    Last Name *
                  </Label>

                  <Input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    required
                    className="border-slate-600 bg-[#0B1220] text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">
                    Date of Birth *
                  </Label>

                  <Input
                    name="dateOfBirth"
                    type="date"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                    required
                    className="border-slate-600 bg-[#0B1220] text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">
                    Gender *
                  </Label>

                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                    className="h-10 w-full rounded-md border border-slate-600 bg-[#0B1220] px-3 text-sm text-white outline-none focus:border-teal-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">
                    Phone Number
                  </Label>

                  <Input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="border-slate-600 bg-[#0B1220] text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">
                    Email Address
                  </Label>

                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className="border-slate-600 bg-[#0B1220] text-white"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-slate-300">
                    Address
                  </Label>

                  <Input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter complete address"
                    className="border-slate-600 bg-[#0B1220] text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">
                    Emergency Contact
                  </Label>

                  <Input
                    name="emergencyContact"
                    value={form.emergencyContact}
                    onChange={handleChange}
                    placeholder="Contact person's name"
                    className="border-slate-600 bg-[#0B1220] text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">
                    Emergency Phone
                  </Label>

                  <Input
                    name="emergencyPhone"
                    value={form.emergencyPhone}
                    onChange={handleChange}
                    placeholder="Emergency phone number"
                    className="border-slate-600 bg-[#0B1220] text-white"
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400 sm:col-span-2">
                    <AlertCircle size={18} className="shrink-0" />
                    {error}
                  </div>
                )}

              </div>

              <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-700 p-5 sm:flex-row">

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="border-slate-600 bg-transparent text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-[#0B1220] via-[#115E59] to-[#0D9488] text-white hover:brightness-110"
                >
                  {loading ? "Saving..." : "Save Patient"}
                </Button>

              </div>

            </form>

          </div>
        </div>
      )}

    </main>
  );
}
