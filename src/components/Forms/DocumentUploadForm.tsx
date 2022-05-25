import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { navigateToCorrespondingStep } from "../../utils/functions";
import { closeIcon } from "../../utils/icons";
import Logo from "../Logo/Logo";
import CameraSection from "./CameraSection";

interface IProps {
    side: 'front' | 'back',
    introMessage: string,
    formStep: number,
    previousStep: number,
    setPreviousStep: React.Dispatch<React.SetStateAction<number>>,
    setFormStep: React.Dispatch<React.SetStateAction<number>>,
    setImageInParent: any,
}

function DocumentUploadForm (props: IProps) {

    let navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState<any>(null);
    const [openCamera, setOpenCamera] = useState<boolean>(false);

    useEffect(() => {
        if (props.previousStep !== props.formStep + 1 && props.previousStep !== props.formStep - 1) {
            navigateToCorrespondingStep(props.formStep, (props.side === 'front' ? 8 : 9), navigate);
        }
    }, []);

    useEffect(() => {
        setImagePreview(null);
        setOpenCamera(false);
    }, [props.side]);

    const handleFile = (e: any) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImagePreview(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }        
    }

    const handleOpenCamera = () => {
        setOpenCamera(true);
    }

    const handleRetake = () => {
        setImagePreview(null);
    }

    const handleConfirm = () => {
                
        props.setImageInParent(imagePreview);

        if (props.side === 'front') {
            props.setFormStep(9);
            props.setPreviousStep(8);
        } else {
            props.setFormStep(10);
            props.setPreviousStep(9);
        }
        
        navigate(props.side === 'front' ? '/backDocument' : '/selfie');
    }

    const handleCloseCamera = () => {        
        setOpenCamera(false);
    }

    return (
        <div className={openCamera ? "h-screen w-screen" : "bg-white flex flex-col justify-center items-center h-full"} >            
            {
                openCamera ?
                <div className="flex flex-col h-full relative" >
                    <div className="absolute flex justify-end items-center w-full my-3">
                        <div className="cursor-pointer" onClick={handleCloseCamera}>{closeIcon()}</div>
                    </div>
                    <CameraSection type="document" setImage={setImagePreview} setOpenCamera={setOpenCamera}/>
                </div>
                :
                imagePreview ?
                <div className="flex flex-col h-full justify-center items-center">
                    <div className="flex justify-center items-center">
                        <div className="relative flex justify-center items-center mb-10">
                            <div className="absolute w-11/12 aspect-video border-2 border-white bg-none" />
                            <img src={imagePreview} alt="frontDocImage" />
                        </div>                        
                    </div>
                    <div className="flex mt-10 px-4 w-full justify-center ">
                        <button className="w-28 mx-2 bg-white border border-darkGray hover:bg-grayHover text-lg text-darkGray h-10 rounded-md self-center" onClick={handleRetake}>Retake</button>
                        <button className="w-52 mx-2 bg-blueTheme hover:bg-blueDarkTheme text-lg text-white h-10 rounded-md self-center" onClick={handleConfirm}>{"Confirmar >"}</button>
                    </div>
                </div>
                :
                <div className="w-screen h-screen flex flex-col justify-center items-center">
                    <div className="mb-6">
                        <Logo width={300}/>
                    </div>                    
                    <div className="flex flex-col justify-center items-center">
                        <p className="w-3/5 text-fontGray text-xl text-center font-sans font-semibold mb-16">{props.introMessage}</p>
                        <button className="bg-blueTheme hover:bg-blueDarkTheme text-lg text-white font-semibold w-3/6 h-10 rounded-md self-center mb-4" onClick={handleOpenCamera}>Sacar foto</button>
                        <input 
                            type="file"
                            accept=".gif,.jpg,.jpeg,.png"
                            className="block file:cursor-pointer w-3/6 h-10 text-sm text-slate-500 file:w-full file:h-full file:mr-4 file:px-4 file:rounded-md file:border-0 file:text-lg file:font-semibold file:bg-blueTheme file:text-white hover:file:bg-blueDarkTheme"
                            onChange={handleFile}
                        />
                    </div>
                </div>
                
            }
        </div>
    );
}

export default DocumentUploadForm;