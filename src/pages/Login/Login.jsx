import { Navigate } from "react-router-dom";
import login from "../../assests/bg.jpg";
import { useLogin } from "../../store/login/useLogin";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const Login = () => {
  const { isLoggined, loading } = useLogin();

  useEffect(() => {
    let timer;

    if (loading) {
      timer = setTimeout(() => {
        toast(
          (t) => (
            <span className="w-full">
              Login is taking longer than 4 seconds 😞.
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
    return <Navigate to="/" replace />;
  }

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
