import Head from "next/head";
import React, { useEffect, useState } from "react";
import Layout from "components/layout";

const Lab: React.FC = (): React.ReactElement => {
  const [result, setResult] = useState([0, 0]);
  const [heightUnit, setHeightUnit] = useState(0);
  const [widthUnit, setWidthUnit] = useState(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const result =
      height / heightUnit > width / widthUnit
        ? [width * (heightUnit / widthUnit), width]
        : [height, height * (widthUnit / heightUnit)];
    setResult(result);
  }, [height, width]);

  return (
    <Layout>
      <Head>
        <title>Aspect ratio calculator</title>
      </Head>
      <section>
        <p>
          <input
            type="number"
            placeholder="heightUnit"
            onChange={(e) => {
              const valnum = parseInt(e.target.value);
              setHeightUnit(valnum);
            }}
          />
          :
          <input
            type="number"
            placeholder="widthUnit"
            onChange={(e) => {
              const valnum = parseInt(e.target.value);
              setWidthUnit(valnum);
            }}
          />
        </p>
        <p>
          <input
            type="number"
            placeholder="height"
            onChange={(e) => {
              const valnum = parseInt(e.target.value);
              setHeight(valnum);
            }}
          />
          :
          <input
            type="number"
            placeholder="width"
            onChange={(e) => {
              const valnum = parseInt(e.target.value);
              setWidth(valnum);
            }}
          />
        </p>
        <div>height : width</div>
        <div>
          {result[0]} : {result[1]}
        </div>
      </section>
    </Layout>
  );
};

export default Lab;
