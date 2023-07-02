// import React from 'react'
// import GetToken from './GetToken'
// import { Navigate, Outlet } from 'react-router-dom'

// const ProtectedRoute = () => {
//     const forToken=GetToken()
//     if (!forToken) {
//         return <Navigate to='/all'/>    
//     }
//     return <Outlet/>
// }

// export default ProtectedRoute







import React from 'react'
import GetToken from './GetToken'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const verifyToken = localStorage.getItem('token')

    return (verifyToken ? <Outlet />:<Navigate to='/' />)
}

export default ProtectedRoute