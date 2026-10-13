import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * Avatar component
 * @param {Object} props
 * @param {string} props.src - Image source URL
 * @param {string} [props.alt=''] - Alternative text for the image
 * @param {string} [props.size='md'] - Avatar size
 * @param {string} [props.shape='circle'] - Avatar shape
 * @param {string} [props.className] - Additional class names
 * @param {'user'|'admin'|'guest'} [props.role='user'] - User role for styling
 * @returns {JSX.Element}
 */
const Avatar = ({
  src,
  alt = '',
  size = 'md',
  shape = 'circle',
  role = 'user',
  className,
}) => {
  const baseClasses = 'inline-flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-600';

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-md',
  };

  const roleClasses = {
    user: 'ring-2 ring-blue-500 dark:ring-blue-400',
    admin: 'ring-2 ring-red-500 dark:ring-red-400',
    guest: 'ring-2 ring-gray-300 dark:ring-gray-500',
  };

  const initials = alt
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={clsx(
        baseClasses,
        sizeClasses[size],
        shapeClasses[shape],
        roleClasses[role],
        className
      )}
    >
      {src ? (
        <img
          className="w-full h-full object-cover"
          src={src}
          alt={alt}
          loading="lazy"
        />
      ) : (
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {initials}
        </span>
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  shape: PropTypes.oneOf(['circle', 'square']),
  role: PropTypes.oneOf(['user', 'admin', 'guest']),
  className: PropTypes.string,
};

export default Avatar;