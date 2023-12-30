import { allUtils } from "../main.js";

// Descomentar para rodar api localmente
// const stafflinkURL_employee = "http://localhost:4040/employees/";
// export const stafflinkURL_employeePhoto =
//   "http://localhost:4040/employees/photo/";

const baseUrl = 'https://employees-api-oite.onrender.com'

// const baseUrl = 'http://localhost:5432'

// const baseUrl = "http://localhost:4040";

// Employees
const stafflinkURL_employee = `${baseUrl}/employees/`;
export const stafflinkURL_employeePhoto = `${baseUrl}/employees/photo/`;

// Registers (interprise)
const stafflinkURL_registers = `${baseUrl}/registers`;

// Attendance
const stafflinkURL_attendance = `${baseUrl}/attendance`;

// News
const stafflinkURL_news = `${baseUrl}/news`;
export const stafflinkURL_newsPhoto = `${baseUrl}/news/bannerFile`;

// Tolken
const stafflinkURL_tolken = `${baseUrl}/tolken`;

// Vacation
const stafflinkURL_vacation = `${baseUrl}/vacation`;

export async function getEmployee(userId, queryData = null) {
  if (!queryData) {
    const url = stafflinkURL_employee + userId;
    const result = await fetch(url).then((data) => data.json());

    return result[0];
  }

  const url =
    stafflinkURL_employee +
    `?email=${queryData.email}&password=${queryData.password}`;
  const result = await fetch(url).then((data) => data.json());

  return result[0];
}

export async function saveEmployee(employeeObject) {
  if (employeeObject instanceof FormData) {
    await fetch(stafflinkURL_employee, {
      method: "POST",
      body: employeeObject,
    });
  } else {
    fetch(stafflinkURL_employee, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeObject),
    });
  }
}

export async function getEmployees() {
  const results = await fetch(stafflinkURL_employee).catch((error) => {
    allUtils.toastAlert({
      message: "Huum... problemas",
      description:
        "Parece que houve um erro interno no servidor. Favor recarregue a página.",
      className: "danger",
    });

    return;
  });

  const employees = await results.json();

  return employees;
}

export async function updateEmployee(id, data) {
  await fetch(stafflinkURL_employee + id, {
    method: "PUT",
    body: data,
  });
}

export async function deleteEmployee(id) {
  await fetch(stafflinkURL_employee + id, {
    method: "DELETE",
  });
}

// REGISTERS

export async function signUpInterprise(interpriseData) {
  await fetch(stafflinkURL_registers, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(interpriseData),
  });
}

// ATTENDANCE

export async function getAllAttendances() {
  const attendances = await fetch(stafflinkURL_attendance, {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
    },
  })
    .then((json) => json.json())
    .catch((error) => {
      allUtils.toastAlert({
        message: "Huum... problemas",
        description:
          "Parece que houve um erro interno no servidor. Favor recarregue a página.",
        className: "danger",
      });
    });

  return attendances;
}

export async function saveAttendance(attendance) {
  fetch(stafflinkURL_attendance, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(attendance),
  });
}

export async function uploadAttendanceDeparture(
  targetAttendanceId,
  { newAttendanceDeparture }
) {
  fetch(`${stafflinkURL_attendance}/${targetAttendanceId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({
      newAttendanceDeparture,
    }),
  });
}

export async function getAttendance(employeeId) {
  const targetAttendance = await fetch(
    `${stafflinkURL_attendance}/${employeeId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    }
  ).then((json) => json.json());

  return targetAttendance;
}

export async function deleteAttendance(employeeId) {
  await fetch(`${stafflinkURL_attendance}/${employeeId}`, {
    method: "DELETE",
  });
}

// NEWS

export async function saveNews(news) {
  fetch(stafflinkURL_news, {
    method: "POST",
    body: news,
  });
}

export async function listNews() {
  const news = await fetch(stafflinkURL_news, {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
    },
  }).then((json) => json.json());

  return news;
}

export async function deleteNews(newsId) {
  await fetch(`${stafflinkURL_news}/${newsId}`, {
    method: "DELETE",
  });
}

// TOLKEN

export async function updateTolken(currentTolken, { newTolkenNumber }) {
  fetch(`${stafflinkURL_tolken}/${currentTolken}`, {
    method: "PUT",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({
      newTolkenNumber,
    }),
  });
}

export async function getTolken() {
  const currentTolken = await fetch(stafflinkURL_tolken, {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
    },
  }).then((json) => json.json());

  return currentTolken;
}

// VACATION

export async function getAllVacations() {
  const vacations = await fetch(stafflinkURL_vacation, {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
    },
  }).then((json) => json.json());

  return vacations;
}

export async function saveVacation(vacation) {
  fetch(stafflinkURL_vacation, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(vacation),
  });
}

export async function deleteVacation(id) {
  fetch(`${stafflinkURL_vacation}/${id}`, {
    method: "DELETE",
  });
}
