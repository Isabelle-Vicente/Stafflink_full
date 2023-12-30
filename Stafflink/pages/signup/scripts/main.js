import { saveEmployee, signUpInterprise } from "../../../patternScripts/api/stafflink.js";
import { allUtils } from "../../../patternScripts/main.js";

// url para a API de cep:
// viacep.com.br/ws/01001000/json/

const firstStepFields = getCurrentFields()

function getCurrentFields() {
    return document.querySelectorAll('.fieldsContainer.visible input')
}

const allStepCounters = [...document.querySelectorAll('.step')]
const fieldsContainers = [...document.querySelectorAll('.fieldsContainer')]
let currentStep = 1
let chengeStepConfirm = true

let allData = {}

const steps = {
    1: {},
    2: {},
    3: {},
    4: {},
}

firstStepFields.forEach(inp => steps['1'][inp.name] = inp)

const form = document.querySelector('form')

const nextStepButton = document.getElementById('continue')

const previousStepButton = document.getElementById('back')
previousStepButton.addEventListener('click', async () => {
    if(currentStep <= 1) {
        const backToLogin = await allUtils.toastConfirm({message: 'Confirme', description: 'Deseja voltar para a página de login?'})
        .then((result) => result)
        .catch((result) => result)

        backToLogin && (window.location.href = '/')
        return 
    }

    nextStepButton.textContent != 'Continuar' && (nextStepButton.textContent = 'Continuar')

    getCurrentFields().forEach((inp, key, node) => {
        node[0].focus()
        inp.required = false
    })

    currentStep > 1 && (currentStep-- && changeStep())
})

const clearButton = document.getElementById('clear')
clearButton.addEventListener('click', (ev) => {
    ev.preventDefault()

    getCurrentFields().forEach((inp, key, node) => {
        inp.value = ''
        node[0].focus()
    })
})

function changeStep() {
    
    allStepCounters.forEach(step => {
        if(allStepCounters.indexOf(step) + 1 == currentStep) {
            step.classList.toggle('active')
        } else {
            step.classList.remove('active')
        }
    })

    fieldsContainers.forEach(container => {
        if(fieldsContainers.indexOf(container) + 1 == currentStep) {
            container.classList.toggle('visible')
        } else {
            container.classList.remove('visible')
        }
    })

    currentStep == 2 && cepControl()
    currentStep == 3 && passwordControl()

    getCurrentFields().forEach((inp, key, node) => {
        node[0].focus()
        inp.required = true
    })
}

function cepControl() {
    const cepInput = document.getElementById('cep')

    cepInput.addEventListener('keyup', () => {
        if(cepInput.value.length == 8) {
            allUtils.getCepInfos(cepInput.value).then(cepInfos => {
                if(cepInfos.erro) {
                    cepInput.style.borderColor = "red"
                    cepInput.style.outlineColor = "red"
                    return
                }
                cepInput.style.borderColor = "green"
                cepInput.style.outlineColor = "green"

                getCurrentFields().forEach(inp => {
                    switch(inp.name) {
                        case 'address':
                            inp.value = cepInfos.logradouro
                            break
                        case 'neighborhood':
                            inp.value = cepInfos.bairro
                            break
                        case 'city':
                            inp.value = cepInfos.localidade
                            break
                        case 'state':
                            inp.value = cepInfos.uf
                            break
                    }
                })

            }).catch(error => console.log(error))
        }
    })
}

// pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$"

function passwordControl() {
    getCurrentFields().forEach(inp => {
        let correct = false
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/gm 
        
        if(inp.type != 'password' && (inp.name !== 'password' || 'confirmPassword')) return

        if(inp.name == 'password') {
            inp.addEventListener('keyup', () => {
                correct = RegExp(regex).test(inp.value)

                if(!correct) {
                    inp.style.borderColor = 'red'

                    document.querySelector('.spanAlert.password').style.display = 'block'
                } else {
                    inp.style.borderColor = 'green'
                    document.querySelector('.spanAlert.password').style.display = 'none'
                }
            })
        } else if(inp.name == 'confirmPassword') {
            inp.addEventListener('keyup', () => {
                const passwordInput = [...getCurrentFields()].filter(element => element.name == 'password')[0]

                if(inp.value !== passwordInput.value) {
                    inp.style.borderColor = 'red'

                    document.querySelector('.spanAlert.confirmPassword').style.display = 'block'

                    chengeStepConfirm = false
                } else {
                    inp.style.borderColor = 'green'

                    document.querySelector('.spanAlert.confirmPassword').style.display = 'none'

                    chengeStepConfirm = true
                }
            })
        }
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    if(!chengeStepConfirm) return

    if(currentStep <= 3) {
        currentStep == 3 && (nextStepButton.textContent = 'Finalizar')
        currentStep++  

        changeStep()
        return
    }

    document.getElementById("loader").style.display = 'inline-block';
    document.getElementById("continue").style.display = "none";

    const allInputs = document.querySelectorAll('.fieldsContainer input')
    
    allInputs.forEach((inp) => {
        allData[inp.name] = inp.value
    })

    Promise.all([
        signUpInterprise(allData),
        saveEmployee({
            email: allData.email,
            password: allData.password
        })
    ])
    .then(() => {
        document.getElementById("loader").style.display = 'none';
        document.getElementById("continue").style.display = "block";

        allUtils.toastAlert({message: 'Tudo certo', description: 'Cadastro finalizado', className: 'info'}).then(() => {
            window.location.href = '/'
        })
    })
    .catch((error) => {
        document.getElementById("loader").style.display = 'none';
        document.getElementById("continue").style.display = "block";
        
        allUtils.toastAlert({message: 'Algo deu errado', description: 'Favor, tente novamente', className: 'danger'})

        console.log(`Algo deu errado. Erro: ${error.message}`)
    })
})