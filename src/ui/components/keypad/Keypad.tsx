import { useState } from 'react';
import { calculate, isError } from '../../../utils/calculations';
import { Token, Control } from '../buttons';

type Props = {
    className?: string;
    setExpression: React.Dispatch<React.SetStateAction<string>>;

}
export default function Keypad({ className = '', setExpression, ...props }: Props) {
    const [ans, setAns] = useState<string>('');
    function clear(): void {
        setExpression('');
    }
    function backspace(): void {
        setExpression(prevExpression => isError(prevExpression) ? '' : prevExpression.slice(0, prevExpression.length - 1));// if previous expression is an error then erase it completely
    }
    function equals(): void {
        setExpression(prevExpression => {
            const result = calculate(prevExpression);
            if (!isError(result)) setAns(result);// if result is an error then don't set it to ans 
            return result;
        });
    }
    function insertAns(): void {
        setExpression(prevExpression => isError(prevExpression) ? ans : prevExpression + ans);
    }
    return (
        <div className={`w-full select-none grid gap-[0.1rem] grid-cols-4 ${className}`} {...props}>
            <Token setExpression={setExpression} value='(' />
            <Token setExpression={setExpression} value=')' />
            <Control onClick={clear} value='Clear'></Control>
            <Control onClick={backspace} value='Del'></Control>
            <Token setExpression={setExpression} value='1' />
            <Token setExpression={setExpression} value='2' />
            <Token setExpression={setExpression} value='3' />
            <Token setExpression={setExpression} value='+' />
            <Token setExpression={setExpression} value='4' />
            <Token setExpression={setExpression} value='5' />
            <Token setExpression={setExpression} value='6' />
            <Token setExpression={setExpression} value='-' />
            <Token setExpression={setExpression} value='7' />
            <Token setExpression={setExpression} value='8' />
            <Token setExpression={setExpression} value='9' />
            <Token setExpression={setExpression} value='*' />
            <Token setExpression={setExpression} value='.' />
            <Token setExpression={setExpression} value='0' />
            <Control onClick={insertAns} value='Ans'></Control>
            <Token setExpression={setExpression} value='/' />
            <Token setExpression={setExpression} value='\' />
            <Token setExpression={setExpression} value='^' />
            <Token setExpression={setExpression} value='%' />
            <Control onClick={equals} value='='></Control>
        </div>
    );
}