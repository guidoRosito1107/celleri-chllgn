import React from "react";
import { errorTextStyle } from "../../commonStyles";

interface IProps {
    id?: string,
    icon: JSX.Element,
    showError: boolean,
    errorMessage?: string,
    placeholder?: string,
    itemsList: string[],
    value?: string,
    onChange?: any,
    onBlur?: any,
}

function CustomSelect2 (props: IProps) {

    return (
        <div className={props.showError ? "w-full h-18 flex flex-col" : "w-full h-18 flex flex-col"}>
            <div className="w-full relative flex items-center">
                <span className="mb-6">
                    {props.icon ? props.icon : null}
                </span>
                <select id={props.id} value={props.value} onChange={props.onChange} onBlur={props.onBlur} className="w-full rounded-sm outline-0 ring-2 ring-gray-300 focus:ring-2 focus:ring-violetTheme hover:ring-lightViolet border-none pl-10">
                    <option hidden className="text-red-400" value={props.placeholder}>{props.placeholder}</option>            
                    {
                        props.itemsList.map((item, index) => (
                            <option key={index} value={item} className="text-fontGray px-4 py-1 hover:bg-gray-100 border-b">{item}</option>
                        ))
                    }
                </select>
            </div> 
            { props.showError ? <p className={errorTextStyle}>{props.errorMessage}</p> : null}
        </div>
        
    );
}

export default CustomSelect2;