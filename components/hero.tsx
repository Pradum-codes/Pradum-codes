import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fadeInUp">
            Hi, I'm{" "}
            <span className="text-primary bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto] animate-gradient-shift">
              Pradum Kumar
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fadeInUp [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
            Software Engineer crafting scalable web, mobile, and cloud solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fadeInUp [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
            <Button size="lg" asChild className="transition-all hover:scale-105 hover:shadow-lg">
              <Link href="#projects">View My Work</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="transition-all hover:scale-105 hover:shadow-lg">
              <Link href="#contact">Get In Touch</Link>
            </Button>
          </div>

          <div className="flex justify-center space-x-6 mb-12 animate-fadeIn [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
            <Link
              href="https://github.com/Pradum-codes"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/pradum-kumar/"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="mailto:pradumky803.com"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            >
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </Link>
          </div>

          <div className="animate-bounce animate-pulse-glow">
            <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  )
}
