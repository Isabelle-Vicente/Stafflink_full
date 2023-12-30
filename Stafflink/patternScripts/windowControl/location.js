import { setSystemAccess } from "../accessSystemControl/accessByRole.js";
import { getLocalData } from "../localStorageControl/getData.js";
import { allUtils } from "../main.js";

export const getCurrentPagePath = () => {
  const currentPath = window.location.href;
  const regexPagePathVerify = RegExp(/\w{0,}\/index.html/g);
  const regexPagePathVerifyWithoutIndex = RegExp(/\w{0,}\//g);
  let currentPage;

  if (currentPath.match(regexPagePathVerify)) {
    currentPage = currentPath.match(regexPagePathVerify)[0].split("/")[0];
  } else {
    const length = currentPath.match(regexPagePathVerifyWithoutIndex).length;
    currentPage = currentPath
      .match(regexPagePathVerifyWithoutIndex)
      [length - 1].split("/")[0];
  }

  return {
    currentPath: currentPath,
    currentPage: currentPage,
  };
};

export const setCurrentPagePath = (page) => {
  window.location.href = `/pages/${page}/index.html`;
};

export const backToPreviousPage = () => {
  window.location.href = document.referrer
};

export const handlePageByLink = (element) => {
  const { currentPath, currentPage } = getCurrentPagePath();
  let pageLinkElement = element.getAttribute("data-link-to");

  if (currentPage === pageLinkElement) {
    element.classList.toggle("current");

    return;
  }

  element.addEventListener("click", async (event) => {
    const isHumanResources = verifySector('Recursos Humanos')

    switch (pageLinkElement){
      case "logout":
          let logoutConfirmation = await allUtils.toastConfirm({message: 'Confirme', description: 'Deseja realmente sair?'})
        .then((result) => result)
        .catch((result) => result)

          if (logoutConfirmation) {
            setCurrentPagePath(pageLinkElement);
          }
        return
      case "attendanceHR":
          setSystemAccess()
          !isHumanResources && (pageLinkElement = 'attendanceEmployee')
        break
      case "attendanceEmployee":
        isHumanResources && (pageLinkElement = 'attendanceHR')
        break
      case "chat":
        window.open('https://stafflink-chat-front.vercel.app', '_blank')
        return
    }

    setCurrentPagePath(pageLinkElement);
  });
};

function verifySector(sector = 'Recursos Humanos') {
  return getLocalData('user')?.access?.sector === sector
}