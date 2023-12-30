export const mobileDeviceVerify = () => {
    const userAgent = window.navigator.userAgent
    const regExp = RegExp(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini))/gm)
    const maxWidthForMobile = 780
    return userAgent.match(regExp) || window.innerWidth < maxWidthForMobile ? true : false
}
