import React from "react";
import { useAmp } from "next/amp";
export const config = {
  amp: "hybrid",
};

const Hybrid: React.FC = (): React.ReactElement => {
  const isAmp = useAmp();
  return <div>page: {isAmp ? "amp" : "normal"}</div>;
};

export default Hybrid;
