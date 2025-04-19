// ==UserScript==
// @name         yt-dl-mp3-btn
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add a custom button to YouTube
// @author       You
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

const SERVER = "https://127.0.0.1";
const PORT = 3000;

(function () {
  "use strict";

  // Watch for page changes (since YouTube is a single-page app)
  const observer = new MutationObserver(() => {
    // Check if the button is already added
    if (document.querySelector("#yt-dl-mp3-btn")) return;

    // Try to find the container below the video title
    const target = document.querySelector(
      "#above-the-fold #top-row #actions #actions-inner #menu ytd-menu-renderer",
    );

    if (target) {
      // Create your button
      const button = document.createElement("button");
      button.id = "yt-dl-mp3-btn";
      button.innerText = "MP3";
      button.style.marginRight = "10px";
      button.style.padding = "6px 12px";
      button.style.fontSize = "12px";
      button.style.background = "#cc0000";
      button.style.color = "white";
      button.style.border = "none";
      button.style.borderRadius = "20px";
      button.style.cursor = "pointer";
      button.style.height = "36px";
      button.style.fontFamily = '"Roboto","Arial",sans-serif';

      button.onclick = () => {
        const url = new URL("https://www.youtube.com/watch?v=pAsmrKyMqaA");
        const parms = new URLSearchParams(url.search);
        const vid = parms.get("v");
        if (!vid) return;

        const query = `${SERVER}:${PORT}/?vid=${vid}`;
        fetch(query, {
          method: "GET", // default, so we can ignore
        });

        console.log(vid);
      };

      button.onmouseenter = () => {
        button.style.background = "#cc4444";
      };
      button.onmouseleave = () => {
        button.style.background = "#cc0000";
      };

      // Add it to the page
      target.insertBefore(button, target.children[0]);
    }
  });

  // Start observing DOM changes
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
