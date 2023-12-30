import { getLocalData, setLocalData } from "../../../patternScripts/localStorageControl/getData.js";
import { allUtils } from "../../../patternScripts/main.js";
allUtils.access()

allUtils.sideMenu()

import { buildFilledEmployeeForm, throwFormEvents } from "../../../patternScripts/components/employeeForm/index.js";
import { getEmployee, updateEmployee } from "../../../patternScripts/api/stafflink.js";
import { setUserInfos } from "../../../patternScripts/components/sideMenu/index.js";
import { setSystemAccess } from "../../../patternScripts/accessSystemControl/accessByRole.js";

const currentUser = getLocalData('user').user

const currentUserForm = buildFilledEmployeeForm(currentUser, 'updateUserData')
currentUserForm.querySelector('#register').textContent = 'Atualizar dados'

document.querySelector('.formContainer').append(currentUserForm)

const allElements = currentUserForm.querySelectorAll('input, select')
let dataHasChanged = false

allElements.forEach(element => {
    element.addEventListener('change', () => {
        if(dataHasChanged !== true) {
            dataHasChanged = true
        }
    })
})


throwFormEvents(currentUserForm.id, updateUserData)

function updateUserData(event) {
    document.getElementById("loader").style.display = 'inline-block';
    document.getElementById("register").style.display = "none";

    const employeeData = new FormData()

    allElements.forEach(element => {
        if(element.type == 'checkbox') {
            if(element.checked) {
                employeeData.append('benefits', element.id)
            }
        } else if(element.type == 'file') {
            employeeData.append('image', element.files[0])
        } else {
            employeeData.append(element.name, element.value)
        }
    })

    if(dataHasChanged !== true) {
        return
    }

    updateEmployee(currentUser.id, employeeData)
    .then(() => {
        getEmployee(currentUser.id).then(data => {
            const newData = {...data}

            setLocalData('user', {
                ...getLocalData('user'),
                user: {
                    ...newData
                }
            })

            setSystemAccess()
            setUserInfos()
        })

        document.getElementById("loader").style.display = 'none';
        document.getElementById("register").style.display = "block";

        allUtils.toastAlert({message: 'Tudo certo', description: 'Seus dados foram alterados', className: 'info'})
    })
    .catch((error) => {
        allUtils.toastAlert({message: 'Algo deu errado', description: error.message, className: 'danger'})

        console.log(`Algo deu errado. Erro: ${error.message}`)
    })
}