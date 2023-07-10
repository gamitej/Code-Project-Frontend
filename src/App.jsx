import { Suspense } from "react";
import "./App.css";
// comp
import Navbar from "./pages/Navbar/Navbar";

import BasicRouter from "./routes/BasicRouter";
import { Backdrop, CircularProgress } from "@mui/material";
import { Toaster } from "react-hot-toast";
import Footer from "./pages/Footer/Footer";

function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} limit={1} />
      {/* Navbar */}
      <Navbar />
      {/* Routes */}
      <Suspense fallback={<Loading />}>
        <BasicRouter />
      </Suspense>
      <Footer />
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
