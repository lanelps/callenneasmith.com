import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useInView } from "react-intersection-observer";
import MuxVideo from "@mux/mux-video-react";

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

  video {
    max-height: 100%;
    max-width: 100%;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: top right;
    aspect-ratio: ${({ aspectRatio }) => aspectRatio};
  }
`;

const Video = ({ playbackId, className, muted = true, aspectRatio }) => {
  const videoRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% visible
    triggerOnce: false // Ensure it triggers multiple times
  });

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Reset video to beginning when it comes into view
    if (inView) {
      videoElement.currentTime = 0;
      // Use play().catch to handle autoplay policy restrictions
      videoElement.play().catch((error) => {
        console.log("Playback failed:", error);
      });
    } else {
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
        <MuxVideo
          ref={videoRef}
          playbackId={playbackId}
          controls={false}
          autoPlay={false} // Disable autoPlay
          muted={muted}
          preload="metadata" // Only preload metadata
          loop
        />
      </Wrapper>
    </Container>
  );
};

export default Video;
