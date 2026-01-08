import { useEffect, useRef } from 'react';
import type { Blinker } from '../../Calculator';
import { motion } from 'motion/react';
import { v4 as randomUUID } from 'uuid';
type Props = {
    className?: string;
    expression: string;
    setExpression: React.Dispatch<React.SetStateAction<string>>;
    setBlinker: React.Dispatch<React.SetStateAction<Blinker>>;
    result: string;
    blinker: Blinker;
}
let prevExpression: string = ''
let prevBlinker: Blinker = { start: 0, end: 0 }
let prevScroll: number = 0;
let timeoutId: number;
export default function Screen({ className = '', result, blinker, setBlinker, setExpression, expression, ...props }: Props) {
    expression = expression.replaceAll(' ', '');// no spaces are allowed in the math expression

    const inputRef = useRef<HTMLInputElement>(null);
    function updateBlinker(): void {
        clearTimeout(timeoutId);// to only update to the latest cursor position (in extremely fast typing two keys could invoke the function at almost the same time, here we ensure only the latest one counts)
        timeoutId = setTimeout(() => {
            const selStart = inputRef.current?.selectionStart;
            const selEnd = inputRef.current?.selectionEnd;
            setBlinker({
                start: typeof selStart == 'number' ? selStart : -1,
                end: typeof selEnd == 'number' ? selEnd : -1
            })
        }, 50);// to ensure the latest values of selectionEnd and selectionStart are assigned to the blinker not the previous ones

    }
    function handleMouseup(): void {
        if (document.activeElement == inputRef.current) updateBlinker();
    }

    useEffect(() => {
        // to track cursor position changes within the input element
        const inputElement = inputRef.current;
        inputElement?.addEventListener('mousedown', updateBlinker);
        document.addEventListener('mouseup', handleMouseup);
        inputElement?.addEventListener('keydown', updateBlinker);

        return () => {
            inputElement?.removeEventListener('mousedown', updateBlinker);
            document.removeEventListener('mouseup', handleMouseup);// mouseup can happen outside of the input element so we need to add the evenlistener to the document not the input itself
            inputElement?.removeEventListener('keydown', updateBlinker);
        }
    }, [expression]);

    const beforeBlinker = blinker.start - 1 >= 0 ? blinker.start - 1 : 0;//  index before the blinker, if blinker is at 0 then there is nothing before it, therefore it defaults to 0
    const motionSpanKey = randomUUID();// ensure animations always runs

    const divRef = useRef<HTMLDivElement>(null);
    function handleInputScroll(e: React.UIEvent<HTMLInputElement>): void {// to keep the scroll of the-div-that-represents-the-styled-input in sync with the input scroll
        if (divRef.current) {
            divRef.current.scrollLeft = e.currentTarget.scrollLeft;
        }
    }

    function getScrollDiff() {// to calculate the scroll change in case of input change
        const removedChars = prevExpression.slice(prevBlinker.start == prevBlinker.end ? prevBlinker.start - 1 : prevBlinker.start, prevBlinker.end);// in case that the change included deletion of content 
        const diffCount = expression.length - (prevExpression.length - removedChars.length);// the count of different characters between the old and new expressions
        const addedChars = expression.slice(blinker.start - diffCount < 0 ? 0 : blinker.start - diffCount, blinker.start);// the new characters added to the expression
        const removedCharsPotentialScroll = calcPotentialScroll(removedChars);// the result in scroll of the deleted characters
        const addedCharsPotentialScroll = calcPotentialScroll(addedChars);// the result in scroll of the added characters
        const scrollDiff = (addedCharsPotentialScroll - removedCharsPotentialScroll);// the net change in scroll
        return scrollDiff;
        function calcPotentialScroll(str: string): number {// calc the width of a string
            let accumulator = 0;
            for (let c of str.split('')) {
                accumulator += reduceCharToScroll(c);
            }
            return accumulator;
        }
        function reduceCharToScroll(char: string): number {// different chars differ in width
            switch (char) {
                case '.': return 2;
                case '1': return 4.5;
                case '(':
                case ')': return 8.7;
                case '+':
                case '-':
                case '*': return 11
                case '\\':
                case '/':
                case '^':
                case '0':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9': return 13;
                case '%': return 15;
                default: return 10;
            }
        }
    }

    useEffect(() => {
        // if the cursor position changed within the text
        if (inputRef.current && (blinker.start != prevBlinker.start || blinker.end != prevBlinker.end)) {
            inputRef.current.selectionStart = blinker.start;
            inputRef.current.selectionEnd = blinker.end;
            // if the expression changed && (the cursor isn't at the start of the input || something was deleted from previous exprssion) && text overflew the input
            if (expression != prevExpression && (blinker.start > 18 || prevExpression.length > expression.length) && inputRef.current.scrollWidth > inputRef.current.width) {
                inputRef.current.scrollLeft = prevScroll + getScrollDiff();
            }
            // setup for the next render
            prevBlinker = blinker;
            prevExpression = expression;
            prevScroll = inputRef.current.scrollLeft;
        }
    }, [blinker]);
    return (
        <div className={` text-nowrap flex flex-col justify-between selection:bg-[var(--color-accent-1)] bg-[var(--color-screen-bg)] font-[DIG] w-full px-[0.85rem]  pt-[0.2rem] sm:pt-[0.3rem] pb-[0.3rem] rounded-t-[1.4rem] overflow-hidden  text-[1.7rem]  h-[6rem]  ${className}`} {...props}>
            <div className='relative indent-[0.2rem]'>
                <input onScroll={handleInputScroll} className='absolute z-10 caret-white selection:text-white text-transparent pe-[0.85rem] outline-none w-full  ' ref={inputRef} onChange={(e) => setExpression(e.target.value)} value={expression} type='text' />
                <div ref={divRef} className='scrollbar-none  pe-[0.85rem] select-none overflow-x-scroll transition text-glow text-white '>
                    {expression.slice(0, beforeBlinker)}
                    <motion.span className='text-start text-glow-accent-3' key={motionSpanKey} initial={{ color: 'rgb(255,255,255)' }} animate={{ color: 'var(--color-accent-3)' }}>{expression.slice(beforeBlinker, blinker.start)}</motion.span>
                    {expression.slice(blinker.start)}
                </div>
            </div>
            {expression && <p className='text-white text-end pe-[0.15rem] w-full text-glow'>{result}</p>}
        </div >
    );
}