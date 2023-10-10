import { render } from '@testing-library/react';
import { ComponentContainer } from './ComponentContainer';

describe('ComponentContainer', () => {

    it('should render children content', () => {
        const { getByText } = render(
            <ComponentContainer>
                <div data-testid="content">Content goes here</div>
            </ComponentContainer>
        );

        // Assert that the children content is rendered
        expect(getByText('Content goes here')).toBeInTheDocument();
    });
});
