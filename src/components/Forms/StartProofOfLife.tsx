import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { navigateToCorrespondingStep } from "../../utils/functions";
import Logo from "../Logo/Logo";

interface IProps {
    formStep: number,
    previousStep: number,
    setPreviousStep: React.Dispatch<React.SetStateAction<number>>,
    setFormStep: React.Dispatch<React.SetStateAction<number>>,
}

const textToShow = "¡Excelente! Ahora necestiamos fotos de tu DNI y una selfie."

function StartProofOfLife (props: IProps) {

    let navigate = useNavigate();

    useEffect(() => {
        if (props.previousStep !== props.formStep + 1 && props.previousStep !== props.formStep - 1) {
            navigateToCorrespondingStep(props.formStep, 7, navigate);
        }
    }, []);

    const handleClick = () => {
        props.setFormStep(8);
        props.setPreviousStep(7);
        navigate('/frontDocument');
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="mb-10">
                <Logo width={300}/>
            </div>  
            <p className="w-4/5 text-gray-700 text-xl text-center font-sans font-semibold mb-16">{textToShow}</p>
            <button className="bg-blueTheme hover:bg-blueDarkTheme text-lg text-white font-semibold w-4/5 h-10 rounded-md self-center" onClick={handleClick}>Comenzar</button>
        </div>
    );
}

export default StartProofOfLife;