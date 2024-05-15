import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "../pages/signin";
import Dashboard from "../pages/dashboard";
import Signup from "../pages/signup";
import Layout from "../components/layout";
import UpdateStock from "../pages/update-stock";
import CheckStock from "../pages/check-stock";
import ErrorPage from "../pages/error-page";
import AddUser from "../pages/add-user";
import AdminGuard from "./adminGuard";
import UserGuard from "./userGuard";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path={'/signup'} element={<Signup />} />
                <Route path={'/'} element={<Signin />} />
                <Route path="/dashboard"
                    element={
                        <UserGuard>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </UserGuard>
                    }
                />
                <Route path="/update-stock" element={<AdminGuard><Layout> <UpdateStock /></Layout></AdminGuard>} />
                <Route path='/check-stock' element={<AdminGuard><Layout><CheckStock /></Layout></AdminGuard>} />
                .<Route path='/add-user' element={<AdminGuard><Layout><AddUser /></Layout></AdminGuard>} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </Router>
    )
}
export default AppRoutes;
