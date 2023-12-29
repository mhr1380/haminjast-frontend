import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { setCookie } from "cookies-next";

const Glogin = () => {
  const router = useRouter();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    if (router.query.token) {
      setAuth({ ...auth, token: router.query.token });
      setCookie("token", router.query.token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      });

      const timer = setTimeout(() => {
        router.push("/");
        clearTimeout(timer);
      }, 2000);
    }
  }, [router.query]);
  return (
    <div style={{ fontSize: "20px", textAlign: "center", marginTop: "16px" }}>
      با موفقیت وارد شدید . در حال انتقال...
    </div>
  );
};

export default Glogin;
