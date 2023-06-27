import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
// comp
import Navbar from "./pages/Navbar/Navbar";

import BasicRouter from "./routes/BasicRouter";
import { Backdrop, CircularProgress } from "@mui/material";

function App() {
  return (
    <div>
      <ToastContainer />
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
