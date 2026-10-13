import { createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import useAuthStore from '../stores/authStore';

/**
 * @typedef {import('../types').AuthState} AuthState
 */

/**
 * @type {React.Context<AuthState>}
 */
const AuthContext = createContext();

/**
 * AuthProvider component to provide authentication state to the application
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
const AuthProvider = ({ children }) => {
  const authState = useAuthStore();

  useEffect(() => {
    authState.fetchMe();
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Custom hook to use the auth context
 * @returns {AuthState}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;