import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ROUTES } from '../constants';
import { useAuth } from '../context/AuthProvider';
import usePostStore from '../stores/postStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

/**
 * EditBlogPage component - Form for editing an existing blog post
 * @param {Object} props
 * @param {string} [props.className] - Additional class names
 * @returns {JSX.Element}
 */
const EditBlogPage = ({ className }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentPost, loading, error, fetchPost, updatePost } = usePostStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id, fetchPost]);

  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.title);
      setContent(currentPost.content);
    }
  }, [currentPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!title.trim()) {
      setFormError('Title is required');
      return;
    }

    if (!content.trim()) {
      setFormError('Content is required');
      return;
    }

    try {
      const post = await updatePost(id, {
        title: title.trim(),
        content: content.trim()
      });
      navigate(ROUTES.POST.replace(':id', post.id));
    } catch (err) {
      setFormError(err.message || 'Failed to update post. Please try again.');
    }
  };

  const isAuthor = user && currentPost && user.id === currentPost.authorId;

  if (!isAuthor) {
    return (
      <div className={clsx('min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8', className)}>
        <div className="max-w-3xl mx-auto">
          <Card className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">Unauthorized</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">You don't have permission to edit this post.</p>
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Post</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Update your post content
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

        {formError && (
          <div className="bg-red-50 dark:bg-red-900/50 border-l-4 border-red-500 dark:border-red-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 dark:text-red-200">{formError}</p>
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
        ) : (
          <Card>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Title
                </label>
                <div className="mt-1">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Post title"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Content
                </label>
                <div className="mt-1">
                  <textarea
                    id="content"
                    name="content"
                    rows={12}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Write your post content here..."
                  />
                </div>
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
                  type="submit"
                  variant="primary"
                  loading={loading}
                  disabled={loading}
                >
                  Update
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};

EditBlogPage.propTypes = {
  className: PropTypes.string,
};

export default EditBlogPage;