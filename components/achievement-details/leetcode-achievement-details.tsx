"use client"

import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"
import { AchievementStat } from "@/components/achievements/achievement-ui"
import { LeetCodeHeatmap } from "@/components/leetcode-heatmap"
import type { AchievementViewData } from "@/lib/achievements-shared"

export function LeetCodeAchievementDetails({
  leetcode,
}: {
  leetcode: AchievementViewData["leetcode"]
}) {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  })

  const contestData = (leetcode.contestHistory ?? [])
    .slice()
    .sort(
      (a, b) =>
        new Date(a.contestDate).getTime() - new Date(b.contestDate).getTime(),
    )
    .map((contest) => ({
      title: contest.contestTitle,
      date: dateFormatter.format(new Date(contest.contestDate)),
      isoDate: contest.contestDate,
      rating: contest.rating,
      rank: contest.ranking,
    }))

  return (
    <div className="space-y-4 p-3 sm:space-y-6 sm:p-6 lg:p-8">
      <Button asChild className="w-fit">
        <Link href={leetcode.profileUrl} target="_blank" rel="noreferrer">
          View LeetCode Profile
          <ExternalLink className="ml-2 h-4 w-4" />
        </Link>
      </Button>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <AchievementStat label="Total Solved" value={leetcode.totalSolved} />
        <AchievementStat label="Easy" value={leetcode.easy} />
        <AchievementStat label="Medium" value={leetcode.medium} />
        <AchievementStat label="Hard" value={leetcode.hard} />
      </div>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Recent Contest Rating Progression
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 sm:px-4">
          {contestData.length === 0 ? (
            <div className="flex h-[220px] items-center justify-center text-center sm:h-[300px]">
              <p className="max-w-md text-sm text-muted-foreground">
                Contest history unavailable for this account.
              </p>
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <div className="h-[220px] min-w-[680px] sm:h-[300px] md:h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={contestData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11 }}
                      tickMargin={6}
                      angle={-35}
                      textAnchor="end"
                      height={60}
                      interval="preserveStartEnd"
                    />

                    <YAxis
                      tick={{ fontSize: 12 }}
                      domain={["dataMin - 50", "dataMax + 50"]}
                      width={45}
                    />

                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        fontSize: "12px",
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                      }}
                      formatter={(value: number, name: string) =>
                        name === "rating" ? [`${value}`, "Rating"] : value
                      }
                    />

                    <Line
                      type="monotone"
                      dataKey="rating"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">LeetCode Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <div className="min-w-[800px] sm:min-w-0">
              <LeetCodeHeatmap submissionCalendar={JSON.stringify(leetcode.heatmap)} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
