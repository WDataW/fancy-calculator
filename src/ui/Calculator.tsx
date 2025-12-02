import { useEffect, useState } from "react";
import Screen from "./components/display/Screen";
import Keypad from "./components/keypad/Keypad";
type Props = {
    className?: string;
}
export type Blinker = {
    start: number;
    end: number;
}
export default function Calculator({ className = '', ...props }: Props) {
    const [expression, setExpression] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [blinker, setBlinker] = useState<Blinker>({ start: 0, end: 0 });// to track where the cursor is within the text input
    useEffect(() => {
        setResult('');// change in the expression = erase the result
    }, [expression]);

    return (
        <div className={`${className} bg-linear-to-br from-[var(--color-calc-gradient-secondary)]  to-40% to-[var(--color-calc-gradient-primary)] p-[0.1rem]  rounded-[1.5rem] w-[18rem] `} {...props}>
            <Screen result={result} setBlinker={setBlinker} setExpression={setExpression} expression={expression}></Screen>
            <Keypad className="mt-[0.1rem]" blinker={blinker} setBlinker={setBlinker} setResult={setResult} expression={expression} setExpression={setExpression}></Keypad>
        </div>
    );
}