import { Outlet, useLocation, Navigate } from 'react-router-dom'

const PrivateRoutesLayout = () => {
    const location = useLocation()

    return localStorage.getItem('isLoggedIn') ? (
        <Outlet />
    ) : (
        // keep the previous navigation stack
        // <Navigate to="/reports" state={{ from: location }} replace />
        console.log("uncomment this")
    )
}

export default PrivateRoutesLayout
