import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

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
