type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    children?: React.ReactNode;
}
export default function Button({ children, className = ' ', ...props }: Props) {
    return (
        <button className={`text-[#48505B] button-inset-shadow  bg-[var(--color-button-bg)] cursor-pointer rounded-[0.4rem] sm:rounded-[0.6rem] aspect-3/2  ${className}`} {...props}>
            {children}
        </button>
    );
}