import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "../pages/signin";
import Dashboard from "../pages/dashboard";
import Signup from "../pages/signup";
import Layout from "../components/layout";
import UpdateStock from "../pages/update-stock";
import { useEffect, useState } from "react";
import CheckStock from "../pages/check-stock";
import ErrorPage from "../pages/error-page";
import Loader from "../components/loader";

const ADMIN_ROUTES = [
    { path: '/update-stock', element: <Layout><UpdateStock /></Layout> },
    { path: '/check-stock', element: <Layout><CheckStock /></Layout> },
]

const REGISTERED_USER_ROUTES = [
    { path: '/dashboard', element: <Layout><Dashboard /></Layout> },
    { path: '/signup', element: <Signup /> },
]

const AppRoutes = () => {
    const [loading, setLoading] = useState(false);
    const [authorizedRoutes, setAuthorizedRoutes] = useState([
        { path: '/', element: <Signin /> },
        { path: '/signup', element: <Signup /> },
        { path: '*', element: <ErrorPage /> }
    ])


    useEffect(() => {
        setLoading(true);
        try {
            const userString = localStorage.getItem('user');
            let user = null;
            if (userString !== null) {
                user = JSON.parse(userString);
                if (user?.admin === 0) {
                    setAuthorizedRoutes(authorizedRoutes.concat(REGISTERED_USER_ROUTES))
                }
                else if (user?.admin === 1) {
                    setAuthorizedRoutes(authorizedRoutes.concat(ADMIN_ROUTES));
                }
            }
        }
        catch (err) {
            console.log(err, ' = Error')
        }
        finally {
            setLoading(false);
        }
    }, []);

    return (
        <Router>
            {loading && <Loader />}
            <Routes>
                {authorizedRoutes?.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Routes>
        </Router>
    )
}
export default AppRoutes;
