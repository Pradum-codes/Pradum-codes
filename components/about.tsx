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
        <div className="max-w-6xl mx-auto backdrop-blur-xl rounded-2xl p-6 animate-fadeIn">
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
                I'm a software developer who enjoys building things that are simple, reliable, and easy to maintain.
              </p>
              <p className="text-lg text-muted-foreground">
                I mostly work on backend and system-level problems, but I care about the full product and how people actually use it.
              </p>
              <p className="text-sm text-muted-foreground italic">
                I value correctness over cleverness, and long-term reliability over quick wins.
              </p>

              <div className="grid sm:grid-cols-3 gap-4" ref={cardsAnimation.ref}>
                {[{
                    icon: Code,
                    title: "Clean Architecture",
                    copy: "Clear boundaries, explicit contracts, and low coupling.",
                  },
                  {
                    icon: Zap,
                    title: "Performance",
                    copy: "Latency-aware systems that scale predictably.",
                  },
                  {
                    icon: Palette,
                    title: "Intentional UI",
                    copy: "Minimal interfaces that surface the right information.",
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
