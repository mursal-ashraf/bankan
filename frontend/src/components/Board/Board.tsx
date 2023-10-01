import Tile from '@/components/common/Tile';
import { MemberBar } from './BoardComponents/MemberBar';
import { TaskBoard } from './BoardComponents/TaskBoard';
import ComponentContainer from '../common/ComponentContainer';
import useBoard from '@/hooks/useBoard';
import { useParams } from 'react-router-dom';
import { Button, LinearProgress } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import BoardHistory from './BoardComponents/BoardHistory';
import { useEffect, useState } from 'react';

const InnerBoard: React.FC = () => {
  // Example Board
  // http://localhost:5173/Board/40fd3751-f04a-41ab-9772-0b70b7024c5b
  const { board_id } = useParams() as { board_id: string };
  const { data, isLoading, isError, refetch, isRefetching } =
    useBoard(board_id);
  const [board, setBoard] = useState<Board>();

  useEffect(() => {
    // console.log({ data })
    setBoard((data || []).slice(-1)[0]);
  }, [data]);

  const changeBoard = (version: number) => {
    const newBoard = data?.find((board) => board.version == version);
    console.log('Board changed to: ', newBoard);
    setBoard(newBoard);
  };

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
            <div className="w-full flex items-center justify-center relative">
              <p className="bg-white text-black text-bold px-10 text-4xl font-mono font-bold m-2 rounded-md">
                {board?.name}
              </p>
              <div className="absolute right-0">
                <BoardHistory
                  boards={data}
                  changeBoard={changeBoard}
                ></BoardHistory>
              </div>
            </div>

            <MemberBar />
            <div className="bg-white p-2 md:p-6 rounded-md shadow-md w-full h-full overflow-auto">
              <TaskBoard board={board} />
            </div>
          </div>
        </div>
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
