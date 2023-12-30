// import { allUtils } from "../../../patternScripts/main.js"

import {
  getTolken,
  updateTolken,
} from "../../../../patternScripts/api/stafflink.js";

insertTolkenOnHTML();

function generateTolken() {
  getTolken().then((currentTolken) => {
    updateTolken(currentTolken[0].tolkennumber, {
      newTolkenNumber: Math.floor(100000 + Math.random() * 900000),
    }).then(() => {
      insertTolkenOnHTML();
    });
  });
}


async function insertTolkenOnHTML() {
  await getTolken().then((json) => {
    document.getElementById("tolkenId").innerText = json[0].tolkennumber;
    console.log(json[0].tolkennumber);
    return json[0].tolkennumber;
  });
}

//progress bar
const duration = 30;

let timeLeft = duration;
const progressBar = document.getElementById("progress");

function updateProgress() {
  timeLeft--;
  const barWidth = (timeLeft / duration) * 100;
  progressBar.style.width = barWidth + "%";

  if (timeLeft <= 0) {
    timeLeft = duration;
    progressBar.style.width = "100%";
  }
}

setInterval(generateTolken, 15000);
setInterval(updateProgress, 1000);
