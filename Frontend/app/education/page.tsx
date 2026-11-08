
import { Card, CardContent } from "@/components/ui/card";

import { GraduationCap, Award } from "lucide-react";

const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    school: "Naga College Foundation Inc.",
    year: "2025 - Present",
    description:
      "Focused on software engineering, data structures, algorithms, and web development / application development.",
    highlights: [],
  },
  {
    degree: "TVL - Computer System Servicing",
    school: "Camarines Sur National High School",
    year: "2023 - 2025",
    description:
      "Intensive program covering computer hardware, networking, and software maintenance.",
    highlights: [
      "With Honors",
      "Computer System Servicing NC II Certification",
      "Cisco Certification",
    ],
  },
  {
    degree: "High School Education",
    school: "Camarines Sur National High School",
    year: "2019 - 2023",
    description:
      "Completed junior high school education with foundational knowledge in academics and technology.",
    highlights: [],
  },
];

export default function Education() {
  return (
    <main className="min-h-screen bg-[#090D19] px-6 py-16 text-slate-200">

      <div className="mx-auto max-w-4xl space-y-8">

        {/* PAGE HEADER */}
        <div>
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-blue-400">
            MY BACKGROUND
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Education<span className="text-blue-400"></span>
          </h1>

          <p className="mt-2 text-slate-400">
            My academic journey and educational achievements.
          </p>
        </div>

        {/* EDUCATION CARDS */}
        <div className="space-y-6">

          {education.map((item, index) => (
            <Card
              key={item.degree}
              className="group relative overflow-hidden border border-blue-900/40 bg-[#101C32] text-slate-200 shadow-lg shadow-black/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-500/70 hover:bg-[#12213B] hover:shadow-xl hover:shadow-blue-950/40"
            >

              {/* HOVER GLOW */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/0 blur-[80px] transition-all duration-500 group-hover:bg-blue-500/15" />

              <CardContent className="relative p-6">

                {/* HEADER */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

                  <div className="flex items-start gap-3">

                    {/* ICON */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 transition-all duration-300 group-hover:border-blue-400/50 group-hover:bg-blue-500/20">
                      <GraduationCap
                        size={23}
                        className="text-blue-400 transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    {/* DEGREE AND SCHOOL */}
                    <div>
                      <h2 className="text-lg font-semibold text-white transition-colors group-hover:text-blue-300">
                        {item.degree}
                      </h2>

                      <p className="mt-1 text-sm text-slate-400">
                        {item.school}
                      </p>
                    </div>

                  </div>

                  {/* YEAR */}
                  <span className="whitespace-nowrap text-sm font-medium text-blue-400 sm:pt-1">
                    {item.year}
                  </span>

                </div>

                {/* DESCRIPTION */}
                <p className="mt-5 text-sm leading-7 text-slate-400">
                  {item.description}
                </p>

                {/* HIGHLIGHTS */}
                {item.highlights.length > 0 && (
                  <div className="mt-5">

                    <div className="mb-3 flex items-center gap-2">
                      <Award size={17} className="text-blue-400" />

                      <h3 className="text-sm font-semibold text-slate-200">
                        Key Highlights
                      </h3>
                    </div>

                    <ul className="space-y-2 pl-5 text-sm text-slate-400">
                      {item.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="list-disc marker:text-blue-400"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>

                  </div>
                )}

              </CardContent>
            </Card>
          ))}

        </div>

      </div>
    </main>
  );
}
