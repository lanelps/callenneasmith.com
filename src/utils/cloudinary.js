/* eslint-disable import/prefer-default-export */

import { Cloudinary } from "@cloudinary/url-gen";
import {
  quality,
  format
} from "@cloudinary/transformation-builder-sdk/actions/delivery";
import { limitFit } from "@cloudinary/transformation-builder-sdk/actions/resize";
import { auto } from "@cloudinary/url-gen/qualifiers/videoCodec";
import { bitRate, videoCodec } from "@cloudinary/url-gen/actions/transcode";

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.GATSBY_CLOUDINARY_CLOUD_NAME
  },
  url: {
    secure: true
  }
});

const defaultOptions = {
  width: 960,
  quality: "auto",
  format: "mp4",
  bitRate: "1500k"
};

export const generateCloudinaryVideoURL = (publicId, options) => {
  options = { ...defaultOptions, ...options };

  let myVideo = cld?.video(publicId);

  if (options?.width) {
    myVideo = myVideo.resize(limitFit().width(options.width));
  }
  if (options?.quality) {
    myVideo = myVideo.delivery(quality(options.quality));
  }
  if (options?.format) {
    myVideo = myVideo.delivery(format(options.format));
  }
  if (options?.bitRate) {
    myVideo = myVideo.transcode(videoCodec(auto()));
    myVideo = myVideo.transcode(bitRate(options.bitRate).constant());
  }

  return myVideo?.toURL();
};
