import { ThemeToggle } from "../atoms/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";
import type { FC } from "react";

export const ThemeTestPage: FC = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen p-8 bg-background transition-colors">
      {/* Fixed Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Theme Status */}
      <div className="mb-8 p-4 bg-muted rounded-lg">
        <h2 className="text-2xl font-bold mb-2 text-foreground">
          Theme Test Page
        </h2>
        <p className="text-muted-foreground">
          Current theme:{" "}
          <strong className="text-primary">{theme}</strong>
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          HTML class:{" "}
          <code className="bg-secondary text-secondary-foreground px-2 py-1 rounded">
            {document.documentElement.className}
          </code>
        </p>
      </div>

      {/* Color Swatches - Using Semantic Tokens */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="w-full h-20 bg-primary rounded mb-2"></div>
          <p className="text-sm text-card-foreground">
            Primary
          </p>
        </div>
        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="w-full h-20 bg-destructive rounded mb-2"></div>
          <p className="text-sm text-card-foreground">Destructive</p>
        </div>
        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="w-full h-20 bg-success rounded mb-2"></div>
          <p className="text-sm text-card-foreground">
            Success
          </p>
        </div>
        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="w-full h-20 bg-muted rounded mb-2"></div>
          <p className="text-sm text-card-foreground">
            Muted
          </p>
        </div>
        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="w-full h-20 bg-accent rounded mb-2"></div>
          <p className="text-sm text-card-foreground">
            Accent
          </p>
        </div>
        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="w-full h-20 bg-warning rounded mb-2"></div>
          <p className="text-sm text-card-foreground">
            Warning
          </p>
        </div>
        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="w-full h-20 bg-info rounded mb-2"></div>
          <p className="text-sm text-card-foreground">
            Info
          </p>
        </div>
      </div>

      {/* Typography Test */}
      <div className="mb-8 p-6 bg-card rounded-lg shadow-md border border-border">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          Heading 1
        </h1>
        <h2 className="text-3xl font-bold mb-4 text-foreground">
          Heading 2
        </h2>
        <h3 className="text-2xl font-bold mb-4 text-foreground">
          Heading 3
        </h3>
        <p className="text-muted-foreground mb-4">
          This is a paragraph text. It should be readable in both light and dark
          modes. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <p className="text-sm text-muted-foreground">
          This is smaller text for captions or meta information.
        </p>
      </div>

      {/* Form Elements Test */}
      <div className="mb-8 p-6 bg-card rounded-lg shadow-md border border-border">
        <h3 className="text-xl font-bold mb-4 text-foreground">
          Form Elements
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Text Input
            </label>
            <input
              type="text"
              placeholder="Type something..."
              className="w-full px-3 py-2 border border-input rounded-md bg-input text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Textarea
            </label>
            <textarea
              placeholder="Type something..."
              rows={3}
              className="w-full px-3 py-2 border border-input rounded-md bg-input text-foreground"
            />
          </div>
          <div>
            <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors">
              Primary Button
            </button>
          </div>
        </div>
      </div>

      {/* Border Test */}
      <div className="p-6 border-2 border-border rounded-lg">
        <p className="text-foreground">
          This box has a border that should change color in dark mode.
        </p>
      </div>
    </div>
  );
};
