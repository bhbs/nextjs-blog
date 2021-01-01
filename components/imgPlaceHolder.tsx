const ImgPlaceHolder = ({
  aspectRatio,
  src,
  alt,
}: {
  aspectRatio: number;
  src: string;
  alt: string;
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
      <img
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
        }}
        src={src}
        alt={alt}
      />
    </div>
  );
};

export default ImgPlaceHolder;
