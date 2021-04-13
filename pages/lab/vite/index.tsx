import React from "react";
import Layout from "../../../components/layout";

const Vite: React.FC = (): React.ReactElement => {
  return (
    <Layout>
      <script type="module" src="http://localhost:3000/@vite/client"></script>
      <script type="module" src="http://localhost:3000/main.js"></script>
      <h1>⚡️</h1>
    </Layout>
  );
};

export default Vite;
