"use server";

import type { GitHubUser, GitHubData, GitHubApiError } from "@/types/github";

const GITHUB_API_BASE_URL = "https://api.github.com";

async function fetchAllPages<T>(url: string, token: string): Promise<T[]> {
  let allItems: T[] = [];
  let nextPageUrl: string | null = `${GITHUB_API_BASE_URL}${url}?per_page=100`;

  try {
    while (nextPageUrl) {
      const response = await fetch(nextPageUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      if (!response.ok) {
        const errorData: GitHubApiError = await response.json();
        if (response.status === 401) throw new Error(`Unauthorized: Invalid GitHub token. ${errorData.message}`);
        if (response.status === 403) throw new Error(`Forbidden: GitHub API rate limit exceeded or token lacks permissions. ${errorData.message}`);
        throw new Error(`GitHub API error (${response.status}): ${errorData.message} for ${nextPageUrl}`);
      }

      const items: T[] = await response.json();
      if (!Array.isArray(items)) { // Defensive check
        throw new Error(`GitHub API did not return an array for ${nextPageUrl}. Received: ${JSON.stringify(items)}`);
      }
      allItems = allItems.concat(items);

      const linkHeader = response.headers.get("Link");
      if (linkHeader) {
        const match = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
        nextPageUrl = match ? match[1] : null;
      } else {
        nextPageUrl = null;
      }
    }
    return allItems;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in fetchAllPages:", error.message);
      throw error; // Re-throw original error or a new custom error
    }
    console.error("Unknown error in fetchAllPages:", error);
    throw new Error("An unknown error occurred while fetching data from GitHub.");
  }
}

export async function getGitHubFollowData(
  token: string
): Promise<{ data: GitHubData | null; error: string | null }> {
  if (!token) {
    return { data: null, error: "GitHub token is required." };
  }

  try {
    const followers = await fetchAllPages<GitHubUser>("/user/followers", token);
    const following = await fetchAllPages<GitHubUser>("/user/following", token);

    const followerLogins = new Set(followers.map((user) => user.login));
    const followingLogins = new Set(following.map((user) => user.login));

    const notFollowingBack = following.filter(
      (user) => !followerLogins.has(user.login)
    );
    const fans = followers.filter(
      (user) => !followingLogins.has(user.login)
    );

    return {
      data: {
        followers,
        following,
        notFollowingBack,
        fans,
      },
      error: null,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, error: error.message };
    }
    return { data: null, error: "An unexpected error occurred." };
  }
}
