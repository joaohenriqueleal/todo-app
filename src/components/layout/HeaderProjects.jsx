import Title from "../ui/Title"


export default function HeaderProjects({ actualUser, totalProjects }) {
    return (
        <header
            className="flex items-center justify-between p-8 bg-linear-to-r
                from-sky-500 to-sky-600"
        >
            <Title text={actualUser} extraStyles='text-white' />
            <Title text={`${totalProjects} projetos`} extraStyles='text-white' />
        </header>
    )
}
