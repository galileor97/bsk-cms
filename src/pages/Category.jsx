import React, { useEffect, useState } from 'react'
import ProductRequest from '../../helper/ProductRequest'


const Category = () => {

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric'};
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    const [category, setCategory] = useState([])

    const getAllCategory = async (e) => {
        try {
            let { data } = await ProductRequest({
                url: '/categories',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            // console.log(`All Category Data`, data);
            setCategory(data)
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Wait!',
                text: error.response.data.message,
                icon: 'error'
            })
        }
    }


    useEffect(() => {
        getAllCategory();

    }, []);

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full font-graphik text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-lg text-white uppercase bg-black">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Updated At
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.map((item) => (
                            <tr key={item.id} className="bg-white border-b dark:border-gray-700 hover:bg-gray-100 ">
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 text-balance ">
                                    {formatDate(item.createdAt)}
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    {formatDate(item.updatedAt)}
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Category