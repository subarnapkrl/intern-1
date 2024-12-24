import "../styles/globals.css";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { ToastContainer } from "react-toastify";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />;
    </>
  );
};
export default trpc.withTRPC(MyApp);
