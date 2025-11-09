import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import MessageError from '../components/windows/MessageError';
import Button from '../components/form/Button';
import Input from '../components/form/Input';
import Form from '../components/form/Form';
import Title from '../components/ui/Title';

import { FaUser } from 'react-icons/fa6';

import saveActualUser from '../shared/actual-user/saveActualUser';
import loadUsers from '../shared/users/loadUsers';

import LoginImg from '../assets/login-image.png';

export default function Login({ setAuth }) {
    const [showMessageUNF, setShowMessageUNF] = useState(false);
    const [showMessageII, setShowMessageII] = useState(false);
    const [showMessageIP, setShowMessageIP] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(loadUsers());
    }, []);

    const login = (e) => {
        e.preventDefault();

        if (!username || !password) {
            setShowMessageII(true);
            return;
        }

        const existsUser = users.find((u) => u.username == username.trim());
        if (existsUser) {
            if (existsUser.password == password) {
                saveActualUser(username.trim());
                setAuth(true);
                return;
            }
            setShowMessageIP(true);
            return;
        }
        setShowMessageUNF(true);
    };

    return (
        <main className="flex h-screen w-screen bg-gray-50">
            <section className="flex flex-col lg:flex-row w-full h-full">
                <img
                    alt="Imagem homem de frente à uma porta"
                    className="hidden lg:block lg:w-1/2 object-cover"
                    src={LoginImg}
                />
                <div
                    className="flex flex-col justify-center items-center
                               w-full lg:w-1/2 
                               p-6 sm:p-10 md:p-6 lg:p-6 gap-6 md:gap-8"
                >
                    <Title
                        text="Olá, bem-vindo de volta à Tasken!"
                        extraStyles="max-w-80 text-center lg:text-left anim-from-left
                            mb-4 w-full"
                    />

                    <Form extraStyles="gap-8 w-full sm:w-4/5 md:w-3/4 lg:w-2/3 max-w-md">
                        <div className="w-full flex items-center justify-center">
                            <div
                                className="bg-brand p-6 rounded-full shadow-xl text-white
                                    anim-from-left"
                            >
                                <FaUser size={75} />
                            </div>
                        </div>

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
                                to="/registro"
                            >
                                Não tem uma conta?
                            </Link>
                            <Button
                                extraStyles="p-4 bg-brand rounded shadow w-full sm:w-40 font-bold 
                                            text-white hover:bg-sky-600 transform hover:scale-95 
                                            transition duration-300 cursor-pointer"
                                handleClick={login}
                                text="Entrar"
                            />
                        </div>
                    </Form>
                </div>
            </section>

            {showMessageII && (
                <MessageError
                    message="Por favor, preencha todos os campos corretamente!"
                    setShow={setShowMessageII}
                />
            )}
            {showMessageIP && (
                <MessageError
                    message="Senha incorreta!"
                    setShow={setShowMessageIP}
                />
            )}
            {showMessageUNF && (
                <MessageError
                    message="Usuário não encontrado!"
                    setShow={setShowMessageUNF}
                />
            )}
        </main>
    );
}
