import { GetStaticProps, GetStaticPropsResult } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Layout, { siteTitle } from "../../components/layout";

const Lab: React.FC = (): React.ReactElement => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p>
          <Link href="/lab/form/contact">
            <a>form/contact</a>
          </Link>
        </p>
        <p>
          <Link href="/lab/game/tictactoe">
            <a>game/tictactoe</a>
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default Lab;
