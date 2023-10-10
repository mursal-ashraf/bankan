import { render } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
    it('should render two buttons for "Terms of Use" and "Privacy policy"', () => {
        const { getByText } = render(<Footer />);

        // Assert that "Terms of Use" and "Privacy policy" buttons are rendered
        expect(getByText('Terms of Use')).toBeInTheDocument();
        expect(getByText('Privacy policy')).toBeInTheDocument();
    });

    it('should have proper styling for the footer container', () => {
        const { container } = render(<Footer />);
        const footer = container.firstChild;

        // Assert that the footer container has the expected styles
        expect(footer).toHaveStyle({
            borderTop: 'double',
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            marginTop: '0',
            padding: '0px',
        });
    });

    it('should have proper styling for the buttons', () => {
        const { getByText } = render(<Footer />);
        const termsOfUseButton = getByText('Terms of Use');
        const privacyPolicyButton = getByText('Privacy policy');

        // Assert that the buttons have the expected styles
        expect(termsOfUseButton).toHaveStyle({
            padding: '6px 8px',
        });
        expect(privacyPolicyButton).toHaveStyle({
            padding: '6px 8px',
        });
    });
});
