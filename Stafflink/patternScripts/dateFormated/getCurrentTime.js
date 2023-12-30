export const getCurrentTimeFormated = () => {
    const date = new Date()
    const hour = ('0' + String(date.getHours())).slice(-2)
    const minutes = ('0' + String(date.getMinutes())).slice(-2)
    const time = `${hour}:${minutes}`
    return time
}