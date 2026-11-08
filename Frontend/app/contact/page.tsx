
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowUpRight,
} from "lucide-react";

const contactInfo = [
  {
    title: "Email",
    value: "your-email@example.com",
    icon: Mail,
    link: "mailto:naromero@gbox.ncf.edu.ph",
  },
  {
    title: "Phone",
    value: "+63 981 511 2991",
    icon: Phone,
    link: "tel:+639815112991",
  },
  {
    title: "Location",
    value: "Naga City, Philippines",
    icon: MapPin,
    link: null,
  },
];

export default function Contact() {

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const name = data.get("name");
    const email = data.get("email");
    const subject = data.get("subject");
    const message = data.get("message");

    const mailto = `mailto:your-email@example.com?subject=${encodeURIComponent(
      String(subject)
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    window.location.href = mailto;
  }

  return (
    <main className="min-h-screen bg-[#090D19] px-6 py-16 text-slate-200">

      <div className="mx-auto max-w-7xl space-y-8">

        {/* PAGE HEADER */}
        <div>
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-blue-400">
            LET'S CONNECT
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Contact Me
            <span className="text-blue-400">.</span>
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
            Have a question, project idea, or just want to say hello?
            Feel free to reach out using the contact information below
            or by sending a message through the form.
          </p>
        </div>

        {/* CONTACT CONTENT */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* LEFT SIDE - CONTACT INFORMATION */}
          <div className="space-y-5">

            {contactInfo.map((item) => {
              const Icon = item.icon;

              const content = (
                <Card className="group relative overflow-hidden border border-blue-900/40 bg-[#101C32] text-slate-200 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/70 hover:bg-[#12213B] hover:shadow-xl hover:shadow-blue-950/40">

                  {/* HOVER GLOW */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-blue-500/0 blur-[70px] transition-all duration-500 group-hover:bg-blue-500/15" />

                  <CardContent className="relative flex items-center gap-4 p-6">

                    {/* ICON */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 transition-all duration-300 group-hover:border-blue-400/50 group-hover:bg-blue-500/20">

                      <Icon
                        size={22}
                        className="text-blue-400 transition-transform duration-300 group-hover:scale-110"
                      />

                    </div>

                    {/* DETAILS */}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-500">
                        {item.title}
                      </p>

                      <p className="mt-1 break-words text-sm font-semibold text-white transition-colors group-hover:text-blue-300">
                        {item.value}
                      </p>
                    </div>

                    {item.link && (
                      <ArrowUpRight
                        size={17}
                        className="shrink-0 text-slate-600 transition-colors group-hover:text-blue-400"
                      />
                    )}

                  </CardContent>
                </Card>
              );

              return item.link ? (
                <a
                  key={item.title}
                  href={item.link}
                  className="block"
                >
                  {content}
                </a>
              ) : (
                <div key={item.title}>
                  {content}
                </div>
              );
            })}

          </div>

          {/* RIGHT SIDE - CONTACT FORM */}
          <Card className="border border-blue-900/40 bg-[#101C32] text-slate-200 shadow-xl shadow-black/10 lg:col-span-2">

            <CardHeader>
              <CardTitle className="text-xl text-white">
                Send a Message
              </CardTitle>

              <p className="text-sm text-slate-400">
                Fill out the form below and I'll get back to you soon.
              </p>
            </CardHeader>

            <CardContent>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* NAME AND EMAIL */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-slate-300"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      required
                      className="h-11 w-full rounded-lg border border-blue-900/40 bg-[#080F1E] px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-slate-300"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="h-11 w-full rounded-lg border border-blue-900/40 bg-[#080F1E] px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                    />
                  </div>

                </div>

                {/* SUBJECT */}
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-slate-300"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Project Inquiry / Hello"
                    required
                    className="h-11 w-full rounded-lg border border-blue-900/40 bg-[#080F1E] px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>

                {/* MESSAGE */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-slate-300"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your message here..."
                    required
                    rows={5}
                    className="w-full resize-none rounded-lg border border-blue-900/40 bg-[#080F1E] px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <Button
                  type="submit"
                  className="gap-2 bg-blue-600 px-6 text-white transition-all duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-900/30"
                >
                  <Send size={16} />
                  Send Message
                </Button>

              </form>

            </CardContent>
          </Card>

        </div>

      </div>
    </main>
  );
}
