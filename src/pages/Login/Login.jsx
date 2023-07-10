import { Navigate } from "react-router-dom";
import login from "../../assests/bg.jpg";
import { useLogin } from "../../store/login/useLogin";
import Footer from "../Footer/Footer";

const Login = () => {
  const { isLoggined } = useLogin();

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
