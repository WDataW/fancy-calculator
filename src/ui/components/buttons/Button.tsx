type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    children?: React.ReactNode;
}
export default function Button({ children, className = ' ', ...props }: Props) {
    return (
        <button className={`hover:text-white active:text-white transition duration-100 text-[var(--color-text-dull)] button-inset-shadow   cursor-pointer rounded-[0.4rem] sm:rounded-[0.6rem] aspect-3/2  ${className}`} {...props}>
            {children}
        </button>
    );
}