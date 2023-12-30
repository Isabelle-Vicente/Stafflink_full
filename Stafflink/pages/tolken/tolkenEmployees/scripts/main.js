import {
  getAttendance,
  getTolken,
  saveAttendance,
  uploadAttendanceDeparture,
} from "../../../../patternScripts/api/stafflink.js";
import { allUtils } from "../../../../patternScripts/main.js";

document.getElementById("confirm").addEventListener("click", () => {
  let input = document.getElementById("tolkenEmployee").value;

  document.getElementById("optionsTolken").style.display = "none";
  document.getElementById("loading-div").innerHTML = ` <div id="loading-bubble">


  <dotlottie-player
    src="https://lottie.host/29e5ec97-c579-4bd4-bba1-a1801849014d/I7wKA6dKTe.json"
    background="transparent"
    speed="1"
    loop
    autoplay
  ></dotlottie-player>
</div>`;

  getTolken().then((json) => {
    if (input == json[0].tolkennumber) {
      let currentUser = allUtils.getLocalData("user").user;
      let currentDate = new Date().toLocaleDateString();

      let currentHours = new Date().getHours().toString();
      let currentMinutes = new Date()
        .getMinutes()
        .toLocaleString("pt-BR", { minimumIntegerDigits: 2 });
      let currentTime = `${currentHours}:${currentMinutes}`;

      getAttendance(currentUser.id).then((json) => {
        if (
          (json.length != 0 && json[json.length - 1].departure != null) ||
          json.length == 0
        ) {
          saveAttendance({
            date: currentDate,
            entrance: currentTime,
            departure: null,
            employeeId: currentUser.id,
          });
        } else if (
          json.length != 0 &&
          json[json.length - 1].departure == null
        ) {
          uploadAttendanceDeparture(currentUser.id, {
            newAttendanceDeparture: currentTime,
          });
        } else {
          console.log("Fugiu da verificação");
        }
      });

      document.getElementById("tolkenEmployee").value = "";

      allUtils.toastAlert({
        message: "Sucesso!",
        description: "Registro realizado com sucesso",
        className: "success",
      });

      document.getElementById("loading-div").innerHTML = "";
      document.getElementById("optionsTolken").style.display = "flex";
    } else {
      allUtils.toastAlert({
        message: "Token inválido",
        description: "Verifique se o código esta correto",
        className: "danger",
      });

      document.getElementById("loading-div").innerHTML = "";
      document.getElementById("optionsTolken").style.display = "flex";
    }
  });
});
