export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface GitHubData {
  followers: GitHubUser[];
  following: GitHubUser[];
  notFollowingBack: GitHubUser[];
  fans: GitHubUser[];
}

export interface GitHubApiError {
  message: string;
  documentation_url?: string;
}
