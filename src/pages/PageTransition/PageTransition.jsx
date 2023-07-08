import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useResolvedPath } from "react-router-dom";

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(false);
    }, 0);

    return () => {
      clearTimeout(timeout);
    }; // Clear the timeout on unmount
  }, []);

  const resolvedPath = useResolvedPath(location.pathname);

  return (
    <div className={`page-transition ${animate ? "animate" : ""}`}>
      <Outlet />
      {children}
    </div>
  );
};

export default PageTransition;
