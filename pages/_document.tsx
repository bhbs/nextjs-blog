import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

class D extends Document {
  render(): React.ReactElement {
    return (
      <Html lang="ja">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default D;
