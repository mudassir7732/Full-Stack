import { useState } from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ADMIN_ROUTES = [
    { label: 'Add Product', path: '/add-product', icon: '/assets/icons/add_icon.png' },
    { label: 'Products', path: '/products', icon: '/assets/icons/items.png' },
    { label: 'Add User', path: '/add-user', icon: '/assets/icons/add-user2.png' },
    { label: 'Users', path: '/users', icon: '/assets/icons/users2.png' },
    { label: 'Add Transaction', path: '/add-transaction', icon: '/assets/icons/add-transaction.png' },
    { label: 'Transactions', path: '/transactions', icon: '/assets/icons/transactions3.png' },
    { label: 'Sign-Out', path: '/', icon: '/assets/icons/signout.png' },
]

const AdminSidebar = () => {
    const [selected, setSelected] = useState('/add-product');
    const navigate = useNavigate();

    const handleClick = async (path) => {
        setSelected(path);
        if (path === '/') {
            Cookies.remove('access_token');
            localStorage.setItem('user', JSON.stringify({email:'', password:''}));
        }
        else {
        }
        navigate(path);
    }

    return (
        <div className='flex-col py-4 items-center justify-center hidden lg:flex lg:w-[250px] xl:w-[300px]'>
            <div className="flex flex-row mb-4 items-center -ml-10 gap-x-2" onClick={() => navigate('/products')}>
                <img src="../assets/img/logo-ct-dark.png" className="h-[32px]" alt="main_logo" />
                <span className="text-[14px] text-[#555555] font-semibold font-sans">
                    Soft UI Admin Dashboard
                </span>
            </div>
            <hr className="horizontal dark mt-0" />

            <div className="w-fit">

                {ADMIN_ROUTES?.map((route, index) => (
                    <div className={`flex flex-row items-center cursor-pointer px-3 gap-x-3 w-[200px] xl:w-[230px] border-[1px] mt-1 h-[53px] rounded-lg ${selected === route.path ? 'bg-white' : ''} ${selected === route.path ? 'shadow-md' : 'shadow-none'} ${selected === route.path ? "border-[#f5f5f5] " : "border-transparent"} ${selected === route.path ? 'shadow-red-500' : 'shadow-white'}`}
                        onClick={() => handleClick(route.path)}>

                        <div className={`${selected === route.path ? 'bg-[#cb0c9f]' : 'bg-white'} border-[1px] ${selected === route.path ? "border-transparent " : "border-[#f5f5f5]"} shadow-sm p-[6px] rounded-lg`}>
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