import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ROUTES } from '../constants';
import { useAuth } from '../context/AuthProvider';
import usePostStore from '../stores/postStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

/**
 * CreateBlogPage component - Form for creating a new blog post
 * @param {Object} props
 * @param {string} [props.className] - Additional class names
 * @returns {JSX.Element}
 */
const CreateBlogPage = ({ className }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth();
  const { createPost, loading } = usePostStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    try {
      const post = await createPost({
        title: title.trim(),
        content: content.trim(),
        published: true
      });
      navigate(ROUTES.POST.replace(':id', post.id));
    } catch (err) {
      setError(err.message || 'Failed to create post. Please try again.');
    }
  };

  return (
    <div className={clsx('min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8', className)}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Post</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Share your thoughts with the community
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
                onClick={() => navigate(ROUTES.POSTS)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={loading}
              >
                Publish
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

CreateBlogPage.propTypes = {
  className: PropTypes.string,
};

export default CreateBlogPage;