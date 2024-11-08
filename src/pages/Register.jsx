import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

function Register() {
    const { createUser, signInWithGoogle, isLoggedIn } = useFirebase();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Initialize as an empty string

    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) navigate('/')
    }, [isLoggedIn])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(email, password);
            setEmail('');
            setPassword(''); // Clear password after submission
            console.log('Successfully Registered');
        } catch (error) {
            console.log('Register Error', error.message);
        }
    };

    return (
        <div className="mx-auto h-screen flex items-center bg-slate-900 max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-lg bg-white rounded-lg">
                
                <form onSubmit={handleSubmit} className="mb-0 mt-2 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                <div className='flex items-center justify-between'>
        <Logo />
        <p className="text-center text-2xl font-medium">Register</p>
        </div>

                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <div className="relative">
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm outline-none border-2 border-gray-200"
                                placeholder="Enter email"
                            />
                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <div className="relative">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="w-full rounded-lg border-gray-200 outline-none border-2 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter password"
                            />
                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="block w-full rounded-lg bg-black px-5 py-3 text font-medium text-white"
                    >
                        Register
                    </button>
                    <p className='text-center text-sm text-gray-500'>Or Continue With</p>
                    <div className='flex gap-x-5'>
                        <button
                            type="button"
                            className="w-[100%] rounded-lg border-[1px] border-gray-400 px-5 py-3 text-sm font-medium text-gray-500 shadow flex items-center justify-center"
                            onClick={signInWithGoogle}
                        >
                            <img className='me-2' src="src/images/google.png" width="22px" alt="" />
                            Google
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-500">
                        Have an account?
                        <NavLink className="underline" to="/login"> Sign in</NavLink>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;
