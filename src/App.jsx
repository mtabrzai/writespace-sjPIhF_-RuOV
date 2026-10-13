import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ROUTES } from './constants';
import AuthProvider from './context/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import CreateBlogPage from './pages/CreateBlogPage';
import EditBlogPage from './pages/EditBlogPage';
import DeleteBlogPage from './pages/DeleteBlogPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import CreateUserPage from './pages/admin/CreateUserPage';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <>
        <Navbar />
        <LandingPage />
      </>
    ),
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <>
        <Navbar />
        <LoginPage />
      </>
    ),
  },
  {
    path: ROUTES.REGISTER,
    element: (
      <>
        <Navbar />
        <RegisterPage />
      </>
    ),
  },
  {
    path: ROUTES.POSTS,
    element: (
      <>
        <Navbar />
        <BlogListPage />
      </>
    ),
  },
  {
    path: ROUTES.POST,
    element: (
      <>
        <Navbar />
        <BlogPostPage />
      </>
    ),
  },
  {
    path: ROUTES.NEW_POST,
    element: (
      <PrivateRoute>
        <>
          <Navbar />
          <CreateBlogPage />
        </>
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.EDIT_POST,
    element: (
      <PrivateRoute>
        <>
          <Navbar />
          <EditBlogPage />
        </>
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.DASHBOARD,
    element: (
      <PrivateRoute>
        <>
          <Navbar />
          <div>User Dashboard</div>
        </>
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.PROFILE,
    element: (
      <PrivateRoute>
        <>
          <Navbar />
          <div>User Profile</div>
        </>
      </PrivateRoute>
    ),
  },
  {
    path: '/admin/dashboard',
    element: (
      <AdminRoute>
        <>
          <Navbar />
          <AdminDashboardPage />
        </>
      </AdminRoute>
    ),
  },
  {
    path: '/admin/users/new',
    element: (
      <AdminRoute>
        <>
          <Navbar />
          <CreateUserPage />
        </>
      </AdminRoute>
    ),
  },
]);

/**
 * App component - Root component with router and auth provider
 * @returns {JSX.Element}
 */
const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

App.propTypes = {
  children: PropTypes.node,
};

export default App;