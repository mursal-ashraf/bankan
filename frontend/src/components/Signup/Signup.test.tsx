import { render } from '@testing-library/react';
import { useSignUp } from '@/hooks'; // Import your actual useLogin hook implementation
import { Signup } from './Signup';
import { Mock } from 'vitest';

vitest.mock('@/hooks', () => ({
    useSignUp: vitest.fn(),
    useIsLoggedIn: vitest.fn(() => false)
}));
const mockNavigate = vitest.fn();

// Mock the useNavigate hook
vitest.mock('react-router-dom', async () => ({
    ...(await vitest.importActual('react-router-dom') as any),
    useNavigate: () => mockNavigate,
}));

const mockUseSignUp = useSignUp as Mock;

describe('Login', () => {
    it('should render login form', () => {
        const signupMock = vitest.fn();
        mockUseSignUp.mockReturnValue([signupMock, { isLoading: false, error: null }]);

        const { getByText, getByRole } = render(<Signup />);

        // Assert that login form elements are rendered
        expect(getByText('Email address')).toBeInTheDocument();
        expect(getByText('Password')).toBeInTheDocument();
        expect(getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
        expect(getByText('Login instead')).toBeInTheDocument();
    });
});
