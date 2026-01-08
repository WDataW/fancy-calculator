import { Discord, Github } from './components/anchors';

type Props = {
    className?: string;
}
export default function Header({ className = '', ...props }: Props) {
    return (
        <div className={`flex justify-between sm:justify-around px-[0.2rem] pt-[0.5rem] ${className}`} {...props}>
            <Github></Github>
            <Discord></Discord>
        </div>
    );
}