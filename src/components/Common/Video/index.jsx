import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useInView } from "react-intersection-observer";
import Hls from "hls.js";

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
  const hlsRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% visible
    triggerOnce: false // Ensure it triggers multiple times
  });

  const [hasLoaded, setHasLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !playbackId) return;

    // Initialize video source when in view for the first time
    if (inView && !hasLoaded) {
      const videoSrc = `https://stream.mux.com/${playbackId}.m3u8`;

      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoSrc;
      } else if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        hlsRef.current = hls;
      }
      setHasLoaded(true);
    }

    // Handle playback
    if (inView) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (error.name !== "AbortError") {
            console.log("Playback failed:", error);
          }
        });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [inView, hasLoaded, playbackId]);

  // Cleanup HLS on unmount
  useEffect(() => {
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, []);

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

        <video
          ref={videoRef}
          muted={muted}
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
