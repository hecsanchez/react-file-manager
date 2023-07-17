import {FC, ReactNode} from "react";

interface ButtonProps {
    children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ children }) => {
    return (
        <button className="flex bg-black text-white rounded-full py-3 px-6 min-w-max">{children}</button>
    )
}
