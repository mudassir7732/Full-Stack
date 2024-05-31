import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "../pages/signin";
import Dashboard from "../pages/dashboard/userDashboard";
import Signup from "../pages/signup";
import Layout from "../components/layout";
import AddProducts from "../pages/add-product";
import ViewProducts from "../pages/products";
import ErrorPage from "../pages/error-page";
import ViewUsers from "../pages/users";
import AdminGuard from "./adminGuard";
import ShopifyPage from "../pages/shopify";
import UserGuard from "./userGuard";
import Billing from "../pages/payments";
import AddBilling from "../pages/add-payment";


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
                                <AddProducts />
                            </Layout>
                        </AdminGuard>
                    }
                />
                <Route path='/products'
                    element={
                        <AdminGuard>
                            <Layout>
                                <ViewProducts />
                            </Layout>
                        </AdminGuard>
                    }
                />
                <Route path='/payments'
                    element={
                        <AdminGuard>
                            <Layout>
                                <Billing />
                            </Layout>
                        </AdminGuard>
                    }
                />
                
                <Route path='/add-payment'
                    element={
                        <AdminGuard>
                            <Layout>
                                <AddBilling />
                            </Layout>
                        </AdminGuard>
                    }
                />
                .<Route path='/users'
                    element={
                        <AdminGuard>
                            <Layout>
                                <ViewUsers />
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
