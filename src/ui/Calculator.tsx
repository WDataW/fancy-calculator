import { useState } from "react";
import Screen from "./components/display/Screen";
import Keypad from "./components/keypad/Keypad";
type Props = {
    className?: string;
}
export default function Calculator({ className = '', ...props }: Props) {
    const [expression, setExpression] = useState<string>('');
    return (
        <div className={`${className} w-[20rem] `} {...props}>
            <Screen expression={expression}></Screen>
            <Keypad className="mt-[0.1rem]" setExpression={setExpression}></Keypad>
        </div>
    );
}