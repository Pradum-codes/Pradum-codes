import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getLeetCodeStats } from "@/lib/leetcode-api";
import { getContributionHeatmapData, githubStatsApi } from "@/lib/github-api";
import type { AchievementViewData, DateCountMap } from "@/lib/achievements-shared";

const FALLBACK_DATA: AchievementViewData = {
  leetcode: {
    username: "pradum_kumar_99",
    profileUrl: "https://leetcode.com/u/pradum_kumar_99/",
    avatarUrl: null,
    totalSolved: 412,
    easy: 160,
    medium: 215,
    hard: 37,
    contestRating: 1532,
    contestHistory: [],
    heatmap: {},
    recentBadges: [],
  },
  github: {
    username: "Pradum-codes",
    profileUrl: "https://github.com/Pradum-codes",
    avatarUrl: null,
    totalRepos: 42,
    contributionsLastYear: 215,
    followers: 0,
    following: 0,
    totalStars: 0,
    totalForks: 0,
    publicGists: 0,
    languages: ["TypeScript", "JavaScript", "Python", "C++"],
    heatmap: {},
    topRepositories: [],
    recentBadges: [
      { id: "pull-shark", name: "Pull Shark", icon: "https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png" },
      { id: "quickdraw", name: "Quickdraw", icon: "https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png" },
      { id: "pair-extraordinaire", name: "Pair Extraordinaire", icon: "https://github.githubassets.com/images/modules/profile/achievements/pair-extraordinaire-default.png" },
      { id: "yolo", name: "YOLO", icon: "https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png" },
    ],
  },
  certifications: {
    total: 8,
    domains: [
      "Android Development",
      "Backend & Databases",
      "Cloud & DevOps fundamentals",
    ],
    providers: [
      "Google",
      "HackerRank", 
      "Amazon Web Services",
      "Coursera",
      "Udemy",
      "Microsoft"
    ],
    url: "/#achievements",
  },
};

function toIsoDateMapFromLeetCode(calendar: string | null | undefined): DateCountMap {
  if (!calendar) return {};
  try {
    const parsed = JSON.parse(calendar) as Record<string, number>;
    return Object.entries(parsed).reduce<DateCountMap>((acc, [timestamp, count]) => {
      const unix = Number(timestamp);
      if (Number.isNaN(unix)) return acc;
      const isoDate = new Date(unix * 1000).toISOString().slice(0, 10);
      acc[isoDate] = count;
      return acc;
    }, {});
  } catch {
    return {};
  }
}

function contestHistoryFromHistory(
  history:
    | Array<{
        attended: boolean;
        rating: number;
        ranking: number;
        contest: { title: string; startTime: number };
      }>
    | undefined,
) {
  if (!history?.length) return [];
  return history
    .filter((entry) =>
      entry.attended &&
      Number.isFinite(entry.contest?.startTime) &&
      Number.isFinite(entry.rating) &&
      entry.rating > 0
    )
    .sort((a, b) => b.contest.startTime - a.contest.startTime)
    .slice(0, 15)
    .map((entry) => {
      const contestDate = new Date(entry.contest.startTime * 1000).toISOString();
      return {
        contestTitle: entry.contest.title || "LeetCode Contest",
        contestDate,
        rating: Math.round(entry.rating),
        ranking: Number.isFinite(entry.ranking) ? Math.round(entry.ranking) : 0,
      };
    });
}

function readLeetCodeHeatmapFromTestFile(raw: string): DateCountMap {
  const match = raw.match(/submissionCalendar:\s*'(\{[\s\S]*?\})'/);
  if (!match) return {};
  return toIsoDateMapFromLeetCode(match[1]);
}

function buildGitHubBadges(stats: {
  contributions: number;
  pullRequests: number;
  reviews: number;
  stars: number;
}) {
  const allBadges = [
    {
      id: "pull-shark",
      name: "Pull Shark",
      icon: "https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png",
      unlocked: stats.pullRequests > 0,
    },
    {
      id: "quickdraw",
      name: "Quickdraw",
      icon: "https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png",
      unlocked: stats.pullRequests >= 5,
    },
    {
      id: "pair-extraordinaire",
      name: "Pair Extraordinaire",
      icon: "https://github.githubassets.com/images/modules/profile/achievements/pair-extraordinaire-default.png",
      unlocked: stats.reviews >= 10,
    },
    {
      id: "yolo",
      name: "YOLO",
      icon: "https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png",
      unlocked: stats.contributions >= 100,
    },
    {
      id: "starstruck",
      name: "Starstruck",
      icon: "https://github.githubassets.com/images/modules/profile/achievements/starstruck-default.png",
      unlocked: stats.stars >= 10,
    },
    {
      id: "galaxy-brain",
      name: "Galaxy Brain",
      icon: "https://github.githubassets.com/images/modules/profile/achievements/galaxy-brain-default.png",
      unlocked: stats.reviews >= 25,
    },
  ];

  const unlocked = allBadges.filter((badge) => badge.unlocked).slice(0, 4);
  if (unlocked.length > 0) return unlocked.map(({ id, name, icon }) => ({ id, name, icon }));
  return allBadges.slice(0, 4).map(({ id, name, icon }) => ({ id, name, icon }));
}

async function readFallbackFiles() {
  const leetcodePath = path.join(process.cwd(), "leetcode-api-response.txt");
  const githubPath = path.join(process.cwd(), "github-api-reponse.txt");

  const [leetcodeRaw, githubRaw] = await Promise.all([
    readFile(leetcodePath, "utf8").catch(() => ""),
    readFile(githubPath, "utf8").catch(() => ""),
  ]);

  const leetcodeHeatmap = leetcodeRaw ? readLeetCodeHeatmapFromTestFile(leetcodeRaw) : {};

  let githubHeatmap: DateCountMap = {};
  try {
    const parsed = JSON.parse(githubRaw);
    if (parsed && typeof parsed === "object" && parsed.heatmap && typeof parsed.heatmap === "object") {
      githubHeatmap = parsed.heatmap as DateCountMap;
    }
  } catch {
    githubHeatmap = {};
  }

  return { leetcodeHeatmap, githubHeatmap };
}

export async function getAchievementData(): Promise<AchievementViewData> {
  const fallbackFiles = await readFallbackFiles();

  const [leetcodeResult, githubResult] = await Promise.allSettled([
    getLeetCodeStats(FALLBACK_DATA.leetcode.username),
    githubStatsApi(FALLBACK_DATA.github.username),
  ]);

  const data: AchievementViewData = structuredClone(FALLBACK_DATA);

  if (leetcodeResult.status === "fulfilled") {
    const stats = leetcodeResult.value;
    const solved = stats.submitStatsGlobal.acSubmissionNum;
    data.leetcode = {
      ...data.leetcode,
      username: stats.username || data.leetcode.username,
      profileUrl: `https://leetcode.com/u/${stats.username || data.leetcode.username}/`,
      avatarUrl: stats.profile?.userAvatar || data.leetcode.avatarUrl,
      totalSolved: solved.find((item) => item.difficulty === "All")?.count ?? data.leetcode.totalSolved,
      easy: solved.find((item) => item.difficulty === "Easy")?.count ?? data.leetcode.easy,
      medium: solved.find((item) => item.difficulty === "Medium")?.count ?? data.leetcode.medium,
      hard: solved.find((item) => item.difficulty === "Hard")?.count ?? data.leetcode.hard,
      contestRating: stats.userContestRanking?.rating ? Math.round(stats.userContestRanking.rating) : null,
      contestHistory: contestHistoryFromHistory(stats.userContestRankingHistory),
      heatmap: toIsoDateMapFromLeetCode(stats.submissionCalendar),
      recentBadges: stats.recentBadges ?? data.leetcode.recentBadges,
    };
  } else if (Object.keys(fallbackFiles.leetcodeHeatmap).length > 0) {
    data.leetcode.heatmap = fallbackFiles.leetcodeHeatmap;
  }

  if (githubResult.status === "fulfilled") {
    const stats = githubResult.value;
    const langSet = new Set<string>();
    let totalStars = 0;
    let totalForks = 0;
    stats.topRepositories.forEach((repo) => {
      if (repo.primaryLanguage?.name) langSet.add(repo.primaryLanguage.name);
      totalStars += repo.stargazerCount;
      totalForks += repo.forkCount;
    });
    const languages = Array.from(langSet).slice(0, 8);
    data.github = {
      ...data.github,
      username: stats.login || data.github.username,
      profileUrl: `https://github.com/${stats.login || data.github.username}`,
      avatarUrl: stats.avatarUrl || data.github.avatarUrl,
      totalRepos: stats.repositories.totalCount,
      contributionsLastYear: stats.contributionsCollection.contributionCalendar.totalContributions,
      followers: stats.followers.totalCount ?? data.github.followers,
      following: stats.following.totalCount ?? data.github.following,
      totalStars: totalStars || data.github.totalStars,
      totalForks: totalForks || data.github.totalForks,
      publicGists: stats.gists.totalCount ?? data.github.publicGists,
      languages,
      topRepositories: stats.topRepositories ?? data.github.topRepositories,
      heatmap: JSON.parse(
        getContributionHeatmapData(stats.contributionsCollection.contributionCalendar),
      ) as DateCountMap,
      recentBadges: buildGitHubBadges({
        contributions: stats.contributionsCollection.contributionCalendar.totalContributions,
        pullRequests: stats.contributionsCollection.totalPullRequestContributions,
        reviews: stats.contributionsCollection.totalPullRequestReviewContributions,
        stars: totalStars,
      }),
    };
  } else if (Object.keys(fallbackFiles.githubHeatmap).length > 0) {
    data.github.heatmap = fallbackFiles.githubHeatmap;
  }

  if (Object.keys(data.leetcode.heatmap).length === 0) data.leetcode.heatmap = fallbackFiles.leetcodeHeatmap;
  if (Object.keys(data.github.heatmap).length === 0) data.github.heatmap = fallbackFiles.githubHeatmap;

  return data;
}
