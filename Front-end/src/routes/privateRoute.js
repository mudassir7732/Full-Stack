import { Route, useNavigate} from 'react-router-dom';
import Signin from '../pages/signin';

const PrivateRoute = ({ element, isAuthenticated, ...rest }) => {
    const navigate = useNavigate();
  return <Route {...rest} element={isAuthenticated ? element : <Signin />} />;
};

export default PrivateRoute;
