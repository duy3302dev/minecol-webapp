import type { FC } from "react";
import { Button } from "../ui/button";
import { FiChrome } from "react-icons/fi";
import { ThemeToggle } from "../atoms/ThemeToggle";
import { cn } from "@/shared/lib/utils";

export const Layout404Page: FC = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <header className="h-14 bg-background text-primary-foreground p-4 flex items-center justify-between shrink-0 sticky top-0 z-50 border-b border-border">
        <h1
          className="text-primary text-2xl font-bold"
          onClick={() => (window.location.href = "/")}
        >
          Minecol WebApp
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className={cn(
              "flex items-center gap-2 text-muted-foreground",
              "hover:bg-accent hover:text-accent-foreground",
              "border-2 border-dashed hover:border-solid hover:border-foreground",
              "transform transition-all duration-200",
              "sm:hidden md:hidden lg:flex"
            )}
          >
            <FiChrome size={16} /> Chrome Extension
          </Button>
          <ThemeToggle />
        </div>
      </header>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)] w-full bg-muted transition-colors relative p-4">
        <h1 className="text-8xl font-bold text-foreground mb-4">404</h1>
        <p className="text-2xl text-muted-foreground mb-8">Page Not Found</p>
        <a
          href="/"
          className="px-6 py-3 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};
