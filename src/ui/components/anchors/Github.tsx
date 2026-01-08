import Anchor from "./Anchor";

type Props = {
    className?: string;
}
export default function Github({ className = '', ...props }: Props) {
    return (
        <Anchor href="https://github.com/WDataW/fancy-calculator" className={`w-[25%] max-w-[4rem] rounded-full bg-[url(/src/assets/images/githubLogo.png)] bg-center bg-no-repeat bg-contain inline-block outline-none ${className}`} {...props} />);
}