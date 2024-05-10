import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "../pages/signin";
import Dashboard from "../pages/dashboard";
import Signup from "../pages/signup";
import Home from "../pages/Home";
// import Test from "../test";
import Layout from "../components/layout";
import UpdateStock from "../pages/update-stock";
import CheckStock from "../pages/check-stock";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Signin />} />
                {/* <Route path='/test' element={<Test />} /> */}
                <Route path='/signup' element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route
                    path="/dashboard"
                    element={
                        <Layout>
                            <Dashboard />
                        </Layout>}
                />                
                <Route
                    path="/update-stock"
                    element={
                        <Layout>
                            <UpdateStock />
                        </Layout>}
                />
                  <Route
                    path="/check-stock"
                    element={
                        <Layout>
                            <CheckStock />
                        </Layout>}
                />
            </Routes>
        </Router>
    )
}
export default AppRoutes;