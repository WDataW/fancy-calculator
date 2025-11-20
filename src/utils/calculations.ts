
export function isValid(tokens: string[]): boolean {
    if ([...getOperators(0), '('].includes(tokens[tokens.length - 1])) return false;// if the expression starts with %/*) then it is directly invalid

    let openParentheses: number = 0;
    let closingParentheses: number = 0;
    let invalidTokens: number = 0;
    let prevToken = '';
    for (let token of tokens) {
        if (isOperator(token)) {
            if (isOperator(prevToken)) return false;
        }
        else if (isParenthesis(token)) {
            if (token == '(') {
                if (isNum(prevToken)) return false; // num( is invalid
                openParentheses++;
            } else if (token == ')') {
                if (isOperator(prevToken) || prevToken == '(') return false; // +) () or similar cases are invalid
                closingParentheses++
            }
        } else if (!isNum(token)) {// if the token is not number nor an operator nor a parenthesis then it is invalid
            invalidTokens++;
        }
        if (closingParentheses > openParentheses || invalidTokens != 0) return false; // a closing parenthesis before the presence of an opening one is invalid
        prevToken = token;
    }
    return closingParentheses == openParentheses;// if the amounts of parentheses don't match then it is invalid
}

export function parse(expression: string): string[] {
    const tokens: string[] = [];
    let operand: string = '';
    for (let char of expression.split('')) {

        if (!isNum(char) && char != '.') {// true = char isn't a number 
            if (operand == '' && (isOperator(char) && !tokens.length || isOperator(char) && tokens[tokens.length - 1] == '(' || isOperator(tokens[tokens.length - 1]) && isOperator(char))) {// in the case of -1, (-1), or + -1 consider the operator a part of the number
                operand += char;
                continue;
            }
            else if (operand) tokens.push(operand); // push any existing operands before pushing the operator.
            operand = ''; // reset the oparand for future use.

            tokens.push(char); // push the operator
        } else {
            operand += char;
        }
    }
    if (operand) tokens.push(operand); // push any remaining operands
    return tokens;
}

function isNum(str: string): boolean {
    return str != '' && !isNaN(Number(str)) && isFinite(Number(str));
}

const operators: { [key: string]: any } = {
    '+': {
        precedence: 1
    },
    '-': {
        precedence: 1
    },
    '*': {
        precedence: 2
    },
    '/': {
        precedence: 2
    },
    '%': {
        precedence: 2
    }
}
function isOperator(str: string): boolean {
    const operatorsArr: string[] = getOperators(0);
    return operatorsArr.includes(str);
}
function isParenthesis(str: string): boolean {
    return ['(', ')'].includes(str);
}


function getOperators(precedence: number, exact: boolean = false): string[] {
    const operatorsArr: string[] = [];
    if (exact) {// kept out of the loop to avoid comparisons at each iteration
        for (let key in operators) {
            if (operators[key].precedence == precedence) {
                operatorsArr.push(key);
            }
        }
        return operatorsArr;
    } else for (let key in operators) {// then exact=false and we want operators of equal or higher precedence than specified
        if (operators[key].precedence >= precedence) {
            operatorsArr.push(key);
        }
    }
    return operatorsArr;
}
