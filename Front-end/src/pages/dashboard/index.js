import AdminDashboard from "./adminDashboard";
import UserDashboard from "./userDashboard";
import {useAuth} from '../../AuthContext';

const Dashboard = () => {
    const { userRole } = useAuth();
    console.log(userRole, ' = User Role')
  
    return (
      <div>
        {userRole === 'Admin' && <AdminDashboard />}
        {userRole === 'User' && <UserDashboard />}
      </div>
    );
  };
  export default Dashboard;