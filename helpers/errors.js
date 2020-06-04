//Get an unformatted error and convert to send client response
function processErrors(err) {
  let errors
  if (err.errors) {
    //mongoose errors array
    for (let errKey in err.errors) {
      err.errors[errKey] = err.errors[errKey].message
    }
    delete err['_message'];
  } else if (err.code === 11000) {
    let field = err.message.split("index: ")[1];
    field = field.split("_")[0];
    errors = {
      [field]: `Este ${field === 'email' ? 'correo' : field} ya ha sido registrado`
    }
    err.errors = errors;
    delete err['code'];
    delete err['errmsg'];
    delete err['driver'];
    delete err['index'];
  } else if (err.name === 'CastError') {
    //mongoose bad formatted objects
    errors = {
      [err.path]: 'El formato no es válido (' + err.path + ' : ' + err.value + ')'
    }
    err.errors = errors;
    err.message = 'El formato no es válido';
    delete err['stringValue'];
    delete err['kind'];
    delete err['value'];
    delete err['path'];
  }
  return err;
}

module.exports = {
  processErrors
}
