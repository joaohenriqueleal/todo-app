import { useState, useEffect } from 'react'

import loasActualUser from '../../shared/actual-user/loadActualUser'
import saveTasks from '../../shared/tasks/saveTasks'

import WindowSingleInput from '../windows/WindowSingleInput'
import MessageError from '../windows/MessageError'
import Legend from '../ui/Legend'
import Button from './Button'


export default function ButtonCreateTask({ tasks, setTasks, isTasksPage }) {
    const [showMessageIP, setShowMessageIP] = useState(false)
    const [showMessageII, setShowMessageII] = useState(false)
    const [showMessageTAE, setShowMessageTAE] = useState(false)
    const [showMessageTA, setShowMessageTA] = useState(false)

    const [shoWindowTN, setShoWindowTN] = useState(false)

    const [actualUser, setActualUser] = useState('')

    useEffect(() => {
        const user = loasActualUser()
        if (user) {
            setActualUser(user)
        }
    }, [])

    const createTask = (taskName) => {
        if (!taskName) {
            setShowMessageII(true)
            return
        }

        const taskExists = tasks.find(t => t.name == taskName.trim())

        if (taskExists) {
            setShowMessageTAE(true)
        } else {
            const newTasksList = [...tasks, {
                name: taskName.trim(),
                completed: false,
                time: Date.now()
            }]
            saveTasks(actualUser, newTasksList)
            setTasks(newTasksList)
            setShowMessageTA(true)
        }
    }

    return (
        <>
            <div className='flex flex-col items-center justify-center'>
                <Button
                    extraStyles={`${isTasksPage ? 'bg-sky-700 hover:bg-sky-500' :
                        'bg-gray-600'} w-16 h-16 rounded-full transition duration-300
                        shadow-2xl font-bold transform -translate-y-5 flex
                        items-center justify-center text-3xl cursor-pointer`}
                    handleClick={isTasksPage ? () => setShoWindowTN(true) : 
                        () => setShowMessageIP(true)
                    }
                    text='+'
                />
                <Legend
                    extraStyles='transform -translate-y-4 font-semibold'
                    text='Criar'
                />
            </div>
            {shoWindowTN && (
                <WindowSingleInput
                    placeholder='Insira o seu à fazer ex: "Fazer almoço"'
                    title='Criar nova tarefa'
                    setShow={setShoWindowTN}
                    action={createTask}
                    id='inputNameTask'
                    label='Nome:'
                    type='text'
                />
            )}
            {showMessageII && (
                <MessageError
                    message='Por favor preencha todos os campos corretamente.'
                    setShow={setShowMessageII}
                />
            )}
            {showMessageTAE && (
                <MessageError
                    message='Essa tarefa já está cadastrada.'
                    setShow={setShowMessageTAE}
                />
            )}
            {showMessageTA && (
                <MessageError
                    message='Nova tarefa adicionada com sucesso!'
                    setShow={setShowMessageTA}
                />
            )}
            {showMessageIP && (
                <MessageError
                    message='Você só pode criar tarefas na página de Tarefas'
                    setShow={setShowMessageIP}
                />
            )}
        </>
    )
}
