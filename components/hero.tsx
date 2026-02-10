import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <p className="text-xs font-mono uppercase tracking-[0.5em] text-muted-foreground">Systems / UI / Cloud</p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] animate-fadeInUp">
                I build black-first experiences for humans who move fast.
                <span className="block text-primary mt-4">Pradum Kumar</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl animate-fadeInUp [animation-delay:150ms] opacity-0 [animation-fill-mode:forwards]">
                Full-stack engineer crafting sharp interfaces, resilient systems, and calm performance under pressure.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
              <Button size="lg" asChild className="transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(154,255,120,0.2)]">
                <Link href="#projects">See the Work</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(80,180,255,0.2)]">
                <Link href="#contact">Start a Project</Link>
              </Button>
            </div>

            <div className="flex items-center space-x-6 animate-fadeIn [animation-delay:450ms] opacity-0 [animation-fill-mode:forwards]">
              <Link
                href="https://github.com/Pradum-codes"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/pradum-kumar/"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="mailto:pradumky803@gmail.com"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-white/10 bg-card/60 backdrop-blur-xl rounded-2xl p-6 animate-fadeInRight">
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground">Now</p>
                <span className="text-xs font-mono text-primary">Available</span>
              </div>
              <p className="mt-4 text-lg">
                Designing a new generation of data-driven products with high signal and low noise.
              </p>
            </div>

            <div className="border border-white/10 bg-card/50 rounded-2xl p-6">
              <p className="text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground">Focus</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <span className="rounded-full border border-white/10 px-3 py-1">Realtime UI</span>
                <span className="rounded-full border border-white/10 px-3 py-1">Design Systems</span>
                <span className="rounded-full border border-white/10 px-3 py-1">Platform API</span>
                <span className="rounded-full border border-white/10 px-3 py-1">Cloud Scale</span>
              </div>
            </div>

            <div className="border border-white/10 bg-card/40 rounded-2xl p-6">
              <p className="text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground">Signal</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Crisp typography, disciplined grids, and performance-first builds.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 animate-bounce animate-pulse-glow">
          <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}
