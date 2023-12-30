export function showToastAlert(props) {
    return new Promise((resolve) => {
        createCustomToastfy({
            ...props, 
            confirmActions: {onClickConfirm: resolve}
        }).showToast()
    });
}

export function showToastConfirm(props) {
    return new Promise((resolve, reject) => {
        createCustomToastfy({
            ...props, 
            options: {
                ...props,
                duration: -1,
            },
            confirmActions: {onClickConfirm: resolve, onClickCancel: reject}
        }).showToast()
    });
}

export function showToastPrompt(props) {
    return new Promise((resolve, reject) => {
        createCustomToastfy({
            ...props,
            options: {
                ...props,
                duration: -1,
            },
            confirmActions: {...props, promptEvent: resolve, onClickConfirm: resolve}
        }).showToast()
    });
}

function createCustomToastfy({
    message = 'Alertaaa',
    description = 'O alerta foi chamado.',
    className = 'info',
    confirmActions = false,
    options = {
        duration: 3000,
        gravity: "top",
        position: "right",
        close: true,
    },
    styles,
}) {
    const customToast = Toastify({
        text: message,
        ...{
            duration: 5000,
            gravity: "top",
            position: "right",
            close: true,
            ...options,
        },
        className,
        style: {
            ...styles ?? {},
        },
        node: createToastElements(message, description, {promptInputPlaceholder: confirmActions?.promptInputPlaceholder, promptEvent: confirmActions?.promptEvent, confirmEvent: confirmActions?.onClickConfirm, cancelEvent: confirmActions?.onClickCancel})
    })

    return customToast
}

function createToastElements(message, description, {promptInputPlaceholder, promptEvent, confirmEvent, cancelEvent}) {
    const allElements = []
    const toastContainer = document.createElement('div')

    const messageContainer = document.createElement('div')
    messageContainer.className = 'messageContainer'
    
    const title = document.createElement('h1')
    title.innerText = message

    const paragraph = document.createElement('p')
    paragraph.innerText = description

    messageContainer.append(title, paragraph)
    allElements.push(messageContainer)

    const optionsContainer = document.createElement('div')
    optionsContainer.className = 'optionsContainer'

    if(cancelEvent) {
        const closeButton = document.createElement('button')
        closeButton.innerText = 'Cancelar'
        closeButton.className = 'closeButton'
    
        closeButton.addEventListener('click', () => {
            if(cancelEvent) {
                cancelEvent(false)
            }
    
            document.querySelector('.toastify').remove()
        })

        optionsContainer.appendChild(closeButton)
    } 

    if(promptInputPlaceholder && promptEvent) {
        const input = document.createElement('input')
        input.type = 'text'
        input.placeholder = promptInputPlaceholder
        input.id = 'prompt_input'

        optionsContainer.appendChild(input)
    }

    const confirmButton = document.createElement('button')
    confirmButton.innerText = promptInputPlaceholder ? 'Confirmar' : 'Ok'
    confirmButton.className = 'confirmButton'

    confirmButton.addEventListener('click', () => {
        if(confirmEvent) {

            if(promptInputPlaceholder && promptEvent) {
                const inputElement = document.getElementById('prompt_input').value
                promptEvent(inputElement)
            } else {
                confirmEvent(true)
            }
        }

        document.querySelector('.toastify').remove()
    })
    
    optionsContainer.appendChild(confirmButton)

    allElements.push(optionsContainer)

    toastContainer.append(...allElements)

    return toastContainer
}