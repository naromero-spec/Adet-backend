
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthGuard } from "../hooks/useAuthGuard";
import { apiClient } from "@/lib/api";
import { setTokens } from "@/lib/auth";
import { CONFIG } from "@/lib/config";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Hospital,
  HeartPulse,
  Stethoscope,
  ShieldCheck,
  Eye,
  EyeOff,
  Activity,
  Plus,
  AlertCircle,
} from "lucide-react";

interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: false });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (isChecking) return null;

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await apiClient<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      setTokens(data.accessToken, data.refreshToken);
      router.push(CONFIG.Routes.DASHBOARD);

    } catch (err: unknown) {
      console.error("Login failed:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B1220] font-sans">

    
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <Plus className="absolute left-[8%] top-[18%] h-8 w-8 text-teal-500/20" />
      <Plus className="absolute bottom-[15%] left-[45%] h-6 w-6 text-teal-400/20" />
      <Plus className="absolute right-[8%] top-[12%] h-10 w-10 text-teal-500/20" />

      <div className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-5 py-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:px-12">

        <section className="flex flex-col items-center text-center lg:items-start lg:text-left">

          <div className="flex items-center gap-3">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-900/30">
              <Hospital size={30} strokeWidth={1.8} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                MediCare
              </h1>
              <p className="text-xs text-slate-400">
                Hospital Management System
              </p>
            </div>

          </div>

          <div className="mt-12 max-w-lg space-y-4">

            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-xs font-medium text-teal-300">
              <Activity size={15} />
              Healthcare Management Platform
            </div>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Better Care,
              <span className="block text-teal-400">
                Better Management.
              </span>
            </h2>

            <p className="max-w-md text-sm leading-7 text-slate-400 sm:text-base">
              Manage patients, doctors, appointments, and hospital
              operations in one organized platform.
            </p>

          </div>

         
          <div className="relative mt-10 hidden h-64 w-full max-w-md items-center justify-center lg:flex">

            <div className="absolute h-64 w-64 rounded-full border border-teal-500/10" />
            <div className="absolute h-48 w-48 rounded-full border border-teal-500/20" />
            <div className="absolute h-32 w-32 rounded-full border border-teal-500/20" />

            <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-3xl border border-teal-400/20 bg-teal-500/10 shadow-2xl shadow-teal-900/30">
              <HeartPulse size={65} strokeWidth={1.3} className="text-teal-400" />
            </div>

            <div className="absolute left-12 top-8 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 bg-[#172337] text-teal-400 shadow-xl">
              <Stethoscope size={23} />
            </div>

            <div className="absolute right-12 top-10 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 bg-[#172337] text-teal-400 shadow-xl">
              <Plus size={25} />
            </div>

            <div className="absolute bottom-5 left-20 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 bg-[#172337] text-teal-400 shadow-xl">
              <ShieldCheck size={23} />
            </div>

          </div>

          <div className="mt-8 hidden items-center gap-3 border-t border-slate-800 pt-6 lg:flex">
            <ShieldCheck className="text-teal-400" size={22} />
            <div>
              <p className="text-sm font-medium text-slate-200">
                Secure and Organized
              </p>
              <p className="text-xs text-slate-500">
                A centralized hospital management experience.
              </p>
            </div>
          </div>

        </section>

        <section className="w-full max-w-md justify-self-center">

          <Card className="w-full gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white py-0 shadow-2xl shadow-black/20">

            <form onSubmit={handleLogin}>

              <CardHeader className="space-y-2 px-6 pt-7 pb-5 sm:px-8">

                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <Hospital size={23} />
                </div>

                <CardTitle className="text-xl font-semibold text-slate-900">
                  Login your account
                </CardTitle>

                <CardDescription className="text-sm leading-relaxed text-slate-500">
                  Welcome back!
                </CardDescription>

              </CardHeader>

              <CardContent className="space-y-5 px-6 pb-6 sm:px-8">

                <div className="grid gap-2">
                  <Label htmlFor="username" className="text-sm font-medium text-slate-700">
                    Username
                  </Label>

                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    className="h-11 rounded-lg border-slate-200 focus-visible:border-teal-600 focus-visible:ring-teal-600"
                    required
                  />
                </div>

                <div className="grid gap-2">

                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                      Password
                    </Label>

                    <Link
                      href="/forgot-password"
                      className="text-xs font-medium text-teal-700 hover:text-teal-800 hover:underline sm:text-sm"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      className="h-11 rounded-lg border-slate-200 pr-11 focus-visible:border-teal-600 focus-visible:ring-teal-600"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

              </CardContent>

              <CardFooter className="flex-col gap-4 border-t border-slate-100 bg-slate-50/70 px-6 py-5 sm:px-8">

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 w-full rounded-lg border-0 bg-gradient-to-r from-[#0B1220] via-[#115E59] to-[#0D9488] font-semibold text-white shadow-md shadow-teal-900/20 transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-teal-900/30"
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <p className="text-center text-sm text-slate-500">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="font-semibold text-teal-700 hover:text-teal-800 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>

              </CardFooter>

            </form>
          </Card>

          

        </section>

      </div>
    </main>
  );
}
