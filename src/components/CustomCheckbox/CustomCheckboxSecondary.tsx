import React from "react";
import { errorTextStyle } from "../../commonStyles";

interface IProps {
    id: string,
    onChange?: any,
    onBlur?: any,
    value?: boolean[],
    showError?: boolean,
    errorMessage?: string,
    listItems: string[],
}

function CustomCheckboxSecondary (props: IProps) {

    return (
        <div className="flex flex-col mb-4">
            {
                props.listItems.map((item, index) => (
                    <div key={index} className="flex items-center ">
                        <input 
                            id={item}
                            className="w-4 h-4 text-violetTheme rounded-sm border-2 border-lightGray mr-1.5 focus:ring-0 focus:ring-white checked:violetTheme checked:bg-violetTheme" 
                            type="checkbox"
                            checked={props.value[index]}
                            onChange={props.onChange}
                        />
                        <p className="pb-0.5 text-fontGray">{item}</p>
                    </div>
                ))
            }
            { props.showError ? <p className={errorTextStyle}>Selección no válida</p> : null}
        </div>
    );
}

export default CustomCheckboxSecondary;