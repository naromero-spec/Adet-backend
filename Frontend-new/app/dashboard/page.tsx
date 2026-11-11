
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarDays,
  FileText,
  Pill,
  ClipboardList,
  BedDouble,
  Hospital,
  Wallet,
  Settings,
  Bell,
  ArrowRight,
  Activity,
  LogOut,
} from "lucide-react";

import { useAuthGuard } from "../hooks/useAuthGuard";
import { clearTokens, getAccessToken } from "@/lib/auth";
import { CONFIG } from "@/lib/config";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface JwtPayload {
  username?: string;
  name?: string;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Patients", href: "/patients", icon: Users },
  { name: "Doctors", href: "/doctors", icon: Stethoscope },
  { name: "Departments", href: "/departments", icon: Hospital },
  { name: "Appointments", href: "/appointments", icon: CalendarDays },
  { name: "Medical Records", href: "/medical-records", icon: FileText },
  { name: "Medicines", href: "/medicines", icon: Pill },
  { name: "Prescriptions", href: "/prescriptions", icon: ClipboardList },
  { name: "Rooms", href: "/rooms", icon: BedDouble },
  { name: "Admissions", href: "/admissions", icon: Hospital },
  { name: "Payments", href: "/payments", icon: Wallet },
];

const statistics = [
  {
    title: "Total Patients",
    value: "245",
    icon: Users,
    description: "Registered patients",
  },
  {
    title: "Total Doctors",
    value: "12",
    icon: Stethoscope,
    description: "Active doctors",
  },
  {
    title: "Appointments",
    value: "48",
    icon: CalendarDays,
    description: "Scheduled appointments",
  },
  {
    title: "Available Rooms",
    value: "18",
    icon: BedDouble,
    description: "Ready for admission",
  },
];

const appointments = [
  {
    patient: "Juan Dela Cruz",
    doctor: "Dr. Santos",
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

export default function DashboardPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: true });

  const [username, setUsername] = useState("User");

  useEffect(() => {
    const token = getAccessToken();

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUsername(decoded.username || decoded.name || "User");
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    clearTokens();
    router.push(CONFIG.Routes.LOGIN);
  };

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
    <div className="flex min-h-screen bg-slate-50">

      <aside className="hidden w-64 shrink-0 flex-col bg-[#0F172A] text-white md:flex">

        <div className="flex h-20 items-center gap-3 border-b border-slate-700 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600">
            <Hospital size={23} />
          </div>

          <div>
            <h1 className="text-lg font-bold">MediCare</h1>
            <p className="text-xs text-slate-400">
              Hospital System
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = item.name === "Dashboard";

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors ${
                  active
                    ? "bg-teal-700 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-700 p-3">
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <Settings size={19} />
            Settings
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1">

        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 md:px-8">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Hospital Management
            </p>
          </div>

          <div className="flex items-center gap-5">
            <button className="relative text-slate-500 hover:text-teal-700">
              <Bell size={21} />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-teal-600" />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 font-semibold text-white">
              {username.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="space-y-7 p-5 md:p-8">

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Dashboard
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Welcome back, {username}!
            </p>
          </div>

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
                        {stat.value}
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
      </main>
    </div>
  );
}
