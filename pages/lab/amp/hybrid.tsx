import { useAmp } from "next/amp";
import React from "react";

export const config = {
  amp: "hybrid",
};

const Hybrid: React.FC = (): React.ReactElement => {
  const isAmp = useAmp();
  return <div>page: {isAmp ? "amp" : "normal"}</div>;
};

export default Hybrid;
