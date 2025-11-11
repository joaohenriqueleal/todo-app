import { useState } from 'react'

import Button from '../form/Button'
import Input from '../form/Input'
import Title from '../ui/Title'
import Form from '../form/Form'


export default function WindowSingleInput({ setShow, title, type, id, placeholder,
        label, action }) {
    const [data, setData] = useState('')

    const runAction = () => {
        action(data)
    }
    
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center
                bg-black/50 backdrop-blur-[2px] p-4"
        >
            <div
                className='flex flex-col w-full shadow-xl anim-from-left
                    max-w-160'
            >
                <div
                    className='bg-sky-600 p-3 flex justify-between items-center
                        px-4'
                >
                    <Title
                        extraStyles='text-white'
                        text={title}
                    />
                    <Button
                        extraStyles='font-bold text-xl px-2 p-1 hover:bg-sky-500
                            rounded-full cursor-pointer transition duration-300'
                        handleClick={() => setShow(false)}
                        text='✕'
                    />
                </div>
                <div
                    className='bg-white p-6'
                >
                    <Form extraStyles='gap-16' >
                        <Input
                            extraStyles='text-gray-900 rounded-none'
                            contentExtraStyles='items-start'
                            placeholder={placeholder}
                            handleChange={setData}
                            color='bg-gray-100'
                            width='w-full'
                            label={label}
                            value={data}
                            type={type}
                            id={id}
                        />
                        <Button
                            extraStyles='bg-sky-700 w-40 self-end p-4 rounded
                                font-bold shadow-md cursor-pointer hover:bg-sky-800
                                transform hover:scale-95 transition duration-300'
                            handleClick={runAction}
                            text='Criar'
                        />
                    </Form>
                </div>
            </div>
        </div>
    )
}
