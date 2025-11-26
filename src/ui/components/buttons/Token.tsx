import { isError } from "../../../utils/calculations";
import Button from "./Button";

type Props = {
    value: string;
    setExpression: React.Dispatch<React.SetStateAction<string>>;
}
export default function Token({ value, setExpression, ...props }: Props) {
    function onClick(): void {
        setExpression((prevExpression) => isError(prevExpression) ? value.charAt(0) : prevExpression + value.charAt(0));// if previous expression was an error then replace it with the token, else add token to the existing expression
    }
    return (
        <Button title={value} onClick={onClick} {...props}>
            {value.charAt(0)}
        </Button>
    );
}