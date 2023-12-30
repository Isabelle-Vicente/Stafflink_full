import { allUtils } from "../../../patternScripts/main.js";

allUtils.deleteLocalData("user");

const loginAccess = document.getElementById("loginAccess");

loginAccess.addEventListener("click", () => {
  window.location.href = "/";
});
