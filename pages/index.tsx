import { GetStaticProps, GetStaticPropsResult } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Date from "../components/date";
import ImgPlaceHolder from "../components/imgPlaceHolder";
import Layout, { siteTitle } from "../components/layout";
import { AllPostsData, getSortedPostsData } from "../lib/posts";
import utilStyles from "../styles/utils.module.scss";

type Props = {
  allPostsData: AllPostsData;
};

const Home: React.FC<Props> = ({ allPostsData }: Props): React.ReactElement => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p style={{ textAlign: "center" }}>Write Code Every Day</p>
        <ImgPlaceHolder aspectRatio={155 / 870}>
          <Image
            width={870}
            height={155}
            src="https://grass-graph.moshimo.works/images/bhbs.png"
            alt="GitHub grasses"
          ></Image>
        </ImgPlaceHolder>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<{ allPostsData: AllPostsData }>
> => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default Home;
