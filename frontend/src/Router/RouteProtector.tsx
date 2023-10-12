import { useUser } from '@/hooks';
import Tile from '@/components/common/Tile';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Routes } from './AppRouter';
import { ExitToApp } from '@mui/icons-material';

interface RouteProtectorProps {
  children: JSX.Element;
}

const RouteProtector = ({ children }: RouteProtectorProps) => {
  const user = useUser();
  const navigate = useNavigate();

  if (!user?.id) {
    return (
      <Tile style={{ backgroundColor: '#FFCD29' }} height={100}>
        <div className="flex-col justify-center text-center">
          <p
            className="text-black text-bold text-4xl font-mono font-bold bg-white m-1 rounded-md px-10 h-max"
            style={{ backgroundColor: 'white' }}
          >
            Looks like you haven't logged in yet...
          </p>

          <div className="relative flex my-5 w-1/3">
            <Button
              className="w-full"
              variant="contained"
              startIcon={<ExitToApp />}
              onClick={() => navigate(Routes.Login)}
            >
              Login
            </Button>
          </div>
        </div>
      </Tile>
    );
  }

  return children;
};

export default RouteProtector;
