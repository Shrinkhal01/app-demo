import type { GitHubUser } from "@/types/github";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserCard } from "./UserCard";
import { Skeleton } from "@/components/ui/skeleton";

interface UserListDisplayProps {
  title: string;
  description?: string;
  users: GitHubUser[];
  isLoading?: boolean;
  maxHeight?: string;
}

export function UserListDisplay({ title, description, users, isLoading = false, maxHeight = "400px" }: UserListDisplayProps) {
  if (isLoading) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-grow space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="h-4 w-4" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{title} ({users.length})</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <p className="text-muted-foreground italic">No users to display in this list.</p>
        ) : (
          <ScrollArea className="pr-3" style={{maxHeight: maxHeight}}>
            <div className="space-y-1">
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
