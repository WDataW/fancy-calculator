type Props = {
    className?: string;
}
function Note({ title, content }: { title: string, content: string }) {
    return (<div>
        <p className="text-white inline-block"><span className="font-bold text-[var(--color-accent-3)] inline-block ">{title}:</span> {content}</p>
    </div>);
}
export default function Guide({ className = '', ...props }: Props) {
    return (
        <div className={` p-[1rem] w-full max-w-[19rem] rounded-[1.5rem] border-2 text-[var(--color-calc-gradient-secondary)] h-full ${className}`} {...props}>
            <h1 className="text-white font-bold text-[1.2rem] pb-[0.2rem] border-b mb-[1rem]">Quick Guide</h1>
            <div className="flex flex-col gap-[0.7rem] justify-between ">
                <Note title='C' content='Clears all inputs (Ans is maintained).' />
                <Note title='D' content='Deletes the character before the cursor.' />
                <Note title='Ans' content='Inserts the previous answer (if exists).' />
                <Note title='^' content='"X^Y" translates to X to the power of Y.' />
                <Note title='\' content='"\X" translates to the square root of X ("\\" means nested square roots).' />
                <Note title='%' content='"X%Y" translates to the remainder of X/Y.' />
            </div>
        </div>
    );
}