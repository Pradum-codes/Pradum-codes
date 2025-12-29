"use client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FaJava, FaPython, FaJs, FaReact, FaNodeJs, FaDocker, FaAws, FaGitAlt, FaLinux } from "react-icons/fa"
import { SiCplusplus, SiKotlin, SiNextdotjs, SiTypescript, SiTailwindcss, SiHtml5, SiCss3, SiExpress, SiFastapi, SiPostgresql, SiMongodb, SiRedis, SiVercel, SiFigma, SiJetpackcompose, SiSpringboot } from "react-icons/si"
import { BiLogoVisualStudio } from "react-icons/bi";
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

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
        { name: "Tailwind CSS", icon: SiTailwindcss },
        { name: "CSS3", icon: SiCss3 },
        { name: "Jetpack Compose", icon: SiJetpackcompose },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: FaNodeJs },
        { name: "Express.js", icon: SiExpress },
        { name: "PostgreSQL", icon: SiPostgresql },
        { name: "MongoDB", icon: SiMongodb },
        { name: "SpringBoot", icon: SiSpringboot },
      ],
    },
    {
      title: "Tools & Technologies",
      skills: [
        { name: "Git", icon: FaGitAlt },
        { name: "Docker", icon: FaDocker },
        { name: "AWS", icon: FaAws },
        { name: "Vercel", icon: SiVercel },
        { name: "VS Code", icon: BiLogoVisualStudio },
        { name: "Linux", icon: FaLinux },
      ],
    },
    {
      title: "Soft Skills",
      skills: [
        { name: "Problem Solving" },
        { name: "Communication" },
        { name: "Project Management" },
      ],
    },
  ]

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div ref={titleAnimation.ref}>
            <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-12 transition-all duration-700 ${titleAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
              Skills & Technologies
            </h2>
          </div>

          <div ref={cardsAnimation.ref} className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <Card
                key={index}
                className={`transition-all duration-700 hover:scale-105 hover:shadow-xl ${cardsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="flex items-center gap-2 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/50 cursor-pointer"
                      >
                        {skill.icon && <skill.icon className="w-4 h-4" />}
                        {skill.name}
                      </Badge>
                    ))}
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
