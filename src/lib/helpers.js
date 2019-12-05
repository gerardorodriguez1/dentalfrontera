const bcrypt = require('bcryptjs');

const helpers = {};

//Se encripta la contraseña, el resultado final del encrypt es HASH
helpers.encryptPassword = async  (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

//validar sesiones con contraseñas

helpers.matchPassword = async (password, savedPassword) => {
    try{
        return await bcrypt.compare(password, savedPassword);
    } catch(e){
        console.log(e);
    }
};

module.exports = helpers;