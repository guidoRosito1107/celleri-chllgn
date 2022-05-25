import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { navigateToCorrespondingStep } from "../../utils/functions";
import Logo from "../Logo/Logo";
import { startButtonStyle } from "./StartStyles";

interface IProps {
    formStep: number,
    setFormStep: React.Dispatch<React.SetStateAction<number>>,
}

function Start (props: IProps) {

    let navigate = useNavigate();

    useEffect(() => {
        navigateToCorrespondingStep(props.formStep, 1, navigate);
    }, []);

    const handleClick = () => {
        props.setFormStep(1);
        navigate('/initialData');
    }

    return (
        <div className="flex flex-col">
            <div className="mb-12">
                <Logo width={300}/>
            </div>
            <p className="text-gray-700 text-2xl font-sans font-semibold mb-6">Abrí tu cuenta en minutos</p>
            <button className={startButtonStyle} onClick={handleClick}>Comenzar</button>
        </div>
    );
}

export default Start;