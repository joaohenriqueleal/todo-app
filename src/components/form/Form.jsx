export default function Form({ children, extraStyles }) {
    return <form className={`flex flex-col ${extraStyles}`}>{children}</form>;
}
