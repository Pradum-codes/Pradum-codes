"use client"

import { Clock3, MapPin } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface LocationCardProps {
  className?: string
}

export function LocationCard({ className }: LocationCardProps) {
  return (
    <div className={cn("relative h-36 w-full overflow-hidden rounded-2xl border border-border/70 bg-card/65 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10", className)}>
        {/* World Map Background */}
        <div className="absolute inset-0">
          <Image
            src="/world_map.png"
            alt="World map background"
            fill
            className="object-cover grayscale opacity-20 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-background/20 to-background/60"></div>
        </div>

      <div className="absolute top-0 bottom-0 w-px bg-primary/70 shadow-[0_0_12px_hsl(var(--primary))] animate-scan">

      <style jsx>{`
        @keyframes scan {
          0% {
            left: 0%;
          }
          100% {
            left: 100%;
          }
        }
        .animate-scan {
          animation: scan 3s ease-in-out infinite alternate;
        }
      `}</style>
      </div>

      <div className="absolute bottom-0 left-0 z-10 w-full p-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span>Current Base</span>
        </div>

        <p className="mt-2 text-2xl font-semibold leading-tight tracking-tight">
          JALANDHAR, INDIA
        </p>

        <div className="mt-2 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
          <Clock3 className="h-3.5 w-3.5 text-accent" />
          <span>GMT +5:30</span>
          <span className="text-primary">India</span>
        </div>
      </div>
    </div>
  )
}
