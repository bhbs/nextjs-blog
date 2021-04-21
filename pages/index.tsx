import { GetStaticProps, GetStaticPropsResult } from "next";
import Link from "next/link";
import React from "react";
import Date from "components/date";
import Layout from "components/layout";
import { pagesPath } from "lib/$path";
import { AllPostsData, getSortedPostsData } from "lib/posts";

type Props = {
  allPostsData: AllPostsData;
};

const Home: React.FC<Props> = ({ allPostsData }: Props): React.ReactElement => {
  return (
    <Layout home>
      <section>
        <h2>Blog</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={pagesPath.posts._id(id).$url()}>
                <a>{title}</a>
              </Link>
              <br />
              <small>
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
