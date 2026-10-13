import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ROUTES } from '../constants';
import { useAuth } from '../context/AuthProvider';
import usePostStore from '../stores/postStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';

/**
 * BlogListPage component - List of all blog posts with create button
 * @param {Object} props
 * @param {string} [props.className] - Additional class names
 * @returns {JSX.Element}
 */
const BlogListPage = ({ className }) => {
  const { user } = useAuth();
  const { posts, loading, error, fetchPosts } = usePostStore();

  const handleLoadMore = () => {
    fetchPosts({ page: Math.ceil(posts.length / 10) + 1 });
  };

  return (
    <div className={clsx('min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8', className)}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Posts</h1>
          {user && (
            <Link to={ROUTES.NEW_POST}>
              <Button variant="primary">
                Create Post
              </Button>
            </Link>
          )}
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

        {loading && posts.length === 0 ? (
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
        ) : (
          <>
            {posts.length === 0 ? (
              <Card className="text-center py-12">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white">No posts found</h2>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Be the first to create a post!</p>
              </Card>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <Card key={post.id} hoverable>
                    <div className="flex items-start space-x-4">
                      <Avatar
                        src={post.author?.avatar}
                        alt={post.author?.username || 'Unknown author'}
                        size="md"
                        role="user"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                              <Link
                                to={ROUTES.POST.replace(':id', post.id)}
                                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              >
                                {post.title}
                              </Link>
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              By {post.author?.username || 'Unknown author'} • {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <p className="mt-3 text-gray-600 dark:text-gray-300 line-clamp-3">
                          {post.content}
                        </p>
                        <div className="mt-4">
                          <Link
                            to={ROUTES.POST.replace(':id', post.id)}
                            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                          >
                            Read more
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {posts.length > 0 && (
              <div className="mt-8 text-center">
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                  loading={loading}
                  disabled={loading}
                >
                  Load more
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

BlogListPage.propTypes = {
  className: PropTypes.string,
};

export default BlogListPage;