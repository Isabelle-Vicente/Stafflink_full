import { deleteNews, getEmployees, listNews, stafflinkURL_employeePhoto, stafflinkURL_newsPhoto } from "../../../patternScripts/api/stafflink.js";
import { getLocalData } from "../../../patternScripts/localStorageControl/getData.js";
import { allUtils } from "../../../patternScripts/main.js";
allUtils.access();

allUtils.sideMenu();
allUtils.notes();

//employees' birthdays
getEmployees()
  .then((json) => {
    let birthdaysList = [];

    for (let i = 0; i < json.length; i++) {
      let currentDate = new Date().getMonth() + 1;

      let birthdayDate = new Date(json[i].birthday).getMonth() + 1;

      if (currentDate == birthdayDate) {
        birthdaysList.push(json[i]);
      }
    }

    showBirthdays(birthdaysList);
  });

function showBirthdays(json) {
  let monthBirthdays = document.getElementById("display");
  if (json.length == 0) {
    monthBirthdays.innerText = "Nenhum aniversariante este mês";
  } else {
    monthBirthdays.innerText = "Aniversariantes do mês";
  }

  for (let i = 0; i < json.length; i++) {
    let employeePhoto = json[i].employeephotoname;
    let employeeName =
      json[i].name.split(" ")[0] +
      " " +
      json[i].name.split(" ")[json[i].name.split(" ").length - 1];
    let employeeBirthday = json[i].birthday;

    let imgEmployee = document.createElement("img");
    imgEmployee.src = stafflinkURL_employeePhoto + employeePhoto;
    imgEmployee.onerror = () => {
      imgEmployee.src = '/assets/images/Stafflink_favicon_dark.svg'
    }

    imgEmployee.alt = employeeName

    document.getElementsByClassName("bDayImgs")[0].appendChild(imgEmployee);

    let formattedBirthday = employeeBirthday
      .split("-")
      .reverse()
      .join("/")
      .slice(0, 5);

    let birthdayDetails = document.createElement("li");
    birthdayDetails.innerText = `${employeeName} - ${formattedBirthday}`;

    document.getElementById("ulElement").appendChild(birthdayDetails);
  }
}

// news list
listNews()
.then((news) => {
  let newsList = [];

  for (let i = 0; i < news.length; i++) {
    let currentDate = new Date();

    let newsExpirationDate = new Date(news[i].expirationdate);

    if (currentDate > newsExpirationDate) {
      deleteNews(news[i].id)
    } else {
      newsList.push(news[i]);
    }
  }

  list(newsList);
});

// news delete
function list(json) {
  document.getElementById("noticias-container").innerHTML = "";

  for (let i = 0; i < json.length; i++) {
    let newsTitle = json[i].title;
    let newsDescription = json[i].description;
    let newsImg = json[i].bannerfilename;
    let newsID = json[i].id;

    let title = document.createElement("h2");
    title.innerText = newsTitle;

    let description = document.createElement("p");
    description.innerText = newsDescription;

    let divNewsText = document.createElement("div");
    divNewsText.className = "newsText";

    divNewsText.appendChild(title);
    divNewsText.appendChild(description);

    let divNewsImg = document.createElement("div");
    divNewsImg.className = "newsImg loading";

    let imgNews = document.createElement("img");
    imgNews.src = `${stafflinkURL_newsPhoto}/${newsImg}`;
    imgNews.onerror = () => {
      imgNews.src = '/assets/images/Stafflink_favicon_dark.svg'
    }

    imgNews.alt = "Imagem da notícia";

    divNewsImg.appendChild(imgNews);

    let newsBtn = document.createElement("button");
    newsBtn.type = "button";
    newsBtn.className = "deleteButton"

    newsBtn.setAttribute("data-id", newsID);
    newsBtn.innerText = "Deletar";
    newsBtn.addEventListener("click", async (event) => {
      let btnID = event.target.getAttribute("data-id");

      let warning = await allUtils.toastConfirm({message: 'Confirme', description: 'Você realmente deseja excluir a notícia?'})
      .then((result) => result)
      .catch((result) => result)

      if (!warning) return;

      deleteNews(btnID).then(() => {
        window.location.reload();
      });
    });

    let divNewsContent = document.createElement("div");
    divNewsContent.className = "newsContent";

    getLocalData('user').access.sector === 'Recursos Humanos' && divNewsText.appendChild(newsBtn)
    divNewsContent.appendChild(divNewsText);
    divNewsContent.appendChild(divNewsImg);

    document.getElementById("news").appendChild(divNewsContent);

    //loading
    document.getElementById("noticias-container").innerHTML = "";

    imgNews.onload = function () {
      divNewsImg.classList.remove("loading");
    };
  }
}
