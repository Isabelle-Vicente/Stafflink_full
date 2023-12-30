import { allUtils } from "../../../patternScripts/main.js";

const watchVideo = document.getElementById('watchVideo')
const goToSignup = document.getElementById('goToSignup')
const goToLogin = document.getElementById('goToLogin')

watchVideo.addEventListener('click', () => {
    document.querySelector('.welcome').classList.remove('visible')
    document.querySelector('.video').classList.add('visible')

    document.querySelector('main').style.alignItems = "center"
    document.querySelector('main').style.marginTop = "0"
})

goToLogin.addEventListener('click', () => {
    window.location.href = '/'
})