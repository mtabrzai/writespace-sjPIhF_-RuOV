import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * Button component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.variant='primary'] - Button variant
 * @param {string} [props.size='md'] - Button size
 * @param {boolean} [props.fullWidth=false] - Whether button should take full width
 * @param {boolean} [props.disabled=false] - Whether button is disabled
 * @param {boolean} [props.loading=false] - Whether button is in loading state
 * @param {string} [props.type='button'] - Button type
 * @param {function} [props.onClick] - Click handler
 * @param {string} [props.className] - Additional class names
 * @returns {JSX.Element}
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  className,
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    link: 'text-blue-600 hover:underline focus:ring-blue-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-2',
  };

  return (
    <button
      type={type}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
      ) : null}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'outline', 'ghost', 'link']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'icon']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;