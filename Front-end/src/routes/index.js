import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserGuard from "./userGuard";
import AdminGuard from "./adminGuard";
import Signin from "../pages/signin";
import Dashboard from "../pages/dashboard/userDashboard";
import Signup from "../pages/signup";
import Layout from "../components/layout";
import ErrorPage from "../pages/error-page";
import ShopifyPage from "../pages/shopify";
import AddProduct from "../pages/add-product";
import Products from "../pages/products";
import AddUser from "../pages/add-user";
import Users from "../pages/users";
import AddPayment from "../pages/add-payment";
import Payments from "../pages/payments";

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
                <Route path="/add-product"
                    element={
                        <AdminGuard>
                            <Layout>
                                <AddProduct />
                            </Layout>
                        </AdminGuard>
                    }
                />
                <Route path='/products'
                    element={
                        <AdminGuard>
                            <Layout>
                                <Products />
                            </Layout>
                        </AdminGuard>
                    }
                />
                <Route path='/add-user'
                    element={
                        <AdminGuard>
                            <Layout>
                                <AddUser />
                            </Layout>
                        </AdminGuard>
                    }
                />
                <Route path='/users'
                    element={
                        <AdminGuard>
                            <Layout>
                                <Users />
                            </Layout>
                        </AdminGuard>
                    }
                />
                <Route path='/add-payment'
                    element={
                        <AdminGuard>
                            <Layout>
                                <AddPayment />
                            </Layout>
                        </AdminGuard>
                    }
                />
                <Route path='/payments'
                    element={
                        <AdminGuard>
                            <Layout>
                                <Payments />
                            </Layout>
                        </AdminGuard>
                    }
                />
                <Route path='/shopify' element={<ShopifyPage />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </Router>
    )
}
export default AppRoutes;
