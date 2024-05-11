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
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        axios.post(`http://127.0.0.1:5000/status`, {
            email: user.email, password: user.password
        })
            .then((res) => {
                console.log(res.data?.userAdmin, ' = data');
                setUser(res?.data?.userAdmin);
            })
            .catch((err) => {
                setUser(0)
            })
    }, [])

    useEffect(() => {
        console.log(user, ' = User')
    }, [user])

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Signin />} />
                <Route path='/signup' element={<Signup />} />
                {(user === 0 || user === 1) && AUTHORIZED_PATHS.map((path, index) => (
                    <Route key={index} path={path.path} element={<Layout>{path.element}</Layout>} />
                ))}
                {user === 1 && ADMIN_PATHS.map((path, index) => (
                    <Route key={index} path={path.path} element={<Layout>{path.element}</Layout>} />
                ))}
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </Router>
    )
}
export default AppRoutes;
