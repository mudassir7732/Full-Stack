import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "../pages/signin";
import Dashboard from "../pages/dashboard/userDashboard";
import Signup from "../pages/signup";
import Layout from "../components/layout";
import AddProducts from "../pages/add-products";
import ViewProducts from "../pages/view-products";
import ErrorPage from "../pages/error-page";
import ViewUsers from "../pages/view-users";
import AdminGuard from "./adminGuard";
import ShopifyPage from "../pages/shopify";
import UserGuard from "./userGuard";
import Billing from "../pages/billing";


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
                <Route path="/add-products"
                    element={
                        <AdminGuard>
                            <Layout>
                                <AddProducts />
                            </Layout>
                        </AdminGuard>
                    }
                />
                <Route path='/view-products'
                    element={
                        <AdminGuard>
                            <Layout>
                                <ViewProducts />
                            </Layout>
                        </AdminGuard>
                    }
                />
                <Route path='/billing'
                    element={
                        <AdminGuard>
                            <Layout>
                                <Billing />
                            </Layout>
                        </AdminGuard>
                    }
                />
                .<Route path='/view-users'
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
