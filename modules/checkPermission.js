function CheckPerm(userArray, rolesArray) {
    checkBoolean = true
    userArray.every(role => {
        for (const i in rolesArray) {
            if (role === rolesArray[i]) {
                return checkBoolean = false 
            }    
        }   
        return checkBoolean = true 
    });
    return checkBoolean
}
exports.CheckPerm = CheckPerm