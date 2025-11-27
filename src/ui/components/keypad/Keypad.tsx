import { useState } from 'react';
import { calculate, isError } from '../../../utils/calculations';
import { Token, Control } from '../buttons';

type Props = {
    className?: string;
    setExpression: React.Dispatch<React.SetStateAction<string>>;
    setResult: React.Dispatch<React.SetStateAction<string>>

}
export default function Keypad({ className = '', setResult, setExpression, ...props }: Props) {
    const [ans, setAns] = useState<string>('');
    function write(token: string): void {
        setExpression((prevExpression) => isError(prevExpression) ? token.charAt(0) : prevExpression + token.charAt(0));// if previous expression was an error then replace it with the token, else add token to the existing expression
        setResult('');
    }
    function clear(): void {
        setExpression('');
        setResult('');
    }
    function backspace(): void {
        setExpression(prevExpression => isError(prevExpression) ? '' : prevExpression.slice(0, prevExpression.length - 1));// if previous expression is an error then erase it completely
        setResult('');
    }
    function equals(): void {
        setExpression(prevExpression => {// using setExpression just to access the value of expression.
            const result = calculate(prevExpression);
            setResult(result);
            if (!isError(result)) setAns(result);// if result is an error then don't set it to ans 
            return prevExpression;
        });
    }
    function insertAns(): void {
        setExpression(prevExpression => isError(prevExpression) ? ans : prevExpression + ans);
        setResult('');

    }
    return (
        <div className={`w-full p-[1rem]  select-none grid gap-[0.4rem] grid-cols-4 ${className}`} {...props}>
            <Token write={write} value='(' />
            <Token write={write} value=')' />
            <Control onClick={clear} value='C'></Control>
            <Control onClick={backspace} value='Del'></Control>
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
            <Token write={setExpression} value='%' />
            <Control onClick={equals} value='='></Control>
        </div>
    );
}