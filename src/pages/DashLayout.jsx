import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet, useNavigate } from "react-router-dom";


const DashLayout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 ml-[250px]"> 
                <Outlet />
            </main>
        </div>
    )
}

export default DashLayout