"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
        "Create a graphical dashboard that displays real-time information about process states, CPU usage, and memory consumption.",
      image: "/projects/process-monitoring-dashboard.png",
      technologies: ["C++", "OpenGL", "GLFW"],
      liveUrl: "https://github.com/Pradum-codes/Real-Time-Process-Monitoring-Dashboard",
      githubUrl: "https://github.com/Pradum-codes/Real-Time-Process-Monitoring-Dashboard",
    },
    {
      title: "Project Tracker App",
      description:
        "A collaborative task management application built with Kotlin and Jetpack Compose. Real-time updates, team collaboration, and project tracking.",
      image: "/projects/project-tracker.jpg",
      technologies: ["Kotlin", "Jetpack Compose", "Android Studios"],
      liveUrl: "https://github.com/Pradum-codes/Project-Tracker-App",
      githubUrl: "https://github.com/Pradum-codes/Project-Tracker-App",
    },
    {
      title: "Weather Dashboard",
      description:
        "A responsive weather dashboard with location-based forecasts, interactive charts, and weather alerts using OpenWeather API.",
      image: "/projects/weather-app.png",
      technologies: ["React", "OpenWeather API", "CSS3"],
      liveUrl: "https://github.com/Pradum-codes/Weather-App",
      githubUrl: "https://github.com/Pradum-codes/Weather-App",
    },
    {
      title: "CookClever",
      description:
        "A modern, responsive Recipie Finder website which lets you find different recipes. Built with React and deployed on Vercel.",
      image: "/projects/cook-clever.png",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
      liveUrl: "https://github.com/Pradum-codes/CookClever",
      githubUrl: "https://github.com/Pradum-codes/CookClever",
    },
  ]

  return (
    <section id="projects" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div ref={titleAnimation.ref}>
            <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-12 transition-all duration-700 ${titleAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
              Featured Projects
            </h2>
          </div>

          <div ref={projectsAnimation.ref} className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className={`overflow-hidden transition-all duration-700 hover:scale-105 hover:shadow-2xl group ${projectsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors duration-300">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="outline"
                        className="transition-all duration-300 hover:scale-110 hover:shadow-md hover:shadow-primary/50"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button size="sm" asChild className="transition-all hover:scale-105 hover:shadow-lg">
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild className="transition-all hover:scale-105 hover:shadow-lg">
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
