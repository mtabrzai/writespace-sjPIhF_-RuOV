import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies default variant and size classes', () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-blue-600');
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('py-2');
  });

  it('applies custom variant classes', () => {
    render(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-red-600');
  });

  it('applies custom size classes', () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-3');
    expect(button).toHaveClass('py-1.5');
  });

  it('applies fullWidth class when fullWidth prop is true', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  it('disables button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
  });

  it('shows loading spinner when loading prop is true', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toContainHTML('animate-spin');
  });

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick handler when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );
    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not call onClick handler when loading', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(
      <Button loading onClick={handleClick}>
        Loading
      </Button>
    );
    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies additional className when provided', () => {
    render(<Button className="extra-class">Custom Class</Button>);
    expect(screen.getByRole('button')).toHaveClass('extra-class');
  });

  it('renders with correct type attribute', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});