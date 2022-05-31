import "./App.css";
import { useAuth } from "./hooks/useAuth";
import MainPage from "./Pages/MainPage";
import LoginPage from "./Pages/LoginPage";
import ResponsiveAppBar from "./components/ResponsiveAppBar/ResponsiveAppBar";
import DataFetch from "./components/DataFetch";
import HomePage from "./Pages/HomePage";


function App() {
  const { user } = useAuth();

  return (
    <>
      <div className="App">{user ? <MainPage /> : <LoginPage />}</div>
    </>
  );
}

export default App;
