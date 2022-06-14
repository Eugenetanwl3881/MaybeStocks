import "./App.css";
import { useAuth } from "./hooks/useAuth";
import MainPage from "./Pages/MainPage";
import LoginPage from "./Pages/LoginPage";

function App() {
  const { user } = useAuth();

  return (
    <>
      <div className="App">{user ? <MainPage /> : <LoginPage />}</div>
    </>
  );
}

export default App;
