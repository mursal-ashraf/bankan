import { useState } from 'react';
import Tile from '@/components/common/Tile';
import { MemberBar } from './BoardComponents/MemberBar';
import { TaskBoard } from './BoardComponents/TaskBoard';
import EditCardModal from './BoardComponents/EditCardModal';
import dayjs from 'dayjs';
import ComponentContainer from '../common/ComponentContainer';
import useBoard from '@/hooks/useBoard';
import { useParams } from 'react-router-dom';
import useList from '@/hooks/useList';

// eslint-disable-next-line
const team = {
  id: '123123',
  board_id: '123456789',
  user_id: '1',
  created_at: new Date().getDate(),
};

// user_team table
const members = [
  {
    id: '1',
    username: 'kevinbuilderman',
    given_name: 'Kevin',
    surname: 'L',
    email: 'kev@example.com',
    phone: '123123123',
  },
  {
    id: '2',
    username: 'mursalcoolkid',
    given_name: 'Mursal',
    surname: 'A',
    email: 'mursal@example.com',
    phone: '123123123',
  },
];

const InnerBoard: React.FC = () => {
  // Example Board
  // http://localhost:5173/Board/02b5bfae-f543-42b6-aab0-51b39253a2e4
  const { board_id } = useParams();

  const boardResult = useBoard(board_id);
  let board: Board = {
    created_at: null,
    description: null,
    id: '',
    name: null,
    saved_date: null,
    team_id: null,
    user_id: null,
    version: -1,
  };
  if (boardResult?.data?.length > 0) {
    board = boardResult?.data?.slice(-1)[0];
    // console.log({ board })
  }

  const [currentEditCard, setCurrentEditCard] = useState<ICard>();
  const [editModalVisibility, setEditModalVisibility] = useState(false);

  const onEditCardClick = (card: ICard) => {
    setCurrentEditCard(card);
    toggleEditModalVisibility();
  };

  const toggleEditModalVisibility = () => {
    setEditModalVisibility(!editModalVisibility.valueOf());
  };

  return (
    <>
      <Tile colour="yellow" height={93} className="">
        <div className=" inset-0 h-full w-full flex flex-col items-center">
          <div className="w-[95%] h-[90%] flex flex-col items-center justify-center">
            <p className="bg-white text-black text-bold px-10 text-4xl font-mono font-bold m-4 rounded-md">
              {board?.name}
            </p>
            <MemberBar members={members} />
            <div className="bg-white p-2 md:p-6 rounded-md shadow-md w-full h-full overflow-auto">
              <TaskBoard board={board} onEditCardSelect={onEditCardClick} />
            </div>
          </div>
        </div>
        <EditCardModal
          card={currentEditCard}
          isVisible={editModalVisibility}
          toggleIsVisible={toggleEditModalVisibility}
        />
      </Tile>
    </>
  );
};

export const Board: React.FC = () => {
  return (
    <ComponentContainer>
      <InnerBoard />
    </ComponentContainer>
  );
};
