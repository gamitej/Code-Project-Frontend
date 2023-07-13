import { Suspense, useEffect, useState } from "react";
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

function App() {
  const { darkMode } = useGlobal();

  useEffect(() => {
    document.documentElement.classList.toggle("dark");
  }, [darkMode]);

  return (
    <div className="dark:bg-slate-800">
      <Toaster position="top-center" reverseOrder={false} limit={1} />
      {/* Navbar */}
      <Navbar />

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
