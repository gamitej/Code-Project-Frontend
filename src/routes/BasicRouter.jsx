import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useLogin } from "../store/login/useLogin";
import ProtectedRoute from "../pages/Login/ProtectedRoutes";

// lazy
const Home = lazy(() => import("../pages/Home/Home"));
const Login = lazy(() => import("../pages/Login/Login"));
const Overview = lazy(() => import("../pages/Overview/Overview"));
const Profile = lazy(() => import("../pages/Profile/Profile"));

const PageNotFound = lazy(() => import("../pages/PageNotFound/PageNotFound"));

const BasicRouter = () => {
  const { isLoggined } = useLogin();

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute isAuth={isLoggined} />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore/:name" element={<Overview />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
      <Route path="/auth" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default BasicRouter;
