import React from 'react';
import { toast } from 'react-hot-toast';

const TaskDetails = ({ task, refetch }) => {
    const { _id, title, image, description, postDate } = task;


    //Delete specific Task
    const handleDeleteTask = (id) => {
        fetch(`http://localhost:5000/deletetask/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    toast.error('Task Deleted successfully')
                }
            })
    }

    return (
        <div>
            <div className="max-w-xs rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
                <img src={image} alt="" className="object-cover object-center w-full rounded-t-md h-48 dark:bg-gray-500" />
                <div className="flex flex-col justify-between p-6 space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-semibold tracking-wide">{title}</h2>
                        <p className="dark:text-gray-100">{description.slice(0, 74)}</p>
                        {/* <p className="dark:text-gray-100">{postDate}</p> */}
                    </div>
                    <div className='flex justify-between mt-2'>
                        <p>Date: {postDate.slice(0, 10)}</p>
                        <p>Time: {postDate.slice(11, 16)}</p>
                    </div>
                </div>
                <button
                    onClick={() => handleDeleteTask(_id)}
                    type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-6 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</button>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Complete</button>
            </div>
        </div>
    );
};

export default TaskDetails;