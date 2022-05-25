import React from "react";

interface IProps {
    id?: string,
    icon: JSX.Element,
    placeholder?: string,
    itemsList: string[],
    value?: string,
    onChange: any,
}

function CustomSelect (props: IProps) {

    return (
        <div className="relative flex items-center mb-6 w-full">
            
            <button className="w-full relative flex justify-between items-center font-semibold placeholder-lightGray bg-white border focus:outline-none shadow rounded-sm focus:ring outline-0 ring-2 ring-gray-300 focus:ring-2 focus:ring-violetTheme hover:ring-lightViolet group">
                <div>
                    <span className="mb-6">
                        {props.icon ? props.icon : null}
                    </span>
                    <p id={props.id} className="text-lightGray pl-10">{props.value ? props.value : props.placeholder}</p>
                </div>
                
                <span className="border-l p-2 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                </span>
                <div className="absolute hidden top-full min-w-full w-max bg-white shadow-md mt-1 rounded transition z-50 group-focus:block">
                    <ul className="text-left border rounded">
                        {
                            props.itemsList.map(item => (
                                <li className="text-fontGray px-4 py-1 hover:bg-gray-100 border-b" onClick={props.onChange}>{item}</li>
                            ))
                        }
                    </ul>
                </div>
            </button>
        </div> 
    );
}

export default CustomSelect;