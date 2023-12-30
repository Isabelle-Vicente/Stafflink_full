import { getLocalData } from "../localStorageControl/getData.js";

const user = getLocalData("user") ?? { access: false };

export const accessControl = () => {
  if (user.access == false) {
    window.location.href = "/";
    return;
  }

  console.log(`Acesso: ${user.access.sector}`);
};

// Sistema de controle de acesso - Fase experimental

export function setLinksByAccess() {
  const access = getLocalData("user").access;
  const sector = access.sector;

  const allMenuElements = document.querySelectorAll(
    ".link, .actions_option, [data-link-to]"
  );

  if (sector !== "Recursos Humanos") {
    const releasedPages = [
      "attendanceEmployee",
      "attendanceHR",
      "vacation",
      "news",
      "logout",
      "chat",
      "analysisMode",
      "tolken/tolkenEmployees",
    ];

    allMenuElements.forEach((element) => {
      const link = element.getAttribute("data-link-to");
      const id = element.id;
      const tagName = element.tagName;

      if (tagName === "A") {
        // element.remove()
        element.setAttribute("disabled", true);
        element.style.opacity = "0.3";
        element.style.userSelect = "none";
        element.style.pointerEvents = "none";
      } else {
        if (link && !releasedPages.includes(link)) {
          // element.remove()
          element.setAttribute("disabled", true);
          element.style.opacity = "0.3";
          element.style.userSelect = "none";
          element.style.pointerEvents = "none";
        } else if (id && !releasedPages.includes(id)) {
          // element.remove()
          element.setAttribute("disabled", true);
          element.style.opacity = "0.3";
          element.style.userSelect = "none";
          element.style.pointerEvents = "none";
        }
      }
    });
  }
}
