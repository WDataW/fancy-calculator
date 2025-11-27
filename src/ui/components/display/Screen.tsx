type Props = {
    className?: string;
    expression: string;
}
export default function Screen({ className = '', expression, ...props }: Props) {
    return (

        <div className={` text-nowrap relative bg-[var(--color-screen-bg)] font-[DIG] w-full px-[1rem] rounded-t-[1.4rem] overflow-hidden    py-[0.4rem] text-[1.5rem] text-white h-[6rem]  ${className}`} {...props}>
            <p className="absolute blur-[0.15rem] opacity-50">{expression}</p>
            <p >{expression}</p>

        </div>
    );
}