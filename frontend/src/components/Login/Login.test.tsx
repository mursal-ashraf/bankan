import { render } from '@testing-library/react';
import { useLogin } from '@/hooks'; // Import your actual useLogin hook implementation
import { Login } from './Login';
import { Mock } from 'vitest';

vitest.mock('@/hooks', () => ({
    useLogin: vitest.fn(),
    useIsLoggedIn: vitest.fn(() => false)
}));
const mockNavigate = vitest.fn();

// Mock the useNavigate hook
vitest.mock('react-router-dom', async () => ({
    ...(await vitest.importActual('react-router-dom') as any),
    useNavigate: () => mockNavigate,
}));

const mockUseLogin = useLogin as Mock;

describe('Login', () => {
    it('should render login form', () => {
        const loginMock = vitest.fn();
        mockUseLogin.mockReturnValue([loginMock, { isLoading: false, error: null }]);

        const { getByText, getByRole } = render(<Login />);

        // Assert that login form elements are rendered
        expect(getByText('Email address')).toBeInTheDocument();
        expect(getByText('Password')).toBeInTheDocument();
        expect(getByRole('button', { name: 'Login' })).toBeInTheDocument();
        expect(getByText('Sign up instead')).toBeInTheDocument();
    });
});
