import { render, fireEvent, waitFor } from '@testing-library/react';
import { CreateNewBoard } from './DashboardUtils';
import { useTypedSupabaseMutation } from '@/hooks/utils';
import { Mock } from 'vitest';

const mockUseTypedSupabaseMutation = useTypedSupabaseMutation as Mock

// Mocking the useUser hook
vitest.mock('@/hooks', () => ({
    useUser: vitest.fn(() => ({ id: 'mockedUserId' })),
}));

// Mocking the useTypedSupabaseMutation hook
vitest.mock('@/hooks/utils', () => ({
    useTypedSupabaseMutation: vitest.fn(() => ({
        mutate: vitest.fn(),
        isLoading: false,
        isError: false,
        isSuccess: false,
    })),
}));

describe('DashboardUtils', () => {

    beforeEach(() => {
        vitest.resetAllMocks();
        mockUseTypedSupabaseMutation.mockReturnValue({
            mutate: vitest.fn(),
            isLoading: false,
            isError: false,
            isSuccess: false,
        });
    });

    it('renders CreateNewBoard component', () => {
        const { getByText, getByLabelText } = render(
            <CreateNewBoard onClose={() => { }} refetch={() => { }} />
        );

        expect(getByText('Create new Bankan Board')).toBeInTheDocument();
        expect(getByText('Please enter a name and description for your new board.')).toBeInTheDocument();
        expect(getByLabelText('Board Name')).toBeInTheDocument();
        expect(getByLabelText('Description')).toBeInTheDocument();
        expect(getByText('Submit')).toBeInTheDocument();
    });

    it('handles form submission', async () => {
        const mutate = vitest.fn();
        mockUseTypedSupabaseMutation.mockReturnValue({
            mutate,
            isLoading: false,
            isError: false,
            isSuccess: true,
        });

        const { getByLabelText, getByText } = render(
            <CreateNewBoard onClose={() => { }} refetch={vitest.fn()} />
        );

        const nameInput = getByLabelText('Board Name');
        const descriptionInput = getByLabelText('Description');
        const submitButton = getByText('Submit');

        fireEvent.change(nameInput, { target: { value: 'New Board' } });
        fireEvent.change(descriptionInput, { target: { value: 'Board Description' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mutate).toHaveBeenCalledWith(
                expect.any(Function) // You can add a more specific expectation here
            );
        });
    });
});


