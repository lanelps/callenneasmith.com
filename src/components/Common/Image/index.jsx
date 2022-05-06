/* eslint-disable react/prop-types */

import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import {
  GatsbyImage,
  getImage,
  getSrc,
  withArtDirection
} from "gatsby-plugin-image";

const Image = ({ className, image, alt, loading, title, contain }) => {
  if (typeof image === `string`) {
    return (
      <>
        {(image.startsWith(`http`) || image.startsWith(`/`)) && (
          <img className={className} src={image} alt={image} />
        )}
      </>
    );
  }

  const imageObj = image?.asset || image;
  const mobileImageObj = image?.mobileImage?.asset;

  if (!imageObj) {
    return <></>;
  }

  const src = getSrc(imageObj);

  let images = ``;

  // without useArtDirection, do we change srcSet properly at different breakpoints?
  // i.e. does the Sanity impl work by default, and are we interrupting it?
  //
  // before, we were using two GatsbyImage components, one for each desktop/mobile,
  // which kept Gatsby image/Sanity working by default with one another
  //
  // useArtDirection is an attempt to merge everything, which might be borking it

  if (mobileImageObj) {
    images = withArtDirection(getImage(mobileImageObj), [
      {
        media: `(min-width: 1025px)`,
        image: getImage(imageObj)
      }
    ]);
  } else {
    images = getImage(imageObj);
  }

  //

  return (
    <>
      {(src?.includes(`.svg`) && (
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
      )) || (
        <GatsbyImage
          className={className}
          loading={loading || `eager`}
          image={images}
          alt={alt || ``}
          title={title || alt || ``}
          objectFit={contain ? `contain` : `cover`}
        />
      )}
    </>
  );
};

export default Image;

Image.defaultProps = {
  alt: null,
  loading: null,
  title: null
};
Image.propTypes = {
  image: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string])
    .isRequired,
  alt: PropTypes.string,
  loading: PropTypes.string,
  title: PropTypes.string
};
