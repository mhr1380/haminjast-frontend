import classes from "./Header.module.css";
import leftdots from "../assets/images/leftdots.png";
import Image from "next/image";
import { useRef, useState } from "react";
import LoginPopup from "../components/LoginPopup";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-toastify";
const Header = () => {
  const { auth, setAuth } = useAuth();
  return (
    <>
      {auth?.showLoginPopup && <LoginPopup />}
      <div className={classes.container}>
        <div className={classes.title_container}>
          <h1 className={classes.subheader}>دنبالش نگرد...</h1>
          <h2 className={classes.header_title}>همینجاست</h2>
        </div>
        <ul className={classes.nav_menu}>
          <Link href="/posters">
            <li>آگهی ها</li>
          </Link>
          <li>پیشنهادات شما</li>
          <li>درباره ما</li>
        </ul>
        <div className={classes.dots}>
          <Image src={leftdots} width="250" />
        </div>
        {auth?.token ? (
          <button
            className={classes.button}
            onClick={() => {
              setAuth({});
              setCookie("token", "");
              toast.success(
                <>
                  با موفقیت <span style={{ color: "#e74c3c" }}>خارج</span> شدید
                </>
              );
            }}
          >
            خروج
          </button>
        ) : (
          <button
            className={classes.button}
            onClick={() => {
              setAuth({ ...auth, showLoginPopup: true });
            }}
          >
            ورود
          </button>
        )}
      </div>
    </>
  );
};

export default Header;
