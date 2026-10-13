import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ROUTES } from '../constants';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

/**
 * LandingPage component - Public landing page with hero section and CTAs
 * @param {Object} props
 * @param {string} [props.className] - Additional class names
 * @returns {JSX.Element}
 */
const LandingPage = ({ className }) => {
  return (
    <div className={clsx('min-h-screen bg-gray-50 dark:bg-gray-900', className)}>
      {/* Hero Section */}
      <section className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block">Write your thoughts</span>{' '}
                <span className="block text-blue-600 dark:text-blue-400">in writespace</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                A simple, elegant platform for blogging and sharing your ideas with the world.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to={ROUTES.REGISTER}>
                    <Button variant="primary" size="lg" fullWidth>
                      Get started
                    </Button>
                  </Link>
                  <Link to={ROUTES.POSTS}>
                    <Button variant="outline" size="lg" fullWidth>
                      Browse posts
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <Card className="overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Featured Post</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Check out our latest featured post from the community.
                    </p>
                    <div className="mt-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                            JS
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Jane Smith</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                        Getting Started with Modern JavaScript Frameworks
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              A better way to blog
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
              Everything you need to share your ideas with the world.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Responsive Design
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                  Read and write on any device. Our platform is fully responsive and works beautifully on mobile, tablet, and desktop.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Dark Mode
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                  Choose between light and dark themes to reduce eye strain and match your preferences.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Easy Writing
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                  Focus on your content with our clean, distraction-free editor. Markdown support included.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Fast Performance
                </p>
                <p className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                  Built with modern technologies for blazing fast load times and smooth interactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              <span className="block">Ready to start writing?</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-500 dark:text-gray-400">
              Join thousands of writers who trust writespace for their blogging needs.
            </p>
            <div className="mt-8">
              <Link to={ROUTES.REGISTER}>
                <Button variant="primary" size="lg">
                  Create your account
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

LandingPage.propTypes = {
  className: PropTypes.string,
};

export default LandingPage;