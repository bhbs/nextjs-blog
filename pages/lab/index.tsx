import Link from "next/link";
import React from "react";
import Layout from "components/layout";
import { pagesPath } from "lib/$path";

const Lab: React.FC = (): React.ReactElement => {
  return (
    <Layout>
      <ul>
        <li>
          <Link href={pagesPath.lab.form.contact.$url()}>
            <a>form/contact</a>
          </Link>
        </li>
        <li>
          <Link href={pagesPath.lab.game.tictactoe.$url()}>
            <a>game/tictactoe</a>
          </Link>
        </li>
        <li>
          <Link href={pagesPath.lab.game.reversi.$url()}>
            <a>game/reversi</a>
          </Link>
        </li>
        <li>
          <Link href={pagesPath.lab.apps.aspect.$url()}>
            <a>apps/aspect</a>
          </Link>
        </li>
      </ul>
    </Layout>
  );
};

export default Lab;
