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
            console.log(res.data, ' = response');
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
                <Sidebar />
            )}
            {role === 'Admin' && (
                <AdminSidebar />
            )}
            <div className="flex border-8 flex-col items-center justify-center w-full">
                <div className="flex flex-col items-center justify-center w-fit h-full">
                    {children}
                </div>
            </div>
        </div>

    )
}
export default Layout;