"use client"

import Image from "next/image"
import { Code, Palette, Zap } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { LocationCard } from "@/components/location/LocationCard"

export function About() {
  const titleAnimation = useScrollAnimation({ threshold: 0.3 })
  const contentAnimation = useScrollAnimation({ threshold: 0.2 })
  const cardsAnimation = useScrollAnimation({ threshold: 0.1 })

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Title */}
          <div ref={titleAnimation.ref}>
            <h2
              className={`text-3xl sm:text-4xl font-semibold mb-4 transition-all duration-700 ${
                titleAnimation.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Manifesto
            </h2>

            <div className="flex items-center gap-3 mb-12">
              <div className="h-px flex-1 bg-gradient-to-r from-primary/60 to-transparent" />
              <span className="text-xs font-mono text-muted-foreground uppercase">
                Philosophy
              </span>
            </div>
          </div>

          <div
            ref={contentAnimation.ref}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[170px] gap-4 transition-all duration-700 ${
              contentAnimation.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="lg:col-span-2 lg:row-span-2 border border-border/70 bg-card/60 rounded-3xl p-6 backdrop-blur-sm">
              <p className="text-xl font-medium leading-relaxed mb-4">
                I design and build reliable software systems, from low-level
                internals to user-facing interfaces, with clarity, correctness,
                and long-term maintainability.
              </p>
              <p className="text-muted-foreground mb-3">
                I primarily work on backend and system-level problems, but I care
                deeply about the full product and how real users interact with it.
              </p>
              <p className="text-sm text-muted-foreground italic mb-4">
                Correctness over cleverness. Reliability over shortcuts.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Backend Systems",
                  "Distributed Design",
                  "Developer Experience",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-3 py-1 rounded-full border border-border/60 bg-muted/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative min-h-[340px] lg:min-h-0 lg:col-start-3 lg:row-start-1 lg:row-span-3 border border-border/70 bg-card/60 rounded-3xl p-3 backdrop-blur-sm overflow-hidden">
              <Image
                src="/me.jpg"
                alt="Pradum Kumar"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>

            <div
              ref={cardsAnimation.ref}
              className={`group lg:col-start-1 lg:row-start-3 border border-border/70 bg-card/60 rounded-3xl p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 ${
                cardsAnimation.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "0ms" }}
            >
							{/* Accent bar */}
							<div className="absolute left-0 top-6 h-8 w-1 bg-primary rounded-r-full" />
              <Code className="h-7 w-7 text-primary mb-2 transition-transform group-hover:scale-110" />
              <h3 className="font-semibold mb-1">Clean Architecture</h3>
              <p className="text-sm text-muted-foreground">
                Clear boundaries and explicit contracts.
              </p>
            </div>

            <div
              className={`group lg:col-start-2 lg:row-start-3 border border-border/70 bg-card/60 rounded-3xl p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 ${
                cardsAnimation.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "120ms" }}
            >
							{/* Accent bar */}
							<div className="absolute left-0 top-6 h-8 w-1 bg-primary rounded-r-full" />
              <Zap className="h-7 w-7 text-primary mb-2 transition-transform group-hover:scale-110" />
              <h3 className="font-semibold mb-1">Performance</h3>
              <p className="text-sm text-muted-foreground">
                Latency-aware, predictable systems.
              </p>
            </div>

            <div
              className={`group lg:col-start-1 lg:row-start-4 border border-border/70 bg-card/60 rounded-3xl p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 ${
                cardsAnimation.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "240ms" }}
            >
							{/* Accent bar */}
							<div className="absolute left-0 top-6 h-8 w-1 bg-primary rounded-r-full" />
              <Palette className="h-7 w-7 text-primary mb-2 transition-transform group-hover:scale-110" />
              <h3 className="font-semibold mb-1">Intentional UI</h3>
              <p className="text-sm text-muted-foreground">
                Minimal, information-first interfaces.
              </p>
            </div>

             <div
							className={`
								lg:col-start-2 lg:row-start-4
								border border-border/70
								bg-card/55
								rounded-3xl
								p-5
								backdrop-blur-sm
								relative
								transition-all duration-300
								hover:shadow-lg hover:shadow-primary/10
								${
									cardsAnimation.isVisible
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-10"
								}
							`}
							style={{ transitionDelay: "360ms" }}
						>
							{/* Accent bar */}
							<div className="absolute left-0 top-6 h-8 w-1 bg-primary rounded-r-full" />

							<p className="text-sm text-muted-foreground leading-relaxed pl-4">
								Building software that stays readable at <span className="text-foreground font-medium"> 2 AM </span>  
								and reliable at <span className="text-foreground font-medium">scale</span>.
							</p>

							<span className="mt-3 block text-xs font-mono text-muted-foreground pl-4">
								Personal principle
							</span>
						</div>

            <div className="col-span-full md:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-4 min-h-[144px] w-full">
              <LocationCard className="h-full rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
