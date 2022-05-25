export interface ICosumterInitialData {
    phoneNumber: string,
    email: string,
    docType: string,
    docNumber: string,
    confirmedInformation: boolean,
}

export interface ICostumerPersonalData {
    firstName: string;
    secondName: string;
    lastName: string;
    cuilOrCuit: string;
    gender: string;
    nationality: string;
    birthCountry: string;
    birthDate: string;
}

export interface ICostumerAddressData {
    country: string,
    province: string,
    city: string,
    street: string,
    number: string,
    floorAndApt: string,
    zipCode: string,
}

export interface ICostumerLegalData {
    question1Values: boolean[],
    question2Values: string,
    question3Values: string,
}

export interface ICostumerBankData {
    cbu: string,
    accountType: string,
    currency: string,
    entity: string,
}