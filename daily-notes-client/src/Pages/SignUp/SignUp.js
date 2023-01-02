import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
// import useToken from '../../hooks/UseToken';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { createUser } = useContext(AuthContext)
    const [signError, setSignUpError] = useState('')
    // const [createdUserEmail, setCreatedUserEmail] = useState('')

    // const [token] = useToken(createdUserEmail)
    const navigate = useNavigate();

    // if (token) {
    //     navigate('/')
    // }

    const handleSignUp = data => {
        setSignUpError('')
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                reset()
                toast.success('User created successfully')
                navigate('/')
                // const userInfo = {
                //     displayName: data.name
                // }
                // updateUser(userInfo)
                //     .then(() => {
                //         console.log('user updated');
                //         saveUser(data.name, data.email, data.role)
                //     })
                //     .catch(err => console.error('While updating user', err));
            })
            .catch(error => {
                console.log(error)
                setSignUpError(error.message)
            });

        // const saveUser = (name, email, role) => {
        //     const user = { name, email, role };
        //     fetch('https://prime-motors-server.vercel.app/users', {
        //         method: 'POST',
        //         headers: {
        //             'content-type': 'application/json'
        //         },
        //         body: JSON.stringify(user)
        //     })
        //         .then(res => res.json())
        //         .then(data => {
        //             console.log(data);
        //             setCreatedUserEmail(email)
        //             navigate('/')
        //         })
        // }
    }

    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-4xl font-semibold text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>

                    <div className="mb-4 mt-10">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> <span className="label-text">Name</span> </label>
                        <input type='text'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            {...register("name", {
                                required: 'Name is required'
                            })}
                        />
                        {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
                    </div>
                    <div className='mb-4'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> <span className="label-text">Email</span> </label>
                        <input type='email'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            {...register("email", {
                                required: 'Email is required'
                            })}
                        />
                        {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> <span className="label-text">Password</span></label>
                        <input type='password'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            {...register("password", {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be 6 characters' }
                            })}
                        />
                        {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
                    </div>
                    <input className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' value='Sign Up' type="submit" />
                    {signError && <p className='text-red-600'>{signError}</p>}
                </form>
                <p className='mt-3'>Already Have an account? <Link className='text-blue-600' to='/login'>Please login</Link> </p>
            </div>
        </div>
    );
};

export default SignUp;