import Button from "./Button";

type Props = {
    className?: string;
    value: string;
    onClick: () => void;
}
export default function Control({ className, value, ...props }: Props) {
    return (
        <Button className="bg-[var(--color-control-button-bg)] " title={value}  {...props}>
            {value}
        </Button>
    );
}