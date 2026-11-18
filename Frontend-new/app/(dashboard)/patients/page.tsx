
"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  Users,
  Plus,
  Search,
  X,
  UserPlus,
  AlertCircle,
  Pencil,
  Trash2,
} from "lucide-react";

import { useAuthGuard } from "../../hooks/useAuthGuard";
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
  patientId: number;
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

interface PatientRecord {
  patient_id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  emergency_contact: string | null;
  emergency_phone: string | null;
}

const initialForm: Patient = {
  patientId: 0,
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

function toPatient(record: PatientRecord): Patient {
  return {
    patientId: record.patient_id,
    firstName: record.first_name,
    lastName: record.last_name,
    dateOfBirth: record.date_of_birth.slice(0, 10),
    gender: record.gender,
    phone: record.phone ?? "",
    email: record.email ?? "",
    address: record.address ?? "",
    emergencyContact: record.emergency_contact ?? "",
    emergencyPhone: record.emergency_phone ?? "",
  };
}

export default function PatientsPage() {
  const { isChecking } = useAuthGuard({ requireAuth: true });

  const [showForm, setShowForm] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Patient>(initialForm);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [pageError, setPageError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isChecking) return;

    let active = true;

    const fetchPatients = async () => {
      setLoadingPatients(true);
      setPageError("");

      try {
        const records = await apiClient<PatientRecord[]>("/patient", {
          requiresAuth: true,
        });
        if (active) setPatients(records.map(toPatient));
      } catch (err: unknown) {
        if (active) {
          setPageError(
            err instanceof Error
              ? err.message
              : "Failed to load patients. Please try again."
          );
        }
      } finally {
        if (active) setLoadingPatients(false);
      }
    };

    fetchPatients();
    return () => {
      active = false;
    };
  }, [isChecking]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(initialForm);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  const handleEdit = (patient: Patient) => {
    setEditingId(patient.patientId);
    setForm(patient);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(initialForm);
  };

  const handleSubmitPatient = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const patientData = {
        first_name: form.firstName,
        last_name: form.lastName,
        date_of_birth: form.dateOfBirth,
        gender: form.gender,
        phone: form.phone,
        email: form.email,
        address: form.address,
        emergency_contact: form.emergencyContact,
        emergency_phone: form.emergencyPhone,
      };
      const savedRecord = await apiClient<PatientRecord>(
        editingId === null ? "/patient" : `/patient/${editingId}`,
        {
          method: editingId === null ? "POST" : "PUT",
          requiresAuth: true,
          body: JSON.stringify(patientData),
        }
      );
      const savedPatient = toPatient(savedRecord);

      if (editingId === null) {
        setPatients((previous) => [savedPatient, ...previous]);
        setSuccess("Patient successfully added!");
      } else {
        setPatients((previous) =>
          previous.map((patient) =>
            patient.patientId === editingId ? savedPatient : patient
          )
        );
        setSuccess("Patient information successfully updated!");
      }

      closeForm();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save patient. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (patientId: number) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) {
      return;
    }

    setPageError("");
    setSuccess("");
    setDeletingId(patientId);

    try {
      await apiClient<boolean>(`/patient/${patientId}`, {
        method: "DELETE",
        requiresAuth: true,
      });
      setPatients((previous) =>
        previous.filter((patient) => patient.patientId !== patientId)
      );
      setSuccess("Patient successfully deleted.");
    } catch (err: unknown) {
      setPageError(
        err instanceof Error
          ? err.message
          : "Failed to delete patient. Please try again."
      );
    } finally {
      setDeletingId(null);
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
            onClick={openAddForm}
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

      {pageError && (
        <div className="mb-5 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          <AlertCircle size={18} className="shrink-0" />
          {pageError}
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

            <table className="w-full min-w-[850px] text-left text-sm">

              <thead>
                <tr className="border-b border-slate-700 text-slate-400">
                  <th className="p-3">Patient Name</th>
                  <th className="p-3">Date of Birth</th>
                  <th className="p-3">Gender</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>

                {loadingPatients ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-slate-400">
                      Loading patients...
                    </td>
                  </tr>
                ) : filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <tr
                      key={patient.patientId}
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

                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(patient)}
                            className="border-teal-600/50 bg-transparent text-teal-400 hover:bg-teal-500/10 hover:text-teal-300"
                          >
                            <Pencil size={15} />
                            Edit
                          </Button>

                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            disabled={deletingId === patient.patientId}
                            onClick={() => handleDelete(patient.patientId)}
                            className="border-red-600/50 bg-transparent text-red-400 hover:bg-red-500/10 hover:text-red-300"
                          >
                            <Trash2 size={15} />
                            {deletingId === patient.patientId
                              ? "Deleting..."
                              : "Delete"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-10 text-center text-slate-500"
                    >
                      <Users className="mx-auto mb-3 text-slate-600" size={30} />
                      {search
                        ? "No matching patients found."
                        : pageError
                        ? "Patient list could not be loaded."
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
                    {editingId === null ? "Add New Patient" : "Edit Patient"}
                  </h2>

                  <p className="text-xs text-slate-400">
                    Enter the patient&apos;s information.
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-700 hover:text-white"
                aria-label="Close form"
              >
                <X size={20} />
              </button>

            </div>

            <form onSubmit={handleSubmitPatient}>

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
                  onClick={closeForm}
                  className="border-slate-600 bg-transparent text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-[#0B1220] via-[#115E59] to-[#0D9488] text-white hover:brightness-110"
                >
                  {loading
                    ? "Saving..."
                    : editingId === null
                    ? "Save Patient"
                    : "Save Changes"}
                </Button>

              </div>

            </form>

          </div>
        </div>
      )}

    </main>
  );
}
