//validation messages
let messages = {
    required: 'Este campo es requerido',
    numeric: 'Este campo solo permite valores numéricos',
    alpha: 'Este campo solo puede contener caracteres alfabéticos',
    minLength: 'Este campo no cumple con la cantidad mínima de caracteres',
    maxLength: 'Este campo ha excedido el límite de caracteres',
    email: 'El formato del correo es incorrecto',
    password: 'La longitud de la contraseña debe ser mínimo de 10 caracteres. Recuerde que la contraseña no puede incluir espacios y debe tener al menos una letra minúscula, una letra mayúscula, un número y un caracter especial.',
    name: 'Este campo solo puede contener caracteres alfabéticos y debe tener entre 3 y 50 caracteres'
}

let validations = {
    //validate numeric inputs
    numeric: function(v) {
        if(v!=="") return /(^[0-9]*$)/.test(v)
        else return true
    },
    //validate document numbers (6 to 20 numeric chars)
    documentNumber: function(v) {
        if(v!=="") return /(^[0-9]{6,20}$)/.test(v)
        else return true
    },
    //Validate text alphabetic
    alpha: function(v) {
        return /^[A-Za-záéíóúüÁÉÍÓÚÜ'\s\xF1\xD1]+$/.test(v)
    },
    //Validate text alphanumeric
    alphaNumeric: function(v) {
        return /^[a-zA-Z0-9]+$/.test(v)
    },
    //Validate Email format
    email: function(v) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(v.toLowerCase())
    },
    //Validate UserName between 3 y 30 chars
    name: function(v) {
        return /^[A-Za-záéíóúüÁÉÍÓÚÜ'\s\xF1\xD1]{3,50}$/.test(v)
    },
    //Validate password higher than 10 chars, one letter upercase, one digit and caracter special
    password: function(v){
        return /^((?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[-_@.,;+{}()/*&%$#!¡¿?'|áéíóúÁÉÍÓÚ])(?!.*?[ ])).{10,}$/.test(v)
    }
}

module.exports = {
    messages,
    validations
}
