declare namespace JSX {
  interface AmpImg {
    alt?: string;
    src?: string;
    width?: string;
    height?: string;
    layout?: string;
  }
  interface AmpCarousel {
    children?: Element[];
    width?: string;
    height?: string;
    layout?: string;
    type?: string;
    role?: string;
    // aria-label?: string;
  }
  interface IntrinsicElements {
    "amp-img": AmpImg;
    "amp-carousel": AmpCarousel;
  }
}
