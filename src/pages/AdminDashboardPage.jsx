import { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ROUTES } from '../constants';
import { useAuth } from '../context/AuthProvider';
import useUserStore from '../stores/userStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';

/**
 * AdminDashboardPage component - Admin dashboard with user management and stats
 * @param {Object} props
 * @param {string} [props.className] - Additional class names
 * @returns {JSX.Element}
 */
const AdminDashboardPage = ({ className }) => {
  const { user } = useAuth();
  const {
    users,
    loading,
    error,
    total,
    fetchUsers,
    deleteUser
  } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  return (
    <div className={clsx('min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8', className)}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Manage users and view platform statistics
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50">
                <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{loading ? '-' : total}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/50">
                <svg className="h-6 w-6 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Sessions</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">-</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50">
                <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Posts</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">-</p>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">User Management</h2>
          </div>

          {loading && users.length === 0 ? (
            <div className="flex justify-center items-center py-12">
              <svg
                className="animate-spin h-8 w-8 text-blue-600 dark:text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">No users found</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">There are no users to display.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Joined
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((userItem) => (
                    <tr key={userItem.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Avatar
                            src={userItem.avatar}
                            alt={userItem.username}
                            size="sm"
                            role={userItem.role === 'admin' ? 'admin' : 'user'}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{userItem.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{userItem.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={clsx(
                          'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                          userItem.role === 'admin'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                        )}>
                          {userItem.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(userItem.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {user?.id !== userItem.id && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteUser(userItem.id)}
                          >
                            Delete
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

AdminDashboardPage.propTypes = {
  className: PropTypes.string,
};

export default AdminDashboardPage;