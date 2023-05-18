import { type AppType } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      {/* <Navbar /> */}
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </>
  );
};

export default api.withTRPC(MyApp);
