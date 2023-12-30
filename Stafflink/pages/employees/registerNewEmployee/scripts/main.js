import { allUtils } from "../../../../patternScripts/main.js";

allUtils.notes()
allUtils.sideMenu()

let firstLogin = false

if(
    allUtils.getLocalData('user')?.sector === undefined 
    && 
    allUtils.getLocalData('user')?.access?.sector === undefined 
    || 
    allUtils.getLocalData('user')?.access?.sector === null
) {
    firstLogin = true

    const sideMenu = document.getElementById("side_menu");
    const notes = document.getElementById("showNotes");
    const optionsHeader = document.querySelector("header .options");

    // sideMenu.style.display = 'none'
    // notes.style.display = 'none'
    // optionsHeader.style.display = 'none'

    sideMenu.remove()
    notes.remove()
    optionsHeader.remove()

    allUtils.toastAlert({
        message: 'ATENÇÃO', 
        description: 'Você é o primeiro funcionário no sistema, e por isso deve se cadastrar como funcionário primeiro! Caso já tenha criado a conta, volte ao login e entre com seus dados.', 
        className: 'info',
        options: {
            duration: -1
        }
    })
}

import { generateEmptyEmployeeForm, throwFormEvents } from '../../../../patternScripts/components/employeeForm/index.js'
import { getEmployee, saveEmployee, updateEmployee } from "../../../../patternScripts/api/stafflink.js";
import { setLocalData } from "../../../../patternScripts/localStorageControl/getData.js";
import { setSystemAccess } from "../../../../patternScripts/accessSystemControl/accessByRole.js";

const form = generateEmptyEmployeeForm()

document.querySelector('.formContainer').append(form)
throwFormEvents('newEmployee', saveNewEmployee)

function saveNewEmployee() {
    const allElements = form.querySelectorAll('input, select')
    const employeeData = new FormData()

    allElements.forEach(element => {
        if(element.type == 'checkbox') {
            if(element.checked) {
                employeeData.append('benefits', element.id)
                element.checked = false
            }
        } else if(element.type == 'file') {
            employeeData.append('image', element.files[0])

            // Limpando
            const previewImage = document.getElementById('preview')
            previewImage.src = '#'
            
            const fileName = document.getElementById('fileName')
            fileName.textContent = fileName.getAttribute('data-default-text')

        } else {
            employeeData.append(element.name, element.value)
            element.value = ""
        }
    })

    form.querySelector('input').focus()

    if(firstLogin) {
        const currentUser = allUtils.getLocalData('user')

        updateEmployee(currentUser.user.id, employeeData).then(() => {
            getEmployee(currentUser.user.id).then((data) => {
                allUtils.toastAlert({message: 'Tudo certo', description: 'Seus dados foram atualizados! Aguarde que logo a página será recarregada e o acesso liberado!'})
                
                fetch(`https://stafflink-chat-server.onrender.com/updateUser/${currentUser.user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'Application/json'
                    },
                    body: JSON.stringify({
                        username: currentUser.user.name,
                        email: currentUser.user.email, 
                        password: currentUser.user.password,
                        avatarImage: currentUser.user.employeephotoname
                    })
                }).then(() => {
                    setLocalData('user', {
                        user: {...data},
                        access: true
                    })
                    setSystemAccess().then(() => {
                        window.location.reload()
                    })
                })
            })
        })
    } else {
        saveEmployee(employeeData)
        .then(() => {
            allUtils.toastAlert({message: 'Sucesso!', description: 'Novo funcionário cadastrado', className: 'success'})
        })
        .catch((error) => console.log(`Algo deu errado. Erro: ${error.message}`))
    }
}