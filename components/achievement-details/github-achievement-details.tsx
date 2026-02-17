"use client"

import Link from "next/link"
import { ExternalLink, GitFork, Star, Users, Zap, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AchievementStat } from "@/components/achievements/achievement-ui"
import { GitHubHeatmap } from "@/components/github-heatmap"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { AchievementViewData } from "@/lib/achievements-shared"

export function GitHubAchievementDetails({
  github,
}: {
  github: AchievementViewData["github"]
}) {
  const contributionValues = Object.values(github.heatmap)
  const activeDays = contributionValues.filter((c) => c > 0).length
  const maxDaily =
    contributionValues.length > 0
      ? Math.max(...contributionValues)
      : 0

  return (
    <div className="space-y-5 p-3 sm:space-y-6 sm:p-6 lg:p-8">

      {/* Profile Card */}
      <Card className="border-border/60">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
                <AvatarImage
                  src={github.avatarUrl ?? undefined}
                  alt={github.username}
                />
                <AvatarFallback>
                  {github.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-base font-semibold sm:text-lg">
                  @{github.username}
                </p>
                <p className="text-sm text-muted-foreground">
                  Open source and contribution overview
                </p>
              </div>
            </div>

            <Button asChild className="w-fit">
              <Link
                href={github.profileUrl}
                target="_blank"
                rel="noreferrer"
              >
                View on GitHub
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Primary Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <AchievementStat label="Followers" value={github.followers} />
        <AchievementStat label="Following" value={github.following} />
        <AchievementStat label="Repositories" value={github.totalRepos} />
        <AchievementStat label="Public Gists" value={github.publicGists} />
      </div>

      {/* Languages */}
      {github.languages?.length > 0 && (
        <section className="rounded-xl border border-border/60 p-3 sm:p-4">
          <p className="text-sm font-medium mb-3">Languages</p>
          <div className="flex flex-wrap gap-2">
            {github.languages.map((lang) => (
              <Badge key={lang} variant="secondary">
                {lang}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {/* Contribution Overview */}
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">
            Contribution Overview
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">

          {/* Contribution Metrics */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-lg border border-border/60 p-3">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Zap className="h-3.5 w-3.5" /> Contributions
              </p>
              <p className="mt-1 text-base font-semibold">
                {github.contributionsLastYear}
              </p>
            </div>

            <div className="rounded-lg border border-border/60 p-3">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="h-3.5 w-3.5" /> Active Days
              </p>
              <p className="mt-1 text-base font-semibold">
                {activeDays}
              </p>
            </div>

            <div className="rounded-lg border border-border/60 p-3">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Star className="h-3.5 w-3.5" /> Total Stars
              </p>
              <p className="mt-1 text-base font-semibold">
                {github.totalStars}
              </p>
            </div>

            <div className="rounded-lg border border-border/60 p-3">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <GitFork className="h-3.5 w-3.5" /> Max Daily
              </p>
              <p className="mt-1 text-base font-semibold">
                {maxDaily}
              </p>
            </div>
          </div>

          {/* Scrollable Heatmap (Mobile Safe) */}
          <div className="w-full overflow-x-auto">
            <div className="min-w-[800px] sm:min-w-0">
              <GitHubHeatmap
                submissionCalendar={JSON.stringify(github.heatmap)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Repositories (Compact Dialog Version) */}
      {github.topRepositories?.length > 0 && (
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">
              Top Repositories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {github.topRepositories.map((repo) => (
                <div key={repo.name} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Link 
                          href={repo.url} 
                          target="_blank"
                          className="text-lg font-semibold hover:underline text-blue-600 dark:text-blue-400"
                        >
                          {repo.name}
                        </Link>
                        {repo.primaryLanguage && (
                          <Badge variant="outline" className="text-xs">
                            <div 
                              className="w-2 h-2 rounded-full mr-1" 
                              style={{ backgroundColor: repo.primaryLanguage.color || '#6b7280' }}
                            />
                            {repo.primaryLanguage.name}
                          </Badge>
                        )}
                      </div>
                      
                      {repo.description && (
                        <p className="text-muted-foreground mb-3">{repo.description}</p>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span>{repo.stargazerCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-4 h-4" />
                          <span>{repo.forkCount}</span>
                        </div>
                        <div>
                          Updated {new Date(repo.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}