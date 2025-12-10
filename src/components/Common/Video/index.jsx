import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useInView } from "react-intersection-observer";
import MuxVideo from "@mux/mux-video-react";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Wrapper = styled.figure`
  position: relative;
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
    opacity: ${({ isLoaded }) =>
      isLoaded ? 1 : 0}; /* Hide video until loaded */
    transition: opacity 0.3s ease-in;
  }
`;

const Placeholder = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: top right;
  z-index: 1;
  pointer-events: none;
  transition: opacity 0.5s ease-out;
  opacity: ${({ isLoaded }) => (isLoaded ? 0 : 1)};
`;

const Video = ({
  playbackId,
  className,
  muted = true,
  aspectRatio,
  blurData
}) => {
  const videoRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% visible
    triggerOnce: false // Ensure it triggers multiple times
  });

  const [hasLoaded, setHasLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Reset video to beginning when it comes into view
    if (inView) {
      // Load video when it comes into view for the first time
      if (!hasLoaded) {
        videoElement.load();
        setHasLoaded(true);
      }

      videoElement.currentTime = 0;
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
      <Wrapper
        aspectRatio={aspectRatio || blurData?.aspectRatio}
        isLoaded={isPlaying}
      >
        {blurData?.blurDataURL && (
          <Placeholder
            src={blurData.blurDataURL}
            alt=""
            isLoaded={isPlaying}
            aria-hidden="true"
          />
        )}

        <MuxVideo
          ref={videoRef}
          playbackId={playbackId}
          controls={false}
          autoPlay={false}
          muted={muted}
          preload="none"
          playsInline
          loop
          style={{ aspectRatio: blurData?.aspectRatio || aspectRatio }}
          onPlaying={() => setIsPlaying(true)}
        />
      </Wrapper>
    </Container>
  );
};

export default Video;
