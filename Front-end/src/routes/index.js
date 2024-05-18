import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "../pages/signin";
import Dashboard from "../pages/dashboard";
import Signup from "../pages/signup";
import Layout from "../components/layout";
import UpdateStock from "../pages/add-product";
import CheckStock from "../pages/view-products";
import ErrorPage from "../pages/error-page";
import AddUser from "../pages/add-user";
import AdminGuard from "./adminGuard";
import UserGuard from "./userGuard";
import ShopifyPage from "../pages/shopify";

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
                <Route path="/add-product" element={<AdminGuard><Layout> <UpdateStock /></Layout></AdminGuard>} />
                <Route path='/view-products' element={<AdminGuard><Layout><CheckStock /></Layout></AdminGuard>} />
                .<Route path='/add-user' element={<AdminGuard><Layout><AddUser /></Layout></AdminGuard>} />
                <Route path='/shopify' element={<ShopifyPage />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </Router>
    )
}
export default AppRoutes;
