import React from "react";
import { css } from "@emotion/react";
import {
  GatsbyImage,
  getImage,
  getSrc,
  withArtDirection
} from "gatsby-plugin-image";

import { BREAKPOINTS } from "~utils/css";

const Image = ({
  className,
  image,
  alt,
  loading,
  title,
  contain,
  imgStyle
}) => {
  if (typeof image === `string`) {
    return (
      <>
        {image.startsWith(`http`) ||
          (image.startsWith(`/`) && (
            <img className={className} src={image} alt={image} />
          ))}
      </>
    );
  }

  const imageObj = getImage(image?.asset) || image;
  const src = getSrc(imageObj) || image?.asset?.url;
  const mobileImageObj = image?.mobileImage?.asset;

  if (!imageObj && !src) {
    return <></>;
  }

  let images = ``;

  // without useArtDirection, do we change srcSet properly at different breakpoints?
  // i.e. does the Sanity impl work by default, and are we interrupting it?
  //
  // before, we were using two GatsbyImage components, one for each desktop/mobile,
  // which kept Gatsby image/Sanity working by default with one another
  //
  // useArtDirection is an attempt to merge everything, which might be borking it

  if (mobileImageObj) {
    images = withArtDirection(imageObj, [
      {
        media: `(max-width: ${BREAKPOINTS.tablet})`,
        image: getImage(mobileImageObj)
      }
    ]);
  } else {
    images = imageObj;
  }

  //
  return images ? (
    <GatsbyImage
      className={className}
      loading={loading || `eager`}
      image={images}
      alt={alt || ``}
      title={title || alt || ``}
      objectFit={contain ? `contain` : `cover`}
      imgStyle={imgStyle}
    />
  ) : (
    <img
      css={css`
        object-fit: ${contain ? `contain` : `cover`};
      `}
      className={className}
      src={src}
      alt={alt || ``}
      title={title || alt || ``}
      loading="lazy"
      width="100%"
      height="100%"
    />
  );
};

export default Image;
