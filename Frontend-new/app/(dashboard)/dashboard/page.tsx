"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Users,
  Stethoscope,
  CalendarDays,
  BedDouble,
  ArrowRight,
  Activity,
} from "lucide-react";

import { useAuthGuard } from "../../hooks/useAuthGuard";
import { useDashboardShell } from "@/components/DashboardShell";
import { apiClient } from "@/lib/api";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Room {
  status?: string;
  room_status?: string;
}

export default function DashboardPage() {
  const { isChecking } = useAuthGuard({ requireAuth: true });
  const { username } = useDashboardShell();

  // DASHBOARD COUNTS
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [availableRooms, setAvailableRooms] = useState(0);

  const [loadingStats, setLoadingStats] = useState(true);

  // FETCH DASHBOARD DATA
  useEffect(() => {
    if (isChecking) return;

    const fetchDashboardStats = async () => {
      setLoadingStats(true);

      const results = await Promise.allSettled([
        apiClient<any[]>("/patient", {
          requiresAuth: true,
        }),
        apiClient<any[]>("/doctor", {
          requiresAuth: true,
        }),
        apiClient<any[]>("/appointment", {
          requiresAuth: true,
        }),
        apiClient<Room[]>("/room", {
          requiresAuth: true,
        }),
      ]);

      // PATIENTS
      if (results[0].status === "fulfilled"){
        setTotalPatients(results[0].value.length);
      } else {
        console.error("Failed to fetch patients:", results[0].reason);
      }

      // DOCTORS
      if (results[1].status === "fulfilled"){
        setTotalDoctors(results[1].value.length);
      } else {
        console.error("Failed to fetch doctors:", results[1].reason);
      }

      // APPOINTMENTS
      if (results[2].status === "fulfilled"){
        setTotalAppointments(results[2].value.length);
      } else {
        console.error("Failed to fetch appointments:", results[2].reason);
      }

      // AVAILABLE ROOMS
      if (results[3].status === "fulfilled"){
        const available = results[3].value.filter((room) => {
          const status = (
            room.status ?? room.room_status ?? ""
          ).toLowerCase();

          return status === "available";
        });

        setAvailableRooms(available.length);
      } else {
        console.error("Failed to fetch rooms:", results[3].reason);
      }

      setLoadingStats(false);
    };

    fetchDashboardStats();
  }, [isChecking]);

  // STATISTICS
  const statistics = [
    {
      title: "Total Patients",
      value: totalPatients,
      icon: Users,
      description: "Registered patients",
    },
    {
      title: "Total Doctors",
      value: totalDoctors,
      icon: Stethoscope,
      description: "Active doctors",
    },
    {
      title: "Appointments",
      value: totalAppointments,
      icon: CalendarDays,
      description: "Recorded appointments",
    },
    {
      title: "Available Rooms",
      value: availableRooms,
      icon: BedDouble,
      description: "Ready for admission",
    },
  ];

  const appointments = [
    {
      patient: "",
      doctor: "",
      date: "Nov 12, 2026",
      time: "9:00 AM",
      status: "Scheduled",
    },
    {
      patient: "Maria Santos",
      doctor: "Dr. Reyes",
      date: "Nov 12, 2026",
      time: "10:30 AM",
      status: "Scheduled",
    },
    {
      patient: "Pedro Reyes",
      doctor: "Dr. Cruz",
      date: "Nov 12, 2026",
      time: "1:00 PM",
      status: "Completed",
    },
    {
      patient: "Ana Garcia",
      doctor: "Dr. Lopez",
      date: "Nov 12, 2026",
      time: "2:30 PM",
      status: "Cancelled",
    },
  ];

  const patientOverview = [
    { month: "Aug", value: 78 },
    { month: "Sep", value: 95 },
    { month: "Oct", value: 110 },
    { month: "Nov", value: 135 },
  ];

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">
          Verifying session...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-7 p-5 md:p-8">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          Dashboard
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Welcome back, {username}!
        </p>
      </div>

      {/* STATISTICS CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card
              key={stat.title}
              className="border border-slate-200 bg-white shadow-none"
            >
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-slate-500">
                    {stat.title}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-slate-900">
                    {loadingStats ? "..." : stat.value}
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    {stat.description}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <Icon size={22} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* LOWER DASHBOARD */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* APPOINTMENTS */}
        <Card className="border border-slate-200 bg-white shadow-none xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between px-5 pt-5">
            <div className="flex items-center gap-2">
              <CalendarDays className="text-teal-700" size={21} />
              <CardTitle className="text-base font-semibold">
                Upcoming Appointments
              </CardTitle>
            </div>

            <Link
              href="/appointments"
              className="flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-800"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </CardHeader>

          <CardContent className="overflow-x-auto px-5 pb-5">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs text-slate-500">
                  <th className="py-4 font-medium">Patient Name</th>
                  <th className="py-4 font-medium">Doctor</th>
                  <th className="py-4 font-medium">Date & Time</th>
                  <th className="py-4 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appointment, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="whitespace-nowrap py-4 font-medium text-slate-700">
                      {appointment.patient}
                    </td>

                    <td className="whitespace-nowrap py-4 text-slate-500">
                      {appointment.doctor}
                    </td>

                    <td className="whitespace-nowrap py-4 text-slate-500">
                      <div>{appointment.date}</div>
                      <div className="text-xs text-slate-400">
                        {appointment.time}
                      </div>
                    </td>

                    <td className="py-4">
                      <span
                        className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
                          appointment.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : appointment.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-teal-50 text-teal-700"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* PATIENT OVERVIEW */}
        <Card className="border border-slate-200 bg-white shadow-none">
          <CardHeader className="px-5 pt-5">
            <div className="flex items-center gap-2">
              <Activity className="text-teal-700" size={21} />
              <CardTitle className="text-base font-semibold">
                Patient Overview
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="px-5 pb-5">
            <div className="flex h-64 items-end justify-around gap-4 border-b border-l border-slate-200 px-3 pb-0 pt-5">
              {patientOverview.map((item) => (
                <div
                  key={item.month}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <span className="text-xs text-slate-500">
                    {item.value}
                  </span>

                  <div
                    className="w-full max-w-12 rounded-t-md bg-teal-600 transition-colors hover:bg-teal-700"
                    style={{
                      height: `${(item.value / 150) * 80}%`,
                    }}
                  />

                  <span className="mt-1 text-xs text-slate-500">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-center text-xs text-slate-400">
              Patient registration overview
            </p>
          </CardContent>
        </Card>
      </div>

      {/* INFORMATION CARDS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <Card className="border border-slate-200 bg-white shadow-none">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <Activity size={22} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Hospital Management
              </p>
              <p className="text-xs text-slate-500">
                Manage your hospital operations in one place.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white shadow-none">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <Users size={22} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Patient Management
              </p>
              <p className="text-xs text-slate-500">
                Keep patient information organized and accessible.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
