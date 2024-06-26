import { useEffect, useState } from "react";
import Loader from "../components/loader";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserGuard = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    handleAuthentication();
  }, []);

  const handleAuthentication = async () => {
    try {
      const res = await axios.get(`/verify-token`, { withCredentials: true });
      if (res?.data?.message === 'Success' && res?.data?.userRole === 'User') {
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

  if (loading) {
    return <Loader />;
  }
  return <>{children}</>;
};

export default UserGuard;