// SlideContent.jsx
import React from "react";
import { css } from "@emotion/react";
import { Image, Video } from "~components";

const SlideContent = ({ slide }) => {
  const commonStyles = css`
    width: 100%;
    height: 100%;
    object-position: top right;
    object-fit: contain;
  `;

  if (slide?._type === "cloudinary.asset") {
    return (
      <Video
        css={commonStyles}
        videoStyle={{
          objectPosition: "top right",
          objectFit: "contain"
        }}
        publicId={slide?.public_id}
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
};

export default SlideContent;
