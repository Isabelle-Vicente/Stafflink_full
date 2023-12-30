import { getEmployee } from "../api/stafflink.js";
import { getLocalData, setLocalData } from "../localStorageControl/getData.js";

export const setSystemAccess = async () => {
    const currentUser = getLocalData('user')

    await getEmployee(currentUser.user.id).then(employee => {
        const sectorAccess = employee.sector
        const roleAccess = employee.office

        const accessLevel = accessLevelControl(sectorAccess, roleAccess)
        
        setLocalData('user', {
            ...currentUser,
            access: {
                sector: sectorAccess,
                role: roleAccess,
                level: accessLevel
            }
        })
    })

    return getLocalData('user')
}

function accessLevelControl (sectorAccess) {
    const levels = {
        'Administrativo': 1,
        'Recursos Humanos': 2,
        'Financeiro': 3
    }

    return levels[sectorAccess] ?? 3
}