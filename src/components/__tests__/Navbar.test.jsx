import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import { useAuth } from '../../context/AuthProvider';
import { ROUTES } from '../../constants';

jest.mock('../../context/AuthProvider');

describe('Navbar', () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    useAuth.mockReturnValue({
      user: null,
      logout: mockLogout,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the brand name', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('writespace')).toBeInTheDocument();
  });

  it('renders navigation links for unauthenticated users', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('renders navigation links for authenticated users', () => {
    useAuth.mockReturnValue({
      user: { id: '1', username: 'testuser', avatar: null, role: 'user' },
      logout: mockLogout,
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls logout when logout button is clicked', () => {
    useAuth.mockReturnValue({
      user: { id: '1', username: 'testuser', avatar: null, role: 'user' },
      logout: mockLogout,
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    screen.getByText('Logout').click();
    expect(mockLogout).toHaveBeenCalled();
  });

  it('renders user avatar when authenticated', () => {
    useAuth.mockReturnValue({
      user: { id: '1', username: 'testuser', avatar: 'avatar.jpg', role: 'user' },
      logout: mockLogout,
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByAltText('testuser')).toBeInTheDocument();
  });

  it('highlights active navigation link', () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.POSTS]}>
        <Navbar />
      </MemoryRouter>
    );

    const postsLink = screen.getByText('Posts');
    expect(postsLink).toHaveClass('border-blue-500');
  });

  it('applies additional className when provided', () => {
    render(
      <MemoryRouter>
        <Navbar className="test-class" />
      </MemoryRouter>
    );

    expect(screen.getByRole('navigation')).toHaveClass('test-class');
  });
});