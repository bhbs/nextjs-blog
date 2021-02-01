import { AppProps, NextRouter } from "next/dist/next-server/lib/router/router";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import * as gtag from "../lib/gtag";
import "../styles/global.scss";

export const GlobalContext = createContext(
  {} as {
    global: number;
    setGlobal: React.Dispatch<React.SetStateAction<number>>;
  }
);

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router: NextRouter = useRouter();

  const [global, setGlobal] = useState(0);

  useEffect(() => {
    if (!gtag.existsGaId) return;

    const handleRouteChange = (path: string): void => {
      gtag.pageview(path);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <GlobalContext.Provider value={{ global, setGlobal }}>
      <Component {...pageProps} />
    </GlobalContext.Provider>
  );
};

export default App;
