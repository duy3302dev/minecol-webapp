import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/templates/layout";
import { Layout404Page } from "./components/templates/404";
import { PalettePage } from "./pages/palette/palette.page";
import TestFormPage from "./pages/test-form.page";
import { ThemeTestPage } from "./components/templates/theme-test";
import { ColorPage } from "./pages/color/color.page";
import path from "path";

export const routePaths = {
  home: "/",
  palettePopular: "/palette/popular",
  paletteRandom: "/palette/random",
  paletteCollections: "/palette/collections",
  paletteGenerate: "/palette/generate",
  colorNew: "/color/new",
  colorRandom: "/color/random",
  colorCollections: "/color/collections",
  notFound: "/404",

  //Routes for testing
  testForm: "/test",
  themeTest: "/theme-test",
} as const;

const routeMap = [
  { path: routePaths.home, element: <PalettePage />, layout: <MainLayout /> },
  {
    path: routePaths.palettePopular,
    element: <PalettePage />,
    layout: <MainLayout />,
  },
  {
    path: routePaths.paletteRandom,
    element: <PalettePage />,
    layout: <MainLayout />,
  },
  {
    path: routePaths.paletteGenerate,
    element: <PalettePage />,
    layout: <MainLayout />,
  },
  {
    path: routePaths.paletteCollections,
    element: <PalettePage />,
    layout: <MainLayout />,
  },
  { path: routePaths.colorNew, element: <ColorPage />, layout: <MainLayout /> },
  {
    path: routePaths.colorRandom,
    element: <ColorPage />,
    layout: <MainLayout />,
  },
  {
    path: routePaths.colorCollections,
    element: <ColorPage />,
    layout: <MainLayout />,
  },

  // 404 route
  { path: routePaths.notFound, element: <Layout404Page /> },

  // Test routes
  { path: routePaths.testForm, element: <TestFormPage /> },
  { path: routePaths.themeTest, element: <ThemeTestPage /> },
];

// Main router component
export const AppRoutes = () => {
  return (
    <Routes>
      {/* Dynamically generate routes from routeMap */}
      {routeMap.map((route, index) => {
        if (route.layout) {
          return (
            <Route key={index} element={route.layout}>
              {routeMap.map(({ path, element }, idx) => (
                <Route key={idx} path={path} element={element} />
              ))}
            </Route>
          );
        }
        return (
          <Route key={index} path={route?.path} element={route?.element} />
        );
      })}

      {/* Catch all - redirect to 404 */}
      <Route path="*" element={<Layout404Page />} />
    </Routes>
  );
};
