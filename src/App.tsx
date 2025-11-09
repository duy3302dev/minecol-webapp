import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./route";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Toaster />
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
