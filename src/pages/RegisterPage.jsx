import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ROUTES } from '../constants';
import { useAuth } from '../context/AuthProvider';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

/**
 * RegisterPage component - Form for user registration
 * @param {Object} props
 * @param {string} [props.className] - Additional class names
 * @returns {JSX.Element}
 */
const RegisterPage = ({ className }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await register(username, email, password);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className={clsx('min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8', className)}>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <Link
              to={ROUTES.LOGIN}
              className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        {error && (
          <div className="bg-red-50 dark:bg-red-900/50 border-l-4 border-red-500 dark:border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}
        <Card>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="text-sm">
              <p className="text-gray-500 dark:text-gray-400">
                By registering, you agree to our{' '}
                <Link
                  to="#"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  to="#"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={loading}
                disabled={loading}
              >
                Create account
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

RegisterPage.propTypes = {
  className: PropTypes.string,
};

export default RegisterPage;