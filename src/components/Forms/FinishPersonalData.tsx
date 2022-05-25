import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { navigateToCorrespondingStep } from "../../utils/functions";
import Logo from "../Logo/Logo";

interface IProps {
    formStep: number,
    previousStep: number,
    setPreviousStep: React.Dispatch<React.SetStateAction<number>>,
    setFormStep: React.Dispatch<React.SetStateAction<number>>,
}

function FinishPersonalData (props: IProps) {

    const [loading, setLoading] = useState<boolean>(true);
    let navigate = useNavigate();

    useEffect(() => {
        // se debe realizar la validación de datos como:
        // - Información de Dirección
        // - Información Bancaria
        // - "Persistir"
        
        if (props.previousStep !== props.formStep + 1 && props.previousStep !== props.formStep - 1) {
            navigateToCorrespondingStep(props.formStep, 6, navigate);
        }

        if (props.formStep === 6) {
            setInterval(() => {
                setLoading(false)
            }, 5000)
        }        
    }, []);

    const handleClick = () => {
        props.setFormStep(7);
        props.setPreviousStep(6);
        navigate('/startProofOfLife');
    }

    return (
        <div className="flex flex-col align-center">            
            {
                loading ?
                <div className="flex flex-col justify-center items-center">
                    <div className="mb-10">
                        <Logo width={300}/>
                    </div>                    
                    <p className="w-3/5 mb-16 text-gray-700 text-xl text-center font-sans font-semibold">Estamos guardando la información, por favor aguarde.</p>
                    <div className="flex justify-center items-center mt-20">
                    <svg role="status" className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-violetTheme" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>  
                </div>                           
                : 
                <div className="flex flex-col justify-center items-center">
                    <div className="mb-10">
                        <Logo width={300}/>
                    </div>   
                    <p className="w-4/5 text-gray-700 text-xl text-center font-sans font-semibold mb-16">Cuenta fue agregada con éxito.</p>
                    <button className="bg-blueTheme hover:bg-blueDarkTheme text-lg text-white font-semibold w-4/5 h-10 rounded-md self-center" onClick={handleClick}>Hacer prueba de vida</button>
                </div>
            }            
        </div>
    );
}

export default FinishPersonalData;