import { getCepInfos } from "./api/viacep.js";
import { notesControl } from "./components/notes/index.js";
import { sideMenuControl } from "./components/sideMenu/index.js";
import { employeeTableActions } from "./components/tableActions/index.js";
import { showToastAlert, showToastConfirm, showToastPrompt } from "./components/toastMessages/index.js";
import { getLocalData, setLocalData, deleteLocalData } from "./localStorageControl/getData.js";
import { accessControl } from "./windowControl/accessByDevice.js";
import { mobileDeviceVerify } from "./windowControl/device.js";
import { getCurrentPagePath, setCurrentPagePath, handlePageByLink } from "./windowControl/location.js";

const allCustomLinks = document.querySelectorAll("[data-link-to]");
allCustomLinks?.forEach((element) => handlePageByLink(element));

const allImages = document.querySelectorAll('img')

allImages.forEach(image => {
    image.addEventListener('load',() => {
        image.onerror = () => {
            if(image.id !== 'preview') {
                image.src = '/assets/images/Stafflink_favicon_dark.svg'
            }
        }
    })
})

export const allUtils = {
    sideMenu: sideMenuControl,
    employeeTableActions: employeeTableActions,
    access: accessControl,
    setLocalStorage: setLocalData,
    getLocalData: getLocalData,
    deleteLocalData: deleteLocalData,
    isMobile: mobileDeviceVerify,
    getPage: getCurrentPagePath,
    setPage: setCurrentPagePath,
    // handlePageByCustomLink: handlePageByLink,
    notes: notesControl,
    getCepInfos: getCepInfos,
    numberBRLFormater: Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL'}),
    toastAlert: showToastAlert,
    toastConfirm: showToastConfirm,
    toastPrompt: showToastPrompt
}