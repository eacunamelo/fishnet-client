import { Navigate, useLocation } from 'react-router-dom'
import AuthService from '../services/AuthService'

const PrivateRoute = ({ component, orgs }) => {
  const isAuthenticated = AuthService.isLoggedIn()
  const org = isAuthenticated ? AuthService.getOrg() : 'PUBLIC'
  const hasOrgGrant = orgs.find(x => x == org)
  const location = useLocation()

  return isAuthenticated 
         ? hasOrgGrant
           ? component 
           : <Navigate to='/access-denied' />
         : <Navigate to="/login" state={location} />;
};

export default PrivateRoute