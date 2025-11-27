type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    children?: React.ReactNode;
}
export default function Button({ children, className = ' ', ...props }: Props) {
    return (
        <button className={`text-[#48505B] inset-shadow-xs/5 inset-shadow-white bg-[#1B232E] cursor-pointer rounded-[0.4rem] sm:rounded-[0.6rem] aspect-3/2 ${className}`} {...props}>
            {children}
        </button>
    );
}