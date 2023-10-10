import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { AddMemberDialog } from './AddMemberDialog';

const mockMutate = vitest.fn();

vitest.mock('@/hooks/utils', () => ({
    useTypedSupabaseMutation: () => ({
        mutate: mockMutate,
        isLoading: false,
        isError: false,
        isSuccess: false,
    }),
}));


describe('AddMemberDialog', () => {
    const users = [
        { id: '1', email: 'user1@example.com' },
        { id: '2', email: 'user2@example.com' },
        { id: '3', email: 'user3@example.com' },
    ] as any;

    const board = { id: 'board1', team_id: 'team1' } as any;

    beforeEach(() => {
        vitest.resetAllMocks();
    })

    it('renders with a search input and selected users list', () => {
        render(<AddMemberDialog users={users} board={board} />);

        // Check if the search input is rendered
        expect(screen.getByLabelText('search by email')).toBeInTheDocument();

        // Check if the "Add" button is rendered
        expect(screen.getByText('Add')).toBeInTheDocument();

        // Check if selected users list is initially empty
        expect(screen.getByTestId('selected-users').hasChildNodes()).toBe(false);
    });

    it('filters and selects users', () => {
        render(<AddMemberDialog users={users} board={board} />);

        // Type into the search input
        fireEvent.change(screen.getByLabelText('search by email'), {
            target: { value: 'user1' },
        });

        const unselectedUsers = screen.getByTestId('not-selected-users');
        const selectedUsers = screen.getByTestId('selected-users');

        // Check if filtered users are displayed
        expect(within(unselectedUsers).getByText('user1@example.com')).toBeInTheDocument();
        expect(screen.queryByText('user2@example.com')).toBeNull();
        expect(screen.queryByText('user3@example.com')).toBeNull();

        // Click on a user to select
        fireEvent.click(screen.getByText('user1@example.com'));

        // Check if the user is added to the selected list
        expect(screen.getByText('Selected users')).toBeInTheDocument();
        expect(within(selectedUsers).getByText('user1@example.com')).toBeInTheDocument();

        // Click on the same user again to deselect
        fireEvent.click(within(selectedUsers).getByText('user1@example.com'));

        // Check if the user is removed from the selected list
        expect(screen.getByText('Selected users')).toBeInTheDocument();
        expect(within(selectedUsers).queryByText('user1@example.com')).toBeNull();
    });

    it('handles adding members', async () => {
        render(<AddMemberDialog users={users} board={board} />);

        // Select a user
        fireEvent.click(screen.getByText('user1@example.com'));

        // Click on the "Add" button
        fireEvent.click(screen.getByText('Add'));

        // Wait for the success redirection
        await waitFor(() => {
            expect(mockMutate).toBeCalledTimes(1)
        });
    });
});
