import Footer from "../footer";
import Header from "../header";
import Sidebar from "./sidebar";
import AdminSidebar from "./sidebar/adminSidebar";

const Layout = ({ children }) => {
    const userString = localStorage.getItem('user');
    let user = null;
    if (userString){
        user = JSON.parse(userString);
    }
    console.log(user, ' = Role')

    return (
        <div className="flex flex-row">
            {user?.role && user?.role === 'user' &&
                <Sidebar />
                // <AdminSidebar />
            }
            {user && user?.role === 'admin' && (
                <AdminSidebar />
            )}
            <div className="min-h-screen w-full">
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