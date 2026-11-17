"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import {
  BedDouble,
  Bell,
  CalendarDays,
  ClipboardList,
  FileText,
  Hospital,
  LayoutDashboard,
  LogOut,
  Pill,
  Settings,
  Stethoscope,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { clearTokens, getAccessToken } from "@/lib/auth";
import { CONFIG } from "@/lib/config";

interface JwtPayload {
  username?: string;
  name?: string;
}


const DashboardShellContext = createContext<string | null>(null);

export function useDashboardShell() {
  const username = useContext(DashboardShellContext);

  if (username === null) {
    throw new Error("useDashboardShell must be used within DashboardShell");
  }

  return { username };
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

export default function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      setUsername(decoded.username || decoded.name || "User");
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }, []);

  const handleLogout = () => {
    clearTokens();
    router.push(CONFIG.Routes.LOGIN);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-64 shrink-0 flex-col bg-[#0F172A] text-white md:flex">
        <div className="flex h-20 items-center gap-3 border-b border-slate-700 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600">
            <Hospital size={23} />
          </div>
          <div>
            <h1 className="text-lg font-bold">MediCare</h1>
            <p className="text-xs text-slate-400">Hospital System</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={active ? "page" : undefined}
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

      <div className="min-w-0 flex-1">
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 md:px-8">
          <p className="text-sm font-medium text-slate-500">
            Hospital Management
          </p>
          <div className="flex items-center gap-5">
            <button
              type="button"
              aria-label="Notifications"
              className="relative text-slate-500 hover:text-teal-700"
            >
              <Bell size={21} />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-teal-600" />
            </button>
            <div
              aria-label={`${username} account`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 font-semibold text-white"
            >
              {username.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        <DashboardShellContext.Provider value={username}>
          {children}
        </DashboardShellContext.Provider>
      </div>
    </div>
  );
}

