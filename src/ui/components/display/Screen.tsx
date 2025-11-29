import { useEffect, useRef } from "react";
import type { Blinker } from "../../Calculator";

type Props = {
    className?: string;
    expression: string;
    setExpression: React.Dispatch<React.SetStateAction<string>>;
    setBlinker: React.Dispatch<React.SetStateAction<Blinker>>;
    result: string;
}

export default function Screen({ className = '', result, setBlinker, setExpression, expression, ...props }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    function updateBlinker(): void {
        setTimeout(() => {
            const selStart = inputRef.current?.selectionStart;
            const selEnd = inputRef.current?.selectionEnd;
            setBlinker({
                start: typeof selStart == 'number' ? selStart : -1,
                end: typeof selEnd == 'number' ? selEnd : -1
            })
        }, 0);// to ensure the latest values of selectionEnd and selectionStart are assigned to the blinker not the previous ones

    }
    function handleMouseup(): void {
        if (document.activeElement == inputRef.current) updateBlinker();
    }
    useEffect(() => {// to track cursor position changes within the input element
        const inputElement = inputRef.current;
        inputElement?.addEventListener('mousedown', updateBlinker);
        document.addEventListener('mouseup', handleMouseup);
        inputElement?.addEventListener('keydown', updateBlinker);
        return () => {
            inputElement?.removeEventListener('mousedown', updateBlinker);
            document.removeEventListener('mouseup', handleMouseup);// mouseup can happen outside of the input element so we need to add the evenlistener to the document not the input itself
            inputElement?.removeEventListener('keydown', updateBlinker);
        }
    }, []);
    return (
        <div className={` text-nowrap leading-none flex flex-col justify-between selection:bg-[#C01A92] bg-[var(--color-screen-bg)] font-[DIG] w-full px-[0.85rem] py-[0.8rem] rounded-t-[1.4rem] overflow-hidden  text-[1.7rem] text-white h-[6rem]  ${className}`} {...props}>
            <input className="indent-[0.2rem] outline-none w-full text-glow" ref={inputRef} onChange={(e) => setExpression(e.target.value)} value={expression} type="text" />
            {expression && <p className="text-end pe-[0.15rem] w-full text-glow">{result}</p>}
        </div>
    );
}