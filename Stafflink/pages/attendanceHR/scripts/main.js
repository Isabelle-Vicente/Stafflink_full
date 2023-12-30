import {
  getAllAttendances,
  getEmployee,
  stafflinkURL_employeePhoto,
} from "../../../patternScripts/api/stafflink.js";
import { allUtils } from "../../../patternScripts/main.js";

allUtils.access();
allUtils.sideMenu();
allUtils.notes();

getAllAttendances().then((attendances) => {
  if (attendances.length > 0) {
    listAttendance(attendances);
  } else {
    document.getElementById("tbody").innerHTML = "";
    allUtils.toastAlert({message: 'Sem registros', description: 'Ainda não existem registros no controle de ponto'})
  }
});

function listAttendance(attendanceList) {
  document.getElementById("tbody").innerHTML = "";

  for (let i = 0; i < attendanceList.length; i++) {
    let employeePhoto = attendanceList[i].employeephotoname;
    let empName = attendanceList[i].name;
    let empSector = attendanceList[i].sector;
    let empJourney =
      attendanceList[i].journeyinit + " - " + attendanceList[i].journeyend;
    let registerDate = attendanceList[i].attendancedate;
    registerDate = registerDate.split("-").reverse().join("/");
    let empEntrance = attendanceList[i].entrance;
    let empExit = attendanceList[i].departure;

    let trInfos = document.createElement("tr");

    let tdUser = document.createElement("td");

    let divUserInfos = document.createElement("div");
    divUserInfos.className = "employeeCode";

    let spanEmployeePhoto = document.createElement("span");
    spanEmployeePhoto.className = "employeePhoto";
    let imgEmployeePhoto = document.createElement("img");
    imgEmployeePhoto.src = stafflinkURL_employeePhoto + employeePhoto;
    imgEmployeePhoto.onerror = () => {
      imgEmployeePhoto.src = '/assets/images/Stafflink_favicon_dark.svg'
    }
    
    imgEmployeePhoto.alt = "funcionário";
    spanEmployeePhoto.appendChild(imgEmployeePhoto);

    divUserInfos.append(spanEmployeePhoto, empName);

    tdUser.appendChild(divUserInfos);

    let tdSector = document.createElement("td");
    tdSector.innerText = empSector;

    let tdJourney = document.createElement("td");
    tdJourney.innerText = empJourney;

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

      overrun.includes("-")
        ? tdOverrun.classList.add("negative")
        : tdOverrun.classList.add("positive");
    }

    let elementsToAdd = [
      tdUser,
      tdSector,
      tdJourney,
      tdDate,
      tdEntrance,
      tdExit,
      tdOverrun,
    ];

    for (let i = 0; i < elementsToAdd.length; i++) {
      trInfos.appendChild(elementsToAdd[i]);
    }

    document.getElementById("tbody").appendChild(trInfos);
  }
}

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
