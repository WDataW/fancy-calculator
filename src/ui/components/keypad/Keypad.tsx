import { useEffect, useState, type SetStateAction } from 'react';
import { calculate, isError } from '../../../utils/calculations';
import { Token, Control } from '../buttons';
import type { Blinker } from '../../Calculator';

type Props = {
    className?: string;
    expression: string;
    setExpression: React.Dispatch<React.SetStateAction<string>>;
    setResult: React.Dispatch<React.SetStateAction<string>>;
    blinker: Blinker;
    setBlinker: React.Dispatch<SetStateAction<Blinker>>;
}
export default function Keypad({ className = '', blinker, setBlinker, setResult, expression, setExpression, ...props }: Props) {
    const [ans, setAns] = useState<string>('');
    function writeAtBlinker(token: string): string {
        const expressionStart: string = expression.slice(0, blinker.start);
        const expressionEnd: string = expression.slice(blinker.end, expression.length);
        setBlinker((prevBlinker) => ({ start: prevBlinker.start + token.length, end: prevBlinker.start + token.length }));
        return expressionStart + token + expressionEnd;
    }
    function write(token: string): void {
        const newExpression: string = writeAtBlinker(token);
        setExpression(newExpression);
    }
    function clear(): void {
        setExpression('');
        setBlinker({ start: 0, end: 0 });
    }
    function backspace(): void {//fix
        if (blinker.start == blinker.end) {// if the blinker is at a specific position, then delete the token before it
            const newBlinkerPosition = blinker.start > 0 ? blinker.start - 1 : 0;
            const startExpression: string = expression.slice(0, newBlinkerPosition);
            const endExpression: string = expression.slice(blinker.end, expression.length);
            setExpression(startExpression + endExpression);
            setBlinker({ start: newBlinkerPosition, end: newBlinkerPosition });
        } else {// if text is selected, then delete the selected text
            const startExpression: string = expression.slice(0, blinker.start);
            const endExpression: string = expression.slice(blinker.end, expression.length);
            setExpression(startExpression + endExpression);
            setBlinker({ start: blinker.start, end: blinker.start });
        }
    }
    useEffect(() => {// pressing Enter key = calculate result
        window.addEventListener('keydown', handleEnter);
        return () => window.removeEventListener('keydown', handleEnter);
    }, [expression]);
    function handleEnter(e: KeyboardEvent): void {
        if (e.key == 'Enter') equals();
    }
    function equals(): void {
        if (expression == '') return;
        const result = calculate(expression);
        setResult(result);
        if (!isError(result)) setAns(result);// if result is an error then don't set it to ans 
    }

    function insertAns(): void {
        if (ans == '') return;// if there is no previous answer stored then don't allow for Ans button functionality
        const newExpression = writeAtBlinker(ans);
        setExpression(newExpression);
    }
    return (
        <div onMouseDown={(e) => e.preventDefault()} className={`w-full p-[1rem]  select-none grid gap-[0.4rem] grid-cols-4 ${className}`} {...props}>
            <Token write={write} value='(' />
            <Token write={write} value=')' />
            <Control onClick={clear} value='C'></Control>
            <Control onClick={backspace} value='D'></Control>
            <Token write={write} value='1' />
            <Token write={write} value='2' />
            <Token write={write} value='3' />
            <Token write={write} value='+' />
            <Token write={write} value='4' />
            <Token write={write} value='5' />
            <Token write={write} value='6' />
            <Token write={write} value='-' />
            <Token write={write} value='7' />
            <Token write={write} value='8' />
            <Token write={write} value='9' />
            <Token write={write} value='*' />
            <Token write={write} value='.' />
            <Token write={write} value='0' />
            <Control onClick={insertAns} value='Ans'></Control>
            <Token write={write} value='/' />
            <Token write={write} value='\' />
            <Token write={write} value='^' />
            <Token write={write} value='%' />
            <Control onClick={equals} value='='></Control>
        </div>
    );
}