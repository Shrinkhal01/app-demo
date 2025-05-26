import type { GitHubUser } from "@/types/github";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink } from "lucide-react";

interface UserCardProps {
  user: GitHubUser;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 border-b last:border-b-0 hover:bg-secondary/50 transition-colors duration-150 rounded-md">
      <Avatar className="h-10 w-10">
        <AvatarImage src={user.avatar_url} alt={`${user.login}'s avatar`} data-ai-hint="profile avatar" />
        <AvatarFallback>{user.login.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <Link
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary hover:underline hover:text-accent transition-colors"
        >
          {user.login}
        </Link>
      </div>
      <Link
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${user.login}'s profile on GitHub`}
        className="text-muted-foreground hover:text-accent transition-colors"
      >
        <ExternalLink className="h-4 w-4" />
      </Link>
    </div>
  );
}
