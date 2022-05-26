import "./App.css";
import { useAuth } from "./hooks/useAuth";
import MainPage from "./Pages/MainPage";
import LoginPage from "./Pages/LoginPage";
import ResponsiveAppBar from "./components/ResponsiveAppBar/ResponsiveAppBar";
import DataFetch from "./components/DataFetch";

function App() {
  const { user } = useAuth();

  return (
    <>
      <ResponsiveAppBar />

      <div className="App">{user ? <MainPage /> : <LoginPage />}</div>
    </>
  );
}

export default App;
