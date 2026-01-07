import type { JSX } from "react";

type Props = {
    className?: string;
    href: undefined | string
    children?: JSX.Element;
}
export default function Anchor({ href, className = '', children, ...props }: Props) {
    return (
        <a href={href} className={`aspect-square ${className}`} {...props}>
            {children}
        </a>
    );
}