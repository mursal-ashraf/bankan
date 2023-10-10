import { render, fireEvent, waitFor } from '@testing-library/react';
import { AuthDialog } from './AuthDialog'; // Adjust the import path as needed
import { AppContext } from '@/contexts';
import userEvent from '@testing-library/user-event'

const mockNavigate = vitest.fn();

// Mock the useNavigate hook
vitest.mock('react-router-dom', async () => ({
    ...(await vitest.importActual('react-router-dom') as any),
    useNavigate: () => mockNavigate,
}));


vitest.mock('@/hooks', async () => ({
    ...(await vitest.importActual('@/hooks') as any),
    useIsLoggedIn: vitest.fn(() => false),
}));



// Mock your validationHandler function if needed
const mockValidationHandler = vitest.fn();

const defaultProps = {
    title: 'Sign In',
    alternateText: 'Sign Up',
    submitText: 'Submit',
    alternateRoute: '/signup',
    submitRoute: '/dashboard',
    finishHandler: async () => { },
    isLoading: false,
    error: null,
    validationHandler: mockValidationHandler,
};

beforeEach(() => {
    // Clear the mock function calls before each test
    mockValidationHandler.mockClear();
})

test('renders AuthDialog component with default props', () => {
    const { getByText } = render(<AppContext.Provider value={{ client: {} as any }}><AuthDialog {...defaultProps} /></AppContext.Provider>);

    // Check if the title and elements are rendered
    const titleElement = getByText('Sign In');
    expect(titleElement).toBeInTheDocument();
    const emailInput = getByText('Email address');
    expect(emailInput).toBeInTheDocument();
    const passwordInput = getByText('Password');
    expect(passwordInput).toBeInTheDocument();
    const submitButton = getByText('Submit');
    expect(submitButton).toBeInTheDocument();
});

test('calls validationHandler when email or password change', async () => {
    const { getByRole } = render(<AuthDialog {...defaultProps} />);
    const emailInput = getByRole('textbox', { name: 'Email address' });
    const passwordInput = getByRole('textbox', { name: '' });



    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    await userEvent.type(passwordInput, 'password123');
    waitFor(() => expect(mockValidationHandler).toHaveBeenCalledWith('test@example.com', 'password123'));
});

test('navigates to the alternate route when "Sign Up" is clicked', () => {
    const { getByText } = render(<AuthDialog {...defaultProps} />);
    const signUpButton = getByText('Sign Up');

    fireEvent.click(signUpButton);
    expect(mockNavigate).toHaveBeenCalledWith('/signup');
});

