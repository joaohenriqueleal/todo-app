import NavBar from '../components/layout/NavBar'
import Title from '../components/ui/Title'

export default function About() {
    return (
        <>
            <header className='bg-linear-to-r from-sky-600 to-sky-400 p-6 shadow-md'>
                <Title text='Sobre a Tasken' extraStyles='text-white text-3xl font-semibold' />
            </header>

            <main className='p-6 flex flex-col gap-8 max-w-3xl mx-auto'>
                <section className='bg-white p-6 rounded-2xl shadow-sm border border-slate-200'>
                    <Title text='Do que se trata?' extraStyles='text-sky-600 text-xl' />
                    <hr className='my-3 text-gray-300' />
                    <article className='text-slate-700 leading-relaxed'>
                        <p>
                            Este site é um gerenciador de tarefas criado para ajudar você a organizar
                            melhor sua rotina. Cada ação concluída gera experiência (EXP), permitindo
                            que o usuário evolua de nível conforme completa suas tarefas.
                        </p>
                        <p className='mt-3'>
                            Cada tarefa concluída concede <strong>1 ponto de EXP</strong>, e a cada
                            <strong> 50 pontos</strong>, você sobe para o próximo nível.
                        </p>
                    </article>
                </section>

                <section className='bg-white p-6 rounded-2xl shadow-sm border border-slate-200'>
                    <Title text='Como usar?' extraStyles='text-sky-600 text-xl' />
                    <hr className='my-3 text-gray-300' />
                    <article className='text-slate-700 leading-relaxed'>
                        <p>
                            Na aba <strong>Tarefas</strong> da barra de navegação, você pode criar uma
                            nova tarefa usando o botão disponível. Assim que criada, ela aparece na sua
                            lista, onde pode ser marcada como concluída, editada ou removida.
                        </p>
                        <p className='mt-3'>
                            Na aba <strong>Perfil</strong>, você encontra as informações da sua conta e
                            sua progressão. Já na aba <strong>Evolução</strong>, há um painel com dados
                            gráficos sobre suas tarefas e os dias finalizados através do botão
                            <em> "Finalizar dia"</em>.
                        </p>
                    </article>
                </section>
            </main>

            <NavBar />
        </>
    )
}
