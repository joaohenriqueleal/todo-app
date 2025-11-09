import { useEffect, useState } from 'react';

export default function Input({
    type,
    id,
    handleChange,
    placeholder,
    label,
    color,
    value,
    width,
    extraStyles,
    contentExtraStyles,
}) {
    const [bgColor, setBgColor] = useState(color);

    useEffect(() => {
        if (!color) {
            setBgColor('bg-white');
        }
    }, []);

    return (
        <div className={`flex flex-col gap-2 ${contentExtraStyles}`}>
            <label
                className="pl-2 text-gray-700 font-bold indent-1"
                htmlFor={id}
            >
                {label}
            </label>
            <input
                className={`${bgColor} p-3.5 rounded-3xl shadow-md border-gray-400/55
                    border-3 ${width} ${extraStyles}`}
                onChange={(e) => handleChange(e.target.value)}
                placeholder={placeholder}
                value={value}
                type={type}
                id={id}
            />
        </div>
    );
}
