const BASE_QUERY = `
  query getUserPublicStats($username: String!) {
    allQuestionsCount {
        difficulty
        count
    }

    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      topPercentage
    }

    userContestRankingHistory(username: $username) {
      attended
      rating
      ranking
      contest {
        title
        startTime
      }
    }

    matchedUser(username: $username) {
        username

        profile {
        ranking
        reputation
        }

        contributions {
        points
        }

        submitStatsGlobal {
        acSubmissionNum {
            difficulty
            count
            submissions
        }
        totalSubmissionNum {
            difficulty
            count
            submissions
        }
        }
        submissionCalendar
    }
    }
`;

const ENHANCED_QUERY = `
  query getUserPublicStatsEnhanced($username: String!) {
    allQuestionsCount {
        difficulty
        count
    }

    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      topPercentage
    }

    userContestRankingHistory(username: $username) {
      attended
      rating
      ranking
      contest {
        title
        startTime
      }
    }

    matchedUser(username: $username) {
        username

        profile {
        ranking
        reputation
        userAvatar
        }

        contributions {
        points
        }

        submitStatsGlobal {
        acSubmissionNum {
            difficulty
            count
            submissions
        }
        totalSubmissionNum {
            difficulty
            count
            submissions
        }
        }
        submissionCalendar
        badges {
          id
          displayName
          icon
          creationDate
        }
    }
    }
`;

export interface LeetCodeUserData {
  username: string;
  profile: {
    ranking: number | null;
    reputation: number | null;
    userAvatar: string | null;
  };
  contributions: {
    points: number;
  };
  userContestRanking?: {
    attendedContestsCount: number;
    rating: number;
    globalRanking: number;
    topPercentage: number;
  } | null;
  userContestRankingHistory?: Array<{
    attended: boolean;
    rating: number;
    ranking: number;
    contest: {
      title: string;
      startTime: number;
    };
  }>;
  submitStatsGlobal: {
    acSubmissionNum: Array<{
      difficulty: string;
      count: number;
      submissions: number;
    }>;
    totalSubmissionNum: Array<{
      difficulty: string;
      count: number;
      submissions: number;
    }>;
  };
  submissionCalendar: string;
  recentBadges: Array<{
    id: string;
    name: string;
    icon: string;
    earnedAt: string | null;
  }>;
}

function normalizeLeetCodeAssetUrl(url: unknown): string | null {
  if (typeof url !== "string" || !url.trim()) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `https://leetcode.com${url}`;
  return `https://leetcode.com/${url}`;
}

function toIsoDate(value: unknown): string | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return new Date(value * 1000).toISOString();
  }
  if (typeof value === "string" && value.trim()) {
    const numeric = Number(value);
    if (Number.isFinite(numeric)) return new Date(numeric * 1000).toISOString();
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
  }
  return null;
}

function normalizeRecentBadges(rawBadges: unknown): LeetCodeUserData["recentBadges"] {
  if (!Array.isArray(rawBadges)) return [];
  return rawBadges
    .map((badge, index) => {
      const safeBadge = (badge ?? {}) as Record<string, unknown>;
      const name = typeof safeBadge.displayName === "string" && safeBadge.displayName.trim()
        ? safeBadge.displayName.trim()
        : "LeetCode Badge";
      const icon = normalizeLeetCodeAssetUrl(safeBadge.icon);
      if (!icon) return null;
      const id = typeof safeBadge.id === "string" && safeBadge.id.trim()
        ? safeBadge.id
        : `${name.toLowerCase().replace(/\s+/g, "-")}-${index}`;
      return {
        id,
        name,
        icon,
        earnedAt: toIsoDate(safeBadge.creationDate),
      };
    })
    .filter((badge): badge is NonNullable<typeof badge> => badge !== null)
    .sort((a, b) => {
      if (!a.earnedAt && !b.earnedAt) return 0;
      if (!a.earnedAt) return 1;
      if (!b.earnedAt) return -1;
      return new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime();
    })
    .slice(0, 4);
}

async function executeLeetCodeQuery(query: string, username: string) {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Referer": "https://leetcode.com"
    },
    body: JSON.stringify({
      query,
      variables: { username }
    }),
    next: { revalidate: 86400 } // 24 hours
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`HTTP error! status: ${res.status}${body ? `, body: ${body.slice(0, 300)}` : ""}`);
  }

  return res.json();
}

export async function getLeetCodeStats(username: string = "pradum_kumar_99"): Promise<LeetCodeUserData> {
  try {
    let data = await executeLeetCodeQuery(ENHANCED_QUERY, username);

    if (data.errors?.length) {
      const hasFieldError = data.errors.some(
        (error: { message?: string }) => typeof error?.message === "string" && error.message.includes("Cannot query field"),
      );
      if (hasFieldError) {
        data = await executeLeetCodeQuery(BASE_QUERY, username);
      } else {
        throw new Error(`LeetCode GraphQL returned errors: ${JSON.stringify(data.errors)}`);
      }
    }

    if (data.errors?.length) {
      throw new Error(`LeetCode GraphQL returned errors: ${JSON.stringify(data.errors)}`);
    }

    if (!data?.data?.matchedUser) {
      throw new Error(`LeetCode user '${username}' not found.`);
    }

    return {
      ...data.data.matchedUser,
      userContestRanking: data.data.userContestRanking ?? null,
      userContestRankingHistory: data.data.userContestRankingHistory ?? [],
      profile: {
        ranking: data.data.matchedUser.profile?.ranking ?? null,
        reputation: data.data.matchedUser.profile?.reputation ?? null,
        userAvatar: normalizeLeetCodeAssetUrl(data.data.matchedUser.profile?.userAvatar),
      },
      recentBadges: normalizeRecentBadges(data.data.matchedUser.badges),
    };
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch LeetCode stats: ${errorMessage}`);
  }
}
