const ImgPlaceHolder = ({
  children,
  aspectRatio,
}: {
  children: React.ReactNode;
  aspectRatio: number;
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "0",
        position: "relative",
        background: "ghostwhite",
        paddingTop: 100 * aspectRatio + "%",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ImgPlaceHolder;
