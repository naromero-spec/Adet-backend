
"use client";

import { useState, type FormEvent } from "react";
import {
  CalendarDays,
  Plus,
  Search,
  X,
  Trash2,
  Ban,
  CheckCircle,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Appointment {
  id: number;
  patient: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
  status: "Scheduled" | "Completed" | "Cancelled";
}

const initialForm = {
  patient: "",
  doctor: "",
  date: "",
  time: "",
  reason: "",
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState(initialForm);

  const [error, setError] = useState("");

  // ADD APPOINTMENT
  const handleAddAppointment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const newAppointment: Appointment = {
      id: Date.now(),
      ...form,
      status: "Scheduled",
    };

    setAppointments((previous) => [
      newAppointment,
      ...previous,
    ]);

    setForm(initialForm);
    setShowForm(false);
  };

  // CANCEL APPOINTMENT
  const handleCancel = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmed) return;

    setAppointments((previous) =>
      previous.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "Cancelled" }
          : appointment
      )
    );
  };

  // DELETE APPOINTMENT
  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmed) return;

    setAppointments((previous) =>
      previous.filter((appointment) => appointment.id !== id)
    );
  };

  // SEARCH
  const filteredAppointments = appointments.filter((appointment) =>
    `${appointment.patient} ${appointment.doctor} ${appointment.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const scheduledCount = appointments.filter(
    (item) => item.status === "Scheduled"
  ).length;

  const completedCount = appointments.filter(
    (item) => item.status === "Completed"
  ).length;

  const cancelledCount = appointments.filter(
    (item) => item.status === "Cancelled"
  ).length;

  return (
    <div className="min-h-[calc(100vh-5rem)] space-y-7 bg-[#0B1220] p-5 md:p-8">

      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Appointments
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Schedule and manage patient appointments.
          </p>
        </div>

        
<Button
  type="button"
  onClick={() => {
    setError("");
    setShowForm(true);
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
    active:scale-95
  "
>
  <Plus size={13}/>
  Add appointments
</Button>

      </div>

      {/* STATISTICS */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Scheduled",
            value: scheduledCount,
            icon: Clock,
          },
          {
            title: "Completed",
            value: completedCount,
            icon: CheckCircle,
          },
          {
            title: "Cancelled",
            value: cancelledCount,
            icon: Ban,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-slate-700 bg-[#172337] p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">
                    {item.title} Appointments
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-white">
                    {item.value}
                  </h2>
                </div>

                <div className="rounded-xl bg-teal-500/10 p-3 text-teal-400">
                  <Icon size={25} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* APPOINTMENT TABLE */}
      <div className="overflow-hidden rounded-xl border border-slate-700 bg-[#172337]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 p-5">
          <div>
            <h2 className="font-semibold text-white">
              Appointment List
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              View and manage all appointments.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Search size={18} className="text-slate-400" />
            <Input
              placeholder="Search appointments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-56 border-slate-600 bg-[#0B1220] text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="p-4">Patient</th>
                <th className="p-4">Doctor</th>
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="border-b border-slate-700/60 hover:bg-slate-700/20"
                  >
                    <td className="p-4 font-medium text-white">
                      {appointment.patient}
                    </td>

                    <td className="p-4 text-slate-300">
                      {appointment.doctor}
                    </td>

                    <td className="p-4 text-slate-300">
                      {appointment.date}
                    </td>

                    <td className="p-4 text-slate-300">
                      {appointment.time}
                    </td>

                    <td className="p-4 text-slate-300">
                      {appointment.reason}
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          appointment.status === "Scheduled"
                            ? "bg-teal-500/10 text-teal-400"
                            : appointment.status === "Completed"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {appointment.status === "Scheduled" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancel(appointment.id)}
                            className="border-yellow-600/50 bg-transparent text-yellow-400 hover:bg-yellow-500/10 hover:text-yellow-300"
                          >
                            <Ban size={15} />
                            Cancel
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(appointment.id)}
                          className="border-red-600/50 bg-transparent text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        >
                          <Trash2 size={15} />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="p-12 text-center text-slate-500"
                  >
                    <CalendarDays
                      size={32}
                      className="mx-auto mb-3 text-slate-600"
                    />
                    {search
                      ? "No matching appointments found."
                      : "No appointments available yet."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD APPOINTMENT MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-xl rounded-2xl border border-slate-700 bg-[#172337]">

            <div className="flex items-center justify-between border-b border-slate-700 p-5">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Add New Appointment
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Enter the appointment details.
                </p>
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

            <form onSubmit={handleAddAppointment}>
              <div className="grid gap-5 p-5 sm:grid-cols-2">

                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-slate-300">
                    Patient Name *
                  </Label>
                  <Input
                    required
                    value={form.patient}
                    onChange={(e) =>
                      setForm({ ...form, patient: e.target.value })
                    }
                    placeholder="Enter patient name"
                    className="border-slate-600 bg-[#0B1220] text-white"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-slate-300">
                    Doctor Name *
                  </Label>
                  <Input
                    required
                    value={form.doctor}
                    onChange={(e) =>
                      setForm({ ...form, doctor: e.target.value })
                    }
                    placeholder="Enter doctor name"
                    className="border-slate-600 bg-[#0B1220] text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">
                    Appointment Date *
                  </Label>
                  <Input
                    required
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      setForm({ ...form, date: e.target.value })
                    }
                    className="border-slate-600 bg-[#0B1220] text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">
                    Appointment Time *
                  </Label>
                  <Input
                    required
                    type="time"
                    value={form.time}
                    onChange={(e) =>
                      setForm({ ...form, time: e.target.value })
                    }
                    className="border-slate-600 bg-[#0B1220] text-white"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-slate-300">
                    Reason for Appointment *
                  </Label>
                  <Input
                    required
                    value={form.reason}
                    onChange={(e) =>
                      setForm({ ...form, reason: e.target.value })
                    }
                    placeholder="Enter appointment reason"
                    className="border-slate-600 bg-[#0B1220] text-white"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400 sm:col-span-2">
                    {error}
                  </p>
                )}
              </div>

              <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-700 p-5 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  className="border-slate-600 bg-transparent text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#0B1220] via-[#115E59] to-[#0D9488] text-white hover:brightness-110"
                >
                  <Plus size={17} />
                  Save Appointment
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
