// import "../../styles/Home.module.css";

import Sidebar from "../Common/Sidebar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Layout({ children }) {
  const route = useRouter();
  const user = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    if (!user) {
      route.push("/Login/Login");
    }
  }, []);

  if (!user) {
    return false;
  }
  return (
    <>
      <div
        style={{
          minWidth: "100vh",
          display: "flex",
        }}
      >
        <Sidebar />
        <div
          className="p-4   w-100 mw-100"
          style={{
            backgroundImage: `url("/images/background_brighter.png")`,
          }}
        >
          {children}
          <br />
        </div>
      </div>
    </>
  );
}
