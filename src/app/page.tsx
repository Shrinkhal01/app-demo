"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserListDisplay } from "@/components/UserListDisplay";
import { getGitHubFollowData } from "./actions";
import type { GitHubData } from "@/types/github";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Users, UserMinus, UserPlus, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
  const [token, setToken] = useState("");
  const [data, setData] = useState<GitHubData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setData(null);
    setIsDataLoaded(false);

    if (!token.trim()) {
      setError("Please enter your GitHub Personal Access Token.");
      toast({
        title: "Error",
        description: "GitHub Personal Access Token is required.",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      const result = await getGitHubFollowData(token);
      if (result.error) {
        setError(result.error);
        toast({
          title: "API Error",
          description: result.error,
          variant: "destructive",
        });
      } else if (result.data) {
        setData(result.data);
        setIsDataLoaded(true); // Trigger animation
        toast({
          title: "Success!",
          description: "GitHub data loaded successfully.",
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-8 px-4">
      <header className="mb-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
           <Github className="h-12 w-12 text-primary" />
           <h1 className="text-5xl font-bold tracking-tight">GitFollow</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Analyze your GitHub follower and following relationships.
        </p>
      </header>

      <main className="w-full max-w-4xl space-y-8">
        <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 sm:p-8 rounded-lg shadow-lg">
          <div>
            <Label htmlFor="token" className="text-lg font-medium">
              GitHub Personal Access Token
            </Label>
            <p className="text-sm text-muted-foreground mb-2">
              Enter your PAT with <code className="bg-muted px-1 py-0.5 rounded-sm">read:user</code> and <code className="bg-muted px-1 py-0.5 rounded-sm">user:follow</code> scopes. Your token is sent to the server but not stored.
            </p>
            <Input
              id="token"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ghp_YourTokenHere"
              className="text-base"
              aria-label="GitHub Personal Access Token Input"
            />
          </div>
          <Button type="submit" disabled={isPending} className="w-full sm:w-auto text-base py-3 px-6">
            {isPending ? "Loading Data..." : "Load GitHub Data"}
          </Button>
        </form>

        {error && (
          <Alert variant="destructive" className="shadow-md">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div 
          className={`space-y-6 transition-opacity duration-500 ${isDataLoaded ? 'opacity-100 animate-in fade-in-0' : 'opacity-0'}`}
          data-loaded={isDataLoaded}
        >
          {data && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UserListDisplay
                  title="Followers"
                  description="Users who follow you."
                  users={data.followers}
                  isLoading={isPending && !data}
                />
                <UserListDisplay
                  title="Following"
                  description="Users you follow."
                  users={data.following}
                  isLoading={isPending && !data}
                />
              </div>
              <Separator className="my-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UserListDisplay
                  title="Fans"
                  description="Users who follow you, but you don't follow back."
                  users={data.fans}
                  isLoading={isPending && !data}
                />
                <UserListDisplay
                  title="Not Following You Back"
                  description="Users you follow, but who don't follow you back."
                  users={data.notFollowingBack}
                  isLoading={isPending && !data}
                />
              </div>
            </>
          )}
          {(isPending && !data && !error) && ( // Show skeletons when initially loading
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UserListDisplay title="Followers" users={[]} isLoading={true} />
                <UserListDisplay title="Following" users={[]} isLoading={true} />
              </div>
              <Separator className="my-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UserListDisplay title="Fans" users={[]} isLoading={true} />
                <UserListDisplay title="Not Following You Back" users={[]} isLoading={true} />
              </div>
            </>
          )}
        </div>
      </main>
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} GitFollow. All rights reserved.</p>
        <p>
          Not affiliated with GitHub. Use your Personal Access Token responsibly.
        </p>
      </footer>
    </div>
  );
}
