import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

function Dashboard() {
    return (
        <main className='flex'>
            <Sidebar />
            <Outlet />
        </main>
    )
}

export default Dashboard