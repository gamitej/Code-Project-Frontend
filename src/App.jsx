import { Suspense, useEffect } from "react";
import "./App.css";
// comp
import Navbar from "./pages/Navbar/Navbar";
// mui
import BasicRouter from "./routes/BasicRouter";
import { Backdrop, CircularProgress } from "@mui/material";
// libs
import { Toaster } from "react-hot-toast";
// store
import { useGlobal } from "./store/global/useGlobal";
import Sidebar from "./pages/Sidebar/Sidebar";

function App() {
  const { darkMode, setDarkMode } = useGlobal();

  // ================= EVENT-HANDLERS =================

  const handleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("darkMode", newDarkMode.toString());
  };

  // ================= USE-EFFECT =================

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      const parsedDarkMode = savedDarkMode === "true";
      setDarkMode(parsedDarkMode);
      document.documentElement.classList.toggle("dark", parsedDarkMode);
    }
  }, []);

  /**
   * JSX
   */

  return (
    <div className="dark:bg-slate-800">
      <Toaster position="top-center" reverseOrder={false} limit={1} />
      {/* Navbar */}
      <Navbar handleDarkMode={handleDarkMode} />
      <Sidebar />
      {/* Routes */}
      <Suspense fallback={<Loading />}>
        <BasicRouter />
      </Suspense>
    </div>
  );
}

const Loading = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default App;
