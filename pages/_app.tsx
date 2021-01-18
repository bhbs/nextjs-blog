import { AppProps, NextRouter } from "next/dist/next-server/lib/router/router";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import * as gtag from "../lib/gtag";
import "../styles/global.scss";

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router: NextRouter = useRouter();

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

  return <Component {...pageProps} />;
};

export default App;
