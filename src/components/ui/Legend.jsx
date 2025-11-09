export default function Legend({ text, extraStyles }) {
    return <p className={`text-gray-600 ${extraStyles}`}>{text}</p>;
}
