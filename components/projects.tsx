import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Projects() {
  const projects = [
    {
      title: "Real Time Process Monitoring Dashboard",
      description:
        "Create a graphical dashboard that displays real-time information about process states, CPU usage, and memory consumption.",
      image:  "/projects/process-monitoring-dashboard.png",
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
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Featured Projects</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-48">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button size="sm" asChild>
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
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
