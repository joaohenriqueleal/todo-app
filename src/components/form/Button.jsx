export default function Button({ text, handleClick, extraStyles }) {
    return (
        <button onClick={(e) => handleClick(e)} className={`${extraStyles}`}>
            {text}
        </button>
    );
}
