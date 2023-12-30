import { getAttendance } from "../../../patternScripts/api/stafflink.js";
import { allUtils } from "../../../patternScripts/main.js";

allUtils.access();

allUtils.sideMenu();
allUtils.notes();

let currentUser = allUtils.getLocalData("user").user;

getAttendance(currentUser.id)
  .then((attendance) => {
    document.getElementById("tbody").innerHTML = "";

    if (attendance.length == 0) {
      document.getElementById("loading-div").remove();
      allUtils.toastAlert({message: 'Sem registros', description: 'Ainda não existem registros no controle de ponto'})
      
      return;
    }

    for (let i = 0; i < attendance.length; i++) {
      let registerDate = attendance[i].attendancedate;
      registerDate = registerDate.split("-").reverse().join("/");
      let empEntrance = attendance[i].entrance;
      let empExit = attendance[i].departure;
      let empJourney = currentUser.journeyinit + " - " + currentUser.journeyend;

      let trInfos = document.createElement("tr");

      let tdDate = document.createElement("td");
      tdDate.innerText = registerDate;

      let tdEntrance = document.createElement("td");
      tdEntrance.innerText = empEntrance;

      let tdExit = document.createElement("td");

      let tdOverrun = document.createElement("td");
      tdOverrun.className = "additional";

      if (empExit == null) {
        tdExit.innerText = "-";
        tdOverrun.innerText = "-";
      } else {
        tdExit.innerText = empExit;
        let overrun = calculateOverrun(empJourney, empEntrance, empExit);
        tdOverrun.innerText = overrun;

        tdOverrun.innerText = overrun;

        overrun.includes("-")
          ? tdOverrun.classList.add("negative")
          : tdOverrun.classList.add("positive");
      }

      let elementsToAdd = [tdDate, tdEntrance, tdExit, tdOverrun];

      for (let i = 0; i < elementsToAdd.length; i++) {
        trInfos.appendChild(elementsToAdd[i]);
      }

      document.getElementById("tbody").appendChild(trInfos);
    }
    document.getElementById("loading-div").remove();
  })
  .catch((err) => console.log(`Algo deu errado. Erro: ${err.message}`));

function calculateOverrun(journey, entrance, exit) {
  const [journeyInit, journeyExit] = journey.split(" - ").map(parse);

  const journeyInMinutes = journeyExit - journeyInit;

  const entranceInMinutes = parse(entrance);
  const exitInMinutes = parse(exit);

  const attendanceInMinutes = exitInMinutes - entranceInMinutes;

  const differenceInMinutes = Math.abs(attendanceInMinutes - journeyInMinutes);

  if (differenceInMinutes != 0) {
    let hours = Math.floor(differenceInMinutes / 60);
    let minutes = differenceInMinutes - hours * 60;

    let formattedMinutes = minutes.toString().padStart(2, "0");

    if (attendanceInMinutes > journeyInMinutes) {
      return `${hours}:${formattedMinutes}`;
    } else {
      let negativeHours = -hours;
      return `${negativeHours}:${formattedMinutes}`;
    }
  }
}

function parse(time) {
  const [hour, minute] = time.split(":").map((v) => parseInt(v));
  return minute + hour * 60;
}
