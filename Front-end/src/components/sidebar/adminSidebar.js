import { useState } from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ADMIN_ROUTES = [
    { label: 'Add Products', path: '/add-products', icon: '/assets/icons/add_icon.png' },
    { label: 'View Products', path: '/view-products', icon: '/assets/icons/view.png' },
    { label: 'View Users', path: '/view-users', icon: '/assets/icons/add-user1.png' },
    { label: 'Billing', path: '/billing', icon: '/assets/icons/add-user1.png' },
    { label: 'Sign-Out', path: '/', icon: '/assets/icons/signout.png' },
]

const AdminSidebar = () => {
    const [selected, setSelected] = useState('/add-products');
    const navigate = useNavigate();

    return (
        <div className='flex-col py-4 items-center hidden md:flex min-w-[250px] xl:min-w-[300px]'>
            <div className="flex flex-row mb-4 items-center -ml-10 gap-x-2" onClick={() => navigate('/view-products')}>
                <img src="../assets/img/logo-ct-dark.png" className="h-[32px]" alt="main_logo" />
                <span className="text-[14px] text-[#555555] font-semibold font-sans">
                    Soft UI Dashboard
                </span>
            </div>
            <hr className="horizontal dark mt-0" />

            <div className="w-auto" id="sidenav-collapse-main">
                {ADMIN_ROUTES?.map((route, index) => (
                    <div className={`flex flex-row items-center px-3 cursor-pointer gap-x-3 p-2 w-[220px] h-[53px] rounded-lg ${selected === route.path ? 'bg-white' : ''} ${selected === route.path ? 'shadow-md' : 'shadow-none'} ${selected === route.path ? 'shadow-red-500' : 'shadow-white'}`}
                        onClick={() => {setSelected(route.path); navigate(route.path); selected === '/' && Cookies.remove('access_token') }}>
                        <div className={`${selected === route.path ? 'bg-[#cb0c9f]' : 'bg-white'} shadow-sm p-[6px] rounded-lg`}>
                            <img src={route.icon} className='w-[16px]' alt='button_icon' />
                        </div>
                        <span className={`${selected === route.path ? 'font-semibold' : 'font-normal'} font-sans mt-1 text-[14px] ${selected === route.path ? 'text-[#505050]' : 'text-[#808080]'}`}>
                            {route.label}
                        </span>
                    </div>
                ))}

            </div>
        </div>
    )
}
export default AdminSidebar;