export const isGoodPassword = value => {
    //Valida que pwssaord tenga 6-12 caracteres, minimo con 1 num, 1 min, 1 may
     const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/;
     //Retorna si regex es true o false.
     return regex.test(value)
}