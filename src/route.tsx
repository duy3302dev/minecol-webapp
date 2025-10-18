import { useEffect, useState } from "react";
import MainLayout from "./components/templates/layout";
import { Layout404Page } from "./components/templates/404";
import { PalettePage } from "./pages/palette.page";

// Extend routes type để hỗ trợ guard
interface Route {
  path: string;
  layout?: React.ComponentType<any>;
  name: string;
  Component: React.ComponentType<any>;
  guard?: () => boolean | Promise<boolean>;
}

export const routes: Route[] = [
  {
    path: "/",
    layout: MainLayout,
    name: "Home",
    Component: PalettePage,
    guard: () => true,
  },
  {
    path: "/colors",
    layout: MainLayout,
    name: "Colors",
    Component: () => <h1>Colors Page</h1>,
  },
  {
    path: "/users",
    layout: MainLayout,
    name: "Users",
    Component: () => <h1>Users Page</h1>,
    guard: async () => true,
  },
];

// Fallback component (404)
const FallbackComponent: React.FC = () => <Layout404Page />;

// Default layout nếu route thiếu
const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="default-layout">{children}</div>;

export const PageRoutes: React.FC<{ currentPath: string }> = ({
  currentPath,
}) => {
  // Nhận currentPath từ parent/app (hoặc dùng window.location)
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const matchRoute = async () => {
      setIsLoading(true);
      setError(null);

      const route = routes.find((r) => r.path === currentPath) || null;
      if (!route) {
        setCurrentRoute(null);
        setIsLoading(false);
        return;
      }

      // Check guard nếu có
      if (route.guard) {
        try {
          const canAccess = await route.guard();
          if (!canAccess) {
            setError("Access denied"); // Hoặc redirect login
            setIsLoading(false);
            return;
          }
        } catch (err) {
          setError("Guard error");
          setIsLoading(false);
          return;
        }
      }

      setCurrentRoute(route);
      setIsLoading(false);
    };

    matchRoute();
  }, [currentPath]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const LayoutComponent = currentRoute?.layout || DefaultLayout;
  const Component = currentRoute?.Component || FallbackComponent;

  return (
    <LayoutComponent>
      <Component />
    </LayoutComponent>
  );
};
