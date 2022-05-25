import React from "react";
import { useCallback } from "react";
import { errorTextStyle } from "../../commonStyles";

interface IProps {
    id?: string,
    text: string,
    onChange?: any,
    onBlur?: any,
    value?: boolean,
    showError?: boolean,
    errorMessage?: string,
}

function CustomCheckbox (props: IProps) {
    
    const checkboxTextStyle = useCallback(() => {
        if (props.value) {
            return "text-sm text-fontDarkGray font-medium";
        } 
        return "text-sm text-darkGray font-medium";
    }, [props.value]);

    return (
        <div className={props.showError ? "w-full h-28 flex flex-col" : "w-full h-28 flex flex-col"}>
            <div className="flex justify-center">
                <input 
                    id={props.id} 
                    className="appereance-none w-3 h-3 rounded-sm mt-[0.270rem] mr-1.5 focus:ring-0 focus:ring-white text-violetTheme checked:bg-violetTheme" 
                    type="checkbox" 
                    checked={props.value}
                    onChange={props.onChange} 
                    onBlur={props.onBlur}                    
                />
                <p className={checkboxTextStyle()} >{props.text}</p>
            </div>
            { props.showError ? <p className={errorTextStyle}>{props.errorMessage}</p> : null}            
        </div>
        
    );
}

export default CustomCheckbox;