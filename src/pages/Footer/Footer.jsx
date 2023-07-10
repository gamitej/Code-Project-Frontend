import React from "react";

const Footer = () => {
  return (
    <div className="bottom-footer h-[5rem]">
      <div className="flex flex-col justify-center items-center gap-y-2">
        <p className="underline hover:text-red-300 text-white">
          <a
            target="_blank"
            href="https://github.com/gamitej"
            style={{ textDecoration: "none" }}
          >
            ©2023 Code, Designed & Developed By Amitej Pratap Singh
          </a>
        </p>
        <p>
          "This website is for demonstration purposes only and not intended for
          commercial use."
        </p>
      </div>
    </div>
  );
};

export default Footer;
