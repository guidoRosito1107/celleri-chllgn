import React from "react";
import { getIcon } from "../../utils/functions";
import { startButtonStyle } from "../Forms/StartStyles";

interface IProps {
    buttonText: string,
    onClick?: any,
    iconName?: string,
    submit?: boolean,
}

function CustomButton (props: IProps) {

    const buttonWithIconStyle = "flex justify-between items-center px-4 my-2 bg-blueTheme text-lg text-white font-semibold w-fill h-10 rounded-sm self-center hover:bg-blueDarkTheme active:bg-blueDarkerTheme";

    return (
        <button type={props.submit ? "submit": "button"} className={props.iconName ? buttonWithIconStyle : startButtonStyle} onClick={props.onClick}>
            {props.iconName ? getIcon(props.iconName) : null}
            {props.buttonText}
        </button>
    );
}

export default CustomButton;