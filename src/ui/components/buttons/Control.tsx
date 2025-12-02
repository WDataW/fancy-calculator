import Button from "./Button";

type Props = {
    className?: string;
    value: string;
    onClick: () => void;
}
export default function Control({ className, value, ...props }: Props) {
    return (
        <Button className="relative group  bg-[var(--color-control-button-bg)] " title={value}  {...props}>
            {value}
            <div className=" absolute left-1/2 -translate-x-1/2 bottom-1/7 w-[30%] h-[0.1rem] rounded-full ">{/* the line under the control button label  */}
                <div className="transition duration-100 absolute bg-[var(--color-text-dull)]  group-hover:bg-[var(--color-accent-1)]  group-active:bg-[var(--color-accent-1)] w-full h-full" />
                <div className="transition duration-100 bg-transparent group-hover:bg-[var(--color-accent-1)] group-active:bg-[var(--color-accent-1)] w-full h-full blur-[3px]" />
            </div>
        </Button>
    );
}