
// GitHub GraphQL query to fetch user data and contributions
const GITHUB_QUERY = `
  query($username: String!) {
    user(login: $username) {
      login
      name
      bio
      avatarUrl
      location
      company
      websiteUrl
      email
      twitterUsername
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositoriesCount: repositories(privacy: PUBLIC) {
        totalCount
      }
      gists {
        totalCount
      }
      contributionsCollection {
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
      topRepositories: repositories(first: 10, orderBy: {field: STARGAZERS, direction: DESC}, privacy: PUBLIC) {
        nodes {
          name
          url
          description
          stargazerCount
          forkCount
          updatedAt
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
`;

export interface GitHubUserData {
  login: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  location: string | null;
  company: string | null;
  websiteUrl: string | null;
  email: string | null;
  twitterUsername: string | null;
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
  repositories: {
    totalCount: number;
  };
  gists: {
    totalCount: number;
  };
  contributionsCollection: {
    totalCommitContributions: number;
    totalIssueContributions: number;
    totalPullRequestContributions: number;
    totalPullRequestReviewContributions: number;
    contributionCalendar: {
      totalContributions: number;
      weeks: Array<{
        contributionDays: Array<{
          date: string;
          contributionCount: number;
          color: string;
        }>;
      }>;
    };
  };
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
}

export async function githubStatsApi(username: string = "Pradum-codes"): Promise<GitHubUserData> {
  try {
    // You'll need a GitHub Personal Access Token for this to work
    // Store it in your environment variables as GITHUB_TOKEN
    const token = process.env.GITHUB_TOKEN;
    
    if (!token) {
      throw new Error("GitHub token is required. Please set GITHUB_TOKEN in your environment variables.");
    }

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GITHUB_QUERY,
        variables: { username }
      }),
      next: { revalidate: 3600 } // 1 hour cache
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    
    if (data.errors) {
      throw new Error(`GitHub GraphQL returned errors: ${JSON.stringify(data.errors)}`);
    }

    if (!data?.data?.user) {
      throw new Error(`GitHub user '${username}' not found.`);
    }

    // Transform the data to match our interface
    const userData = data.data.user;
    return {
      ...userData,
      repositories: userData.repositoriesCount,
      topRepositories: userData.topRepositories.nodes
    };
    
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch GitHub stats: ${errorMessage}`);
  }
}

// Helper function to get contribution data in a format similar to LeetCode calendar
export function getContributionHeatmapData(contributionCalendar: GitHubUserData['contributionsCollection']['contributionCalendar']) {
  const heatmapData: { [date: string]: number } = {};
  
  contributionCalendar.weeks.forEach(week => {
    week.contributionDays.forEach(day => {
      heatmapData[day.date] = day.contributionCount;
    });
  });
  
  return JSON.stringify(heatmapData);
}

// Alternative REST API approach (if you prefer not to use GraphQL)
export async function githubStatsApiREST(username: string = "your-github-username") {
  try {
    const token = process.env.GITHUB_TOKEN;
    const headers = {
      "Accept": "application/vnd.github.v3+json",
      ...(token && { "Authorization": `token ${token}` })
    };

    // Fetch user data
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 }
    });

    if (!userRes.ok) {
      throw new Error(`HTTP error! status: ${userRes.status}`);
    }

    const userData = await userRes.json();

    // Fetch repositories
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=10`, {
      headers,
      next: { revalidate: 3600 }
    });

    const repositories = await reposRes.json();

    return {
      user: userData,
      repositories: repositories
    };

  } catch (error) {
    console.error("Error fetching GitHub stats (REST):", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch GitHub stats: ${errorMessage}`);
  }
}