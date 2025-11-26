type Props = {
    className?: string;
    expression: string;
}
export default function Screen({ className = '', expression, ...props }: Props) {
    return (
        <div className={`w-full px-[1rem] py-[0.2rem] text-[1.5rem] h-12 bg-white ${className}`} {...props}>
            {expression}
        </div>
    );
}