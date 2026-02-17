"use client";

import { useEffect, useState } from "react";
import { GitBranch, Star, Users, Zap } from "lucide-react";
import type { AchievementViewData } from "@/lib/achievements-shared";
import { GitHubHeatmap } from "@/components/github-heatmap";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GitHubAchievementDetails } from "../achievement-details/github-achievement-details";

export default function GitHubCard({
  github,
}: {
  github: AchievementViewData["github"];
}) {
  const placeholderAvatar = "/placeholder-user.jpg";
  const [avatarSrc, setAvatarSrc] = useState(
    github.avatarUrl || placeholderAvatar
  );

  useEffect(() => {
    setAvatarSrc(github.avatarUrl || placeholderAvatar);
  }, [github.avatarUrl]);

  const recentBadges =
    github.recentBadges.length > 0
      ? github.recentBadges.slice(0, 4)
      : [
          {
            id: "pull-shark",
            name: "Pull Shark",
            icon: "https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png",
          },
          {
            id: "quickdraw",
            name: "Quickdraw",
            icon: "https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png",
          },
          {
            id: "pair-extraordinaire",
            name: "Pair Extraordinaire",
            icon: "https://github.githubassets.com/images/modules/profile/achievements/pair-extraordinaire-default.png",
          },
          {
            id: "yolo",
            name: "YOLO",
            icon: "https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png",
          },
        ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group w-full h-full flex flex-col text-left rounded-2xl border border-blue-200/50 bg-gradient-to-br from-blue-50/80 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/10 dark:border-blue-800/30 p-6 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2 shrink-0">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/80 transition-colors">
                <GitBranch className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-blue-600/80 dark:text-blue-400/80">
                  GitHub
                </p>
                <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 leading-tight">
                  Open Source & Code
                </h3>
              </div>
            </div>

            <img
              src={avatarSrc}
              alt={`${github.username} profile`}
              className="h-10 w-10 rounded-full border border-blue-300/70 dark:border-blue-700/60 object-cover"
              onError={() => {
                if (avatarSrc !== placeholderAvatar)
                  setAvatarSrc(placeholderAvatar);
              }}
            />
          </div>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-blue-200/50 dark:border-blue-800/30">
              <div className="flex items-center gap-2 mb-1">
                <GitBranch className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                  Repositories
                </span>
              </div>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {github.totalRepos}
              </div>
            </div>

            <div className="bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-blue-200/50 dark:border-blue-800/30">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                  Contributions
                </span>
              </div>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {github.contributionsLastYear}
              </div>
            </div>

            <div className="bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-blue-200/50 dark:border-blue-800/30">
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                  Stars
                </span>
              </div>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {github.totalStars}
              </div>
            </div>

            <div className="bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-blue-200/50 dark:border-blue-800/30">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                  Followers
                </span>
              </div>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {github.followers}
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="mt-2 mb-2 text-xs font-medium text-blue-700 dark:text-blue-300">
            <div className="mb-2 text-xs font-medium text-blue-700 dark:text-blue-300">
              Top Languages
            </div>
            <div className="flex flex-wrap gap-2">
              {github.languages.slice(0, 4).map((lang) => (
                <Badge
                  key={lang}
                  className="bg-transparent border border-blue-300/60 dark:border-blue-700/60 text-blue-700 dark:text-blue-300 text-xs px-2 py-1"
                >
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          {/* Activity + Badges */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Heatmap (No Background) */}
            <div>
              <div className="mb-1 text-xs font-medium text-blue-700 dark:text-blue-300"> Recent Activity </div>
              <GitHubHeatmap submissionCalendar={JSON.stringify(github.heatmap)} compact days={84} />
            </div>

            {/* Floating Badges */}
            <div>
              <div className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-2">
                GitHub Achievements
              </div>

              <div className="flex items-center">
                {recentBadges.map((badge, index) => (
                  <div
                    key={badge.id}
                    className={`
                      relative
                      w-14 h-14
                      flex items-center justify-center
                      transition-all duration-300 ease-out
                      hover:-translate-y-2
                      hover:scale-105
                      hover:rotate-3
                      hover:z-20
                      ${index !== 0 ? "-ml-8" : ""}
                    `}
                    style={{ zIndex: 10 - index }}
                  >
                    <img
                      src={badge.icon}
                      alt={badge.name}
                      className="h-10 w-10 object-contain drop-shadow-lg"
                      onError={(event) => {
                        event.currentTarget.src =
                          "/placeholder-logo.svg";
                      }}
                    />
                  </div>
                ))}
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
          <DialogTitle>Open Source & GitHub</DialogTitle>
          <DialogDescription>
            @{github.username}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 min-h-0 overflow-y-auto">
          <GitHubAchievementDetails github={github} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
