"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Award, Star } from "lucide-react";
import type { AchievementViewData } from "@/lib/achievements-shared";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import certificates from "@/data/certificates";

// Custom Certifications Achievement Card  
export default function CertificationsCard({ certifications }: { 
  certifications: AchievementViewData['certifications'];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group w-full h-full flex flex-col text-left rounded-2xl border border-purple-200/50 bg-gradient-to-br from-purple-50/80 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/10 dark:border-purple-800/30 p-6 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20"
        >
          <div className="flex items-start justify-between gap-2 shrink-0">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/80 transition-colors">
                <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-purple-600/80 dark:text-purple-400/80">Learning</p>
                <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100 leading-tight">Certifications & Skills</h3>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 mt-1 text-purple-500 group-hover:text-purple-600 transition-colors" />
          </div>
          
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-purple-200/50 dark:border-purple-800/30">
              <div className="flex items-center gap-2 mb-1">
                <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-medium text-purple-700 dark:text-purple-300">Certificates</span>
              </div>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{certifications.total}+</div>
            </div>
            <div className="bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-purple-200/50 dark:border-purple-800/30">
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-medium text-purple-700 dark:text-purple-300">Domains</span>
              </div>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{certifications.domains.length}</div>
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-2 text-xs font-medium text-purple-700 dark:text-purple-300">Expertise Areas</div>
            <div className="flex flex-wrap gap-2">
              {certifications.domains.map((domain) => (
                <Badge key={domain} className="bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/50 dark:text-purple-200 dark:border-purple-800 text-xs px-2 py-1">
                  {domain}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {certifications.providers.map((provider) => (
              <Badge
                key={provider}
                className="bg-gradient-to-r from-purple-100 to-pink-100
                           dark:from-purple-900/40 dark:to-pink-900/40
                           border border-purple-200 dark:border-purple-800
                           text-purple-800 dark:text-purple-200 text-xs"
              >
                {provider}
              </Badge>
            ))}
          </div>

          {/* Badges for specific certifications */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            {certificates.map((cert) => (
              <div
                key={cert.title}
                className="group/cert relative overflow-hidden rounded-lg border border-purple-200/50 bg-white/60 p-3 dark:border-purple-800/30 dark:bg-black/30"
              >
                <div className="flex h-16 items-center justify-center rounded-md bg-purple-100/70 dark:bg-purple-900/40">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    width={48}
                    height={48}
                    className="rounded-md object-contain"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-black/65 p-2 opacity-0 transition-opacity group-hover/cert:opacity-100">
                  <p className="line-clamp-1 text-xs font-semibold text-white">{cert.title}</p>
                  <p className="line-clamp-1 text-[11px] text-white/85">{cert.provider}</p>
                </div>
              </div>
            ))}
          </div>

        </button>
      </DialogTrigger>
    </Dialog>
  );
}
