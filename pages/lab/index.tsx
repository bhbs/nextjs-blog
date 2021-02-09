import Head from "next/head";
import Link from "next/link";
import React from "react";
import Layout, { siteTitle } from "../../components/layout";
import { pagesPath } from "../../lib/$path";

const Lab: React.FC = (): React.ReactElement => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p>
          <Link href={pagesPath.lab.form.contact.$url()}>
            <a>form/contact</a>
          </Link>
        </p>
        <p>
          <Link href={pagesPath.lab.game.tictactoe.$url()}>
            <a>game/tictactoe</a>
          </Link>
        </p>
        <p>
          <Link href={pagesPath.lab.game.reversi.$url()}>
            <a>game/reversi</a>
          </Link>
        </p>
        <p>
          <Link href={pagesPath.lab.apps.aspect.$url()}>
            <a>apps/aspect</a>
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default Lab;
