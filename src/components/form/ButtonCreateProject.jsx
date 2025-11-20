import { useEffect, useState } from 'react'

import loadActualUser from '../../shared/actual-user/loadActualUser'
import saveProjects from "../../shared/projects/saveProjects"

import WindowDoubleInput from '../windows/WindowDoubleInput'
import MessageError from '../windows/MessageError'
import Legend from '../ui/Legend'
import Button from './Button'


export default function ButtonCreateProject({ projects, setProjects }) {
    const [actualUser, setActualUser] = useState(null)
    const [showWindowDI, setShowWindowDI] = useState(false)

    const [showMessageInvalidDate, setShowMessageInvalidDate] = useState(false)
    const [showMessageSuccess, setShowMessageSuccess] = useState(false)
    const [showMessageExists, setShowMessageExists] = useState(false)
    const [showMessageII, setShowMessageII] = useState(false)

    useEffect(() => {
        const user = loadActualUser()
        if (user) setActualUser(user)
    })

    const createProject = (projectName, projectTerm) => {
        const trimmedName = projectName.trim()

        if (!trimmedName || !projectTerm) {
            setShowMessageII(true)
            return
        }

        const normalizedNewName = trimmedName.toLowerCase()

        const nameAlreadyExists = projects.some(p =>
            p.name.trim().toLowerCase() === normalizedNewName
        )

        if (nameAlreadyExists) {
            setShowMessageExists(true)
            return
        }

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const projectDate = new Date(projectTerm)

        if (projectDate <= today) {
            setShowMessageInvalidDate(true)
            return
        }

        const newProject = {
            name: trimmedName,
            term: projectTerm,
            time: Date.now()
        }

        const newProjectsList = [...projects, newProject]

        setProjects(newProjectsList)
        saveProjects(actualUser, newProjectsList)

        setShowMessageSuccess(true)
    }

    return (
        <>
            <div className='flex flex-col items-center justify-center'>
                <Button
                    extraStyles="bg-sky-700 hover:bg-sky-500 w-16 h-16 rounded-full
                        transition duration-300 shadow-2xl font-bold transform
                        -translate-y-5 flex items-center justify-center text-3xl
                        cursor-pointer"
                    handleClick={() => setShowWindowDI(true)}
                    text='+'
                />
                <Legend
                    extraStyles='transform -translate-y-4 font-semibold'
                    text='Criar'
                />
            </div>

            {showWindowDI && (
                <WindowDoubleInput
                    placeholder={[
                        'Insira o nome do projeto',
                        'Insira o prazo de conclusão do projeto'
                    ]}
                    label={['Nome:', 'Prazo:']}
                    id={['inputPN', 'inputPT']}
                    setShow={setShowWindowDI}
                    type={['text', 'date']}
                    action={createProject}
                    title='Criar projeto'
                />
            )}

            {showMessageII && (
                <MessageError
                    message='Por favor, preencha todos os campos!'
                    setShow={setShowMessageII}
                />
            )}

            {showMessageExists && (
                <MessageError
                    message='Já existe um projeto com esse nome!'
                    setShow={setShowMessageExists}
                />
            )}

            {showMessageInvalidDate && (
                <MessageError
                    message='Data inválida! O prazo deve ser uma data futura.'
                    setShow={setShowMessageInvalidDate}
                />
            )}

            {showMessageSuccess && (
                <MessageError
                    message='Projeto criado com sucesso!'
                    setShow={setShowMessageSuccess}
                />
            )}
        </>
    )
}
