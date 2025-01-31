import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useInView } from "react-intersection-observer";
import MuxPlayer from "@mux/mux-player-react/lazy";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Wrapper = styled.figure`
  display: flex;
  align-items: start;
  justify-content: end;

  transition: opacity 1s;
  width: 100%;
  height: 100%;

  mux-player {
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    --controls: none;
    --media-object-fit: cover;
    --media-object-position: top right;
    aspect-ratio: ${({ aspectRatio }) => aspectRatio};
  }
`;

const Video = ({
  playbackId,
  className,
  muted = true,
  aspectRatio,
  lazy = true
}) => {
  const videoRef = useRef(null);
  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (inView && videoElement) {
      videoElement.play();
    } else if (videoElement) {
      videoElement.pause();
    }

    return () => {
      if (videoElement) {
        videoElement.pause();
      }
    };
  }, [inView]);

  return (
    <Container className={className} ref={ref}>
      <Wrapper aspectRatio={aspectRatio}>
        <MuxPlayer
          ref={videoRef}
          loading="viewport"
          playbackId={playbackId}
          muted={muted}
          autoPlay={!lazy}
          loop
        />
      </Wrapper>
    </Container>
  );
};

export default Video;
