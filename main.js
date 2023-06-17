import ffmpeg from "fluent-ffmpeg";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import { spawn } from "node:child_process";

const file = path.dirname(fileURLToPath(import.meta.url)) + "/videos/video.mp4";
const basename = "video";

console.log(ffmpegPath);

try {
  const ffmpeg = spawn(ffmpegPath, [
    `-i`,
    `${file}`,
    "-vcodec",
    "libx264",
    "-vf",
    `scale=256:144`,
    `${basename}-256x144.mp4`,
  ]);

  ffmpeg.stderr.on("data", (stream) => {
    console.log(stream);
  });

  ffmpeg.stdout.on("data", (stream) => {
    console.log(stream);
  });
} catch (err) {
  console.error(err);
  throw err;
}
