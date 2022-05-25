import React from "react";
import Webcam from "react-webcam";

interface IProps {
    type: 'document' | 'selfie',
    setImage: any,
    setOpenCamera: React.Dispatch<React.SetStateAction<boolean>>,
}

function CameraSection (props: IProps) {

    const webcamRef = React.useRef(null);

    const handleCapture = () => {
        const capturedImage = webcamRef.current.getScreenshot();
        props.setImage(capturedImage);
        props.setOpenCamera(false);
    }

    return (
        <div className="flex flex-col justify-center items-center bg-black h-full">
            <div className="relative flex justify-center items-center mb-10">
                {props.type === 'document' ? <div className="absolute w-11/12 aspect-video border-2 border-white bg-none"></div> : null}                
                <Webcam ref={webcamRef} screenshotFormat="image/jpeg"/>
            </div>
            <div className="relative flex justify-center items-center bg-white overflow-hidden rounded-full w-14 h-14 cursor-pointer" onClick={handleCapture}>
                <div className="absolute bg-white border-2 rounded-full w-12 h-12 cursor-pointer" />
            </div>
        </div>
    );
}

export default CameraSection;