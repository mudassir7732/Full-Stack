import '../../../App.css';
import { useNavigate } from 'react-router-dom';

const ADMIN_ROUTES = [
    { label: 'Update Stock', path: '/update-stock' },
    { label: 'View Stock', path: '/check-stock' },
    { label: 'Add User', path: '/add-user' },
    { label: 'Sign-Out', path: '/' },
]

const AdminSidebar = () => {
    const navigate = useNavigate();
    return (
        <div className="fixed h-[92vh] bg-gray-200 border-2 min-w-[20%] max-w-[300px]">
            <p className="text-[24px] my-5 w-fit mx-auto font-bold font-sans text-black">
                Admin Sidebar
            </p>

            <div className='border-t-[0.5px] border-[#a0a0a0]' />

            {ADMIN_ROUTES?.map((route, index) => (
                <button className='flex flex-row items-center justify-center bg-gray-300 hover-color border-b-[0.5px] hover-color hover:pl-1 px-auto border-b-[#a0a0a0] w-full'
                    onClick={() => navigate(route?.path)}>
                    <p key={index} className="flex flex-row justify-start min-w-[120px] font-sans w-fit text-black font-medium pt-3" >
                        {route?.label}
                    </p>
                </button>
            ))}
            <div className="border-b-[0.5px] border-[#c0c0c0] w-full" />
        </div>
    )
}
export default AdminSidebar;