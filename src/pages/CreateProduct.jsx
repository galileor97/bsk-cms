import React, { useEffect, useState } from 'react'
import ProductRequest from '../../helper/ProductRequest';
import { Link, useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode";




const CreateProduct = () => {
    const [category, setCategory] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState()
    const [stock, setStock] = useState()
    const [imgUrl, setImgUrl] = useState('')
    const [categoryId, setCategoryId] = useState()
    const [description, setDescription] = useState('')
    const [authorId, setAuthorId] = useState();



    const navigate = useNavigate()
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
        }
    }

    const addNewProduct = async (e) => {
        e.preventDefault()
        const reqBody = { name, description, imgUrl, price, stock, categoryId, authorId }
        // console.log(name, description, imgUrl, price, stock, categoryId);
        try {
            await ProductRequest({
                url: '/products',
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: reqBody
            })
            navigate('/')
        } catch (error) {
            console.log(error);
            console.log(error.response);
            Swal.fire({
                title: 'Wait!',
                text: error.response.data.message,
                icon: 'error'
            })
        }
    }

    useEffect(() => {
        getAllCategory();
        const token = localStorage.getItem('token')
        const decodedToken = jwtDecode(token);
        setAuthorId(decodedToken.id);

    }, []);

    return (


        <>
            <form onSubmit={addNewProduct} className="m-6 max-w-4xl mx-auto font-graphik">

                <div className="grid sm:grid-cols-2 gap-10">
                    <div className="relative flex items-center">
                        <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Product Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter product name"
                            className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded-full outline-none" />

                    </div>

                    <div className="relative flex items-center">
                        <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Image Url</label>
                        <input value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} type="text" placeholder="Enter image url"
                            className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded-full outline-none" />
                    </div>

                    <div className="relative flex items-center">
                        <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Price</label>
                        <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Enter price"
                            className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded-full outline-none" />

                    </div>

                    <div className="relative flex items-center">
                        <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Stock</label>
                        <input value={stock} onChange={(e) => setStock(e.target.value)} type="number" placeholder="Enter stock"
                            className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded-full outline-none" />

                    </div>

                    <div className="relative flex items-center sm:col-span-2">
                        <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Description</label>
                        <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter product description"
                            className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded-full outline-none" />

                    </div>

                    <div className="relative flex items-center gap-x-7 sm:col-span-2">

                        <label
                            className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Category</label>

                        {category.map((item) => (
                            <div key={item.id} className="flex items-center ps-4 border border-gray-200  rounded ">
                                <input
                                    value={item.id}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    id="bordered-radio-1"
                                    type="radio"
                                    name="bordered-radio"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                                />
                                <label
                                    htmlFor="bordered-radio-1"
                                    className="w-full py-4 mr-5 ms-2 text-sm font-medium text-gray-900 "
                                >
                                    {item.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit"
                    className="mt-8 px-6 py-3 w-full text-xl bg-black text-white rounded-full hover:bg-blue-600 transition-all">Submit</button>
            </form>
        </>
    )
}

export default CreateProduct