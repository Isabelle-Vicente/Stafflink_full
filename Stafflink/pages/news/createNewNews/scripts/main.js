import { saveNews } from "../../../../patternScripts/api/stafflink.js";
import { allUtils } from "../../../../patternScripts/main.js";

allUtils.sideMenu()
allUtils.notes()

const bannerFileInput = document.getElementById('bannerFile') 
const previewImage = document.getElementById('preview')
const fileName = document.getElementById('fileName')
const form = document.getElementById('registerNewNews')
const clearButton = document.getElementById('clear')

bannerFileInput.addEventListener('change', () => {
    if(!bannerFileInput.files[0]) return

    previewImage.src = URL.createObjectURL(bannerFileInput.files[0])

    fileName.textContent = bannerFileInput.files[0].name
})

clearButton.addEventListener('click', () => {
    previewImage.src = '#'
    fileName.textContent = fileName.getAttribute('data-default-text')
    form.querySelector('input').focus()
})

form.addEventListener('submit', (ev) => {
    ev.preventDefault()

    const allInputs = form.querySelectorAll('input, textarea')
    let allData = new FormData()

    allInputs.forEach(element => {
        if(element.type == 'file') {
            allData.append("image", element.files[0])

            // Limpando os valores
            previewImage.src = '#'
            fileName.textContent = fileName.getAttribute('data-default-text')
        } else {
            allData.append(element.name, element.value)

            // Limpando os valores
            element.value = ""
        }
    })
    form.querySelector('input').focus();

    saveNews(allData)
    .then(() => {
        allUtils.toastAlert({message: 'Sucesso!', description: 'Notícia cadastrada', className: 'success'})
    })
    .catch(error => {
        console.log(error.message)
    })
})
