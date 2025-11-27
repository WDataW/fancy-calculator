type Props = {
    className?: string;
    expression: string;
    result: string;
}
export default function Screen({ className = '', result, expression, ...props }: Props) {
    return (

        <div className={` text-nowrap relative bg-[var(--color-screen-bg)] font-[DIG] w-full px-[1rem] rounded-t-[1.4rem] overflow-hidden py-[0.4rem] text-[1.7rem] text-white h-[6rem]  ${className}`} {...props}>
            <p className="absolute blur-[0.15rem] opacity-50">{expression}</p>
            <p >{expression}</p>
            <div className="relative">
                {expression && <p className="text-end absolute blur-[0.15rem] opacity-50 position-end w-full">{result}</p>}
                {expression && <p className="text-end w-full">{result}</p>}
            </div>

        </div>
    );
}