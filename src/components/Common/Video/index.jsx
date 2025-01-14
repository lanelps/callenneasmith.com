import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useInView } from "react-intersection-observer";

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
  display: block;
  object-fit: contain;
  width: 100%;
  height: 100%;
  transition: opacity 1s;
`;

const Video = ({ publicId, className, muted = true, videoStyle }) => {
  const videoRef = useRef(null);
  const { ref, inView } = useInView({ threshold: 1 });

  const src = generateCloudinaryVideoURL(publicId);

  useEffect(() => {
    if (inView && videoRef.current) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [inView]);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    if (muted) {
      // open bug since 2017 that you cannot set muted in video element https://github.com/facebook/react/issues/10389
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
    }
  }, [publicId, muted]);

  return (
    <Container className={className} ref={ref}>
      <VideoElement ref={videoRef} loop style={videoStyle}>
        <source src={src} type="video/mp4" />
        Sorry, your browser doesn&#39;t support embedded videos.
      </VideoElement>
    </Container>
  );
};

export default Video;
