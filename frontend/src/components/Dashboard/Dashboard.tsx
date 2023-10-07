import Tile from '@/components/common/Tile';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Search } from '@mui/icons-material';
import Repeater from '@/components/common/Repeater';
import { useState } from 'react';
import ComponentContainer from '../common/ComponentContainer';
import { useUser } from '@/hooks';
import WithLoader from '../common/WithLoader/WithLoader';
import { CreateNewBoard } from './DashboardUtils';
import UseDeleteBoard from '@/hooks/useDeleteBoard';
import { Alert, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@/Router/AppRouter';
import { keywordFilter } from '@/utils/common-utils';
import { useTypedSupabaseQuery } from '@/hooks/utils';

interface BoardCardProps {
  id: string;
  project: string;
  description: string;
  lastModified: string;
}

const BoardCardElement: React.FC<BoardCardProps> = ({
  id,
  project,
  description,
  lastModified,
}) => {
  const navigate = useNavigate();

  return (
    <div
      style={{ cursor: 'pointer' }}
      className="relative rounded-lg shadow-md bg-slate-300 p-6"
      onClick={() => navigate(Routes.Board.replace(':board_id', id))}
    >
      <h2 className="text-xl font-semibold mb-2">{project}</h2>
      <p className="text-gray-700">{description}</p>
      <p className="text-gray-500 mt-2">Last Modified: {lastModified}</p>
    </div>
  );
};

const BoardContainer: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const user = useUser();

  const [searchString, setSearchString] = useState('');
  const {
    data: nData,
    isLoading,
    refetch,
    error,
  } = useTypedSupabaseQuery((supabase) =>
    supabase
      .from('board')
      .select(
        'id, version, name, created_at, description, saved_date, team_id, team (id, user_team (user_id, member(*))), user_id, member (id, name, email)',
      )
      .order('version', { ascending: true }),
  );

  const userAsOwnerBoards =
    nData?.filter((board) => board.member?.id === user?.id) || [];
  const userAsMemberBoards =
    nData?.filter(
      (board) => board.team?.user_team?.some((ut) => ut.user_id === user?.id),
    ) || [];

  const {
    isLoading: deleteLoading,
    error: deleteError,
    deleteBoard,
  } = UseDeleteBoard();

  const filteredBoards = [...userAsMemberBoards, ...userAsOwnerBoards]
    ?.map((board) => ({
      id: board.id,
      project: board.name,
      description: board.description,
      lastModified: board.saved_date,
    }))
    .filter((board) =>
      keywordFilter(searchString.toLowerCase())(
        ((board.project || '') + (board.description || '')).toLowerCase(),
      ),
    ) as unknown as BoardCardProps[];

  const elementOnDelete = (boardCard: BoardCardProps) => {
    deleteBoard(boardCard.id).then(() => {
      refetch();
    });
  };

  return (
    <div className="relative flex flex-col mx-5 my-10 py-3 rounded-xl bg-white w-2/3 items-center">
      <div className="mx-10 my-5 rounded-3xl shadow-md bg-slate-300 w-auto self-start">
        <div className="flex justify-between items-center px-6">
          <Search />
          <div className="pb-1 ml-10">
            <TextField
              hiddenLabel
              id="standard-basic"
              variant="standard"
              onChange={(s) => setSearchString(s.target?.value)}
            />{' '}
          </div>
        </div>
      </div>
      {deleteError && (
        <Alert severity="error">
          Error deleting, please try again later...
        </Alert>
      )}

      {showCreateModal && (
        <CreateNewBoard
          onClose={() => setShowCreateModal(false)}
          refetch={refetch}
        />
      )}

      <div className="flex flex-col w-full mb-12 overflow-y-auto">
        <WithLoader
          isLoading={isLoading || deleteLoading}
          error={!!error}
          refetch={refetch}
        >
          <Repeater
            Component={BoardCardElement}
            feedList={filteredBoards}
            defaultMsg="No Bankan Boards here... try creating one!"
            ActionIcon={{
              icon: <DeleteIcon />,
              colour: 'orange',
              onClick: elementOnDelete,
              actionModal:
                'Are you sure you want to delete this Bankan board? This action cannot be undone!',
            }}
          />
        </WithLoader>
      </div>

      <div className="absolute bottom-0 flex my-5 w-1/3">
        <Button
          className="w-full"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowCreateModal(true)}
        >
          Create New
        </Button>
      </div>
    </div>
  );
};

const InnerDashboard: React.FC = () => {
  return (
    <Tile colour="yellow" height={100}>
      <BoardContainer />
    </Tile>
  );
};

export const Dashboard: React.FC = () => {
  return (
    <ComponentContainer>
      <InnerDashboard />
    </ComponentContainer>
  );
};
