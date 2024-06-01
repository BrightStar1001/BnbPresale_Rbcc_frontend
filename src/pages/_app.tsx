import Noise from "@/layout/noise";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
          <Noise />
          <Component {...pageProps} />
          <ToastContainer autoClose={3000} draggableDirection="x" />
    </>
  );
}

export default MyApp;