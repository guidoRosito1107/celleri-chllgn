import React from "react";
import { errorTextStyle } from "../../commonStyles";

interface IProps {
    itemsList: string[],
    id: string,
    onChange?: any,
    onBlur?: any,
    value?: string,
    showError?: boolean,
    errorMessage?: string,
}

function CustomRadio (props: IProps) {

    return (
        <div className="mb-4">
            <div>
            {
                props.itemsList.map((item, index) => (
                <div key={index} className="form-check">
                    <input checked={props.value === item} className="w-4 h-4 text-violetTheme rounded-sm border-2 border-lightGray mr-1.5 focus:ring-0 focus:ring-white checked:violetTheme checked:bg-violetTheme rounded-full form-check-input appearance-none" type="radio" name={props.id} id={item} onChange={props.onChange} />
                    <label className="form-check-label inline-block text-gray-800" htmlFor="flexRadioDefault1">
                        {item}
                    </label>
                </div>
                ))
            }                   
            </div>
            { props.showError ? <p className={errorTextStyle}>{props.errorMessage}</p> : null} 
        </div>
    );
}

export default CustomRadio;