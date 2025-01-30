// SlideContent.jsx
import React, { memo } from "react";
import { css } from "@emotion/react";
import { Image, Video } from "~components";

const SlideContent = memo(({ slide }) => {
  const commonStyles = css`
    width: 100%;
    height: 100%;
    object-position: top right;
    object-fit: contain;
  `;

  if (slide?._type === "mux.video") {
    return (
      <Video
        css={commonStyles}
        aspectRatio={slide?._rawAsset?.data?.aspect_ratio.replace(":", "/")}
        playbackId={slide?._rawAsset?.playbackId}
      />
    );
  }

  return (
    <Image
      css={commonStyles}
      image={slide}
      imgStyle={{ objectPosition: "top right", objectFit: "contain" }}
      alt={slide?.altText}
      contain
    />
  );
});

export default SlideContent;
