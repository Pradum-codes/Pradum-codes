"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Palette, Zap } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function About() {
  const titleAnimation = useScrollAnimation({ threshold: 0.3 })
  const contentAnimation = useScrollAnimation({ threshold: 0.2 })
  const cardsAnimation = useScrollAnimation({ threshold: 0.1 })

  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div ref={titleAnimation.ref}>
            <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-12 transition-all duration-700 ${titleAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
              About Me
            </h2>
          </div>

          <div ref={contentAnimation.ref} className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className={`space-y-6 transition-all duration-700 delay-100 ${contentAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}>
              <p className="text-lg text-muted-foreground">
                I'm a passionate full-stack developer with over 2 years of experience creating digital solutions that
                make a difference. I love turning complex problems into simple, beautiful, and intuitive designs.
              </p>
              <p className="text-lg text-muted-foreground">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or sharing my knowledge through blog posts and mentoring.
              </p>
              <p className="text-lg text-muted-foreground">
                I believe in writing clean, maintainable code and creating user experiences that delight and inspire.
              </p>
            </div>
            <div className={`w-full flex justify-center transition-all duration-700 delay-300 ${contentAnimation.isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 rotate-6'
              }`}>
              <div className="animate-float">
                <Image
                  src="/me.jpg"
                  alt="My picture"
                  width={300}
                  height={300}
                  className="rounded-full shadow-2xl hover:shadow-primary/50 transition-shadow duration-300"
                />
              </div>
            </div>
          </div>

          <div ref={cardsAnimation.ref} className="grid sm:grid-cols-3 gap-8">
            <Card className={`transition-all duration-700 hover:scale-105 hover:shadow-xl ${cardsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
              <CardContent className="p-6 text-center">
                <Code className="h-12 w-12 text-primary mx-auto mb-4 transition-transform hover:rotate-12 hover:scale-110" />
                <h3 className="text-xl font-semibold mb-2">Clean Code</h3>
                <p className="text-muted-foreground">
                  Writing maintainable, scalable, and efficient code that stands the test of time.
                </p>
              </CardContent>
            </Card>

            <Card className={`transition-all duration-700 delay-100 hover:scale-105 hover:shadow-xl ${cardsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
              <CardContent className="p-6 text-center">
                <Palette className="h-12 w-12 text-primary mx-auto mb-4 transition-transform hover:rotate-12 hover:scale-110" />
                <h3 className="text-xl font-semibold mb-2">UI/UX Design</h3>
                <p className="text-muted-foreground">
                  Creating beautiful, intuitive interfaces that provide exceptional user experiences.
                </p>
              </CardContent>
            </Card>

            <Card className={`transition-all duration-700 delay-200 hover:scale-105 hover:shadow-xl ${cardsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-primary mx-auto mb-4 transition-transform hover:rotate-12 hover:scale-110" />
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