"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function Projects() {
  const titleAnimation = useScrollAnimation({ threshold: 0.3 })
  const projectsAnimation = useScrollAnimation({ threshold: 0.1 })

  const projects = [
    {
      title: "Real Time Process Monitoring Dashboard",
      description:
        "Graphical dashboard that displays real-time process states, CPU usage, and memory consumption with low-latency updates.",
      image: "/projects/process-monitoring-dashboard.png",
      technologies: ["C++", "OpenGL", "GLFW"],
      liveUrl: "https://github.com/Pradum-codes/Real-Time-Process-Monitoring-Dashboard",
      githubUrl: "https://github.com/Pradum-codes/Real-Time-Process-Monitoring-Dashboard",
    },
    {
      title: "Project Tracker App",
      description:
        "Collaborative task management application with real-time updates, team collaboration, and project tracking.",
      image: "/projects/project-tracker.jpg",
      technologies: ["Kotlin", "Jetpack Compose", "Android"],
      liveUrl: "https://github.com/Pradum-codes/Project-Tracker-App",
      githubUrl: "https://github.com/Pradum-codes/Project-Tracker-App",
    },
    {
      title: "Weather Dashboard",
      description:
        "Responsive weather dashboard with location-based forecasts, interactive charts, and alerting.",
      image: "/projects/weather-app.png",
      technologies: ["React", "OpenWeather API", "CSS3"],
      liveUrl: "https://github.com/Pradum-codes/Weather-App",
      githubUrl: "https://github.com/Pradum-codes/Weather-App",
    },
    {
      title: "CookClever",
      description:
        "Modern recipe finder built with a fast search flow and clean discovery experience.",
      image: "/projects/cook-clever.png",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
      liveUrl: "https://github.com/Pradum-codes/CookClever",
      githubUrl: "https://github.com/Pradum-codes/CookClever",
    },
  ]

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div ref={titleAnimation.ref}>
            <h2
              className={`text-3xl sm:text-4xl font-semibold mb-12 transition-all duration-700 ${
                titleAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Selected Work
            </h2>
          </div>

          <div ref={projectsAnimation.ref} className="space-y-10">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className={`grid lg:grid-cols-[auto_1fr] gap-8 border border-white/10 bg-card/50 rounded-3xl p-6 lg:p-8 transition-all duration-700 ${
                  projectsAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 140}ms` }}
              >
                <div className="flex lg:flex-col items-start lg:items-start gap-4">
                  <span className="text-xs font-mono text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                    <p className="text-muted-foreground max-w-xl">{project.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-6 items-center">
                  <div className="relative h-56 md:h-64 w-full overflow-hidden rounded-2xl border border-white/10">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="space-y-5">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="outline"
                          className="border-white/20 text-foreground/80"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Button size="sm" asChild className="transition-all hover:scale-105">
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild className="transition-all hover:scale-105">
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
