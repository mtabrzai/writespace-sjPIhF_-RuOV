import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ROUTES } from '../constants';
import { useAuth } from '../context/AuthProvider';
import usePostStore from '../stores/postStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

/**
 * DeleteBlogPage component - Confirmation page for deleting a blog post
 * @param {Object} props
 * @param {string} [props.className] - Additional class names
 * @returns {JSX.Element}
 */
const DeleteBlogPage = ({ className }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentPost, loading, error, fetchPost, deletePost } = usePostStore();

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id, fetchPost]);

  const handleDelete = async () => {
    try {
      await deletePost(id);
      navigate(ROUTES.POSTS);
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  const isAuthor = user && currentPost && user.id === currentPost.authorId;

  if (!isAuthor) {
    return (
      <div className={clsx('min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8', className)}>
        <div className="max-w-3xl mx-auto">
          <Card className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">Unauthorized</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">You don't have permission to delete this post.</p>
            <div className="mt-6">
              <Link to={ROUTES.POSTS}>
                <Button variant="outline">
                  Back to posts
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx('min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8', className)}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Delete Post</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this post?
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

        {loading ? (
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
        ) : !currentPost ? (
          <Card className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">Post not found</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">The post you're trying to delete doesn't exist.</p>
            <div className="mt-6">
              <Link to={ROUTES.POSTS}>
                <Button variant="outline">
                  Back to posts
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <Card>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{currentPost.title}</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300 whitespace-pre-line line-clamp-3">
                  {currentPost.content}
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(ROUTES.POST.replace(':id', id))}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  onClick={handleDelete}
                  loading={loading}
                  disabled={loading}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

DeleteBlogPage.propTypes = {
  className: PropTypes.string,
};

export default DeleteBlogPage;