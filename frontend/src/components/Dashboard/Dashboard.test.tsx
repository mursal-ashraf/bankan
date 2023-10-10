import { render, fireEvent, } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import { DarkModeContext } from '../common/navbar/DarkModeContext';
import { useIsLoggedIn } from '@/hooks';
import { Mock } from 'vitest';
import { AppContext } from '@/contexts';
import { MemoryRouter } from 'react-router-dom';
import { useTypedSupabaseQuery } from '@/hooks/utils';

vitest.mock('@/hooks', () => ({
    ...vitest.importActual('@/hooks'),
    useUser: vitest.fn(() => ({ id: 'mockedUserId' })),
    useIsLoggedIn: vitest.fn()
}));


const mockUseIsLoggedIn = useIsLoggedIn as Mock;
const mockMutate = vitest.fn();
const mockUseQuery = useTypedSupabaseQuery as Mock;

const stubQueryData = () => ({
    data: [
        {
            id: '1',
            name: 'Project 1',
            description: 'Description 1',
            saved_date: '2023-10-01',
            user_id: 'mockedUserId',
            member: [{ id: 'mockedUserId' }],
        },
    ],
    isLoading: false,
    refetch: vitest.fn(),
    error: null,
})

// Mock the useTypedSupabaseQuery hook
vitest.mock('@/hooks/utils', () => ({
    useTypedSupabaseMutation: () => ({
        mutate: mockMutate,
        isLoading: false,
        isError: false,
        isSuccess: false,
    }),
    useTypedSupabaseQuery: vitest.fn()
}));

// Mock the UseDeleteBoard hook
vitest.mock('@/hooks/useDeleteBoard', () => ({
    __esModule: true,
    default: vitest.fn(() => ({
        isLoading: false,
        error: null,
        deleteBoard: vitest.fn(),
    })),
}));

describe('Dashboard', () => {
    beforeEach(() => {
        vitest.clearAllMocks()
        mockUseIsLoggedIn.mockReturnValue(true);
        mockUseQuery.mockReturnValue(stubQueryData());
    })
    // it('renders BoardCardElement component', () => {
    //     const { getByText } = render(
    //         <BoardCardElement
    //             id="1"
    //             project="Project 1"
    //             description="Description 1"
    //             lastModified="2023-10-01"
    //             userId="mockedUserId"
    //         />
    //     );

    //     expect(getByText('Project 1')).toBeInTheDocument();
    //     expect(getByText('Description 1')).toBeInTheDocument();
    //     expect(getByText('Last Modified: 2023-10-01')).toBeInTheDocument();
    // });

    it('renders BoardContainer component', async () => {
        mockUseQuery.mockReturnValue({ ...stubQueryData(), isLoading: true });
        const { getByText, getByLabelText, getByRole, getByTestId } = render(
            <MemoryRouter>
                <AppContext.Provider value={{ client: {} as any }}>
                    <DarkModeContext.Provider value={{ darkMode: false, toggleDarkMode: () => { } }}>
                        <Dashboard />
                    </DarkModeContext.Provider>
                </AppContext.Provider>
            </MemoryRouter>);

        // Ensure the components are rendered
        expect(getByRole('textbox')).toBeInTheDocument();
        expect(getByLabelText('Show only my boards')).toBeInTheDocument();

        // Simulate interaction with the "Show only my boards" checkbox
        fireEvent.click(getByLabelText('Show only my boards'));

        // Simulate interaction with the "Create New" button
        fireEvent.click(getByText('Create New'));

        // Ensure that the loading spinner is displayed
        expect(getByTestId('loading-component')).toBeInTheDocument();
    });
})


