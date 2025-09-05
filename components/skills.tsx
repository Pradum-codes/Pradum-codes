"use client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FaJava, FaPython, FaJs, FaReact, FaNodeJs, FaDocker, FaAws, FaGitAlt, FaLinux } from "react-icons/fa"
import { SiCplusplus, SiKotlin, SiNextdotjs, SiTypescript, SiTailwindcss, SiHtml5, SiCss3, SiExpress, SiFastapi, SiPostgresql, SiMongodb, SiRedis, SiVercel, SiFigma} from "react-icons/si"
import { BiLogoVisualStudio } from "react-icons/bi";

type Skill = {
  name: string
  icon?: React.ComponentType<{ className?: string }>
}

export function Skills() {
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
        { name: "TypeScript", icon: SiTypescript },
        { name: "Tailwind CSS", icon: SiTailwindcss },
        { name: "HTML5", icon: SiHtml5 },
        { name: "CSS3", icon: SiCss3 },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: FaNodeJs },
        { name: "Express.js", icon: SiExpress },
        { name: "FastAPI", icon: SiFastapi },
        { name: "PostgreSQL", icon: SiPostgresql },
        { name: "MongoDB", icon: SiMongodb },
        { name: "Redis", icon: SiRedis },
      ],
    },
    {
      title: "Tools & Technologies",
      skills: [
        { name: "Git", icon: FaGitAlt },
        { name: "Docker", icon: FaDocker },
        { name: "AWS", icon: FaAws },
        { name: "Vercel", icon: SiVercel },
        { name: "Figma", icon: SiFigma },
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
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Skills & Technologies</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="flex items-center gap-2">
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
