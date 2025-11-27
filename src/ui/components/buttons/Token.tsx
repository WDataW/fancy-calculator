import Button from "./Button";

type Props = {
    value: string;
    write: (token: string) => void;
}
export default function Token({ value, write, ...props }: Props) {
    return (
        <Button title={value} onClick={() => write(value)} {...props}>
            {value.charAt(0)}
        </Button>
    );
}