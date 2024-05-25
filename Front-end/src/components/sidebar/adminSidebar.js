import { useState } from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';

const ADMIN_ROUTES = [
    { label: 'Add Product', path: '/add-product', icon: '/assets/icons/add_icon.png' },
    { label: 'View Products', path: '/view-products', icon: '/assets/icons/view.png' },
    { label: 'Add User', path: '/add-user', icon: '/assets/icons/add-user1.png' },
    { label: 'Sign-Out', path: '/', icon: '/assets/icons/logout.png' },
]

const AdminSidebar = () => {
    const [selected, setSelected] = useState('/add-product');
    const navigate = useNavigate();
    return (
        <div className='p-4'>
            <div className="flex flex-row items-center gap-x-2 p-3" onClick={() => navigate('/view-products')}>
                <img src="../assets/img/logo-ct-dark.png" className="h-[28px]" alt="main_logo" />
                <span className="text-[13px] text-[#555555] font-semibold font-sans">
                    Soft UI Dashboard
                </span>
            </div>
            <hr className="horizontal dark mt-0" />

            <div className="w-auto " id="sidenav-collapse-main">
                {ADMIN_ROUTES?.map((route, index) => (
                    <div className={`flex flex-row items-center px-3 cursor-pointer gap-x-3 ${selected === route.path ? 'bg-white' : ''} w-[218px] h-[53px] rounded-lg ${selected === route.path ? 'shadow-md' : 'shadow-none'} ${selected === route.path ? 'shadow-red-500' : 'shadow-white'} p-2`}
                        onClick={() => { navigate(route.path); setSelected(route.path) }}>
                        <div className={`${selected === route.path ? 'bg-[#cb0c9f]' : 'bg-white'} shadow-sm p-[6px] rounded-lg`}>
                            <img src={route.icon} className='w-[16px]' alt='button_icon' />
                        </div>
                        <span className={`${selected === route.path ? 'font-semibold' : 'font-normal'} font-sans text-[14px] ${selected === route.path ? 'text-[#505050]' : 'text-[#808080]'}`}>
                            {route.label}
                        </span>
                    </div>
                ))}

            </div>
        </div>
    )
}
export default AdminSidebar;