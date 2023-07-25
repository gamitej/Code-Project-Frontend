import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";
// img
import login from "../../assests/bg.jpg";
// comp
import Footer from "../Footer/Footer";
// store
import { useLogin } from "../../store/login/useLogin";

const Login = () => {
  const { isLoggined, loading } = useLogin();
  const { state: fromLocation } = useLocation();

  // * time-out for late api response
  useEffect(() => {
    let timer;

    if (loading) {
      timer = setTimeout(() => {
        toast(
          (t) => (
            <span className="w-full">
              Apologize for the delay, please be patient as starting the server
              may take some time.
              <button
                onClick={() => toast.dismiss(t.id)}
                className="text-blue-400 items-center"
              >
                Dismiss
              </button>
            </span>
          ),
          { duration: 10000 },
        );
      }, 4000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [loading]);

  if (isLoggined) {
    if (fromLocation) return <Navigate to={fromLocation} replace />;

    return <Navigate to="/" replace />;
  }

  /**
   * JSX
   */

  return (
    <div className="w-full h-[calc(100vh-10rem)] bg-slate-300">
      <img
        src={login}
        alt=""
        className="w-[100%]"
        loading="lazy"
        style={{
          height: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Footer />
    </div>
  );
};

export default Login;
