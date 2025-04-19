const https = require("https");
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { spawn } = require("node:child_process");

const app = express();
const port = 3000;

app.use(cors()); // This enables CORS for all origins (for dev, this is fine)

app.get("/get-video", (req, res) => {
  console.log(req.query.v);
  if (!req.query.v) {
    res.send("No vid or url provided.");
    return;
  } else {
    console.log(`Selected v:${req.query.v}`);
  }
  res.send("received vid " + req.query.v);
  const yt = spawn("yt-dlp", [
    "-i",
    "--extract-audio",
    "--audio-format",
    "mp3",
    "--audio-quality",
    "0",
    `https://www.youtube.com/watch?v=${req.query.v}`,
    "-o",
    "downloads/%(title)s.%(ext)s",
  ]);

  yt.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  yt.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  yt.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });

  // For a youtube video, downloads it as an mp3 with the best audio
  // yt-dlp  -i --extract-audio --audio-format mp3 --audio-quality 0 "https://www.youtube.com/watch?v=9XZvq17M0hM" -o  "%(title)s.%(ext)s"
});

app.get("/get-playlist", (req, res) => {
  console.log(req.query.list);
  if (!req.query.list) {
    res.send("No list or url provided.");
    return;
  } else {
    console.log(`Selected list:${req.query.list}`);
  }
  res.send("received list " + req.query.list);
  // For a playlist, downloads them all in your current directory
  // yt-dlp -i --extract-audio --audio-format mp3 --audio-quality 0 --yes-playlist "[URL]" -o  "%(title)s.%(ext)s"
});

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app,
  )
  .listen(port, () => console.log("HTTPS server running on 3000"));
