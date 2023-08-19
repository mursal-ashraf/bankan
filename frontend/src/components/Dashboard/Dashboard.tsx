import Tile from '@/components/common/Tile';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Repeater from '@/components/common/Repeater';
import { useState } from 'react';
import ComponentContainer from '../common/ComponentContainer';

interface BoardCardProps {
  id: string;
  project: string;
  description: string;
  lastModified: string;
}

const BoardCardElement: React.FC<BoardCardProps> = ({
  project,
  description,
  lastModified,
}) => (
  <div className="relative rounded-lg shadow-md bg-slate-300 p-6">
    <h2 className="text-xl font-semibold mb-2">{project}</h2>
    <p className="text-gray-700">{description}</p>
    <p className="text-gray-500 mt-2">Last Modified: {lastModified}</p>
  </div>
);

const BoardContainer: React.FC = () => {
  //Mock data for now..
  const [boardCards, setBoardCards] = useState([
    {
      id: '1',
      project: 'Project A',
      description: 'This is the description for Project A',
      lastModified: '2023-08-10',
    },
    {
      id: '2',
      project: 'Project B',
      description: 'Description for Project B goes here',
      lastModified: '2023-08-09',
    },
    {
      id: '3',
      project: 'Project C',
      description: 'Description for Project C',
      lastModified: '2023-08-08',
    },
    {
      id: '4',
      project: 'Project A',
      description: 'This is the description for Project A',
      lastModified: '2023-08-10',
    },
    {
      id: '5',
      project: 'Project B',
      description: 'Description for Project B goes here',
      lastModified: '2023-08-09',
    },
    {
      id: '6',
      project: 'Project C',
      description: 'Description for Project C',
      lastModified: '2023-08-08',
    },
    {
      id: '7',
      project: 'Project A',
      description: 'This is the description for Project A',
      lastModified: '2023-08-10',
    },
    {
      id: '8',
      project: 'Project B',
      description: 'Description for Project B goes here',
      lastModified: '2023-08-09',
    },
    {
      id: '9',
      project: 'Project C',
      description: 'Description for Project C',
      lastModified: '2023-08-08',
    },
  ] as BoardCardProps[]);

  const elementOnDelete = (boardCard: BoardCardProps) => {
    setBoardCards(boardCards.filter((bc) => bc.id !== boardCard.id));
  };

  return (
    <div className="relative flex flex-col mx-5 my-10 py-3 rounded-xl bg-white w-2/3 items-center">
      <div className="mx-10 my-5 p-2 rounded-3xl shadow-md bg-slate-300 w-2/3 self-start">
        Search...
      </div>

      <div className="flex flex-col w-full mb-12 overflow-y-auto">
        <Repeater
          Component={BoardCardElement}
          feedList={boardCards}
          defaultMsg="No Bankan Boards here... try creating one!"
          ActionIcon={{
            icon: <DeleteIcon />,
            colour: 'orange',
            onClick: elementOnDelete,
            actionModal:
              'Are you sure you want to delete this Bankan board? This action cannot be undone!',
          }}
        />
      </div>

      <div className="absolute bottom-0 flex my-5 w-1/3">
        <Button className="w-full" variant="contained" startIcon={<AddIcon />}>
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
