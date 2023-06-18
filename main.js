import path from "node:path";
import { fileURLToPath } from "node:url";
import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import { spawn } from "node:child_process";

const file = path.dirname(fileURLToPath(import.meta.url)) + "/videos/video.mp4";
const basename = "video";

function videoTo144p() {
  const ffmpeg = spawn(ffmpegPath, [
    `-i`,
    `${file}`,
    "-vcodec",
    "libx265",
    "-preset",
    "ultrafast",
    "-c:a",
    "copy",
    "-vf",
    "scale=-2:144",
    `${basename}-144p.mp4`,
  ]);
}
function videoTo480p() {
  const ffmpeg = spawn(ffmpegPath, [
    `-i`,
    `${file}`,
    "-vcodec",
    "libx265",
    "-preset",
    "ultrafast",
    "-c:a",
    "copy",
    "-vf",
    "scale=-2:480",
    `${basename}-480p.mp4`,
  ]);
}
function videoTo720p() {
  const ffmpeg = spawn(ffmpegPath, [
    `-i`,
    `${file}`,
    "-vcodec",
    "libx265",
    "-preset",
    "ultrafast",
    "-c:a",
    "copy",
    "-vf",
    "scale=-2:720",
    `${basename}-720p.mp4`,
  ]);
}
function videoTo1080p() {
  const ffmpeg = spawn(ffmpegPath, [
    `-i`,
    `${file}`,
    "-vcodec",
    "libx265",
    "-preset",
    "ultrafast",
    "-c:a",
    "copy",
    "-vf",
    "scale=-2:1080",
    `${basename}-720p.mp4`,
  ]);
}

function getResolution() {
  return new Promise((resolve, reject) => {
    const video = spawn(ffmpegPath, ["-i", `${file}`]);

    video.stderr.on("data", (data) => {
      const match = data.toString().match(/Stream.*Video:.*\s(\d+)x(\d+)/);

      if (match && match[2]) resolve(match[2]);
    });

    video.stderr.on("error", (err) => reject(err));
  });
}

async function processVideo() {
  const resolution = await getResolution();

  if (resolution >= 1080) {
    videoTo1080p();
    videoTo720p();
    videoTo480p();
    videoTo144p();
  } else if (resolution < 1080 && resolution >= 720) {
    videoTo720p();
    videoTo480p();
    videoTo144p();
  } else if (resolution < 720 && resolution >= 480) {
    videoTo480p();
    videoTo144p();
  } else if (resolution < 480 && resolution >= 144) {
    videoTo144p();
  }
}

processVideo();
