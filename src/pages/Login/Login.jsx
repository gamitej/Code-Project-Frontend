import { Navigate } from "react-router-dom";
import login from "../../assests/bg.jpg";
import { useLogin } from "../../store/login/useLogin";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";

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
      <Helmet>
      <meta property="og:title" content="Codder ©️" />
        <meta property="og:description" content="Learn, Grow with coding Problems" />
        <meta property="og:image" content="https://github-production-user-asset-6210df.s3.amazonaws.com/48323127/253534897-b0e9a27c-a4de-4ff2-b807-50797167c0a6.png" />
        <meta property="og:url" content="https:/codder.vercel.app" />
    </Helmet>
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
