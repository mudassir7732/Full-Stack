import Header from "../header";
import Sidebar from "../sidebar";
import AdminSidebar from "../sidebar/adminSidebar";


const Layout = ({ children }) => {
    const userString = localStorage.getItem('user');
    let user = null;
    if (userString) {
        user = JSON.parse(userString);
    }

    return (
<div className="flex flex-row bg-[#f8f8f8] min-h-screen">
    {user?.role && user?.role === 'user' &&
        <div className="w-[20%]">
            <Sidebar />
        </div>
    }
    {user && user?.role === 'admin' && (
        <div className="w-[20%] fixed">
            <AdminSidebar />
        </div>
    )}
    <div className="flex flex-col items-center justify-center ml-[20%] w-full">
        <div className="flex flex-col items-center justify-center w-fit h-full">
            {children}
        </div>
    </div>
</div>

    )
}
export default Layout;