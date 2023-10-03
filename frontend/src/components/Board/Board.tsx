import Tile from '@/components/common/Tile';
import { MemberBar } from './BoardComponents/MemberBar';
import { TaskBoard } from './BoardComponents/TaskBoard';
import ComponentContainer from '../common/ComponentContainer';
import useBoard from '@/hooks/useBoard';
import { useParams } from 'react-router-dom';
import { Button, LinearProgress } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import HandleSave from './BoardComponents/SaveManager';
import BoardHistory from './BoardComponents/BoardHistory';
import { useEffect, useState } from 'react';
import { SaveVersion } from './BoardComponents/VersionSaveManager';

const InnerBoard: React.FC = () => {
  // Example Board
  // http://localhost:5173/Board/40fd3751-f04a-41ab-9772-0b70b7024c5b
  const { board_id } = useParams() as { board_id: string };
  const { data, isLoading, isError, refetch, isRefetching } =
    useBoard(board_id);
  const [board, setBoard] = useState<Board>();
  const [boards, setBoards] = useState<any>();
  const [boardData, setBoardData] = useState<BoardData | null>(null);
  const [refreshHistory, setRefreshHistory] = useState(false);
  const [refreshCards, setRefreshCards] = useState(false);
  // const [currentEditCard, setCurrentEditCard] = useState<ICard>();
  // const [editModalVisibility, setEditModalVisibility] = useState(false);
  useEffect(() => {
    // console.log({ data })
    setBoard((data || []).slice(-1)[0]);
    setBoards(data);
    setRefreshHistory(true);
  }, [data]);

  const refetchBoards = (newBoard: Board) => {
    console.log('REFETCHING');
    refetch().then(() => {
      setBoard(newBoard);
    });
  };

  const changeBoard = (version: number) => {
    const newBoard = data?.find((board) => board.version == version);
    // console.log('Board changed to: ', newBoard);
    setRefreshCards(true);
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
            <div className="w-full flex flex-col md:flex-row items-center justify-center">
              <div className="w-full lg:w-1/3" />
              <div className="w-full lg:w-1/3 m-2 flex flex-col items-center justify-center">
                <p className="text-black text-bold text-4xl font-mono font-bold bg-white m-1 rounded-md px-10">
                  {board?.name}
                </p>
                <p className="text-black text-bold text-sm font-mono text-center">
                  V.{board?.version}
                </p>
              </div>

              <div className="w-full lg:w-1/3 flex items-center justify-center lg:justify-end">
                <div className="mr-2">
                  {boardData && <HandleSave {...{ boardData, board }} />}
                </div>
                <div className="mr-2">
                  {boardData && (
                    <SaveVersion {...{ boardData, board, refetchBoards }} />
                  )}
                </div>

                <BoardHistory
                  boards={boards}
                  board={board}
                  changeBoard={changeBoard}
                  refreshHistory={refreshHistory}
                  setRefreshHistory={setRefreshHistory}
                ></BoardHistory>
              </div>
            </div>

            <MemberBar />
            <div className="bg-white p-2 md:p-6 rounded-md shadow-md w-full h-full overflow-auto">
              <TaskBoard
                {...{ board, setBoardData, refreshCards, setRefreshCards }}
              />
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
