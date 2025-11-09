import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import saveActualUser from '../../shared/actual-user/saveActualUser';
import loadUsers from '../../shared/users/loadUsers';
import saveUsers from '../../shared/users/saveUsers'

import MessageError from '../windows/MessageError';
import Title from '../ui/Title';
import Button from './Button';
import Input from './Input';
import Form from './Form';

export default function RegisterForm({ setAuth }) {
    const [showMessageUF, setShowMessageUF] = useState(false);
    const [showMessageII, setShowMessageII] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(loadUsers());
    }, []);

    const register = (e) => {
        e.preventDefault();

        if (!username || !password) {
            setShowMessageII(true);
            return;
        }

        const existsUser = users.find(u => u.username == username)
        if (!existsUser) {
            const newUsersList = [...users, {
                username: username.trim(),
                password
            }]
            saveActualUser(username.trim())
            saveUsers(newUsersList)
            setAuth(true)
            return
        }
        setShowMessageUF(true);
    };

    return (
        <Form extraStyles="gap-8 anim-from-left pb-60">
            <Title text="Formulário de Registro" extraStyles="text-center" />
            <Input
                placeholder="Insira seu nome de usuário"
                contentExtraStyles="anim-from-left"
                handleChange={setUsername}
                color="bg-gray-200"
                id="inputUsername"
                value={username}
                label="Usuário:"
                type="text"
            />

            <Input
                contentExtraStyles="anim-from-left"
                placeholder="Insira sua senha"
                handleChange={setPassword}
                color="bg-gray-200"
                id="inputPassword"
                value={password}
                label="Senha:"
                type="password"
            />

            <div
                className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4
                    anim-from-left"
            >
                <Link
                    className="text-blue-800 underline hover:text-blue-500"
                    to="/login"
                >
                    Já tem uma conta?
                </Link>
                <Button
                    extraStyles="p-4 bg-brand rounded shadow w-full sm:w-40 font-bold 
                        text-white hover:bg-sky-600 transform hover:scale-95 
                        transition duration-300 cursor-pointer"
                    handleClick={register}
                    text="Criar"
                />
            </div>
            {showMessageII && (
                <MessageError
                    message="Por favor, preencha todos os campos corretamente!"
                    setShow={setShowMessageII}
                />
            )}
            {showMessageUF && (
                <MessageError
                    message="Usuário já cadastrado!"
                    setShow={setShowMessageUF}
                />
            )}
        </Form>
    );
}
