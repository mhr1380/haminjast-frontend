import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "../context/AuthProvider";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer></ToastContainer>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
