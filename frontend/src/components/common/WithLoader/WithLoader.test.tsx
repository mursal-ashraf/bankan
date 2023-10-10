import { render } from '@testing-library/react';
import WithLoader from './WithLoader';

describe('WithLoader Component', () => {
  it('renders children when not loading and no error', () => {
    const { getByText, queryByTestId } = render(
      <WithLoader isLoading={false} error={false}>
        <div>Child Component</div>
      </WithLoader>,
    );

    // Assert that child component is rendered
    expect(getByText('Child Component')).toBeInTheDocument();
    // Assert that loading component is not rendered
    expect(queryByTestId('loading-component')).toBeNull();
  });

  it('displays loading component when isLoading is true', () => {
    const { getByTestId } = render(
      <WithLoader isLoading={true} error={false}>
        <div>Child Component</div>
      </WithLoader>,
    );

    // Assert that loading component is displayed
    expect(getByTestId('loading-component')).toBeInTheDocument();
  });

  // it('displays error message and reload button when error is true', () => {
  //     const refetchMock = vitest.fn();
  //     const { getByText } = render(
  //         <WithLoader isLoading={false} error={true} refetch={refetchMock}>
  //             <div>Child Component</div>
  //         </WithLoader>
  //     );

  //     // Assert that error message and reload button are displayed
  //     expect(getByText('Reload')).toBeInTheDocument();
  //     expect(getByText('Child Component')).toBeInTheDocument();

  //     // Simulate a click on the "Reload" button
  //     fireEvent.click(getByText('Reload'));

  //     // Assert that the refetch function is called
  //     expect(refetchMock).toHaveBeenCalled();
  // });
});
