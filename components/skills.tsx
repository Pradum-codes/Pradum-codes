"use client"
import { Badge } from "@/components/ui/badge"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import {
  FaJava,
  FaPython,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaAws,
  FaGitAlt,
  FaLinux,
} from "react-icons/fa"
import {
  SiCplusplus,
  SiKotlin,
  SiNextdotjs,
  SiTailwindcss,
  SiCss3,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiVercel,
  SiJetpackcompose,
  SiSpringboot,
} from "react-icons/si"
import { BiLogoVisualStudio } from "react-icons/bi"

type Skill = {
  name: string
  icon?: React.ComponentType<{ className?: string }>
}

export function Skills() {
  const titleAnimation = useScrollAnimation({ threshold: 0.3 })
  const cardsAnimation = useScrollAnimation({ threshold: 0.1 })

  const skillCategories: { title: string; skills: Skill[] }[] = [
    {
      title: "Languages",
      skills: [
        { name: "Java", icon: FaJava },
        { name: "C++", icon: SiCplusplus },
        { name: "Python", icon: FaPython },
        { name: "JavaScript", icon: FaJs },
        { name: "Kotlin", icon: SiKotlin },
      ],
    },
    {
      title: "Frontend",
      skills: [
        { name: "React", icon: FaReact },
        { name: "Next.js", icon: SiNextdotjs },
        { name: "Tailwind", icon: SiTailwindcss },
        { name: "CSS3", icon: SiCss3 },
        { name: "Jetpack Compose", icon: SiJetpackcompose },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: FaNodeJs },
        { name: "Express", icon: SiExpress },
        { name: "PostgreSQL", icon: SiPostgresql },
        { name: "MongoDB", icon: SiMongodb },
        { name: "Spring Boot", icon: SiSpringboot },
      ],
    },
    {
      title: "Tools",
      skills: [
        { name: "Git", icon: FaGitAlt },
        { name: "Docker", icon: FaDocker },
        { name: "AWS", icon: FaAws },
        { name: "Vercel", icon: SiVercel },
        { name: "VS Code", icon: BiLogoVisualStudio },
        { name: "Linux", icon: FaLinux },
      ],
    },
  ]

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div ref={titleAnimation.ref}>
            <h2
              className={`text-3xl sm:text-4xl font-semibold mb-10 transition-all duration-700 ${
                titleAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Tool Matrix
            </h2>
          </div>

          <div
            ref={cardsAnimation.ref}
            className="grid md:grid-cols-2 gap-6"
          >
            {skillCategories.map((category, index) => (
              <div
                key={category.title}
                className={`border border-border/70 bg-card/50 rounded-2xl p-6 transition-all duration-700 ${
                  cardsAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                  <span className="text-xs font-mono text-muted-foreground">{category.skills.length} items</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="flex items-center gap-2 bg-muted/60 border border-border/70 text-foreground/90 hover:text-primary transition-all duration-300 hover:scale-105"
                    >
                      {skill.icon && <skill.icon className="w-4 h-4" />}
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
