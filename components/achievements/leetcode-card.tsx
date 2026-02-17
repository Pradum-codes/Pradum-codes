"use client";

import { useEffect, useMemo, useState } from "react";
import { Code2, Trophy, Star } from "lucide-react";
import type { AchievementViewData } from "@/lib/achievements-shared";
import { LeetCodeHeatmap } from "@/components/leetcode-heatmap";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LeetCodeAchievementDetails } from "../achievement-details/leetcode-achievement-details";

// Custom LeetCode Achievement Card
export default function LeetCodeCard({ leetcode }: { leetcode: AchievementViewData['leetcode'] }) {
  const placeholderAvatar = "/placeholder-user.jpg";
  const [avatarSrc, setAvatarSrc] = useState(leetcode.avatarUrl || placeholderAvatar);

  useEffect(() => {
    setAvatarSrc(leetcode.avatarUrl || placeholderAvatar);
  }, [leetcode.avatarUrl]);

  const fallbackBadges = useMemo(
    () => [
      { id: "badge-placeholder-1", name: "Badge 1", icon: "/placeholder-logo.svg", earnedAt: null },
      { id: "badge-placeholder-2", name: "Badge 2", icon: "/placeholder-logo.svg", earnedAt: null },
      { id: "badge-placeholder-3", name: "Badge 3", icon: "/placeholder-logo.svg", earnedAt: null },
    ],
    [],
  );

  const recentBadges = leetcode.recentBadges.length > 0 ? leetcode.recentBadges.slice(0, 4) : fallbackBadges;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group w-full h-full flex flex-col text-left rounded-2xl border border-orange-200/50 bg-gradient-to-br from-orange-50/80 to-red-50/50 dark:from-orange-950/20 dark:to-red-950/10 dark:border-orange-800/30 p-6 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/20"
        >
          <div className="flex items-start justify-between gap-2 shrink-0">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/50 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/80 transition-colors">
                <Code2 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-orange-600/80 dark:text-orange-400/80">LeetCode</p>
                <h3 className="text-lg font-bold text-orange-900 dark:text-orange-100 leading-tight">Competitive Programming</h3>
              </div>
            </div>
            <img
              src={avatarSrc}
              alt={`${leetcode.username} profile`}
              className="h-10 w-10 rounded-full border border-orange-300/70 dark:border-orange-700/60 object-cover"
              onError={() => {
                if (avatarSrc !== placeholderAvatar) setAvatarSrc(placeholderAvatar);
              }}
            />
          </div>
          
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-orange-200/50 dark:border-orange-800/30">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                <span className="text-xs font-medium text-orange-700 dark:text-orange-300">Problems Solved</span>
              </div>
              <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{leetcode.totalSolved}</div>
            </div>
            <div className="bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-orange-200/50 dark:border-orange-800/30">
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                <span className="text-xs font-medium text-orange-700 dark:text-orange-300">Contest Rating</span>
              </div>
              <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{leetcode.contestRating ?? "N/A"}</div>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {/* Problem Categories */}
            <div>
              <div className="text-xs font-medium text-orange-700 dark:text-orange-300 mb-3">Problem Categories</div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-green-100/80 dark:bg-green-900/30 rounded-md p-2 border border-green-200 dark:border-green-800 text-center">
                  <div className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">Easy</div>
                  <div className="text-sm font-bold text-green-800 dark:text-green-200">{leetcode.easy}/927</div>
                </div>
                <div className="bg-yellow-100/80 dark:bg-yellow-900/30 rounded-md p-2 border border-yellow-200 dark:border-yellow-800 text-center">
                  <div className="text-xs font-medium text-yellow-600 dark:text-yellow-400 mb-1">Med.</div>
                  <div className="text-sm font-bold text-yellow-800 dark:text-yellow-200">{leetcode.medium}/2009</div>
                </div>
                <div className="bg-red-100/80 dark:bg-red-900/30 rounded-md p-2 border border-red-200 dark:border-red-800 text-center">
                  <div className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">Hard</div>
                  <div className="text-sm font-bold text-red-800 dark:text-red-200">{leetcode.hard}/909</div>
                </div>
              </div>
            </div>
            
            {/* Heatmap and Badges on the same line */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              {/* Heatmap */}
              <div className="flex-1">
                <div className="text-xs font-medium text-orange-700 dark:text-orange-300 mb-2">Recent Activity</div>
                <LeetCodeHeatmap submissionCalendar={JSON.stringify(leetcode.heatmap)} compact days={84} />
              </div>

              {/* Badges */}
              <div className="flex-shrink-0">
                <div className="text-xs font-medium text-orange-700 dark:text-orange-300 mb-2">Recent Badges</div>
                <div className="flex items-center">
                  {recentBadges.slice(0, 4).map((badge, index) => (
                    <div
                      key={badge.id}
                      className={`
                        relative
                        w-14 h-14
                        flex items-center justify-center
                        transition-all duration-300 ease-out
                        hover:-translate-y-2
                        hover:scale-105
                        hover:z-20
                        ${index !== 0 ? "-ml-8" : ""}
                      `}
                      style={{ zIndex: 10 - index }}
                    >
                      <img
                        src={badge.icon}
                        alt={badge.name}
                        className="h-10 w-10 object-contain"
                        onError={(event) => {
                          event.currentTarget.src = "/placeholder-logo.svg";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </button>
      </DialogTrigger>
        <DialogContent
          className="
            grid-rows-[auto_minmax(0,1fr)]
            w-[calc(100vw-0.75rem)]
            sm:w-[calc(100vw-2rem)]
            md:w-[92vw]
            lg:w-[88vw]
            xl:w-[80vw]
            max-w-6xl
            h-[92vh]
            sm:h-[90vh]
            md:h-[88vh]
            max-h-[92vh]
            overflow-hidden
            p-3 sm:p-6
          "
        >
        <DialogHeader>
          <DialogTitle>Competitive Programming (LeetCode)</DialogTitle>
          <DialogDescription>@{leetcode.username}</DialogDescription>
        </DialogHeader>
        <div className="mt-1 min-h-0 overflow-y-auto sm:mt-2">
          <LeetCodeAchievementDetails leetcode={leetcode} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
