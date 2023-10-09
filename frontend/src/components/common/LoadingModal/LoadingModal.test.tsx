import { render } from '@testing-library/react';
import { LoadingModal } from './LoadingModal';

test('renders LoadingModal component', () => {
    const { getByTestId } = render(<LoadingModal />);

    // Check if the modal is open
    const modalElement = getByTestId('loading-modal');
    expect(modalElement).toBeInTheDocument();

    // Check if the CircularProgress component is present
    const circularProgressElement = getByTestId('circular-progress');
    expect(circularProgressElement).toBeInTheDocument();
});
