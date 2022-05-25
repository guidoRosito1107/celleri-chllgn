import React, { useEffect, useState } from "react";
import { commonTextStyle, errorTextStyle } from "../../commonStyles";

interface IProps {
    id?: string,
    onChange?: any,
    onBlur?: any,
    showError?: boolean,
    errorMessage?: string,
    value?: string,
    disabled?: boolean,
    upperText: string,
    type: "text" | "number" | "date",
    icon?: JSX.Element,
}

function CustomInputPersData (props: IProps) {

    const [inputStyle, setInputStyle] = useState<string>();

    useEffect(() => {
        if (props.disabled) {
            setInputStyle("font-semibold text-fontDisabled w-full h-9 px-3 py-2 border-none rounded-sm outline-0 ring-2 ring-gray-200");
        } else {
            setInputStyle(commonTextStyle + "w-full h-9 px-3 py-2 border-none placeholder-lightGray rounded-sm outline-0 ring-2 ring-gray-300 focus:ring-2 focus:ring-violetTheme hover:ring-lightViolet");
        }
    }, [props.disabled]);

    return (
        <div className={props.showError ? "w-full h-18 flex flex-col" : "w-full h-18 flex flex-col"}>
            <div className='relative w-[19rem]'>
                <p className="text-xs font-bold text-persDataFontGrey">{props.upperText}</p>
                <input 
                    id={props.id}
                    onChange={props.onChange}
                    value={props.value}
                    onBlur={props.onBlur}
                    className={inputStyle} 
                    type={props.type} 
                    disabled={props.disabled}
                />
            </div>
            { props.showError ? <p className={errorTextStyle}>{props.errorMessage}</p> : null}
        </div>
        
    );

}

export default CustomInputPersData;