import {CheckIcon, MinusIcon} from "@/components";
import {FC} from "react";

interface CheckboxProps {
    onChange: () => void;
    checked: boolean;
    indeterminate: boolean;
}
export const Checkbox: FC<CheckboxProps> = ({ onChange, checked, indeterminate }) => {
    return (
        <div className="rounded-md bg-gray-200 w-6 h-6 flex items-center justify-center cursor-pointer" onClick={onChange}>
            {checked ? <CheckIcon/> : null}
            {indeterminate ? <MinusIcon /> : null}
        </div>
    )
}
