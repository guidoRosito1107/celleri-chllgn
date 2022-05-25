export const requiredErrorMessage = "* Debe completar este campo.";
export const invalidPhoneNumber = "* Numero no válido.";
export const invalidEmail = "* Email no válido.";
export const invalidDocType = "* Tipo de documento no válido.";
export const invalidDocNumber = "* Documento no válido.";
export const invalidCheck = "* Debe tildar este campo.";

export const invalidFirstName = "* Nombre no válido.";
export const invalidSecondName = "* Segundo nombre no válido.";
export const invalidLastName = "* Apellido no válido.";
export const invalidCuitOrCuil = "* Cuit/Cuil no válido."
export const invalidGender = "* Género no válido.";
export const invalidNationality = "* Nacionalidad no válida.";
export const invalidBirthCountry = "* País no válido.";
export const invalidBirthDate = "* Fecha no válida.";

export const invalidCountry = "* País no válido.";
export const invalidProvince = "* Provincia no válida.";
export const invalidCity = "* Ciudad no válida.";
export const invalidStreet = "* Calle no válida.";
export const invalidNumber = "* Altura no válida.";
export const invalidFloorAndApt = "* Piso no válido.";
export const invalidZipCode = "* Código Postal no válido."; 

export const invalidConditions = "* Selección no válida.";

export const invalidCbu = "* CBU/CVU no válido (debe contener 22 dígitos).";
export const invalidAccountType = "* Seleccion un tipo de cuenta.";
export const invalidCurrency = "* Seleccione una moneda.";
export const invalidEntity = "* Entidad no válida.";


// Regular Expressions and Lists
export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const docNumberRegExp = /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/
export const cuitOrCuilRegEx = /^(20|23|27|30|33)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/;
export const listOfTypesOfDocuments = ["DNI", "Pasaporte", "LC", "LE"];
export const listOfAccountTypes = ["Caja de Ahorro", "Cuenta Corriente", "Otro"];
export const listOfCurrencies = ["ARS", "USD", "Bimonetaria"];
export const cbuRegExp = /^[0-9]{22}$/

export const validConditions = (question1Values: boolean[]) => {
    if (question1Values[0] === true && question1Values[1] === true && question1Values[2] === true && question1Values[3] === true) {return false;}
    if (question1Values[0] === true && question1Values[1] === false && question1Values[2] === false && question1Values[3] === true) {return false;}
    if (question1Values[0] === true && question1Values[1] === true && question1Values[2] === false && question1Values[3] === true) {return false;}
    if (question1Values[0] === false && question1Values[1] === true && question1Values[2] === false && question1Values[3] === true) {return false;}
    if (question1Values[0] === false && question1Values[1] === true && question1Values[2] === true && question1Values[3] === true) {return false;}
    if (question1Values[0] === false && question1Values[1] === false && question1Values[2] === true && question1Values[3] === true) {return false;}
    if (question1Values[0] === false && question1Values[1] === false && question1Values[2] === false && question1Values[3] === false) {return false;}
    return true;
}