import Tile from '@/components/common/Tile';
import { ExitToApp } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Routes } from './AppRouter';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Tile style={{ backgroundColor: '#FFCD29' }} height={100}>
      <div className="flex-col justify-center text-center">
        <p
          className="text-black text-bold text-4xl font-mono font-bold bg-white m-1 rounded-md px-10 h-max"
          style={{ backgroundColor: 'white' }}
        >
          404... <br />
          We don't remember creating this page... <br />
          Or maybe we did... <br />
          Either way it doesn't exist any more!
        </p>

        <div className="relative flex my-5 w-1/3">
          <Button
            className="w-full"
            variant="contained"
            startIcon={<ExitToApp />}
            onClick={() => navigate(Routes.Home)}
          >
            Home
          </Button>
        </div>
      </div>
    </Tile>
  );
};

export default NotFound;
