import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, Zap } from "lucide-react"

export function About() {
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">About Me</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <p className="text-lg text-muted-foreground mb-6">
                I'm a passionate full-stack developer with over 2 years of experience creating digital solutions that
                make a difference. I love turning complex problems into simple, beautiful, and intuitive designs.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or sharing my knowledge through blog posts and mentoring.
              </p>
              <p className="text-lg text-muted-foreground">
                I believe in writing clean, maintainable code and creating user experiences that delight and inspire.
              </p>
            </div>
            <div className="w-full flex justify-center">
              <Image
                src="/me.jpg"
                alt="My picture"
                width={300}
                height={300}
                className="rounded-full"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Code className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Clean Code</h3>
                <p className="text-muted-foreground">
                  Writing maintainable, scalable, and efficient code that stands the test of time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Palette className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">UI/UX Design</h3>
                <p className="text-muted-foreground">
                  Creating beautiful, intuitive interfaces that provide exceptional user experiences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Performance</h3>
                <p className="text-muted-foreground">
                  Optimizing applications for speed, accessibility, and seamless user interactions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}