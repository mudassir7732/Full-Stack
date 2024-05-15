import Footer from "../footer";
import Header from "../header";
import Sidebar from "./sidebar";
import AdminSidebar from "./sidebar/adminSidebar";

const Layout = ({ children }) => {
    const userString = localStorage.getItem('user');
    let user = null;
    if (userString) {
        user = JSON.parse(userString);
    }

    return (
        <div className="flex flex-col h-[100vh] w-full overflow-hidden">
            <Header />

            <div className="flex flex-row max-h-screen w-full mt-[8vh] h-[100vh]">
                {user?.role && user?.role === 'user' &&
                    <Sidebar />
                }
                {user && user?.role === 'admin' && (
                    <AdminSidebar />
                )}
                <div className="flex flex-col items-center justify-center py-4 ml-[300px] overflow-scroll w-full">
                    {children}
                </div>
                {/* <Footer /> */}
            </div>

        </div>
    )
}
export default Layout;