import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";

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
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: opacity 1s;
`;

const Video = ({ id, src, type = `video/mp4`, className, isMuted }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (isMuted) {
      // open bug since 2017 that you cannot set muted in video element https://github.com/facebook/react/issues/10389
      ref.current.defaultMuted = true;
      ref.current.muted = true;
    }
  }, [src]);

  return (
    <Container className={className}>
      <VideoElement ref={ref} id={id} autoPlay playsInline loop>
        <source src={src} type={type} />
        Sorry, your browser doesn&#39;t support embedded videos.
      </VideoElement>
    </Container>
  );
};

export default Video;
