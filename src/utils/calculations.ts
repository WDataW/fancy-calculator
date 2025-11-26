export function calculate(expression: string): string {
    if (!isValidSyntax(expression)) return 'SYNTAX ERROR';
    if (expression.length == 0) return '';

    const result: string = String(evaluate(expression));
    if (!isNum(result)) return 'MATH ERROR'
    return result
}
function evaluate(expression: string): number {
    const tokens = postfix(expression);
    const operandsStack: string[] = [];
    for (let token of tokens) {

        if (isNum(token)) operandsStack.push(token);
        else {
            if (isOperator(token, operators['~'].precedence, true)) {
                let n1: number = Number(operandsStack.pop());
                n1 = solve(n1, NaN, token);
                operandsStack.push(String(n1));

            }
            else if (isSqrt(token)) {
                if (token.endsWith('\\')) {// if sqrt operator is used before parenthesis \(1+3) = 2
                    let n1: number = Number(operandsStack.pop());
                    const sqrtFrequency = token.length;
                    for (let i = 0; i < sqrtFrequency; i++)n1 = solve(n1, NaN, '\\');
                    operandsStack.push(String(n1));
                    continue;
                }
                else {// if sqrt operator is embedded with a number \\16 = 2
                    let n1: number = Number(token.slice(token.lastIndexOf('\\') + 1));
                    const sqrtFrequency = (token.lastIndexOf('\\') + 1);
                    for (let i = 0; i < sqrtFrequency; i++)n1 = solve(n1, NaN, '\\');
                    operandsStack.push(String(n1));
                    continue;
                }
            } else {
                const n2: number = Number(operandsStack.pop());
                const n1: number = Number(operandsStack.pop());
                operandsStack.push(String(solve(n1, n2, token)));
            }
        }
    }
    return Number(operandsStack.pop());
}
function solve(n1: number, n2: number, operation: string): number {

    switch (operation) {
        case '+': return n1 + n2;
        case '-': return n1 - n2;
        case '*': return n1 * n2;
        case '/': return n1 / n2;
        case '%': return n1 % n2;
        case '^': return Math.pow(n1, n2);
        case '\\': return Math.sqrt(n1);
        case '~': return -n1;
        default: return NaN;
    }
}


function postfix(expression: string): string[] {
    const tokens: string[] = parse(expression);

    const postfixStack: string[] = [];
    const operationsStack: string[] = [];

    for (let token of tokens) {

        if (isNum(token)) postfixStack.push(token);
        else if (isParenthesis(token)) {
            if (token == '(') operationsStack.push(token);
            else {// if token is ')'
                while (top(operationsStack) != '(' && operationsStack.length) {
                    const top = operationsStack.pop();
                    if (top) postfixStack.push(top);
                }
                operationsStack.pop();// to get rid of the leftover '(' 
            }
        }
        else if (isOperator(token)) {
            if (compare(operators[token], operators[operationsStack.length ? top(operationsStack).charAt(0) : '']) > 0 || top(operationsStack) == '(' || token == '~') operationsStack.push(token) // if the precedence of the token's precedence higher than the precedence of the top of the operationsStack then just push it on top. ~ negation is always pushed on top
            else {// if the precedence of the token's precedence lower than or equal to the precedence of the top of the operationsStack
                while (compare(operators[token], operators[operationsStack.length ? top(operationsStack).charAt(0) : '']) <= 0) {// keep moving operators from operationsStack to postfixStack until the condition fails. 
                    const top = operationsStack.pop();
                    if (top) postfixStack.push(top);
                }
                operationsStack.push(token);// if no more higher precedence operators exist in the operationsStack then push token on top
            }
        }
        else if (isSqrt(token)) {
            if (token.endsWith('\\')) operationsStack.push(token)// if token is an sqrt plain operator like \\\\ then push it to the operationsStack 
            else postfixStack.push(token);// if token is an embedded sqrt like \\\\16 then push it to the postfixStack
        }
    }
    for (let i = operationsStack.length - 1; i > -1; i--) postfixStack.push(operationsStack[i]); // push any leftover operations from operationsStack into postfixStack

    return postfixStack;
}

function isValidSyntax(expression: string): boolean {
    if (expression.includes('~')) return false; // - unary operator should be expressed using - not ~ (even though it is interpreted as ~ in the parser)
    if (isOperator(expression.charAt(expression.length - 1)) || isOperator(expression.charAt(0)) && !['\\', '-', '+'].includes(expression.charAt(0))) return false;// if it starts or ends with an operator then it is invalid (note: expression can start with unary operators as \+-)
    const tokens = parse(expression);
    let openParentheses: number = 0;
    let closingParentheses: number = 0;
    let invalidTokens: number = 0;

    let prevToken = '';
    for (let token of tokens) {
        if (isOperator(token)) {
            if (isOperator(prevToken) && !token.startsWith('\\') && token != '~') return false;// +\num is allowed but +*num isn't. unary - is also allowed as 1+-1 \-1
        }
        else if (isParenthesis(token)) {
            if (token == '(') {
                openParentheses++;
            } else if (token == ')') {
                if (isOperator(prevToken) || prevToken == '(') return false; // +) () or similar cases are invalid
                closingParentheses++
            }
        } else if (isNum(token) && prevToken == ')') return false;
        else if (!isNum(token) && !isSqrt(token)) {// if the token is not number nor an operator nor a parenthesis nor an sqrt operation then it is invalid
            invalidTokens++;
        }
        if (closingParentheses > openParentheses || invalidTokens != 0) return false; // a closing parenthesis before the presence of an opening one is invalid
        prevToken = token;
    }
    return closingParentheses == openParentheses;// if the amounts of parentheses don't match then it is invalid
}


function parse(expression: string): string[] {
    const tokens: string[] = [];
    let operand: string = '';
    expression = expression.replaceAll(' ', '');
    for (let char of expression.split('')) {
        if (!isNum(char) && char != '.') {// if char isn't a number 
            if ((operand == '' || operand.endsWith('\\')) && isOperator(char, 1, true) && (!tokens.length || tokens[tokens.length - 1] == '(' || isOperator(tokens[tokens.length - 1]))) {// to allow for unary negation as (-4) = -4. while unary + is always ignored
                if (char == '-') {
                    if (operand) tokens.push(operand);
                    operand = '';
                    tokens.push('~');// unary minus
                }
            }
            else {
                if (operand) {
                    tokens.push(operand); // push any existing operands before pushing the operator.
                    operand = '';// reset the oparand for future use.

                }
                if ((char == '(' || char == '\\') && tokens.length && (isNum(top(tokens)) || top(tokens) == ')' || (isSqrt(top(tokens))) && !top(tokens).endsWith('\\'))) tokens.push('*');// to allow for implicit multiplication 1(5)=5 \4(2)=4 (1)(4)=4
                tokens.push(char); // push the operator
            }
        } else {// if char is a number
            operand += char;
        }
    }
    if (operand) tokens.push(operand); // push any remaining operands before returning
    return tokens;
}

function isNum(str: string): boolean {
    return str != '' && !isNaN(Number(str)) && isFinite(Number(str));
}
function isSqrt(str: string): boolean {// returns if if str is similar '\\\\\\\\\' or '\\\\\numbers'
    const sqrtOperatorRegex = /^\\+$/;// fully made if \\ to allow for multiple level square roots
    const isSqrtOperator = sqrtOperatorRegex.test(str);

    return str.startsWith('\\') && isNum((str.slice(str.lastIndexOf('\\') + 1))) || isSqrtOperator;
}


type operator = {
    precedence: number;
}
const operators: { [key: string]: operator } = {
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
    },
    '^': {
        precedence: 6
    },
    '\\': {// square root
        precedence: 6
    },
    '~': {// unary negation
        precedence: 5
    }
}
function isOperator(str: string, ofPrecedence: number = 0, exactMatch: boolean = false): boolean {
    const operatorsArr: string[] = getOperators(ofPrecedence, exactMatch);
    return operatorsArr.includes(str);
}

//compare the precedence of two operators
// >0 means op1 is higher in precedence
// 0 means both are of equal precedence
// <0 means op1 is of lower precedence
function compare(operator1: operator = { precedence: 0 }, operator2: operator = { precedence: 0 }): number {
    return operator1.precedence - operator2.precedence;
}

function isParenthesis(str: string): boolean {
    return ['(', ')'].includes(str);
}
export function isError(str: string) {
    return str.toLocaleLowerCase().includes('error');
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

function top(stack: string[]) {
    return stack[stack.length - 1];
}