type Props = {
    className?: string;
    expression: string;
}
export default function Screen({ className = '', expression, ...props }: Props) {
    return (

        <div className={`bg-[var(--color-screen-bg)] w-full px-[1rem] rounded-t-[1.4rem] overflow-hidden    py-[0.4rem] text-[1.5rem] text-white h-[6rem]  ${className}`} {...props}>
            {expression}
        </div>
    );
}