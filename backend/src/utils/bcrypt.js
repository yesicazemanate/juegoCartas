import bcrypt from 'bcrypt';
const EncriptacionContra = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const encriptada = await bcrypt.hash(password, salt);
    return encriptada;
};
 const ComparacionContra = async (contraEntrada, Password) => {
    return await bcrypt.compare(contraEntrada, Password);
};

export{
    EncriptacionContra,
    ComparacionContra
}