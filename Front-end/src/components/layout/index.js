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
        <div className="flex flex-col w-full overflow-hidden">
            <Header />
            <div className="flex flex-row items-start justify-start w-full mt-[8vh]">
                {user?.role && user?.role === 'user' &&
                    <Sidebar />
                }
                {user && user?.role === 'admin' && (
                    <AdminSidebar />
                )}
                <div className="flex items-center justify-center w-[82%] overflow-y-scroll ml-[200px] lg:ml-[250px] min-h-[92vh]">
                    <div className="flex flex-col items-center justify-center pt-4 w-full h-[92vh]">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Layout;