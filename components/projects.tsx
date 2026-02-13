"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import projects from "@/data/projects"

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
}

interface ProjectDialogProps {
  project: Project
}

function ProjectDialog({ project }: ProjectDialogProps) {
  return (
    <DialogContent className="max-w-3xl p-0 overflow-hidden">
      <DialogHeader className="p-6 pb-0">
        <DialogTitle className="text-xl">
          {project.title}
        </DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          Detailed project overview
        </DialogDescription>
      </DialogHeader>

      {/* Image */}
      <div className="relative h-56 w-full mt-4">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <Button asChild>
            <Link
              href={project.liveUrl}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Live Demo
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link
              href={project.githubUrl}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Link>
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}



export function Projects() {
  const titleAnimation = useScrollAnimation({ threshold: 0.3 })
  const projectsAnimation = useScrollAnimation({ threshold: 0.1 })

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div ref={titleAnimation.ref}>
            <h2
              className={`text-3xl sm:text-4xl font-semibold mb-12 transition-all duration-700 ${
                titleAnimation.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Selected Work
            </h2>
          </div>

          <div
            ref={projectsAnimation.ref}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {projects.map((project, index) => (
              <Dialog key={project.title}>
                {/* CARD = TRIGGER */}
                <DialogTrigger asChild>
                  <div
                    className={`group cursor-pointer border border-border/70 bg-card/50 rounded-2xl overflow-hidden
                    transition-[transform,box-shadow] duration-500
                    hover:shadow-lg hover:-translate-y-1
                    ${
                      projectsAnimation.isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 120}ms` }}
                  >
                    {/* Image */}
                    <div className="relative h-36 w-full">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <span className="absolute top-3 left-3 text-xs font-mono text-white bg-black/50 rounded-full px-2 py-1">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold line-clamp-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogTrigger>

                {/* DIALOG CONTENT */}
                <ProjectDialog project={project} />
              </Dialog>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

