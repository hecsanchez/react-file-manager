import {FC} from "react";
import {IconProps} from "./_types.ts";

export const CheckIcon: FC<IconProps> = ({ className = '' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className={`w-4 h-4 ${className}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    )
}
