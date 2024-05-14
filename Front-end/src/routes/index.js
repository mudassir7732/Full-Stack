import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "../pages/signin";
import Dashboard from "../pages/dashboard";
import Signup from "../pages/signup";
import Layout from "../components/layout";
import UpdateStock from "../pages/update-stock";
import { useEffect, useState } from "react";
import CheckStock from "../pages/check-stock";
import ErrorPage from "../pages/error-page";
import AdminRoutes from "./adminRoutes";
import AuthorizedRoutes from "./authorizedRoutes";

const ADMIN_PATHS = [
    { path: '/update-stock', element: <UpdateStock /> },
    { path: '/check-stock', element: <CheckStock /> },
]

const AUTHORIZED_PATHS = [
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/signup', element: <Signup /> },
]

const AppRoutes = () => {
    //     const [admin, setAdmin] = useState(null);

    //     useEffect(() => {
    //         try {
    //             const userString = localStorage.getItem('user');
    //             let user = null;
    //             if (userString !== null) {
    //                 user = JSON.parse(userString);
    //             }
    //             setAdmin(user.admin)
    //         }
    //         catch (err) {
    //             console.log(err, ' = Error')
    //         }

    //     }, [])

    // useEffect(() => {
    //     console.log(admin, ' = User in routes    ')
    // }, [admin])

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Signin />} />
                <Route path='/signup' element={<Signup />} />
                
                {AUTHORIZED_PATHS?.map((path, index) => (
                    <Route key={index} path={path.path}
                        element={<AuthorizedRoutes><Layout>{path.element}</Layout></AuthorizedRoutes>} />
                ))}
                {ADMIN_PATHS?.map((path, index) => (
                    <Route key={index} path={path.path}
                        element={<AdminRoutes><Layout>{path.element}</Layout></AdminRoutes>} />
                ))}
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </Router>
    )
}
export default AppRoutes;
