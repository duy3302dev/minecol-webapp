import "./App.css";
import { PageRoutes } from "./route";

function App() {
  return <PageRoutes currentPath={window.location.pathname} />;
}

export default App;
