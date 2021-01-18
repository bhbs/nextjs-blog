import Head from "next/head";
import React from "react";

export const config = {
  amp: true,
};

const Normal: React.FC = (): React.ReactElement => {
  return (
    <>
      <Head>
        <script
          async
          custom-element="amp-carousel"
          src="https://cdn.ampproject.org/v0/amp-carousel-0.2.js"
        ></script>
      </Head>
      <amp-carousel width="600" height="600" layout="intrinsic" type="slides">
        <amp-img src="/images/profile.jpg" width="500" height="500"></amp-img>
        <amp-img src="/images/profile.jpg" width="400" height="400"></amp-img>
        <amp-img src="/images/profile.jpg" width="300" height="300"></amp-img>
        <amp-img src="/images/profile.jpg" width="200" height="200"></amp-img>
        <amp-img src="/images/profile.jpg" width="100" height="100"></amp-img>
      </amp-carousel>
    </>
  );
};

export default Normal;
