import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoogleAuthProvider } from 'firebase/auth';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Login = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm('')
    const { LogIn, providerLogin, setUser } = useContext(AuthContext)
    const [loginError, setLoginError] = useState('')
    const googleProvider = new GoogleAuthProvider()
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/'


    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                setUser(user)
                toast.success('successfully Login')
                navigate(from, { replace: true })
            })
            .catch(error => console.error(error))
    }


    const handleLogin = data => {
        console.log(data);
        setLoginError('')
        LogIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                reset()
                navigate(from, { replace: true })
                toast.success('successfully Login')
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message)
            });
    }

    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-4xl font-semibold text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="mb-4 mt-10">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> <span className="label-text">Email</span> </label>
                        <input type='email'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            {...register("email", {
                                required: "Email Address is required"
                            })} />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> <span className="label-text">Password</span></label>
                        <input type='password'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            {...register("password", {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be 6 characters.' }
                            })} />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <input
                        className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' value='Login' type="submit" />
                    {loginError && <p className='text-red-600'>{loginError}</p>}
                </form>
                <p className='mt-3'>New to ToDo List? <Link className='text-blue-600' to='/signup'>Create new account</Link> </p>
                <br />
                <button onClick={handleGoogleSignIn} className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;