export const getLocalData = (variableName) => {
    const jsonData = localStorage.getItem(variableName)
    const result = JSON.parse(jsonData)

    return result
}

export const setLocalData = (variableName, variableValue) => {
    const jsonData = JSON.stringify(variableValue)
    localStorage.setItem(variableName, jsonData)
}

export const deleteLocalData = (variableName) => {
    localStorage.removeItem(variableName)
}