import { DarkModeContext } from '@/components/common/navbar/DarkModeContext';
import HistoryIcon from '@mui/icons-material/History';
import { Drawer, Slider } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import BoardFuture from './BoardFuture';

type IMarks = {
  value: number;
  label: string;
  name: string;
};

interface IHistoryProp {
  boards: Board[] | undefined | null;
  board: Board;
  refreshHistory: boolean;
  setRefreshHistory: React.Dispatch<React.SetStateAction<boolean>>;
  changeBoard: (version: number) => void;
  boardData: BoardData | null;
  setRefreshCards: React.Dispatch<React.SetStateAction<boolean>>;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

export default function BoardHistory({
  boards,
  board,
  changeBoard,
  refreshHistory,
  setRefreshHistory,
  boardData,
  setRefreshCards,
  setCards,
}: IHistoryProp) {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [boardVersions, setBoardVersions] = React.useState<
    IMarks[] | undefined
  >(undefined);
  const [presentBoardData, setPresentBoardData] = React.useState<
    BoardData | undefined
  >();
  const [isFuture, setIsFuture] = React.useState<boolean>(false);
  const [maxVersion, setMaxVersion] = React.useState(0);
  const [slider, setSlider] = React.useState<JSX.Element>();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setIsDrawerOpen(open);
    };

  const closeButtonClicked = () => {
    // toggleDrawer(false);
    setIsDrawerOpen(false);
    if (boards) {
      changeBoard(boards[boards?.length - 1].version);
    }
    setIsFuture(false);
  };

  useEffect(() => {
    // not a valid Board Data, then return
    const validBoardData =
      boardData &&
      boardData?.columns?.length > 0 &&
      boardData?.cards?.length > 0;
    if (!validBoardData) {
      return;
    }
    // present board data not be set and not refreshing, then return
    if (presentBoardData != undefined && !refreshHistory) {
      return;
    }

    setPresentBoardData(boardData);

    if (!boards || (boardVersions != undefined && !refreshHistory)) {
      return;
    }

    // Calculate the board versions to display on the board history bar
    // History Board versions
    const newMaxVersion = boards ? boards[boards.length - 1]?.version : 0;
    const newBoardVersion =
      boards?.map((board, index) => {
        return {
          value: index + 1,
          label:
            index === boards?.length - 1 ? 'Present' : (index + 1).toString(), //'', //(index === boards?.length - 1) ? "Present" : board?.version?.toString(),
          name:
            index === boards?.length - 1
              ? 'Present'
              : board?.saved_date
              ? dayjs(new Date(board?.saved_date)).format('DD-MM-YY h:mm A')
              : 'N/A',
        };
      }) || [];

    // Future Board versions
    // const final_column = boardData?.columns[boardData?.columns.length - 1];
    // const cardsWithDeadlines = boardData?.cards.filter((card) => {
    //   return card.deadline && card.list_id != final_column.id
    // })
    // setCards((prev) => {
    //   return [...prev, { ...cardsWithDeadlines[0], id: uuidv4(), isGhost: true }]
    // })
    // console.log({ cardsWithDeadlines, boardData })
    newBoardVersion.push({
      value: boards.length + 1,
      label: 'Future',
      name: 'Future',
    });

    // console.log({ newBoardVersion })
    setRefreshHistory(false);
    setBoardVersions([...newBoardVersion]);
    setMaxVersion(newMaxVersion);
  }, [
    boards,
    refreshHistory,
    boardData,
    boardVersions,
    maxVersion,
    setRefreshHistory,
  ]);

  useEffect(() => {
    function valueLabelFormat(value: number) {
      return boardVersions
        ? boardVersions?.find((board) => board?.value == value)?.name
        : 'N/A';
    }

    const handleChange = (_event: Event, newValue: number | number[]) => {
      if (!boards) {
        return;
      }
      if (typeof newValue == 'number') {
        // If changed to a past version
        if (newValue <= boards?.length) {
          changeBoard(boards[newValue - 1]?.version);

          setIsFuture(false);
        } else {
          // If changed to a future version
          changeBoard(boards[boards.length - 1]?.version);
          setIsFuture(true);
          // setCards()
        }
      } else {
        // if invalid version
        changeBoard(boards[0]?.version);
        setIsFuture(false);
      }
    };

    if (boardVersions) {
      setSlider(
        <Slider
          aria-label="Restricted values"
          defaultValue={boards ? boards?.length : 0}
          min={1}
          max={boardVersions.length} //{boards ? (minVersion - boards[boards?.length - 1]?.version) : 0}
          valueLabelFormat={valueLabelFormat}
          step={null}
          valueLabelDisplay="auto"
          marks={boardVersions}
          onChange={handleChange}
        />,
      );
    }
  }, [boardVersions, changeBoard]);
  const darkModeContext = React.useContext(DarkModeContext);
  if (!darkModeContext)
    throw new Error('Profile must be used within a DarkModeProvider');

  const { darkMode } = darkModeContext;
  return (
    <>
      <React.Fragment key={'top'}>
        <button
          className="rounded-md p-2 bg-transparent border border-black hover:bg-yellow-500"
          onClick={toggleDrawer(true)}
        >
          <div className="flex gap-2">
            <HistoryIcon style={{ color: darkMode ? 'white' : 'black' }} />
            <p
              className="italic font-bold whitespace-nowrap"
              style={{ color: darkMode ? 'white' : 'black' }}
            >
              Board History
            </p>
          </div>
        </button>
        <Drawer
          anchor={'top'}
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
          hideBackdrop
        >
          <div className="w-full p-2 flex flex-col items-center justify-center">
            <p className="font-bold text-xl">History Tracking</p>
            <p className="italic text-md">
              Please save before checking history, or you will lose your
              changes.
            </p>
            <div className="w-[80%] pt-6">{slider}</div>
            <BoardFuture
              {...{
                isFuture,
                board,
                presentBoardData,
                setRefreshCards,
                setCards,
              }}
            />
          </div>
          <div className="w-full flex items-center justify-center px-4">
            <div className="w-1/3 items-center justify-center" />
            <div className="w-1/3 items-center justify-center">
              <p className="text-black text-bold text-3xl my-2 font-mono font-bold text-center">
                {board?.name}
              </p>
            </div>
            <div className="w-1/3 flex items-center justify-end">
              <button
                className="rounded-md p-2 px-4 border border-black bg-gray-600 hover:bg-gray-700 text-white font-bold"
                onClick={closeButtonClicked}
              >
                Close
              </button>
            </div>
          </div>
        </Drawer>
      </React.Fragment>
    </>
  );
}
