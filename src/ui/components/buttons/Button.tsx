type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
    children?: React.ReactNode;
}
export default function Button({ children, className = 'border p-1 bg-gray-200', ...props }: Props) {
    return (
        <button className={` cursor-pointer rounded-[0.2rem] aspect-3/2 ${className}`} {...props}>
            {children}
        </button>
    );
}