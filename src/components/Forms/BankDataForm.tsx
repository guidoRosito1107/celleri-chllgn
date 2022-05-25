import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getIcon, navigateToCorrespondingStep } from "../../utils/functions";
import CustomButton from "../CustomButton/CustomButton";
import CustomInput from "../CustomInput/CustomInput";
import CustomInputPersData from "../CustomInput/CustomInputPersData";
import * as Yup from "yup";
import { cbuRegExp, invalidAccountType, invalidCbu, invalidCurrency, invalidEntity, listOfAccountTypes, listOfCurrencies, requiredErrorMessage } from "../../utils/ValidationResources";
import { bankIcon, currencyIcon } from "../../utils/icons";
import CustomSelect2 from "../CustomSelect/CustomSelect2";
import Logo from "../Logo/Logo";
import { ICostumerBankData } from "../../utils/DataTypes";

interface IProps {
    formStep: number,
    previousStep: number,
    setPreviousStep: React.Dispatch<React.SetStateAction<number>>,
    setFormStep: React.Dispatch<React.SetStateAction<number>>,
}

const emptyBankData = {
    cbu: "",
    accountType: "Tipo de Cuenta",
    currency: "Moneda",
    entity: "",
};

function BankDataForm (props: IProps) {

    const [retrievedValues, setRetrievedValues] = useState<ICostumerBankData>(() => {
        const retrievedData = localStorage.getItem('bankData');
        if (retrievedData) {
            const parsedData: ICostumerBankData = JSON.parse(retrievedData);
            return parsedData;
        }  else {
            return emptyBankData;
        }
    });

    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: retrievedValues,
        validationSchema: Yup.object({
            cbu: Yup.string().matches(cbuRegExp, invalidCbu).required(requiredErrorMessage),
            accountType: Yup.string().oneOf(listOfAccountTypes, invalidAccountType).required(requiredErrorMessage),
            currency: Yup.string().oneOf(listOfCurrencies, invalidCurrency).required(requiredErrorMessage),
            entity: Yup.string().max(40, invalidEntity).required(requiredErrorMessage),
        }),
        onSubmit: (values) => {
            props.setFormStep(6);
            props.setPreviousStep(5);
            localStorage.setItem("bankData", JSON.stringify(formik.values));
            navigate('/finishPersonalData');
        }
    });

    useEffect(() => {
        if (props.previousStep !== props.formStep + 1 && props.previousStep !== props.formStep - 1) {
            navigateToCorrespondingStep(props.formStep, 5, navigate);
        }
    }, []);

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col w-[19rem] items-center">
            <div className="flex justify-center mb-4">
                <Logo width={300}/>
            </div>
            <p className="text-bankDataFont mb-6 text-lg">Para continuar, agregá una cuenta bancaria:</p>
            <CustomInput 
                id="cbu"
                type="text"
                value={formik.values.cbu}
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                showError={formik.touched.cbu && (formik.errors.cbu !== undefined)}
                errorMessage={formik.errors.cbu} 
                icon={getIcon("bankIcon")} 
                placeholder="CBU/CVU"
            />
            <CustomSelect2
                id="accountType" 
                value={formik.values.accountType} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur} 
                showError={formik.touched.accountType && (formik.errors.accountType !== undefined)}
                errorMessage={formik.errors.accountType} 
                icon={bankIcon()} 
                itemsList={["Caja de Ahorro", "Cuenta Corriente", "Otro"]} 
                placeholder="Tipo de Cuenta"
            />
            <CustomSelect2 
                id="currency" 
                value={formik.values.currency} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur} 
                showError={formik.touched.currency && (formik.errors.currency !== undefined)}
                errorMessage={formik.errors.currency} 
                icon={currencyIcon()} 
                itemsList={["ARS", "USD", "Bimonetaria"]} 
                placeholder="Moneda"
            />
            <CustomInputPersData 
                id="entity" 
                value={formik.values.entity} 
                onChange={formik.handleChange}
                showError={formik.touched.entity && (formik.errors.entity !== undefined)}
                errorMessage={formik.errors.entity}                        
                type="text" 
                upperText="Entidad" 
            />
            <div className="mt-12 flex justify-center">
                <CustomButton submit={true} buttonText="Continuar" iconName="rightArrowIcon"/>
            </div>
        </form>
    );
}

export default BankDataForm;