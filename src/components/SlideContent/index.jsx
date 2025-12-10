// SlideContent.jsx
import React, { memo } from "react";
import { css } from "@emotion/react";
import { Image, Video } from "~components";
import { breakpoint } from "~utils/css";

const SlideContent = memo(({ slide }) => {
  const commonStyles = css`
    width: 100%;
    height: max-content;

    img,
    video {
      object-fit: contain !important;
      object-position: top right !important;
    }

    ${breakpoint("tablet")} {
      height: 100%;

      img,
      video {
        object-fit: cover !important;
        object-position: center center !important;
      }
    }
  `;

  if (slide?._type === "mux.video") {
    return (
      <Video
        css={commonStyles}
        playbackId={slide?._rawAsset?.playbackId}
        aspectRatio={slide?._rawAsset?.data?.aspect_ratio.replace(":", "/")}
        blurData={slide?.asset?.blurData}
      />
    );
  }

  return (
    <Image
      css={commonStyles}
      image={slide}
      // imgStyle={{ objectPosition: "top right", objectFit: "contain" }}
      alt={slide?.altText}
      contain
    />
  );
});

export default SlideContent;
