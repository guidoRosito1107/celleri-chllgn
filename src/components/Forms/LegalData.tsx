import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import { validConditions } from "../../utils/ValidationResources";
import Logo from "../Logo/Logo";
import { navigateToCorrespondingStep } from "../../utils/functions";
import CustomCheckboxSecondary from "../CustomCheckbox/CustomCheckboxSecondary";
import CustomRadio from "../CustomRadio/CustomRadio";
import { ICostumerLegalData } from "../../utils/DataTypes";

interface IProps {
    formStep: number,
    previousStep: number,
    setPreviousStep: React.Dispatch<React.SetStateAction<number>>,
    setFormStep: React.Dispatch<React.SetStateAction<number>>,
}

const question1 = "¿Cumplís alguna de las siguientes condiciones?";
const question2 = "¿Tributas en otro país además de Argentina?";
const question3 = "¿Sus fondos provienen de orígenes lícitos?";

function LegalDataForm (props: IProps) {

    const [question1Values, setQuestion1Values] = useState<boolean[]>(() => {
        const retrievedData = localStorage.getItem('legalData');
        if (retrievedData) {
            const parsedData: ICostumerLegalData = JSON.parse(retrievedData);
            return parsedData.question1Values;
        } else {
            return [false, false, false, false];
        }
    });    
    const [question2Values, setQuestion2Values] = useState<string>(() => {
        const retrievedData = localStorage.getItem('legalData');
        if (retrievedData) {
            const parsedData: string = JSON.parse(retrievedData).question2Values;
            return parsedData;
        } else {
            return "";
        }
    });
    const [question3Values, setQuestion3Values] = useState<string>(() => {
        const retrievedData = localStorage.getItem('legalData');
        if (retrievedData) {
            const parsedData: string = JSON.parse(retrievedData).question3Values;
            return parsedData;
        } else {
            return "";
        }
    });
    const [showError1, setShowError1] = useState<boolean>(false);
    const [showError2, setShowError2] = useState<boolean>(false);
    const [showError3, setShowError3] = useState<boolean>(false);

    let navigate = useNavigate();

    useEffect(() => {
        if (props.previousStep !== props.formStep + 1 && props.previousStep !== props.formStep - 1) {
            navigateToCorrespondingStep(props.formStep, 4, navigate);
        }
    }, []);

    const handleChangeCheckbox = (e: any) => {
        let clonedValues = [...question1Values];
        switch (e.target.id) {
            case 'SOI': clonedValues[0] = e.target.checked; break; 
            case 'PEP': clonedValues[1] = e.target.checked; break;
            case 'FATCA': clonedValues[2] = e.target.checked; break;
            case 'Ninguna': clonedValues[3] = e.target.checked; break;
        }
        setQuestion1Values(clonedValues);
    };

    const handleRadio = (e: any) => {
        console.log(e.target.name);
        console.log(e.target.id)
        if (e.target.name === "radio1") {
            setQuestion2Values(e.target.id)
        } else {
            setQuestion3Values(e.target.id)
        }
    }

    const handleSubmit = (e: any) => {
        if (validConditions(question1Values) && question2Values !== "" && question3Values === "Si") {
            localStorage.setItem("legalData", JSON.stringify({question1Values: question1Values, question2Values: question2Values, question3Values: question3Values}));        
            navigate('/bankData');
        } else {
            if (!validConditions(question1Values)) {setShowError1(true)} else {setShowError1(false)};
            if (question2Values !== "Si") {setShowError2(true)} else {setShowError2(false)};
            if (question3Values !== "Si") {setShowError3(true)} else {setShowError3(false)};
            e.preventDefault();
        }        
    }
    
    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-[19rem]">
            <div className="flex justify-center mb-4">
                <Logo width={160}/>
            </div>
            <div>
                <p className="mb-2 text-fontGray font-semibold text-lg ">{question1}</p>
                <CustomCheckboxSecondary id="question1" listItems={["SOI","PEP","FATCA","Ninguna"]} showError={showError1} onChange={handleChangeCheckbox} value={question1Values}/>   
            </div>
            <div>
                <p className="mb-2 text-fontGray font-semibold text-lg ">{question2}</p>
                <CustomRadio id="radio1" onChange={handleRadio} itemsList={["Si", "No"]} showError={showError2} value={question2Values} errorMessage="Debe seleccionar uno de los dos"/>
            </div>
            <div>
                <p className="mb-2 text-fontGray font-semibold text-lg ">{question3}</p>
                <CustomRadio id="radio2" onChange={handleRadio} itemsList={["Si", "No"]} showError={showError3} value={question3Values} errorMessage="Debe seleccionar Sí para continuar"/>
            </div>
            <div className="mt-4 flex justify-center">
                <CustomButton submit={true} buttonText="Próximo paso" iconName="rightArrowIcon" />
            </div>
        </form>
    );
}

export default LegalDataForm;