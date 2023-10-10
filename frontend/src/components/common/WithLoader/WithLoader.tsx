import { Refresh } from '@mui/icons-material';
import { Button, LinearProgress } from '@mui/material';

interface WithLoaderProps {
  children: JSX.Element;
  isLoading: boolean;
  error: boolean;
  refetch?: () => void;
}

const WithLoader = ({
  children,
  isLoading,
  error,
  refetch,
}: WithLoaderProps) => {
  if (isLoading) return <LinearProgress color="secondary" data-testid="loading-component" />;

  if (error)
    return (
      <>
        <LinearProgress variant="determinate" color="error" value={100} />
        <div className="flex justify-center m-5 w-full ">
          <Button variant="contained" color="error" onClick={refetch}>
            Reload
            <Refresh className="lr-1" />
          </Button>
        </div>
      </>
    );

  return children;
};

export default WithLoader;
