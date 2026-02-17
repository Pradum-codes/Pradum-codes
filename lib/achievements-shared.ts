export type DateCountMap = Record<string, number>;

export interface AchievementViewData {
  leetcode: {
    username: string;
    profileUrl: string;
    avatarUrl: string | null;
    totalSolved: number;
    easy: number;
    medium: number;
    hard: number;
    contestRating: number | null;
    contestHistory: Array<{
      contestTitle: string;
      contestDate: string;
      rating: number;
      ranking: number;
    }>;
    heatmap: DateCountMap;
    recentBadges: Array<{
      id: string;
      name: string;
      icon: string;
      earnedAt: string | null;
    }>;
  };
  github: {
    username: string;
    profileUrl: string;
    avatarUrl: string | null;
    totalRepos: number;
    contributionsLastYear: number;
    followers: number;
    following: number;
    totalStars: number;
    totalForks: number;
    publicGists: number;
    languages: string[];
    heatmap: DateCountMap;
    topRepositories: Array<{
      name: string;
      url: string;
      description: string | null;
      stargazerCount: number;
      forkCount: number;
      updatedAt: string;
      primaryLanguage: {
        name: string;
        color: string;
      } | null;
    }>;
    recentBadges: Array<{
      id: string;
      name: string;
      icon: string;
    }>;
  };
  certifications: {
    total: number;
    domains: string[];
    providers: string[];
    url: string;
  };
}

export function getLastNDays(days: number): string[] {
  const dates: string[] = [];
  const end = new Date();
  end.setHours(0, 0, 0, 0);
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(end);
    d.setDate(end.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

export function buildLearningHeatmap(totalCertificates: number): DateCountMap {
  const dates = getLastNDays(364);
  return dates.reduce<DateCountMap>((acc, date, index) => {
    const baseline = index % 11 === 0 ? 2 : index % 7 === 0 ? 1 : 0;
    const extra = index % 29 === 0 ? 1 : 0;
    acc[date] = Math.min(4, baseline + extra + Math.floor(totalCertificates / 8));
    return acc;
  }, {});
}
