import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import Loader from '../Shared/Loader/Loader';
import CompleteDetails from './CompleteDetails';

const CompleteTasks = () => {

    const { user } = useContext(AuthContext)

    //Get all of my added task
    const { data: completedTasks = [], refetch, isLoading } = useQuery({
        queryKey: ['completeTasks', user?.email],
        queryFn: async () => {
            const completed = await fetch(`http://localhost:5000/completeTasks?email=${user?.email}`)
            const completedTasks = await completed.json()
            return completedTasks
        }
    })

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='w-11/12 lg:w-10/12 mx-auto my-5'>
            {
                completedTasks.length ?
                    <>
                        {/* <div className='lg:flex justify-between'>
                        <div>
                            <h1 className='text-3xl lg:text-4xl text-primary font-semibold'>All Added <span className='text-secondary'>Tasks</span></h1>
                            <p className='text-xl lg:text-xl font-semibold font-poppins text-primary lg:mt-5'>
                                Track your tasks and take action...
                            </p>
                        </div>
                        <Link to='/completeTasks'>
                            <button className='doRoutineBtn'>Completed Tasks</button>
                        </Link>
                    </div> */}

                        <div className='grid lg:grid-cols-3 gap-5 mt-3 lg:mt-8'>
                            {
                                completedTasks.map(task => <CompleteDetails
                                    key={task._id}
                                    task={task}
                                    refetch={refetch}
                                ></CompleteDetails>)
                            }
                        </div>
                    </>
                    :
                    <div>
                        <h1 className='text-3xl lg:text-4xl font-normal text-gray-900 dark:text-white'>You don't have Any Complete Tasks</h1>
                        <p className='text-xl lg:text-2xl font-semibold font-poppins text-primary mt-5'>
                            Once you complete any task, it will appear here..
                        </p>
                    </div>
            }
        </div>
    );
};

export default CompleteTasks;