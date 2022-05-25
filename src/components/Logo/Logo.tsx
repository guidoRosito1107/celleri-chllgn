import React from "react";
import logo from "./logo.png";

interface IProps {
    width: number,
}

function Logo (props: IProps) {

    return (
        <img src={logo} alt="Celeri Logo" width={props.width} height="auto" />
    );
}

export default Logo;