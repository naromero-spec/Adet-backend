import { Card, CardContent } from "@/components/ui/card";
import { Camera, Gamepad2, Music2, Dumbbell, } from "lucide-react";

const hobbies = [
  {
    title: "Photography",
    icon: Camera,
    description:
      "Capturing street landscapes and portrait photography using my mobile phone.",
  },
  {
    title: "Gaming",
    icon: Gamepad2,
    description:
      "Enthusiast of strategy, RPG, FPS, and horror games. I enjoy exploring different gaming experiences.",
  },
  {
    title: "Music & Guitar",
    icon: Music2,
    description:
      "Playing acoustic and electric guitar, exploring different music genres, and jamming with bandmates and friends.",
  },
  {
    title: "Fitness & Sports",
    icon: Dumbbell,
    description:
      "Staying active during weekends by going to the gym or playing sports like badminton and basketball.",
  },
];

export default function Hobbies() {
  return (
    <main className="min-h-screen bg-[#090D19] px-6 py-16 text-slate-200">

      <div className="mx-auto max-w-7xl space-y-8">

        {/* PAGE HEADER */}
        <div>
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-blue-400">
            BEYOND CODING
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Hobbies & Interests
            <span className="text-blue-400">.</span>
          </h1>

          <p className="mt-3 text-slate-400">
            What I enjoy doing outside of coding.
          </p>
        </div>

        {/* HOBBY CARDS */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {hobbies.map((hobby) => {
            const Icon = hobby.icon;

            return (
              <Card
                key={hobby.title}
                className="group relative overflow-hidden border border-blue-900/40 bg-[#101C32] text-slate-200 shadow-lg shadow-black/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-500/70 hover:bg-[#12213B] hover:shadow-xl hover:shadow-blue-950/40"
              >

                {/* HOVER GLOW */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/0 blur-[70px] transition-all duration-500 group-hover:bg-blue-500/15" />

                <CardContent className="relative p-6">

                  {/* ICON AND TITLE */}
                  <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 transition-all duration-300 group-hover:border-blue-400/50 group-hover:bg-blue-500/20">
                      <Icon
                        size={22}
                        className="text-blue-400 transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    <h2 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-blue-300">
                      {hobby.title}
                    </h2>

                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-sm leading-6 text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                    {hobby.description}
                  </p>

                </CardContent>
              </Card>
            );
          })}

        </div>

      </div>
    </main>
  );
}
