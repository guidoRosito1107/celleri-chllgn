import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiKey, API_URL, ENDPOINT_CUIT, ENDPOINT_DATA } from "../../utils/APIResources";
import { ICostumerAddressData, ICostumerPersonalData } from "../../utils/DataTypes";
import { editIcon, userIcon } from "../../utils/icons";
import CustomButton from "../CustomButton/CustomButton";
import CustomInputPersData from "../CustomInput/CustomInputPersData";
import * as Yup from "yup";
import { cuitOrCuilRegEx, invalidCuitOrCuil, requiredErrorMessage } from "../../utils/ValidationResources";
import Logo from "../Logo/Logo";
import { navigateToCorrespondingStep } from "../../utils/functions";

interface IProps {
    formStep: number,
    previousStep: number,
    setPreviousStep: React.Dispatch<React.SetStateAction<number>>,
    setFormStep: React.Dispatch<React.SetStateAction<number>>,
    setCostumerPersonalData: React.Dispatch<React.SetStateAction<ICostumerPersonalData>>,
    setCostumerAddressData: React.Dispatch<React.SetStateAction<ICostumerAddressData>>,
    costumerDocNumber: string,
}

const emptyCostumerData = {
    firstName: "",
    secondName: "",
    lastName: "",
    cuilOrCuit: "",
    gender: "",
    nationality: "",
    birthCountry: "",
    birthDate: "",
} 

function PersonalDataForm (props: IProps) {

    const [retrievedValues, setRetrievedValues] = useState<ICostumerPersonalData>(() => {
        const retrievedData = localStorage.getItem('personalData');
        if (retrievedData) {
            const parsedData: ICostumerPersonalData = JSON.parse(retrievedData);
            return parsedData;
        } else {
            return emptyCostumerData;
        }
    });
    const [disableFields, setDisableFields] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: (retrievedValues || emptyCostumerData),
        validationSchema: Yup.object({
            firstName: Yup.string().max(20).required(requiredErrorMessage),
            secondName: Yup.string().max(50).required(requiredErrorMessage),
            lastName: Yup.string().max(20).required(requiredErrorMessage),
            cuilOrCuit: Yup.string().matches(cuitOrCuilRegEx, invalidCuitOrCuil).required(requiredErrorMessage),
            gender: Yup.string().max(20).required(requiredErrorMessage),
            nationality: Yup.string().max(20).required(requiredErrorMessage),
            birthCountry: Yup.string().max(20).required(requiredErrorMessage),
            birthDate: Yup.string().required(requiredErrorMessage),
        }),
        onSubmit: (values) => {
            props.setFormStep(3);
            props.setPreviousStep(2);
            localStorage.setItem("personalData", JSON.stringify(formik.values));
            navigate('/personalAddressData');
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        if (props.previousStep !== props.formStep + 1 && props.previousStep !== props.formStep - 1) {
            navigateToCorrespondingStep(props.formStep, 2, navigate);
        }
        //if (props.formStep === 2) {}

        const getPersonDataFromAFIP = async (docNumber: string) => {
            const reqOptions = {
                method: 'GET',
                headers: { 'Authorization': 'Apikey ' + apiKey },
            }
        
            try {
                let response = await fetch(API_URL + ENDPOINT_CUIT + docNumber, reqOptions);
                let data = await response.json();  
                
                if (data) {
                    response = await fetch(API_URL + ENDPOINT_DATA + data.idPersona[0], reqOptions);
                    data = await response.json();

                    if (data) {
                        const { nombre, apellido, idPersona, fechaNacimiento } = data.persona;                            
                        const secondNames = getSecondNamesFromName(nombre);                            
                        const costumerRetrievedData: ICostumerPersonalData = {
                            firstName: nombre ? nombre.split(" ")[0] : "",
                            secondName: secondNames ? secondNames : "",
                            lastName: apellido ? apellido : "",
                            cuilOrCuit: idPersona ? idPersona : "",
                            gender: "",
                            nationality: "",
                            birthCountry: "",
                            birthDate: formatDate(fechaNacimiento),
                        }

                        if (data.persona.domicilio.length > 0) {
                            const { calle, codigoPostal, descripcionProvincia, numero, oficinaDptoLocal, piso } = data.persona.domicilio[0];
                            const costumerAddressData: ICostumerAddressData = {
                                country: "Argentina",
                                province: descripcionProvincia !== "CIUDAD AUTONOMA BUENOS AIRES" ? descripcionProvincia : "-",
                                city:  descripcionProvincia === "CIUDAD AUTONOMA BUENOS AIRES" ? descripcionProvincia : "",
                                street: calle,
                                number: numero,
                                floorAndApt: formatFloorAndApt(piso, oficinaDptoLocal),
                                zipCode: codigoPostal,
                            }
                            props.setCostumerAddressData(costumerAddressData);
                        } else {
                            props.setCostumerAddressData(null);
                        }
                                        
                        setRetrievedValues(costumerRetrievedData);
                        setDisableFields(true);
                        props.setCostumerPersonalData(costumerRetrievedData);                                                            
                    }
                    setLoading(false);                                
                }

            } catch (err) {
                console.log(err);
                setLoading(false);   
            }                
        }
        
        const retrievedData = localStorage.getItem('personalData');
        if (retrievedData) {
            const parsedData: ICostumerPersonalData = JSON.parse(retrievedData);
            setRetrievedValues(parsedData);
            setLoading(false);
        } else {
            getPersonDataFromAFIP(props.costumerDocNumber);
        }     
    }, []);

    const getSecondNamesFromName = (name: string) => {
        if (name) {
            const splittedNames = name.split(" ");
            const amountOfNames = splittedNames.length;
            if (amountOfNames !== 1) {
                let secondNames = "";
                for (let i = 1; i < amountOfNames; i++) {
                    secondNames += splittedNames[i] + " ";
                } 
                return secondNames.trim();
            } 
        }        
        return "-";
    }

    const formatDate = (dateToFormat: string) => {
        const auxDate = dateToFormat.split("T")[0].split("-");
        return `${auxDate[2]}/${auxDate[1]}/${auxDate[0]}`
    }

    const formatFloorAndApt = (floor: string, apt: string) => {
        if (floor && apt) return floor + apt;
        if (floor) return floor;
        return "";
    }

    return (
        <form className="flex flex-col w-[19rem]" onSubmit={formik.handleSubmit}>
            <div className="flex justify-center mb-4">
                <Logo width={160}/>
            </div>
            {
                loading ? 
                <div className="flex justify-center items-center my-52">
                    <svg role="status" className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-violetTheme" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
                :
                <div>
                    <div className="flex items-center mb-2 justify-between items-center">
                        <div className="flex items-center">
                            {userIcon()}
                            <p className="mb-0.5 ml-3 font-normal">Datos Personales</p>
                        </div>
                        <div className="cursor-pointer" onClick={() => {setDisableFields(false)}}>
                            {editIcon()}
                        </div>                        
                    </div>
                    <CustomInputPersData 
                        id="firstName" 
                        value={formik.values.firstName} 
                        onChange={formik.handleChange}
                        showError={formik.touched.firstName && (formik.errors.firstName !== undefined)}
                        errorMessage={formik.errors.firstName}                        
                        onBlur={formik.handleBlur}
                        type="text" 
                        upperText="Primer Nombre" 
                        disabled={disableFields} 
                    /> 
                    <CustomInputPersData 
                        id="secondName" 
                        value={formik.values.secondName} 
                        onChange={formik.handleChange}
                        showError={formik.touched.secondName && (formik.errors.secondName !== undefined)}
                        errorMessage={formik.errors.secondName}                        
                        onBlur={formik.handleBlur}
                        type="text" 
                        upperText="Segundos Nombres" 
                        disabled={disableFields} 
                    /> 
                    <CustomInputPersData 
                        id="lastName" 
                        value={formik.values.lastName} 
                        onChange={formik.handleChange}
                        showError={formik.touched.lastName && (formik.errors.lastName !== undefined)}
                        errorMessage={formik.errors.lastName}                        
                        onBlur={formik.handleBlur} 
                        type="text" 
                        upperText="Apellidos"  
                        disabled={disableFields}
                    /> 
                    <CustomInputPersData 
                        id="cuilOrCuit" 
                        value={formik.values.cuilOrCuit} 
                        onChange={formik.handleChange} 
                        showError={formik.touched.cuilOrCuit && (formik.errors.cuilOrCuit !== undefined)}
                        errorMessage={formik.errors.cuilOrCuit}                        
                        onBlur={formik.handleBlur}
                        type="text" 
                        upperText="Cuil/Cuit" 
                        disabled={disableFields} 
                    /> 
                    <CustomInputPersData 
                        id="gender" 
                        value={formik.values.gender} 
                        onChange={formik.handleChange} 
                        showError={formik.touched.gender && (formik.errors.gender !== undefined)}
                        errorMessage={formik.errors.gender}                        
                        onBlur={formik.handleBlur}
                        type="text" 
                        upperText="Género"  
                        disabled={false}
                    /> 
                    <CustomInputPersData 
                        id="nationality" 
                        value={formik.values.nationality} 
                        onChange={formik.handleChange} 
                        showError={formik.touched.nationality && (formik.errors.nationality !== undefined)}
                        errorMessage={formik.errors.nationality}                        
                        onBlur={formik.handleBlur}
                        type="text" 
                        upperText="Nacionalidad"  
                        disabled={false}
                    /> 
                    <CustomInputPersData 
                        id="birthCountry" 
                        value={formik.values.birthCountry} 
                        onChange={formik.handleChange} 
                        showError={formik.touched.birthCountry && (formik.errors.birthCountry !== undefined)}
                        errorMessage={formik.errors.birthCountry}                        
                        onBlur={formik.handleBlur}
                        type="text" 
                        upperText="País Nacimiento" 
                        disabled={false} 
                    /> 
                    <CustomInputPersData 
                        id="birthDate" 
                        value={formik.values.birthDate} 
                        onChange={formik.handleChange} 
                        showError={formik.touched.birthDate && (formik.errors.birthDate !== undefined)}
                        errorMessage={formik.errors.birthDate}                        
                        onBlur={formik.handleBlur}
                        type="text" 
                        upperText="Fecha Nacimiento" 
                        disabled={disableFields} 
                    /> 
                    <div className="mt-2 flex justify-center">
                        <CustomButton submit={true} buttonText="Próximo paso" iconName="rightArrowIcon" />
                    </div>
                </div>
            }            
        </form>
    );
}

export default PersonalDataForm;