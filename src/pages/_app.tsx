import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react"
import type { AppProps, AppType } from 'next/app'

import { api } from "@/utils/api";

import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { Sidebar } from "lucide-react";
import SidebarComponent from "@/components/Sidebar";

const MyApp: AppType = ({ Component, pageProps: {...pageProps} }: AppProps) => {
  return (
    <>
     <SessionProvider>
      <Component {...pageProps} />
      <ReactQueryDevtools />
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
