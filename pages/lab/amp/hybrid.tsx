import { useAmp } from "next/amp";
export const config = {
  amp: "hybrid",
};

const Hybrid = () => {
  const isAmp = useAmp();
  return <div>page: {isAmp ? "amp" : "normal"}</div>;
};

export default Hybrid;
