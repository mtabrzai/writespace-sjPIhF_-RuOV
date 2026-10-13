import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * Card component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className] - Additional class names
 * @param {boolean} [props.shadow=true] - Whether to show shadow
 * @param {boolean} [props.hoverable=false] - Whether card is hoverable
 * @param {string} [props.padding='p-6'] - Padding size
 * @returns {JSX.Element}
 */
const Card = ({
  children,
  className,
  shadow = true,
  hoverable = false,
  padding = 'p-6',
}) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700';

  return (
    <div
      className={clsx(
        baseClasses,
        padding,
        shadow && 'shadow-sm dark:shadow-gray-900',
        hoverable && 'transition-shadow duration-200 hover:shadow-md dark:hover:shadow-gray-700',
        className
      )}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  shadow: PropTypes.bool,
  hoverable: PropTypes.bool,
  padding: PropTypes.string,
};

export default Card;