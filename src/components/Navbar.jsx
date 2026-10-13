import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ROUTES } from '../constants';
import { useAuth } from '../context/AuthProvider';
import Avatar from './ui/Avatar';
import Button from './ui/Button';

/**
 * Navbar component
 * @param {Object} props
 * @param {string} [props.className] - Additional class names
 * @returns {JSX.Element}
 */
const Navbar = ({ className }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { path: ROUTES.HOME, label: 'Home' },
    { path: ROUTES.POSTS, label: 'Posts' },
  ];

  const authLinks = user
    ? [
        { path: ROUTES.DASHBOARD, label: 'Dashboard' },
        { path: ROUTES.PROFILE, label: 'Profile' },
      ]
    : [
        { path: ROUTES.LOGIN, label: 'Login' },
        { path: ROUTES.REGISTER, label: 'Register' },
      ];

  return (
    <nav className={clsx('bg-white dark:bg-gray-800 shadow-sm', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to={ROUTES.HOME}
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              writespace
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={clsx(
                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                    location.pathname === link.path
                      ? 'border-blue-500 text-gray-900 dark:text-white'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {authLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  'text-sm font-medium',
                  location.pathname === link.path
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                )}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Logout
                </Button>
                <Link to={ROUTES.PROFILE}>
                  <Avatar
                    src={user.avatar}
                    alt={user.username}
                    size="sm"
                    role="user"
                  />
                </Link>
              </>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  className: PropTypes.string,
};

export default Navbar;