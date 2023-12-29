import { createContext, useState, useEffect, useContext } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
export const MyContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ showLoginPopup: false });

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      setAuth({ token });
    } else {
      setAuth({});
    }
  }, []);

  return (
    <MyContext.Provider value={{ auth, setAuth }}>
      {children}
    </MyContext.Provider>
  );
};
export default AuthProvider;

export const useAuth = () => {
  const { auth, setAuth } = useContext(MyContext);
  return { auth, setAuth };
};
