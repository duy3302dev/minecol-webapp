import { Button } from "../ui/button";
import { FiChrome } from "react-icons/fi";
import { ThemeToggle } from "../atoms/ThemeToggle";
import { SearchInput } from "../atoms/SearchInput";
import type { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarNav } from "../molecules/SidebarNav";
import { useNavigator } from "@/hooks/useNavigator";
import { Outlet } from "react-router-dom";
import { useSearchStore } from "@/shared/store/search.store";
import { cn } from "@/shared/lib/utils";
import logo from "./../../assets/images/logo-vertical.png";

export const MainLayout: FC = () => {
  const { navigate } = useNavigator();
  const colorTags = useSearchStore((state) => state.colorTags);
  const collectionTags = useSearchStore((state) => state.collectionTags);
  const mode = useSearchStore((state) => state.mode);

  const handleSearch = () => {
    //Fake call API to search
    if (mode === "palette") {
      console.log(
        "Searching palettes with colors:",
        colorTags,
        "and collections:",
        collectionTags
      );
    } else if (mode === "color") {
      console.log(
        "Searching colors with colors:",
        colorTags,
        "and collections:",
        collectionTags
      );
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-background text-foreground overflow-hidden">
      {/* Sticky Header */}
      <header className="h-18 bg-background text-primary-foreground p-4 flex items-center justify-between shrink-0 sticky top-0 z-50 border-b border-border">
        <div className="w-40 p-1 flex justify-center items-center">
          <img
            src={logo}
            alt="Logo"
            className="cursor-pointer aspect-[4/1] object-cover "
            onClick={() => navigate("/")}
          />
        </div>
        <div className="w-1/2 flex items-center gap-2">
          <SearchInput onSearch={handleSearch} />
        </div>
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

      {/* Main Container with Sidebar and Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Sticky Sidebar */}
        <aside className="bg-card w-48 shrink-0 flex flex-col overflow-y-auto">
          {/* Menu Items - Scrollable */}
          <SidebarNav navigator={navigate} />
          {/* User Profile - Fixed at Bottom */}
          <div className="border-t border-border p-4 shrink-0">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/path/to/avatar.jpg" alt="User Avatar" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  UN
                </AvatarFallback>
              </Avatar>
              <div className="flex-grow min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  Username
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  user@example.com
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto bg-muted">
          <div className="p-6">
            {/* Outlet renders nested routes */}
            <Outlet />
          </div>

          {/* Footer */}
          <footer className="bg-card text-center p-4 shrink-0 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © 2024 Minecol. All rights reserved.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
