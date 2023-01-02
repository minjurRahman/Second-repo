import React from 'react';
import { Link } from 'react-router-dom';
import banner from '../../../assets/hero-banner-2.jpg'

const Home = () => {
    return (
        <section>
            <div className="dark:bg-violet-400">
                <div className="container flex flex-col items-center px-4 pb-6 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-12 dark:text-gray-900">
                    <h1 className="text-3xl font-bold leading-none sm:text-4xl xl:max-w-3xl dark:text-gray-900">Manage Tasks</h1>
                    <p className="mt-2 mb-4 font-semibold text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-900">Daily notes is a task management app that can help you to controll your daily activities</p>
                    <Link to='/addTasks'>
                        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Add Task</button>
                    </Link>
                </div>
            </div>

        </section>
    );
};

export default Home;