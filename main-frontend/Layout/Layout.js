import LoginPopup from "../components/LoginPopup";
import { useAuth } from "../context/AuthProvider";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
