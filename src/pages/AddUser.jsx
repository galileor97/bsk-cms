import React, { useState } from 'react'
import ProductRequest from '../../helper/ProductRequest'
import Swal from 'sweetalert2'
import { Link, useNavigate } from "react-router-dom"




const AddUser = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState()
    const [address, setAddress] = useState('')


    const navigate = useNavigate()

    const addNewUser = async (e) => {
        e.preventDefault()
        const reqBody = { username, email, password, phoneNumber, address }

        try {
            await ProductRequest({
                url: '/add-user',
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: reqBody
            })
            Swal.fire({
                title: 'Alright!',
                text: 'Add new user success',
                icon: 'success'
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
    return (
        <>
            <form onSubmit={addNewUser} className="m-6 max-w-4xl mx-auto font-graphik">

                <div className="grid sm:grid-cols-2 gap-10">

                    <div className="relative flex items-center sm:col-span-2">
                        <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Username</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter your username"
                            className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded-full outline-none" />
                    </div>
                    <div className="relative flex items-center sm:col-span-2">
                        <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email"
                            className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded-full outline-none" />
                    </div>
                    <div className="relative flex items-center sm:col-span-2">
                        <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password"
                            className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded-full outline-none" />
                    </div>
                    <div className="relative flex items-center sm:col-span-2">
                        <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Phone Number</label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} type="number" placeholder="Enter your phone"
                            className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded-full outline-none" />
                    </div>
                    <div className="relative flex items-center sm:col-span-2">
                        <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Address</label>
                        <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Enter your address"
                            className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded-full outline-none" />
                    </div>



                </div>

                <button type="submit"
                    className="mt-8 px-6 py-3 w-full text-xl bg-black text-white rounded-full hover:bg-blue-600 transition-all">Submit</button>
            </form>
        </>
    )
}

export default AddUser