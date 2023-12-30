import { getEmployees, stafflinkURL_employeePhoto } from "../../../patternScripts/api/stafflink.js";
import { getLocalData, setLocalData } from "../../../patternScripts/localStorageControl/getData.js";
import { allUtils } from "../../../patternScripts/main.js";
import { popUpCaller } from "./table/index.js";

allUtils.access();

allUtils.sideMenu();
allUtils.notes();

const { employeeTableActions } = allUtils
employeeTableActions(getHiringOrderEmployees, getOrdenateEmployees)

Array.prototype.employeesOrdenate = function (typeOrdanation = 'id') {  
  const arr = this

  const ordenations = {
    'a-to-z': () => arr.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
    }), 
    // 'z-to-a': arr.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0),
    'z-to-a': () => arr.sort((a, b) => {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
    }),
    'hiring': () => arr.sort((a, b) => new Date(b.hiring) - new Date(a.hiring)),
    'id': () => arr.sort((a, b) => a.id - b.id)
  }

  if(!ordenations[typeOrdanation]) return

  return ordenations[typeOrdanation]()
}

getEmployees()
  .then((employees) => {
    list(employees)
    return employees
  });

async function getHiringOrderEmployees() {
  setLocalData('filter_employees', 'hiring')

  document.getElementById("sortLoader").style.display = 'inline-block';
  
  const data = await getEmployees()
  list(data.employeesOrdenate('hiring'))

  document.getElementById("sortLoader").style.display = 'none';
}

export function list(json) {
  const savedFilter = getLocalData('filter_employees')

  if(savedFilter) {
    json = json.employeesOrdenate(savedFilter)
  } else {
    json.employeesOrdenate('id')
  }

  document.getElementById("tbody").innerHTML = "";

  for (let i = 0; i < json.length; i++) {
    let employeePhoto = json[i].employeephotoname;
    let employeeCode = json[i].id;
    let employeeName = json[i].name;
    let employeeRole = json[i].office;
    let employeeEmail = json[i].email;
    let employeePis = json[i].pis;
    let employeeHired = json[i].hiring;
    let employeeJourneyStart = json[i].journeyinit;
    let employeeJourneyEnd = json[i].journeyend;

    let trInfos = document.createElement("tr");

    let tdEmployeeCode = document.createElement("td");
    let divEmployeeCode = document.createElement("div");
    divEmployeeCode.className = "employeeCode";

    let spanEmployeePhoto = document.createElement("span");
    spanEmployeePhoto.className = "employeePhoto";
    let imgEmployeePhoto = document.createElement("img");
    imgEmployeePhoto.src = stafflinkURL_employeePhoto + employeePhoto;
    
    imgEmployeePhoto.onerror = () => {
      imgEmployeePhoto.src = '/assets/images/Stafflink_favicon_dark.svg'
    }

    imgEmployeePhoto.alt = "funcionário";
    spanEmployeePhoto.appendChild(imgEmployeePhoto);

    let spanEmployeeNumber = document.createElement("span");
    spanEmployeeNumber.innerText = employeeCode;

    divEmployeeCode.appendChild(spanEmployeePhoto);
    divEmployeeCode.appendChild(spanEmployeeNumber);

    tdEmployeeCode.appendChild(divEmployeeCode);

    let tdEmployeeName = document.createElement("td");
    tdEmployeeName.innerText = employeeName;

    let spanEmployeeRole = document.createElement("span");
    spanEmployeeRole.innerText = employeeRole;
    spanEmployeeRole.classList.add("office");

    tdEmployeeName.appendChild(spanEmployeeRole);
    tdEmployeeName.classList.add("employee");

    let tdEmployeeEmail = document.createElement("td");
    tdEmployeeEmail.innerText = employeeEmail;

    let tdEmployeePis = document.createElement("td");
    tdEmployeePis.innerText = employeePis;

    let tdEmployeeHired = document.createElement("td");
    tdEmployeeHired.innerText = employeeHired.split("-").reverse().join("/");

    let tdEmployeeJourney = document.createElement("td");
    tdEmployeeJourney.innerText = `${employeeJourneyStart} - ${employeeJourneyEnd}`;

    let tdViewMore = document.createElement("td");
    tdViewMore.classList.add("actions");
    let buttonViewMore = document.createElement("button");
    buttonViewMore.type = "button";
    buttonViewMore.className = "viewMore";
    buttonViewMore.addEventListener("click", () => {
      popUpCaller(employeeCode);
    });

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("fill", "none");

    // Adicionar os caminhos do SVG
    const paths = [
      ["M9.65625 1.93127L13.5188 1.93127V5.79377"],
      ["M5.79377 13.5188H1.93127L1.93127 9.65625"],
      ["M13.5188 1.93127L9.01251 6.43752"],
      ["M1.93127 13.5188L6.43752 9.01251"],
    ];

    paths.forEach((pathData) => {
      let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", pathData[0]);
      path.setAttribute("stroke", "black");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("stroke-linejoin", "round");
      svg.appendChild(path);
    });

    // Anexar o SVG ao botão e o botão à célula
    buttonViewMore.appendChild(svg);
    tdViewMore.appendChild(buttonViewMore);

    let elementsToAdd = [
      tdEmployeeCode,
      tdEmployeeName,
      tdEmployeeEmail,
      tdEmployeePis,
      tdEmployeeHired,
      tdEmployeeJourney,
      tdViewMore,
    ];

    for (let i = 0; i < elementsToAdd.length; i++) {
      trInfos.appendChild(elementsToAdd[i]);
    }

    document.getElementById("tbody").appendChild(trInfos);
  }
}

async function getOrdenateEmployees(button) {
  document.getElementById("sortLoader").style.display = 'inline-block';

  const ordenationType = button.value
  if(ordenationType == '' || !ordenationType) return

  const allEmployees = await getEmployees()

  let sortedEmployees = []

  setLocalData('filter_employees', ordenationType)
  sortedEmployees = allEmployees.employeesOrdenate(ordenationType)

  list(sortedEmployees)
  document.getElementById("sortLoader").style.display = 'none';
}