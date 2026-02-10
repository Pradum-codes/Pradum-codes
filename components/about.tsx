"use client"

import Image from "next/image"
import { Code, Palette, Zap } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function About() {
  const titleAnimation = useScrollAnimation({ threshold: 0.3 })
  const contentAnimation = useScrollAnimation({ threshold: 0.2 })
  const cardsAnimation = useScrollAnimation({ threshold: 0.1 })

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div ref={titleAnimation.ref}>
            <h2
              className={`text-3xl sm:text-4xl font-semibold mb-6 transition-all duration-700 ${
                titleAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Manifesto
            </h2>
          </div>

          <div
            ref={contentAnimation.ref}
            className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center"
          >
            <div
              className={`space-y-6 transition-all duration-700 ${
                contentAnimation.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <p className="text-lg text-muted-foreground">
                I design and engineer products that feel intentional. The work is part architecture, part atmosphere, and
                always about reducing friction for people doing real work.
              </p>
              <p className="text-lg text-muted-foreground">
                I care about the quiet details: latency budgets, clean information hierarchy, and interfaces that make
                complexity feel inevitable.
              </p>
              <div className="grid sm:grid-cols-3 gap-4" ref={cardsAnimation.ref}>
                {[
                  {
                    icon: Code,
                    title: "Clean Code",
                    copy: "Structured for longevity, readable by humans.",
                  },
                  {
                    icon: Palette,
                    title: "UI Precision",
                    copy: "Visual systems with purpose and restraint.",
                  },
                  {
                    icon: Zap,
                    title: "Speed",
                    copy: "Performance as a product feature.",
                  },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className={`border border-white/10 bg-card/60 rounded-2xl p-5 transition-all duration-700 ${
                      cardsAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 120}ms` }}
                  >
                    <item.icon className="h-8 w-8 text-primary mb-3" />
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`flex justify-center transition-all duration-700 ${
                contentAnimation.isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-2xl" />
                <Image
                  src="/me.jpg"
                  alt="Pradum Kumar"
                  width={320}
                  height={320}
                  className="relative rounded-full border border-white/10 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
