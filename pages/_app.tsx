import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { AuthContextProvider } from "../context/AuthContext";
import { Provider } from "react-redux";
import { store } from "./../redux/app/store";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AuthContextProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AuthContextProvider>
  );
}

export default MyApp;
