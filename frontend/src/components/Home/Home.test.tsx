import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // You may need MemoryRouter to mock the router context
import { Home } from './Home';
import { useIsLoggedIn } from '@/hooks';
import { Mock } from 'vitest';


vitest.mock('@/hooks', () => ({
    ...vitest.importActual('@/hooks'),
    useIsLoggedIn: vitest.fn()
}));


const mockUseIsLoggedIn = useIsLoggedIn as Mock;

describe('Home', () => {
    beforeEach(() => {
        vitest.resetAllMocks();
        mockUseIsLoggedIn.mockReturnValue(false);
    })
    it('renders Team Management section', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        // Check if the text within the Team Management section is present
        expect(screen.getByText('Team Management')).toBeInTheDocument();
        expect(
            screen.getByText(
                "Use Bankan to track, manage, complete, and bring tasks together like the pieces of a puzzle, and make your team's projects a cohesive success every time."
            )
        ).toBeInTheDocument();

        // Check if Login and Signup buttons are rendered when not logged in
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Signup')).toBeInTheDocument();
    });

    it('renders About Bankan section', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        // Check if the text within the About Bankan section is present
        expect(screen.getByText('About Bankan')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Bankan is a versatile tool for managing work that allows teams to generate ideas, work together on projects, arrange workflows, and monitor progress using a visual, efficient, and satisfying approach.'
            )
        ).toBeInTheDocument();
    });

    it('renders Contact Us section', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        // Check if the text within the Contact Us section is present
        expect(screen.getByText('Contact Us')).toBeInTheDocument();
        expect(screen.getByText('Email: Monash@monash.monash.edu')).toBeInTheDocument();
        expect(screen.getByText('Phone Number: 0987654321')).toBeInTheDocument();
    });

    it('renders Support section', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        // Check if the text within the Support section is present
        expect(screen.getByText('Support')).toBeInTheDocument();
        expect(screen.getByText('What this policy covers')).toBeInTheDocument();
        expect(screen.getByText('Help Center')).toBeInTheDocument();
        expect(screen.getByText('Hire a Professional')).toBeInTheDocument();
        expect(screen.getByText('Report Abuse')).toBeInTheDocument();
        expect(screen.getByText('System Status')).toBeInTheDocument();
    });
})

