import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "../pages/signin";
import Dashboard from "../pages/dashboard/userDashboard";
import Signup from "../pages/signup";
import Layout from "../components/layout";
import AddProduct from "../pages/add-product";
import ViewProducts from "../pages/view-products";
import ErrorPage from "../pages/error-page";
import AddUser from "../pages/add-user";
import AdminGuard from "./adminGuard";
import UserGuard from "./userGuard";
import ShopifyPage from "../pages/shopify";
import { useAuth } from '../AuthContext';
import PrivateRoute from "./privateRoute";

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();
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
                <Route path="/add-product"
                    element={
                        // <AdminGuard>
                        <Layout>
                            <AddProduct />
                        </Layout>
                        // </AdminGuard>
                    }
                />
                <Route path='/view-products'
                    element={
                        // <AdminGuard>
                        <Layout>
                            <ViewProducts />
                        </Layout>
                        // </AdminGuard>
                    }
                />
                .<Route path='/add-user'
                    element={
                        // <AdminGuard>
                        <Layout>
                            <AddUser />
                        </Layout>
                        // </AdminGuard> 
                    }
                />
                <Route path='/shopify' element={<ShopifyPage />} />
                {/* <PrivateRoute path="/dashboard" element={<Dashboard />} isAuthenticated={isAuthenticated} /> */}
                {/* Redirect to sign-in page for unknown routes */}
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </Router>
    )
}
export default AppRoutes;
