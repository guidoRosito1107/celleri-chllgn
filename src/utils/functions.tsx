import { NavigateFunction } from "react-router-dom";
import { ICosumterInitialData } from "./DataTypes";
import { bankIcon, currencyIcon, houseIcon, idIcon, mailIcon, phoneIcon, rightArrowIcon, userIcon } from "./icons"

export const getIcon = (iconName: string) => {
    switch (iconName) {
        case 'phoneIcon': return phoneIcon();
        case 'mailIcon': return mailIcon();
        case 'idIcon': return idIcon();
        case 'currencyIcon': return currencyIcon();
        case 'bankIcon': return bankIcon();
        case 'rightArrowIcon': return rightArrowIcon(); 
        case 'userIcon': return userIcon();    
        case 'houseIcon': return houseIcon();   
    }
}

export const navigateToCorrespondingStep = (actualStep:number, thisFormStep: number, navigate: NavigateFunction ) => {
    if (actualStep !== thisFormStep) {
        switch (actualStep) {
            case 0: navigate('/'); break;
            case 1: navigate('/initialData'); break;
            case 2: navigate('/personalData'); break;
            case 3: navigate('/personalAddressData'); break;
            case 4: navigate('/legalData'); break;
            case 5: navigate('/bankData'); break;
            case 6: navigate('/finishPersonalData'); break;
            case 7: navigate('/startProofOfLife'); break;
            case 8: navigate('/frontDocument'); break;
            case 9: navigate('/backDocument'); break;
            case 10: navigate('/selfie'); break;
            case 11: navigate('/end'); break;
        }
    }
}

export const getInitialValuesFromLocalStorage = (key: string) => {
    const retrievedData = localStorage.getItem(key);
    if (retrievedData) {
        switch (key) {
            case 'initialData': 
                const parsedData: ICosumterInitialData = JSON.parse(retrievedData);
        }
        return JSON.parse(retrievedData);
    } else {
        return null;
    }
}