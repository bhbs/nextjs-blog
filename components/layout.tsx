import Head from "next/head";
import Link from "next/link";
import React, { useContext } from "react";
import { pagesPath, staticPath } from "../lib/$path";
import { existsGaId, GA_ID } from "../lib/gtag";
import { GlobalContext } from "../pages/_app";

type Props = {
  children: React.ReactNode;
  home?: boolean;
};

const Layout: React.FC<Props> = ({
  children,
  home,
}: Props): React.ReactElement => {
  const { global, setGlobal } = useContext(GlobalContext);
  return (
    <div>
      <Head>
        <link rel="icon" href={staticPath.favicon_ico} />
        <meta name="description" content="diary" />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            "👀"
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content="👀" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Google Analytics */}
        {existsGaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
              }}
            />
          </>
        )}
      </Head>
      <header>
        <Link href={pagesPath.$url()}>
          <a>Blog</a>
        </Link>
        <Link href={pagesPath.lab.$url()}>
          <a>Lab</a>
        </Link>
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href={pagesPath.$url()}>
            <a>← Back to home</a>
          </Link>
        </div>
      )}
      <footer>
        <p>
          <span>©</span>
          <span onClick={() => setGlobal(global + 1)}> {2021 + global} </span>
          <span>taisei mima</span>
        </p>
      </footer>
    </div>
  );
};

export default Layout;
