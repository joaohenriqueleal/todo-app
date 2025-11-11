import ButtonCreateTask from '../form/ButtonCreateTask'


export default function NavBar() {
    return (
        <>
            <nav
                className="fixed bottom-0 left-0 w-full z-999 text-white border
                    text-center border-t-2 border-gray-500 bg-gray-50
                    flex items-center justify-center"
            >
                <ButtonCreateTask />
            </nav>
        </>
    )
}
