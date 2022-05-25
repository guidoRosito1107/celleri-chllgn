import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICostumerAddressData } from "../../utils/DataTypes";
import { getIcon, navigateToCorrespondingStep } from "../../utils/functions";
import CustomButton from "../CustomButton/CustomButton";
import CustomInputPersData from "../CustomInput/CustomInputPersData";
import * as Yup from "yup";
import { invalidCity, invalidCountry, invalidFloorAndApt, invalidNumber, invalidProvince, invalidStreet, invalidZipCode, requiredErrorMessage } from "../../utils/ValidationResources";
import { editIcon } from "../../utils/icons";
import Logo from "../Logo/Logo";

interface IProps {
    formStep: number,
    previousStep: number,
    setPreviousStep: React.Dispatch<React.SetStateAction<number>>,
    setFormStep: React.Dispatch<React.SetStateAction<number>>,
    costumerAddressData: ICostumerAddressData,
}

const emptyAddressData: ICostumerAddressData = {
    country: "",
    province: "",
    city: "",
    street: "",
    number: "",
    floorAndApt: "",
    zipCode: "",
}

function PersonalDataAddressForm (props: IProps) {

    const [addressValues, setAddressValues] = useState<ICostumerAddressData>(() => {
        const retrievedData = localStorage.getItem('personalDataAddress');
        if (retrievedData) {
            const parsedData: ICostumerAddressData = JSON.parse(retrievedData);
            return parsedData;
        } else if (props.costumerAddressData)
            return props.costumerAddressData;
        else {
            return emptyAddressData;
        }
    });
    const [disableFields, setDisableFields] = useState<boolean>(false);
    const [disableCityField, setDisableCityField] = useState<boolean>(false);
    const [disableProvinceField, setDisableProvinceField] = useState<boolean>(false);

    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: (addressValues || emptyAddressData),
        validationSchema: Yup.object({
            country: Yup.string().max(40, invalidCountry).required(requiredErrorMessage),
            province: Yup.string().max(40, invalidProvince).required(requiredErrorMessage),
            city: Yup.string().max(40, invalidCity).required(requiredErrorMessage),
            street: Yup.string().max(40, invalidStreet).required(requiredErrorMessage),
            number: Yup.string().max(5, invalidNumber).required(requiredErrorMessage),
            floorAndApt: Yup.string().max(4, invalidFloorAndApt),
            zipCode: Yup.string().max(8, invalidZipCode).required(requiredErrorMessage),
        }),
        onSubmit: (values) => {
            props.setFormStep(4);
            props.setPreviousStep(3);
            localStorage.setItem("personalDataAddress", JSON.stringify(formik.values));
            navigate('/legalData');
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        if (props.previousStep !== props.formStep + 1 && props.previousStep !== props.formStep - 1) {
            navigateToCorrespondingStep(props.formStep, 3, navigate);
        }
        if (props.formStep === 3) {
            if (props.costumerAddressData) {
                if (livesInCity(props.costumerAddressData)) {
                    setDisableCityField(true);
                }
                setDisableProvinceField(true);
                setAddressValues(props.costumerAddressData);
                setDisableFields(true);
            }
        }        
    }, []);

    const livesInCity = (addressData: ICostumerAddressData) => {
        return addressData.city !== "";
    }

    return (
        <form className="flex flex-col w-[19rem]" onSubmit={formik.handleSubmit}>
            <div className="flex justify-center mb-4">
                <Logo width={160}/>
            </div>
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    {getIcon('houseIcon')}
                    <p className="mb-0.5 ml-3 font-normal">Dirección</p>
                </div>                
                <div className="cursor-pointer" onClick={() => {setDisableFields(false)}}>
                    {editIcon()}
                </div> 
            </div>
            <CustomInputPersData
                id="country" 
                value={formik.values.country} 
                onChange={formik.handleChange}
                showError={formik.touched.country && (formik.errors.country !== undefined)}
                errorMessage={formik.errors.country}                        
                onBlur={formik.handleBlur}
                type="text" 
                upperText="País" 
                disabled={disableFields} 
            /> 
            <CustomInputPersData
                id="province" 
                value={formik.values.province} 
                onChange={formik.handleChange}
                showError={formik.touched.province && (formik.errors.province !== undefined)}
                errorMessage={formik.errors.province}                        
                onBlur={formik.handleBlur}
                type="text" 
                upperText="Provincia" 
                disabled={disableProvinceField && disableFields} 
            /> 
            <CustomInputPersData
                id="city" 
                value={formik.values.city} 
                onChange={formik.handleChange}
                showError={formik.touched.city && (formik.errors.city !== undefined)}
                errorMessage={formik.errors.city}                        
                onBlur={formik.handleBlur}
                type="text" 
                upperText="Ciudad o Localidad" 
                disabled={disableCityField && disableFields} 
            /> 
            <CustomInputPersData
                id="street" 
                value={formik.values.street} 
                onChange={formik.handleChange}
                showError={formik.touched.street && (formik.errors.street !== undefined)}
                errorMessage={formik.errors.street}                        
                onBlur={formik.handleBlur}
                type="text" 
                upperText="Calle" 
                disabled={disableFields} 
            /> 
            <CustomInputPersData
                id="number" 
                value={formik.values.number} 
                onChange={formik.handleChange}
                showError={formik.touched.number && (formik.errors.number !== undefined)}
                errorMessage={formik.errors.number}                        
                onBlur={formik.handleBlur}
                type="number" 
                upperText="Altura" 
                disabled={disableFields} 
            /> 
            <CustomInputPersData
                id="floorAndApt" 
                value={formik.values.floorAndApt} 
                onChange={formik.handleChange}
                showError={formik.touched.floorAndApt && (formik.errors.floorAndApt !== undefined)}
                errorMessage={formik.errors.floorAndApt}                        
                onBlur={formik.handleBlur}
                type="text" 
                upperText="Piso y/o Depto" 
                disabled={disableFields} 
            /> 
            <CustomInputPersData
            id="zipCode" 
            value={formik.values.zipCode} 
            onChange={formik.handleChange}
            showError={formik.touched.zipCode && (formik.errors.zipCode !== undefined)}
            errorMessage={formik.errors.zipCode}                        
            onBlur={formik.handleBlur}
            type="text" 
            upperText="Código Postal" 
            disabled={disableFields} 
            /> 
            <div className="mt-2 flex justify-center">
                <CustomButton submit={true} buttonText="Próximo paso" iconName="rightArrowIcon" />
            </div>
        </form>
    );
}

export default PersonalDataAddressForm;