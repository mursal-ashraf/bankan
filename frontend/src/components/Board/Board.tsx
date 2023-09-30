import Tile from '@/components/common/Tile';
import { MemberBar } from './BoardComponents/MemberBar';
import { TaskBoard } from './BoardComponents/TaskBoard';
import ComponentContainer from '../common/ComponentContainer';
import useBoard from '@/hooks/useBoard';
import { useParams } from 'react-router-dom';
import { Button, LinearProgress } from '@mui/material';
import { Refresh } from '@mui/icons-material';

const InnerBoard: React.FC = () => {
  // Example Board
  // http://localhost:5173/Board/02b5bfae-f543-42b6-aab0-51b39253a2e4
  const { board_id } = useParams() as { board_id: string };

  const { data, isLoading, isError, refetch, isRefetching } =
    useBoard(board_id);

  // const [currentEditCard, setCurrentEditCard] = useState<ICard>();
  // const [editModalVisibility, setEditModalVisibility] = useState(false);

  // const onEditCardClick = (card: ICard) => {
  //   setCurrentEditCard(card);
  //   toggleEditModalVisibility();
  // };

  // const toggleEditModalVisibility = () => {
  //   setEditModalVisibility(!editModalVisibility.valueOf());
  // };

  const [board] = (data || []).slice(-1) || [{}];

  return (
    <>
      {(isLoading || isRefetching) && <LinearProgress color="secondary" />}
      {isError && (
        <LinearProgress variant="determinate" color="error" value={100} />
      )}
      <Tile colour="yellow" height={93} className="">
        <div className=" inset-0 h-full w-full p-2 flex flex-col items-center">
          <div className="w-full flex flex-col items-center justify-center">
            {isError && (
              <Button
                variant="contained"
                color="error"
                onClick={() => refetch()}
              >
                Reload Board
                <Refresh className="lr-1" />
              </Button>
            )}
          </div>
          <div className="w-full h-full flex flex-col items-center justify-center">
            <p className="bg-white text-black text-bold px-10 text-4xl font-mono font-bold m-2 rounded-md">
              {board?.name}
            </p>

            <MemberBar />
            <div className="bg-white p-2 md:p-6 rounded-md shadow-md w-full h-full overflow-auto">
              <TaskBoard board={board} />
            </div>
          </div>
        </div>
        {/* <EditCardModal
          card={currentEditCard}
          isVisible={editModalVisibility}
          toggleIsVisible={toggleEditModalVisibility}
        /> */}
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
