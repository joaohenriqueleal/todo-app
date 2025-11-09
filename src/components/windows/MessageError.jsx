import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function MessageError({ setShow, message }) {
    const [closing, setClosing] = useState(false);
    const [progress, setProgress] = useState(100);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 50);
        const duration = 5000;
        const intervalTime = 50;
        const decrement = (intervalTime / duration) * 100;

        const interval = setInterval(() => {
            setProgress((p) => {
                if (p <= 0) {
                    clearInterval(interval);
                    handleClose();
                    return 0;
                }
                return p - decrement;
            });
        }, intervalTime);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => setShow(false), 300);
    };

    return (
        <div
            className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
                visible && !closing
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-5'
            }`}
        >
            <div
                className="bg-brand text-white rounded-lg shadow-lg px-4 py-3
                    w-80 relative overflow-hidden flex items-center"
            >
                <p className="text-sm pr-6 flex-1 font-bold">{message}</p>
                <button
                    onClick={handleClose}
                    className="flex items-center justify-center text-white
                        hover:text-gray-200 cursor-pointer hover:bg-sky-300
                        rounded-full p-1"
                >
                    <X size={18} />
                </button>
                <div
                    className="absolute bottom-0 left-0 h-1 bg-white transition-all
                        duration-50"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
}
