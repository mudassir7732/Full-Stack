import { useEffect, useState } from "react";
import Sidebar from "../sidebar";
import AdminSidebar from "../sidebar/adminSidebar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Layout = ({ children }) => {
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        handleAuthentication();
    }, []);

    const handleAuthentication = async () => {
        try {
            const res = await axios.get(`/verify-token`, { withCredentials: true });
            if (res?.data?.message === 'Success') {
                setRole(res?.data?.userRole)
                return;
            } else {
                navigate('/');
            }
        } catch (err) {
            console.error(err);
            navigate('/');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-row bg-[#f8f8f8] min-h-screen">
            {role === 'User' && (
                <div className="fixed top-0 left-0 h-full w-fit bg-white shadow-md z-[1000]">
                    <Sidebar />
                </div>
            )}
            {role === 'Admin' && (

                <div className="fixed top-0 left-0 h-full w-fit bg-white shadow-md z-[1000]">
                    <AdminSidebar />
                </div>
            )}
            <div className="flex flex-col items-center justify-center w-full lg:ml-[250px] xl:ml-[300px]">
                <div className="flex flex-col items-center justify-center w-fit h-full">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default Layout;