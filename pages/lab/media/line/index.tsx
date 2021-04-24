import React, { ReactElement } from "react";
import Layout from "components/layout";
import styles from "./index.module.scss";

const Kashiwa: React.FC = (): ReactElement => {
  return (
    <Layout>
      {[...Array(200)].map((_, i) => (
        <MovingLine key={"line_" + i} />
      ))}
    </Layout>
  );
};

const MovingLine: React.FC = (): ReactElement => {
  const transform = `translateY(${Math.random() * 1000 - 500}px)`;
  const height = Math.pow(Math.random(), 3) * 100 + "px";
  const background = "#" + Math.floor(Math.random() * 0xffffff).toString(16);

  return (
    <div
      style={{ transform, height, background }}
      className={styles.back}
    ></div>
  );
};

export default Kashiwa;
