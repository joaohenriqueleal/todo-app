import RegisterForm from '../components/form/RegisterForm'
import Legend from '../components/ui/Legend'
import Title from '../components/ui/Title'

import TaskListImg from '../assets/task-list.jpeg'
import LevelUp from '../assets/level-up.png'
import Logo from '../../public/logo.jpg'


export default function Register({ setAuth }) {
    return (
        <main className="flex flex-col min-h-screen bg-white text-slate-800">
            <section className="flex items-center gap-4 p-4 sm:p-6 bg-white shadow-sm anim-from-left">
                <img
                    className="w-12 sm:w-16 rounded-xl"
                    alt="Logo Tasken TODO"
                    src={Logo}
                />
                <Title
                    text="TASKEN TODO LTDA"
                    extraStyles="text-xl sm:text-2xl font-bold tracking-wide text-sky-600"
                />
            </section>

            <section className="anim-from-left bg-sky-50 py-12 px-6 text-center">
                <Title
                    extraStyles="text-4xl sm:text-5xl md:text-6xl font-extrabold text-sky-500 leading-tight text-balance"
                    text="Tasken TO-DO"
                />
                <Title
                    text="para gerência de tarefas"
                    extraStyles="text-2xl sm:text-4xl md:text-5xl text-slate-700 mt-2 text-balance"
                />
                <Legend
                    text="Crie sua conta e comece a gerenciar suas tarefas e estudos gratuitamente online com a Tasken!"
                    extraStyles="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed px-2"
                />
            </section>

            <section className="flex flex-col items-center text-center anim-from-left py-14 px-6 md:px-10 mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
                    A melhor experiência na
                </h2>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-sky-700 mb-8 max-w-md">
                    gerência de tarefas diárias e estudos gratuita
                </h2>
                <img
                    alt="Caderno com lista de tarefas"
                    className="w-64 sm:w-80 rounded-2xl shadow-md"
                    src={TaskListImg}
                />
            </section>

            <section className="flex flex-col items-center text-center anim-from-left py-14 px-6 md:px-10 bg-sky-50">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
                    Sistema de aumento de
                </h2>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-sky-700 mb-8 max-w-md">
                    nível pessoal como em um RPG!
                </h2>
                <img
                    alt="Aumento de nível pessoal"
                    className="w-64 sm:w-80 mt-4 rounded-2xl shadow-md"
                    src={LevelUp}
                />
                <Legend
                    text="A cada tarefa concluída, você ganha experiência (EXP) usada para subir o seu nível pessoal!"
                    extraStyles="mt-8 text-base sm:text-lg text-slate-600 text-center max-w-2xl leading-relaxed"
                />
            </section>

            <section className="p-6 sm:p-10 bg-white">
                <div className="max-w-md mx-auto w-full">
                    <RegisterForm setAuth={setAuth} />
                </div>
            </section>
        </main>
    )
}
