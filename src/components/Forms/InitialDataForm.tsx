import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { idIcon, mailIcon, phoneIcon } from "../../utils/icons";
import CustomButton from "../CustomButton/CustomButton";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import CustomInput from "../CustomInput/CustomInput";
import CustomSelect2 from "../CustomSelect/CustomSelect2";
import * as Yup from "yup";
import { docNumberRegExp, invalidCheck, invalidDocNumber, invalidDocType, invalidEmail, invalidPhoneNumber, listOfTypesOfDocuments, phoneRegExp, requiredErrorMessage } from "../../utils/ValidationResources";
import Logo from "../Logo/Logo";
import { navigateToCorrespondingStep } from "../../utils/functions";
import { ICosumterInitialData } from "../../utils/DataTypes";

interface IProps {
    formStep: number,
    previousStep: number,
    setFormStep: React.Dispatch<React.SetStateAction<number>>,
    setPreviousStep: React.Dispatch<React.SetStateAction<number>>,
    setCostumerDocNumber: React.Dispatch<React.SetStateAction<string>>,
}

const dataConfirmation = "Declaro bajo juramento que toda la información consignada en el presente formulario es fehaciente y he leído y acepto los términos de la Apertura de Cuenta Comitente";

function InitialDataForm (props: IProps) {    

    const [initialValues, setInitialValues] = useState<ICosumterInitialData>(() => {
        const retrievedData = localStorage.getItem('initialData');
        if (retrievedData) {
            const parsedData: ICosumterInitialData = JSON.parse(retrievedData);
            return parsedData;
        } else {
            return { phoneNumber: "", email: "", docType: "Tipo de Documento", docNumber: "", confirmedInformation: false,}
        }
    });

    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            phoneNumber: Yup.string().max(15, invalidPhoneNumber).matches(phoneRegExp, invalidPhoneNumber).required(requiredErrorMessage),
            email: Yup.string().email(invalidEmail).required(requiredErrorMessage),
            docType: Yup.string().oneOf(listOfTypesOfDocuments, invalidDocType).required(requiredErrorMessage),
            docNumber: Yup.string().matches(docNumberRegExp, invalidDocNumber).required(requiredErrorMessage),
            confirmedInformation: Yup.boolean().oneOf([true], invalidCheck).required(invalidCheck),
        }),
        onSubmit: (values) => {
            props.setFormStep(2);
            props.setPreviousStep(1);
            props.setCostumerDocNumber(formik.values.docNumber);
            localStorage.setItem("initialData", JSON.stringify(formik.values));        
            navigate('/personalData');
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        if (props.previousStep !== props.formStep + 1 && props.previousStep !== props.formStep - 1) {
            navigateToCorrespondingStep(props.formStep, 1, navigate);
        }        
    }, []);
    
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="flex justify-center mb-10">
                <Logo width={300}/>
            </div>
            <div className="w-80 h-full flex flex-col items-center">
                <CustomInput 
                    id="phoneNumber" 
                    value={formik.values.phoneNumber} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    showError={formik.touched.phoneNumber && (formik.errors.phoneNumber !== undefined)}
                    errorMessage={formik.errors.phoneNumber} 
                    type="text" 
                    icon={phoneIcon()} 
                    placeholder="Teléfono" 
                />
                <CustomInput 
                    id="email" 
                    value={formik.values.email} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    showError={formik.touched.email && (formik.errors.email !== undefined)}
                    errorMessage={formik.errors.email} 
                    type="text" 
                    icon={mailIcon()} 
                    placeholder="Email" 
                />
                <CustomSelect2 
                    id="docType" 
                    value={formik.values.docType} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    showError={formik.touched.docType && (formik.errors.docType !== undefined)}
                    errorMessage={formik.errors.docType} 
                    icon={idIcon()} 
                    itemsList={["DNI", "Pasaporte", "LC", "LE"]}
                    placeholder="Tipo de Documento" 
                />
                {/* <CustomSelect 
                    id="docType" 
                    value={formik.values.docType} 
                    onChange={formik.handleChange} 
                    placeholder="Tipo de Documento"
                    icon={idIcon()} 
                    itemsList={["DNI", "Pasaporte", "LC", "LE"]}/> */}
                <CustomInput 
                    id="docNumber" 
                    value={formik.values.docNumber} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    showError={formik.touched.docNumber && (formik.errors.docNumber !== undefined)}
                    errorMessage={formik.errors.docNumber} 
                    type="number" 
                    icon={idIcon()} 
                    placeholder="Número de Documento" 
                />
                <CustomCheckbox 
                    id="confirmedInformation" 
                    value={formik.values.confirmedInformation} 
                    onBlur={formik.handleBlur} 
                    showError={formik.touched.confirmedInformation && (formik.errors.confirmedInformation !== undefined)}
                    errorMessage={formik.errors.confirmedInformation}
                    text={dataConfirmation} 
                    onChange={formik.handleChange}
                />
                <CustomButton submit={true} buttonText="Próximo paso" iconName="rightArrowIcon" />
            </div>
        </form>
    );
}

export default InitialDataForm;