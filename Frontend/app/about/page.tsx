
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  Code2,
  Atom,
  Wind,
  Terminal,
  Database,
  GitBranch,
  Globe,
  Layers,
} from "lucide-react";

const skills = [
  { name: "JavaScript / TypeScript", icon: Code2 },
  { name: "React & Next.js", icon: Atom },
  { name: "Tailwind CSS / HTML", icon: Wind },
  { name: "Python", icon: Terminal },
  { name: "MySQL / Oracle", icon: Database },
  { name: "Git & GitHub", icon: GitBranch },
  { name: "REST APIs & GraphQL", icon: Globe },
  { name: "Shadcn UI", icon: Layers },
];

export default function About() {
  return (
    <main className="min-h-screen bg-[#090D19] px-6 py-16 text-slate-200">

      <div className="mx-auto max-w-3xl space-y-8">

        {/* PAGE HEADER */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            About Me<span className="text-blue-400">.</span>
          </h1>

          <p className="mt-2 text-slate-400">
            A bit about my background, passion, and technical skillset.
          </p>
        </div>

        {/* MY STORY */}
        <Card className="border-blue-900/40 bg-[#101C32] text-slate-200 shadow-xl shadow-black/10">

          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white">
              <Code2 className="text-blue-400" size={22} />
              My Story
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-sm leading-8 text-slate-400">

            <p>
              My journey into programming started with my curiosity
              about creating websites and developing software that
              can help people in their daily lives.
            </p>

            <p>
              During Grade 11, I chose the ICT strand because I wanted
              to learn more about computer systems, particularly
              hardware maintenance and PC building. At that time,
              programming was not really my main interest.
            </p>

            <p>
              When I entered college and pursued Computer Science,
              I realized that I wanted to explore software development.
              Although I had little coding experience, I started
              learning Python before classes began to understand
              basic programming concepts.
            </p>

            <p>
              Now, I continue to improve my programming skills,
              explore different technologies, and develop projects
              that help me grow as an aspiring Software Engineer.
            </p>

          </CardContent>
        </Card>

        {/* MY SKILLS */}
        <Card className="border-blue-900/40 bg-[#101C32] text-slate-200 shadow-xl shadow-black/10">

          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white">
              <Layers className="text-blue-400" size={22} />
              My Skills
            </CardTitle>
          </CardHeader>

          <CardContent>

            <div className="flex flex-wrap gap-3">

              {skills.map((skill) => {
                const Icon = skill.icon;

                return (
                  <Badge
                    key={skill.name}
                    variant="secondary"
                    className="flex items-center gap-2 rounded-full border border-blue-500/20 bg-[#080F1E] px-3 py-2 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
                  >
                    <Icon size={15} className="text-blue-400" />
                    {skill.name}
                  </Badge>
                );
              })}

            </div>

          </CardContent>
        </Card>

      </div>
    </main>
  );
}
