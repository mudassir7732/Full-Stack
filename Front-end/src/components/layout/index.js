import Footer from "../footer";
import Header from "../header";
import Sidebar from "../sidebar";

const Layout = ({ children }) => {
    return (
        <div>
            <Sidebar />
            <div className="ml-0 md:ml-[265px] min-h-screen">
                <Header />
                <div className="min-h-[100vh] flex flex-col justify-center items-center">
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    )
}
export default Layout;