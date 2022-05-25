import React from "react";
import { commonTextStyle, errorTextStyle } from "../../commonStyles";

interface IProps {
    id?: string,
    name?: string,
    value?: string,
    showError?: boolean,
    errorMessage?: string,
    placeholder?: string,
    type: "text" | "number" | "mail" | "password",
    icon?: JSX.Element,
    onChange?: any,
    onBlur?: any,
}

function CustomInput (props: IProps) {

    return (
        <div className={props.showError ? "w-full h-18 flex flex-col" : "w-full h-18 flex flex-col"}>
            <div className="w-full relative flex items-center">
                <div className="absolute mb-6">
                    {props.icon ? props.icon : null}
                </div>                
                <input
                    id={props.id}
                    name={props.name}
                    className={commonTextStyle + "w-full pl-10 pr-3 py-2 placeholder-lightGray rounded-sm outline-0 ring-2 ring-gray-300 focus:ring-2 focus:ring-violetTheme hover:ring-lightViolet border-none"} 
                    type={props.type} 
                    aria-label="Custom Input" 
                    placeholder={props.placeholder ? props.placeholder : "Placeholder" }
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                />
            </div>            
            { props.showError ? <p className={errorTextStyle}>{props.errorMessage}</p> : null}
        </div>
    );
}

export default CustomInput;