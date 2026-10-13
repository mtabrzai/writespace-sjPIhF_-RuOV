import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ROUTES } from '../../constants';
import { useAuth } from '../../context/AuthProvider';
import useUserStore from '../../stores/userStore';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import AdminRoute from '../../components/AdminRoute';

/**
 * CreateUserPage component - Admin form for creating a new user
 * @param {Object} props
 * @param {string} [props.className] - Additional class names
 * @returns {JSX.Element}
 */
const CreateUserPage = ({ className }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const { createUser, loading } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    try {
      await createUser({
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
        role
      });
      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (err) {
      setError(err.message || 'Failed to create user. Please try again.');
    }
  };

  return (
    <AdminRoute>
      <div className={clsx('min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8', className)}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New User</h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Add a new user to the platform
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/50 border-l-4 border-red-500 dark:border-red-400 p-4 mb-8">
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Username"
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
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="user@example.com"
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
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Role
                </label>
                <div className="mt-1">
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(ROUTES.ADMIN_DASHBOARD)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  disabled={loading}
                >
                  Create User
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </AdminRoute>
  );
};

CreateUserPage.propTypes = {
  className: PropTypes.string,
};

export default CreateUserPage;