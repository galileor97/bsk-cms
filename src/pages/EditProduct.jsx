import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import axios from "axios";
import ProductRequest from "../../helper/ProductRequest";

const EditProduct = () => {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [price, setPrice] = useState()
    const [stock, setStock] = useState()
    const [imgUrl, setImgUrl] = useState('')
    const [category, setCategory] = useState([])
    const [categoryId, setCategoryId] = useState()
    const [description, setDescription] = useState('')
    const [authorId, setAuthorId] = useState();
    const [products, setProducts] = useState([])

    const getAllProduct = async () => {
        try {
            let { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            setProducts(data)
            setProducts(data);
            setName(data.name);
            setPrice(data.price);
            setStock(data.stock);
            setImgUrl(data.imgUrl);
            setDescription(data.description);
            setCategoryId(data.categoryId)
            console.log("Products fetched successfully:", data);

        } catch (error) {
            console.log(error);
            console.log(error.response);
            
        }
    }

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

    const editProduct = async (e) => {
        e.preventDefault()
        const reqBody = { name, price, stock, categoryId, description }
        try {
            await ProductRequest({
                url: `products/${id}`,
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: reqBody
            })
            Swal.fire({
                title: 'Alright!',
                text: 'Update product success',
                icon: 'success'
            })
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
        getAllProduct();
        getAllCategory()

    }, [id]);
    return (
        <>
            <form onSubmit={editProduct} className="m-6 max-w-4xl mx-auto font-graphik">

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
                        {/* Radio Button */}
                        {category.map((item) => (
                            <div key={item.id} className="flex items-center ps-4 border border-gray-200  rounded ">
                                <input
                                    value={item.id}
                                    onChange={(e) => setCategoryId(Number(e.target.value))}
                                    id={`category-${item.id}`}
                                    type="radio"
                                    name="bordered-radio"
                                    checked={categoryId === item.id}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                                />
                                <label
                                    htmlFor={`category-${item.id}`}
                                    className="w-full py-4 mr-5 ms-2 text-sm font-medium text-gray-900 "
                                >
                                    {item.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit"
                    className="mt-8 px-6 py-3 w-full text-xl bg-black text-white rounded-full hover:bg-blue-600 transition-all">Edit Product</button>
            </form>
        </>
    )
}

export default EditProduct