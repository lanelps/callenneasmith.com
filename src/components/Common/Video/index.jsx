import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";

import { generateCloudinaryVideoURL } from "~utils/cloudinary";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  > div,
  iframe {
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: opacity 1s;
  }
`;

const VideoElement = styled.video`
  object-fit: contain;
  width: 100%;
  height: 100%;
  transition: opacity 1s;
`;

const Video = ({ publicId, className, muted = true }) => {
  const ref = useRef(null);

  const src = generateCloudinaryVideoURL(publicId);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (muted) {
      // open bug since 2017 that you cannot set muted in video element https://github.com/facebook/react/issues/10389
      ref.current.defaultMuted = true;
      ref.current.muted = true;
    }
  }, [publicId]);

  return (
    <Container className={className}>
      <VideoElement ref={ref} autoPlay playsInline loop>
        <source src={src} type="video/mp4" />
        Sorry, your browser doesn&#39;t support embedded videos.
      </VideoElement>
    </Container>
  );
};

export default Video;
