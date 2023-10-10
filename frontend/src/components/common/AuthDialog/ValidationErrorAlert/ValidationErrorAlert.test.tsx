import { render } from '@testing-library/react';
import { ValidationErrorAlert } from './ValidationErrorAlert'; // Adjust the import path as needed

test('renders ValidationErrorAlert component with title and message', () => {
    const title = 'Custom Error Title';
    const message = 'This is a custom error message.';
    const { getByText } = render(<ValidationErrorAlert title={title} message={message} />);

    // Check if the custom error title is rendered
    const errorTitleElement = getByText('Custom Error Title');
    expect(errorTitleElement).toBeInTheDocument();

    // Check if the custom error message is rendered
    const errorMessageElement = getByText('This is a custom error message.');
    expect(errorMessageElement).toBeInTheDocument();

    // Check if the component has the "error" severity
    const alertElement = getByText('Custom Error Title').closest('.MuiAlert-root');
    expect(alertElement).toHaveClass('MuiAlert-standardError');
});
