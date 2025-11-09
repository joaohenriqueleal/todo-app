export default function Title({ text, extraStyles }) {
    return <h1 className={`font-black text-3xl ${extraStyles}`}>{text}</h1>;
}
