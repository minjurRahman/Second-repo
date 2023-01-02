import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { AuthContext } from '../../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)
    const navigate = useNavigate()
    const [expand, setExpand] = useState(false);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('Log out successful.')
                navigate('/')
            })
            .catch(error => console.error(error));
    }

    const menuItems = <>
        <li><Link className='text-lg font-semibold rounded-lg' to='/'>Home</Link></li>
        <li><Link className='text-lg font-semibold rounded-lg' to='/addTasks'>Add Tasks</Link></li>
        <li><Link className='text-lg font-semibold rounded-lg' to='/myTasks'>My Tasks</Link></li>
        <li><Link className='text-lg font-semibold rounded-lg' to='/completeTasks'>Complete Tasks</Link></li>

        {user?.uid ?
            <>
                <li><button onClick={handleLogOut} className='py-2 px-3 text-md font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Sign Out</button></li>
            </>
            :
            <li><Link className='py-2 px-3 text-md font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' to='/login'>Login</Link></li>
        }

    </>

    return (
        <div>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <a href="/" className="flex items-end">
                        <img src="data:image/png;base64,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" className="h-6 mr-3 sm:h-9" alt="" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Daily Notes</span>
                    </a>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        <div className='hidden w-full md:block md:w-auto" id="navbar-default'>
                            <ul className='flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                            </ul>
                        </div>
                    </button>


                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className={`flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 ${expand ? 'top-14 right-0' : 'top-[-200px] right-0'}`}>
                            {menuItems}
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    );
};

export default Navbar;