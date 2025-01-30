import "dotenv/config";
import Mux from "@mux/mux-node";
import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";

const videoFileDirectory = path.join(process.cwd(), "data/videos");

export const client = createClient({
  projectId: "4kxh2xwe",
  dataset: "production",
  useCdn: false,
  apiVersion: "2025-01-01",
  token: process.env.SANITY_TOKEN
});

const mux = new Mux({
  tokenId: process.env.MUX_ACCESS_TOKEN_ID,
  tokenSecret: process.env.MUX_SECRET_KEY
});

const getAllCloudinaryVideos = async () => {
  const query = `*[_type == 'project' && 'cloudinary.asset' in slides[]._type][]{
    slides
  }`;

  const projectWithVideos = await client.fetch(query);

  const videos = projectWithVideos
    .flatMap((project) =>
      project.slides.filter((slide) => slide._type === "cloudinary.asset")
    )
    .map((slide) => ({ name: slide.public_id, url: slide.secure_url }));

  return videos;
};

const downloadCloudinaryVideo = async (name, url) => {
  if (!name || !url) {
    throw new Error("Name and URL are required");
  }

  // Ensure URL is a valid Cloudinary video URL
  if (!url.includes("https://res.cloudinary.com/")) {
    throw new Error("Invalid Cloudinary URL");
  }

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "video/*",
        "User-Agent": "Mozilla/5.0 (Node.js Video Downloader)"
      }
    });

    if (!response.ok) {
      throw new Error(
        `Error downloading video: ${response.status} ${response.statusText}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("video/")) {
      throw new Error(`Invalid content type: ${contentType}`);
    }

    // Get array buffer and convert to Buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // file extension should be the last part of the url separated by a dot
    const fileExtension = url.split(".").pop();
    const fileName = `${name}.${fileExtension}`;
    const filePath = path.join(videoFileDirectory, fileName);

    // Write the file to disk
    fs.mkdirSync(videoFileDirectory, { recursive: true });
    fs.writeFileSync(filePath, buffer);

    return fileName;
  } catch (error) {
    console.error("Download failed:", error);
    console.error("URL attempted:", url);
    throw error;
  }
};

const getMuxUploadUrl = async () => {
  if (!mux) {
    throw new Error("Mux not initialized");
  }

  const upload = await mux.video.uploads.create({
    cors_origin: "*",
    new_asset_settings: {
      playback_policy: ["public"],
      video_quality: "basic"
    }
  });

  return {
    url: upload.url,
    id: upload.id
  };
};

const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

const uploadVideoToMux = async (fileName, uploadUrl, uploadId) => {
  if (!mux) {
    throw new Error("Mux not initialized");
  }

  let i = 0;
  let loadingInterval;

  try {
    console.log(`📤 Starting upload for: ${fileName}`);
    const videoFile = fs.readFileSync(path.join(videoFileDirectory, fileName));

    // Start loading animation
    loadingInterval = setInterval(() => {
      process.stdout.write(`\r${frames[i]} Uploading to Mux...`);
      i = (i + 1) % frames.length;
    }, 80);

    const response = await fetch(uploadUrl, {
      method: "PUT",
      body: videoFile,
      headers: {
        "Content-Type": "video/mp4"
      }
    });

    // Clear upload animation
    clearInterval(loadingInterval);
    process.stdout.write("\n");

    if (!response.ok) {
      throw new Error(
        `Response not ok: ${response.status} ${response.statusText}`
      );
    }

    // Poll for asset details with dots animation
    let asset;
    let dots = "";
    console.log("🎥 Processing video");

    while (!asset) {
      process.stdout.write(`\rWaiting for Mux processing${dots}`);
      dots = dots.length >= 3 ? "" : dots + ".";

      const upload = await mux.video.uploads.retrieve(uploadId);

      if (upload.status === "asset_created") {
        asset = await mux.video.assets.retrieve(upload.asset_id);
        process.stdout.write("\n✅ Processing complete!\n");
        break;
      } else if (upload.status === "errored") {
        process.stdout.write("\n❌ Processing failed\n");
        throw new Error("Upload processing failed");
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return {
      assetId: asset.id,
      playbackId: asset.playback_ids[0].id
    };
  } catch (error) {
    if (loadingInterval) clearInterval(loadingInterval);
    console.error("❌ Upload failed:", error);
    throw error;
  }
};

const main = async () => {
  // const videos = await getAllCloudinaryVideos();
  const videos = fs.readdirSync(videoFileDirectory);

  for (const fileName of videos) {
    try {
      // const fileName = await downloadCloudinaryVideo(video.name, video.url);
      const uploadUrl = await getMuxUploadUrl();
      const { assetId, playbackId } = await uploadVideoToMux(
        fileName,
        uploadUrl.url,
        uploadUrl.id
      );

      console.log("Asset ID:", assetId);
      console.log("Playback ID:", playbackId);
    } catch (error) {
      console.error("Error processing video:", error);
    }
  }
};

main();
