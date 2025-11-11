import { useState, useEffect } from 'react'

import loasActualUser from '../../shared/actual-user/loadActualUser'
import loadTasks from '../../shared/tasks/loadTasks'
import saveTasks from '../../shared/tasks/saveTasks'

import WindowSingleInput from '../windows/WindowSingleInput'
import MessageError from '../windows/MessageError'
import Legend from '../ui/Legend'
import Button from './Button'


export default function ButtonCreateTask() {
    const [showMessageII, setShowMessageII] = useState(false)
    const [showMessageTAE, setShowMessageTAE] = useState(false)
    const [showMessageTA, setShowMessageTA] = useState(false)

    const [shoWindowTN, setShoWindowTN] = useState(false)

    const [actualUser, setActualUser] = useState('')
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const user = loasActualUser()
        if (user) {
            setActualUser(user)
            setTasks(loadTasks(user))
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
                    extraStyles='bg-sky-700 w-16 h-16 rounded-full shadow-2xl
                        font-bold transform -translate-y-5 flex items-center
                        justify-center text-3xl cursor-pointer hover:bg-sky-500
                        transition duration-300'
                    handleClick={() => setShoWindowTN(true)}
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
        </>
    )
}
