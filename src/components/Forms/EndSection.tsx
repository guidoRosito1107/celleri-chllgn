import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { navigateToCorrespondingStep } from "../../utils/functions";
import Logo from "../Logo/Logo";

interface IProps {
    formStep: number,
    previousStep: number,
    setPreviousStep: React.Dispatch<React.SetStateAction<number>>,
}

const endingText = "¡Excelente, ya terminamos!";
const endingText2 = "Pronto nos pondremos en contacto con vos.";

function EndSection (props: IProps) {

    let navigate = useNavigate();

    useEffect(() => {
        if (props.previousStep !== props.formStep + 1 && props.previousStep !== props.formStep - 1) {
            navigateToCorrespondingStep(props.formStep, 11, navigate);
        }
    }, []);

    const handleEnd = () => {        
        window.location.replace('https://celeri.app/index.html');
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="mb-6">
                <Logo width={300}/>
            </div>
            <p className="w-2/5 text-fontGray text-xl text-center font-sans font-medium mb-10">{endingText}</p>
            <p className="w-4/5 text-fontGray text-xl text-center font-sans font-medium mb-10">{endingText2}</p>
            <button className="bg-blueTheme hover:bg-blueDarkTheme text-lg text-white font-semibold w-3/5 h-10 rounded-md self-center" onClick={handleEnd} >Finalizar</button>
        </div>
    );
}

export default EndSection;