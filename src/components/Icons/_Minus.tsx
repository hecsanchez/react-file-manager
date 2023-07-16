import {FC} from "react";
import {IconProps} from "./_types.ts";

export const MinusIcon: FC<IconProps> = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-6 h-6 ${className}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
        </svg>
    )
}
