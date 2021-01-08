import Head from "next/head";
import styles from "./layout.module.scss";
import utilStyles from "../styles/utils.module.scss";
import Link from "next/link";
import Image from "next/image";
import DarkModeSwitch from "../components/darkModeSwitch";
import { existsGaId, GA_ID } from "../lib/gtag";

const name = "taisei mima";
export const siteTitle = "mimaty blog";

const Layout = ({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="diary" />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
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
      <DarkModeSwitch />
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              src="/images/profile.jpg"
              width={200}
              height={200}
              className={`${styles.headerHomeImage} ${utilStyles.borderPaper}`}
              alt={name}
            ></Image>
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  src="/images/profile.jpg"
                  width={128}
                  height={128}
                  className={`${styles.headerHomeImage} ${utilStyles.borderPaper}`}
                  alt={name}
                ></Image>
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
      <footer className={styles.footer}>
        <p>
          source: <a href="https://github.com/bhbs/nextjs-blog">GitHub</a>
          <br />© 2021 taisei mima
        </p>
      </footer>
    </div>
  );
};

export default Layout;
