import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const AddTasks = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    // const imageHostKey = process.env.REACT_APP_imgbb_key;
    // console.log(imageHostKey);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [signError, setSignUpError] = useState('')
    const postDate = new Date();


    const handleAddNotes = data => {
        setSignUpError('')
        const image = data.image[0]
        // console.log(image)
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=dbec0fa47fa311aabf53d1bc3c2fec0f`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const notes = {
                        title: data.title,
                        email: user?.email,
                        image: imgData.data.url,
                        description: data.description,
                        postDate
                    }

                    //Post Task Data to the MongoDB
                    fetch('http://localhost:5000/notes', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(notes)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result)
                            toast.success(`${data.title} Posted Successfully`)
                            navigate('/myTasks')
                        })
                }
            })
    }

    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-2xl font-semibold text-center'>Add Your Notes</h2>
                <form onSubmit={handleSubmit(handleAddNotes)}>

                    <div className="mb-4 mt-10">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> <span className="label-text">Title</span> </label>
                        <input type='text'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            {...register("title", {
                                required: 'Title is required'
                            })}
                        />
                        {errors.title && <p className='text-red-600'>{errors.title.message}</p>}
                    </div>


                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span className="label-text">Description</span></label>
                        <textarea
                            {...register('description')}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Short Description"></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><span className="label-text">Photo</span></label>
                        <input type="file"
                            {...register("image", { required: "Photo is required" })}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
                        {errors.image && <p className='text-red-600'>{errors.image?.message}</p>}
                    </div>


                    <input className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' value='Add Notes' type="submit" />
                    {signError && <p className='text-red-600'>{signError}</p>}
                </form>
            </div>
        </div>
    );
};

export default AddTasks;