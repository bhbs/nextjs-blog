import Head from "next/head";

export const config = {
  amp: true,
};

const Normal = () => {
  return (
    <>
      <Head>
        <script
          async
          custom-element="amp-story"
          src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
        ></script>
      </Head>
      <amp-story
        standalone="standalone"
        title="Stories in AMP - Hello World"
        publisher="AMP Project"
        publisher-logo-src="https://amp.dev/favicons/coast-228x228.png"
        poster-portrait-src="https://amp.dev/static/samples/img/story_dog2_portrait.jpg"
        poster-square-src="https://amp.dev/static/samples/img/story_dog2_square.jpg"
        poster-landscape-src="https://amp.dev/static/samples/img/story_dog2_landscape.jpg"
      >
        <amp-story-page id="page-1">
          <amp-story-grid-layer template="fill">
            <amp-img
              src="https://amp.dev/static/samples/img/story_dog2.jpg"
              width="720"
              height="1280"
              layout="responsive"
            ></amp-img>
          </amp-story-grid-layer>
          <amp-story-grid-layer template="vertical">
            <h1>This is an AMP Story.</h1>
            <h2>This is an AMP Story.</h2>
            <h3>This is an AMP Story.</h3>
            <h4>This is an AMP Story.</h4>
            <h5>This is an AMP Story.</h5>
          </amp-story-grid-layer>
        </amp-story-page>
        <amp-story-page id="page-2">
          <amp-story-grid-layer template="fill">
            <amp-video
              autoplay="autoplay"
              loop="loop"
              width="720"
              height="960"
              poster="https://amp.dev/static/samples/img/story_video_dog_cover.jpg"
              layout="responsive"
            >
              <source
                src="https://amp.dev/static/samples/video/story_video_dog.mp4"
                type="video/mp4"
              />
            </amp-video>
          </amp-story-grid-layer>
        </amp-story-page>
        <amp-story-page id="animation-demo">
          <amp-story-grid-layer template="fill">
            <amp-img
              src="https://amp.dev/static/samples/img/story_dog4.jpg"
              animate-in="fly-in-top"
              width="720"
              height="1280"
              layout="responsive"
            ></amp-img>
          </amp-story-grid-layer>
          <amp-story-grid-layer template="thirds">
            <h2
              animate-in="fly-in-bottom"
              grid-area="lower-third"
              animate-in-delay="1s"
              style={{ color: "white", textAlign: "center" }}
            >
              Best walk ever!
            </h2>
          </amp-story-grid-layer>
        </amp-story-page>
        <amp-story-page id="layout-demo">
          <amp-story-grid-layer template="thirds" style={{ padding: "0" }}>
            <amp-img
              grid-area="upper-third"
              src="https://amp.dev/static/samples/img/story_thirds_1.jpg"
              width="320"
              height="240"
              layout="fixed"
            ></amp-img>
            <amp-img
              grid-area="middle-third"
              src="https://amp.dev/static/samples/img/story_thirds_2.jpg"
              width="320"
              height="240"
              layout="fixed"
            ></amp-img>
            <amp-img
              grid-area="lower-third"
              src="https://amp.dev/static/samples/img/story_thirds_3.jpg"
              width="320"
              height="240"
              layout="fixed"
            ></amp-img>
          </amp-story-grid-layer>
        </amp-story-page>
        <amp-story-bookend
          src="https://amp.dev/static/samples/json/bookend.json"
          layout="nodisplay"
        ></amp-story-bookend>
      </amp-story>
    </>
  );
};

export default Normal;
