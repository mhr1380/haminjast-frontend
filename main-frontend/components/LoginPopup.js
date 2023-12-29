import classes from "./LoginPopup.module.css";
import Image from "next/image";
import userIcon from "../assets/icons/user.png";
import leftdots from "../assets/images/leftdots.png";
import nine_dots from "../assets/images/ninedots.png";
import googleIcon from "../assets/icons/google.png";
import axios from "axios";
import { toast } from "react-toastify";
import { setCookie, getCookie } from "cookies-next";
import { useState, useRef } from "react";
import useOnClickOutside from "../hooks/useOutside";
import { useTimer } from "react-timer-hook";
import { useAuth } from "../context/AuthProvider";
import { ApiUrl, FrontEndUrl, http } from "../http-services/http";
const LoginPopup = () => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const { auth, setAuth } = useAuth();
  const loginBoxRef = useRef();
  const [disable, setDisable] = useState(false);
  const [showSendCode, setShowSendCode] = useState(true);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 119);
  const Otp_timer = useTimer({
    expiryTimestamp: time,
    autoStart: false,
    onExpire: () => {
      setShowSendCode(true);
      setDisable(false);
    },
  });
  useOnClickOutside(loginBoxRef, () => {
    setAuth({ ...auth, showLoginPopup: false });
  });

  return (
    <>
      <div className={classes.background}>
        <div className={classes.popup_container} ref={loginBoxRef}>
          <div className={classes.title_container}>
            <div className={classes.title_right}>
              <Image alt="usericon" src={userIcon} width="32" height="32" />
              <h1>ورود</h1>
            </div>
            <Image alt="dots" src={leftdots} width="200" />
          </div>
          <p className={classes.under_title}>برای ادامه وارد سایت شو</p>
          <div className={classes.inputs_container}>
            <input
              className={classes.email_input}
              placeholder="ایمیل یا شماره موبایل"
              value={username}
              disabled={disable}
              onChange={(e) => {
                if (not_persian(e.target.value)) {
                  setUsername(e.target.value);
                }
              }}
            />
            <div className={classes.code_input_container}>
              <input
                className={classes.code_input}
                placeholder="کد تایید"
                value={otp}
                onChange={(e) => {
                  if (e.target.value.length < 7) {
                    setOtp(e.target.value);
                  }
                }}
                type="number"
              />
              <button
                className={classes.code_button}
                onClick={() =>
                  sendOtpHandler(
                    username,
                    updateTime,
                    Otp_timer,
                    setShowSendCode,
                    setDisable
                  )
                }
              >
                {showSendCode
                  ? "ارسال"
                  : Otp_timer.minutes + ":" + Otp_timer.seconds}
              </button>
            </div>
          </div>
          <div className={classes.mid_dots}>
            <Image alt="dots" src={nine_dots} width="70" />
          </div>
          <div className={classes.buttons_container}>
            <button
              className={classes.login_button}
              onClick={() => onVerifyHandler(otp, username, setAuth)}
              data-testid="loginbtn"
            >
              ورود
            </button>
            <a
              className={classes.gLogin_button}
              href={`${ApiUrl}/api/v1/users/auth/google/login/?redirect_uri=${FrontEndUrl}/glogin`}
            >
              <Image
                src={googleIcon}
                width="24"
                height="24"
                className={classes.google_icon}
                alt="dots"
              />
              ورود با گوگل
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPopup;

const not_persian = (char) => {
  var p = /^[\u0600-\u06FF\s]+$/;
  if (!p.test(char)) {
    return true;
  } else {
    return false;
  }
};
const updateTime = (Otp_timer) => {
  const timer = new Date();
  timer.setSeconds(timer.getSeconds() + 119);
  Otp_timer.restart(timer);
};

const sendOtpHandler = async (
  username,
  updateTime,
  Otp_timer,
  setShowSendCode,
  setDisable
) => {
  try {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(username)) {
      await http.post("/api/v1/users/auth/otp/send", {
        username,
      });
      updateTime(Otp_timer);
      setShowSendCode(false);
      toast.success("کد با موفقیت ارسال شد");

      setDisable(true);
    } else {
      const regex = new RegExp("^(\\+98|0)?9\\d{9}$");
      if (regex.test(username)) {
        await http.post("/api/v1/users/auth/otp/send", {
          username,
        });
        toast.success("کد با موفقیت ارسال شد");
        updateTime(Otp_timer);
        setShowSendCode(false);
        setDisable(true);
      } else {
        toast.error("لطفا یک ایمیل یا شماره موبایل معتبر وارد کنید");
      }
    }
  } catch (error) {
    console.log(error);
    toast.error("مشکلی در اتصال به بکند پیش آمده است");
  }
};

const onVerifyHandler = async (otp, username, setAuth) => {
  if (otp.length !== 6) {
    toast.error("کد وارد شده اشتباه است");
  } else {
    try {
      const response = await http.post("/api/v1/users/auth/otp/login", {
        username,
        otp,
      });
      setAuth({
        token: response.data.token,
        showLoginPopup: false,
      });
      setCookie("token", response.data.token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      });
      console.log(response.data);
      toast.success("با موفقیت وارد شدید");
      console.log(response.data);
    } catch (error) {
      if (error?.response?.data?.error?.includes("invalid")) {
        toast.error("کد وارد شده اشتباه است");
      } else if (error?.response?.data?.error?.includes("redis")) {
        toast.error("کد منقضی شده است ، مجدد تلاش کنید");
      } else {
        toast.error("مشکلی در اتصال به بکند پیش آمده است");
      }
    }
  }
};
