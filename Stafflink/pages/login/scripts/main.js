import { setSystemAccess } from "../../../patternScripts/accessSystemControl/accessByRole.js";
import { getEmployee } from "../../../patternScripts/api/stafflink.js";
import { allUtils } from "../../../patternScripts/main.js";

// allUtils.access({user: {access}})

const form = document.getElementById('loginContainer').querySelector('form')

form.addEventListener('submit', async (event) => {
    document.getElementById("loader").style.display = 'inline-block';
    document.getElementById("btnLogin").style.display = "none";

    event.preventDefault()

    const email = event.target.querySelector('input[type=email]')
    const password = event.target.querySelector('input[type=password]')

    const networkAlert = setTimeout(() => {
        allUtils.toastAlert({message: 'Problema de conexão', description: 'Recarregue a página e tente novamente', className: 'info'})

        document.getElementById("loader").style.display = 'none';
        document.getElementById("btnLogin").style.display = "block";
    }, 60 * 1000)

    const foundEmployee = await getEmployee(null, {email: email.value, password: password.value})
    .then(employee => {
        allUtils.setLocalStorage('user', {
            user: {
                ...employee,
                name: employee?.name ?? 'Administrador',
                office: employee?.office ?? 'Administrador'
            }, 
            access: true
        })

        return employee ?? false
    })
    .catch((error) => {
        allUtils.toastAlert({message: 'Parece que algo deu errado', description: 'Favor, tente novamente', className: 'info'})

        clearTimeout(networkAlert)
        
        document.getElementById("loader").style.display = 'none';
        document.getElementById("btnLogin").style.display = "block";
    })

    if(!foundEmployee) {
        email.style.borderColor = "red"
        password.style.borderColor = "red"

        allUtils.toastAlert({message: 'Dados inválidos', description: 'Senha e/ou e-mail estão incorretos.', className: 'danger'})

        document.getElementById("loader").style.display = 'none';
        document.getElementById("btnLogin").style.display = "block";
        return
    }

    email.style.borderColor = "green"
    password.style.borderColor = "green"

    const user = await setSystemAccess()
    const access = user?.access
    const sector = access?.sector


    if(sector === 'Recursos Humanos') {
        allUtils.setPage('employees')
    } else if(sector === null || sector === undefined) {
        // Primeiro acesso
        allUtils.setPage('employees/registerNewEmployee')
    } else {
        allUtils.setPage('attendanceEmployee')
    }
    
    document.getElementById("loader").style.display = 'none';
    document.getElementById("btnLogin").style.display = "block";
})