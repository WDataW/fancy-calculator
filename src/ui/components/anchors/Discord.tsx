import Anchor from "./Anchor";

type Props = {
    className?: string;
}
export default function Discord({ className = '', ...props }: Props) {
    return (
        <Anchor href="https://discord.com/users/1157778239331250216" className={`w-[25%] max-w-[5rem] rounded-full bg-[url(/src/assets/images/discordLogo.svg)] overflow-hidden bg-center bg-no-repeat bg-size-[80%] inline-block outline-none  ${className}`} {...props} />);
}