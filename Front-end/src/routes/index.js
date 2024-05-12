import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "../pages/signin";
import Dashboard from "../pages/dashboard";
import Signup from "../pages/signup";
import Layout from "../components/layout";
import UpdateStock from "../pages/update-stock";
import { useEffect, useState } from "react";
import axios from 'axios';
import CheckStock from "../pages/check-stock";
import ErrorPage from "../pages/error-page";

const ADMIN_PATHS = [
    { path: '/update-stock', element: <UpdateStock /> },
    { path: '/check-stock', element: <CheckStock /> },
]

const AUTHORIZED_PATHS = [
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/signup', element: <Signup /> },
]

const AppRoutes = () => {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        try {
            const userString = localStorage.getItem('user');
            let user = null;
            if (userString !== null) {
                user = JSON.parse(userString);
            }
            console.log(user,' = UserJSON')
            setAdmin(user.admin)
        }
        catch (err) {
            console.log(err, ' = Error')
        }

    }, [])

    useEffect(() => {
        console.log(admin, ' = User in routes    ')
    }, [admin])

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Signin />} />
                <Route path='/signup' element={<Signup />} />
                {admin === 0 && AUTHORIZED_PATHS.map((path, index) => (
                    <Route key={index} path={path.path} element={<Layout>{path.element}</Layout>} />
                ))}
                {admin ===  1 && ADMIN_PATHS.map((path, index) => (
                    <Route key={index} path={path.path} element={<Layout>{path.element}</Layout>} />
                ))}
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </Router>
    )
}
export default AppRoutes;
