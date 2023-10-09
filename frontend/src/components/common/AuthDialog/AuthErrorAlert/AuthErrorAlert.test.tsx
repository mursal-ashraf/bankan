import { render } from '@testing-library/react';
import { AuthErrorAlert } from './AuthErrorAlert'; // Adjust the import path as needed

const mockError = {
    name: 'Sample Error',
    message: 'This is a sample error message.',
} as any;

test('renders AuthErrorAlert component with error message and title', () => {
    const { getByText } = render(<AuthErrorAlert error={mockError} />);

    // Check if the error title is rendered
    const errorTitleElement = getByText('Sample Error');
    expect(errorTitleElement).toBeInTheDocument();

    // Check if the error message is rendered
    const errorMessageElement = getByText('This is a sample error message.');
    expect(errorMessageElement).toBeInTheDocument();

    // Check if the component has the "error" severity
    const alertElement = getByText('Sample Error').closest('.MuiAlert-root');
    expect(alertElement).toHaveClass('MuiAlert-standardError');
});
