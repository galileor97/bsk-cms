import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import ProductRequest from '../../helper/ProductRequest';
import Button from '../components/Button';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';




const Dashboard = () => {
    

    const [products, setProducts] = useState([])

    const getAllProduct = async () => {
        try {
            let { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            setProducts(data)
            console.log("Products fetched successfully:", data);

        } catch (error) {
            console.log(error.response);
            Swal.fire({
                title: 'Wait!',
                text: error.response.data.message,
                icon: 'error'
            })
        }
    }

    const deleteProduct = async (id) => {
        
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
    
        if (result.isConfirmed) {
            try {
                await ProductRequest({
                    url: `/products/${id}`,
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                getAllProduct();
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Product has been deleted.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6'
                });
            } catch (error) {
                console.log(error.response);
                if (error.response.status === 403) {
                    Swal.fire({
                        title: 'Unauthorized!',
                        text: 'You are not authorized to perform this action.',
                        icon: 'error'
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to delete the product.',
                        icon: 'error'
                    });
                }
            }
        }

        try {
            await ProductRequest({
                url: `/products/${id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            getAllProduct()
            Swal.fire({
                title: "Information",
                text: "Product has been deleted",
                icon: "success"
            });
        } catch (error) {
            console.log(error.response);
            if (error.response.status === 403) {
                Swal.fire({
                    title: "Information",
                    text: "You are not authorize",
                    icon: "error"
                });
            }
        }
    }
    const editImage = async (product) => {
        const { value: file } = await Swal.fire({
            title: 'Select image',
            input: 'file',
            inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Upload your product image'
            },
            showCancelButton: true
        });

        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const formData = new FormData();
                formData.append('postImage', file);

                try {
                    await axios.patch(`http://api.galileor.com/products/${product.id}/imgUrl`, formData, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    Swal.fire({
                        title: 'Success!',
                        text: 'Image has been uploaded',
                        icon: 'success'
                    });

                    getAllProduct();
                } catch (error) {
                    console.log(error);
                    console.log(error.response);
                    if (error.response) {
                        const statusCode = error.response.status;


                        if (statusCode === 403) {
                            Swal.fire({
                                title: 'Unauthorize!',
                                text: `You can't edit this product`,
                                icon: 'error'
                            });
                        } else {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Failed to upload image',
                                icon: 'error'
                            });
                        }
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        getAllProduct();

    }, []);

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full font-graphik text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-lg text-white uppercase bg-black">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Stock
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => (
                            <tr key={item.id} className="bg-white border-b dark:border-gray-700 hover:bg-gray-100 ">
                                <td className="p-4">
                                    <img src={item.imgUrl} className="w-16 md:w-32 max-w-full max-h-full" alt={item.name} />
                                    <Button title={'Edit Image'} type={'button'} onClick={() => editImage(item)} />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 text-balance ">
                                    {item.description}
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    ${item.price}
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 ">
                                    {item.stock}
                                </td>
                                <td className="px-6 py-4 ">
                                    <Button title={'Remove'} type='button' color={'red'} onClick={() => deleteProduct(item.id)} />
                                    <Link to={`/edit-product/${item.id}`}>
                                        <Button title={'Edit'} type='button' color={'blue'} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default Dashboard