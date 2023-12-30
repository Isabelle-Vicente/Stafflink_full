export const getCepInfos = async (cep) => {
    return await fetch(`https://viacep.com.br/ws/${cep}/json`).then(result => result.json())
}