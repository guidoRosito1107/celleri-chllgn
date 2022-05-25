import React, { useEffect, useState } from "react";
import {BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BankDataForm from "./components/Forms/BankDataForm";
import InitialDataForm from "./components/Forms/InitialDataForm";
import LegalDataForm from "./components/Forms/LegalData";
import PersonalDataAddressForm from "./components/Forms/PersonalDataAddressForm";
import PersonalDataForm from "./components/Forms/PersonalDataForm";
import Start from "./components/Forms/Start";
import FinishPersonalData from "./components/Forms/FinishPersonalData";
import { ICostumerAddressData, ICostumerPersonalData } from "./utils/DataTypes";
import SelfieSection from "./components/Forms/SelfieSection";
import EndSection from "./components/Forms/EndSection";
import StartProofOfLife from "./components/Forms/StartProofOfLife";
import DocumentUploadForm from "./components/Forms/DocumentUploadForm";

const frontDocumentText = "Comencemos con una foto del frente del DNI"
const backDocumentText = "¡Excelente! Ahora continuemos con una foto del dorso del DNI"

function App() {

    const [formStep, setFormStep] = useState<number>(0);
    const [previousStep, setPreviousStep] = useState<number>(0);
    const [costumerDocNumber, setCostumerDocNumber] = useState<string>();
    const [costumerPersonalData, setCostumerPersonalData] = useState<ICostumerPersonalData>();
    const [costumerAddressData, setCostumerAddressData] = useState<ICostumerAddressData>();
    const [frontDocImage, setFrontDocImage] = useState<any>();
    const [backDocImage, setBackDocImage] = useState<any>();
    const [showActiveProcessModal, setShowActiveProcessModal] = useState<boolean>(() => {
        const retrievedData = localStorage.getItem("initialData");
        if (retrievedData) {
            return true;
        } else {
            return false;
        }
    });

    useEffect(() => {
        localStorage.setItem("formStep", JSON.stringify(formStep));
    }, [formStep])

    const handleRestart = () => {
        localStorage.clear();
        setShowActiveProcessModal(false);
    }

    const handleContinue = () => {
        setShowActiveProcessModal(false);
        setFormStep(1);
        return <Navigate replace to="/initialData" />
    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            {
                showActiveProcessModal ?
                <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-3/5 my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">Apertura en proceso</h3>
                        <button className="text-black text-3xl " onClick={handleRestart}>X</button>
                        </div>
                        <div className="relative p-6 flex-auto">
                        <p className="my-4 text-slate-500 text-lg leading-relaxed">
                            Ya existe un proceso de apertura de una cuenta. ¿Desea continuar con este proceso o iniciar uno nuevo? 
                        </p>
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button className="w-1/2 mx-2 bg-white border border-darkGray hover:bg-grayHover text-lg text-darkGray h-10 rounded-md self-center" onClick={handleRestart}>Volver a comenzar</button>
                            <button className="bg-blueTheme hover:bg-blueDarkTheme text-lg text-white font-semibold w-1/2 h-10 rounded-md self-center" onClick={handleContinue}>Continuar</button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
                : null
            }            
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Start formStep={formStep} setFormStep={setFormStep} />}/>
                        <Route path="/initialData" element={<InitialDataForm formStep={formStep} setFormStep={setFormStep} previousStep={previousStep} setPreviousStep={setPreviousStep} setCostumerDocNumber={setCostumerDocNumber} />}/>
                        <Route path="/personalData" element={<PersonalDataForm formStep={formStep} setFormStep={setFormStep} previousStep={previousStep} setPreviousStep={setPreviousStep} costumerDocNumber={costumerDocNumber} setCostumerPersonalData={setCostumerPersonalData} setCostumerAddressData={setCostumerAddressData} />} />
                        <Route path="/personalAddressData" element={<PersonalDataAddressForm formStep={formStep} setFormStep={setFormStep} previousStep={previousStep} setPreviousStep={setPreviousStep} costumerAddressData={costumerAddressData} />}/>
                        <Route path="/legalData" element={<LegalDataForm formStep={formStep} previousStep={previousStep} setPreviousStep={setPreviousStep} setFormStep={setFormStep} />}/>
                        <Route path="/bankData" element={<BankDataForm formStep={formStep} previousStep={previousStep} setPreviousStep={setPreviousStep} setFormStep={setFormStep} />}/>
                        <Route path="/finishPersonalData" element={<FinishPersonalData formStep={formStep} previousStep={previousStep} setPreviousStep={setPreviousStep} setFormStep={setFormStep} />}/>
                        <Route path="/startProofOfLife" element={<StartProofOfLife formStep={formStep} previousStep={previousStep} setPreviousStep={setPreviousStep} setFormStep={setFormStep} />}/>
                        <Route path="/frontDocument" element={<DocumentUploadForm formStep={formStep} side="front" introMessage={frontDocumentText} setFormStep={setFormStep} previousStep={previousStep} setPreviousStep={setPreviousStep} setImageInParent={setFrontDocImage}/>}/>
                        <Route path="/backDocument" element={<DocumentUploadForm formStep={formStep} side="back" introMessage={backDocumentText} setFormStep={setFormStep} previousStep={previousStep} setPreviousStep={setPreviousStep} setImageInParent={setBackDocImage} />}/>
                        <Route path="/selfie" element={<SelfieSection formStep={formStep} setFormStep={setFormStep} previousStep={previousStep} setPreviousStep={setPreviousStep} frontDocImage={frontDocImage} backDocImage={backDocImage} />}/>
                        <Route path="/end" element={<EndSection formStep={formStep} previousStep={previousStep} setPreviousStep={setPreviousStep} />}/> 
                        <Route path="*" element={<Navigate replace to="/" />} />
                    </Routes>
                </BrowserRouter>
            </div>
            
        </div>
            
    );
}

export default App;
