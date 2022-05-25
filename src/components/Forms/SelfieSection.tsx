import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { navigateToCorrespondingStep } from "../../utils/functions";
import { closeIcon } from "../../utils/icons";
import Logo from "../Logo/Logo";
import CameraSection from "./CameraSection";

interface IProps {
    formStep: number,
    previousStep: number,
    frontDocImage: any,
    backDocImage: any,
    setPreviousStep: React.Dispatch<React.SetStateAction<number>>,
    setFormStep: React.Dispatch<React.SetStateAction<number>>,
}

const selfieSectionText = "¡Excelente!";
const selfieSectionText2 = "Por último, necesitamos que te saques una selfie con DNI en mano.";
const selfieSelectionImportant = "Importante: sostené el DNI en frente tuyo.";

function SelfieSection (props: IProps) {

    let navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState<any>(null);
    const [openCamera, setOpenCamera] = useState<boolean>(false);

    useEffect(() => {
        if (props.previousStep !== props.formStep + 1 && props.previousStep !== props.formStep - 1) {
            navigateToCorrespondingStep(props.formStep, 10, navigate);
        }
    }, []);

    const handleOpenCamera = () => {
        setOpenCamera(true);
    }

    const handleRetake = () => {
        setImagePreview(null);
    }

    const handleConfirm = async () => {
        let formdata = new FormData();
        formdata.append('frontDocImage', props.frontDocImage);
        formdata.append('backDocImage', props.backDocImage);
        formdata.append('selfieImage', imagePreview);

        const postOptions = {
            method: 'POST',
            body: formdata,
        }

        try {
            const response = await fetch('/api', postOptions);
            const data = await response.json();

            if (data) {
                props.setFormStep(11);
                props.setPreviousStep(10);
                navigate('/end');
            }
                        
        } catch (err) {
            console.log(err);
        }  
        props.setFormStep(11);
        props.setPreviousStep(10);
        navigate('/end');
    }

    const handleCloseCamera = () => {
        setOpenCamera(false);
    }

    return (
        <div className={openCamera ? "h-screen w-screen" : "bg-white flex flex-col justify-center items-center h-full"}>
            {
                openCamera ?
                <div className="flex flex-col h-full relative" >
                    <div className="absolute flex justify-end items-center w-full my-3">
                        <div className="cursor-pointer" onClick={handleCloseCamera}>{closeIcon()}</div>
                    </div>
                    <CameraSection type="selfie" setImage={setImagePreview} setOpenCamera={setOpenCamera}/>
                </div>
                :
                imagePreview ?
                <div className="flex flex-col h-full justify-center items-center">
                    <div className="flex justify-center items-center">
                        <img src={imagePreview} alt="frontDocImage" />                      
                    </div>
                    <div className="flex mt-10 px-4 w-full justify-center ">
                        <button className="w-28 mx-2 bg-white border border-darkGray hover:bg-grayHover text-lg text-darkGray h-10 rounded-md self-center" onClick={handleRetake}>Retake</button>
                        <button className="w-52 mx-2 bg-blueTheme hover:bg-blueDarkTheme text-lg text-white h-10 rounded-md self-center" onClick={handleConfirm}>{"Confirmar >"}</button>
                    </div>
                </div>
                :
                <div className="flex flex-col justify-center items-center">
                    <div className="mb-6">
                        <Logo width={300}/>
                    </div>
                    <p className="w-4/5 text-fontGray text-xl text-center font-sans font-semibold">{selfieSectionText}</p>
                    <p className="w-3/5 text-fontGray text-xl text-center font-sans font-semibold mb-3">{selfieSectionText2}</p>
                    <p className="w-3/5 text-red-500 text-xl text-center font-sans font-semibold mb-4">{selfieSelectionImportant}</p>
                    <button className="bg-blueTheme hover:bg-blueDarkTheme text-lg text-white font-semibold w-3/6 h-10 rounded-md self-center mb-4" onClick={handleOpenCamera} >Sacar foto</button>
                </div>
            }                        
        </div>
    );
}

export default SelfieSection;