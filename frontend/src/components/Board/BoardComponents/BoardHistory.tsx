import HistoryIcon from '@mui/icons-material/History';
import { Button, Drawer, Slider } from '@mui/material';
import React, { useEffect } from 'react';

type IMarks = {
  value: number;
  label: string;
  name: string;
};

interface IHistoryProp {
  boards: Board[] | undefined | null;
  changeBoard: (version: number) => void;
}

export default function BoardHistory({ boards, changeBoard }: IHistoryProp) {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [boardVersions, setBoardVersions] = React.useState<
    IMarks[] | undefined
  >(undefined);
  const [maxVersion, setMaxVersion] = React.useState(0);
  const [minVersion, setMinVersion] = React.useState(0);
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
  useEffect(() => {
    // console.log({ boards });
    if (boards && boardVersions === undefined) {
      const newMaxVersion = boards ? boards[boards.length - 1]?.version : 0;
      const newMinVersion = boards ? boards[0]?.version : 0;
      const newBoardVersion =
        boards?.map((board, index) => {
          return {
            value: board?.version,
            label: '', //(newMinVersion - board?.version).toString(),//'', //(index === boards?.length - 1) ? "Present" : board?.version?.toString(),
            name:
              index === boards?.length - 1
                ? 'Present'
                : board?.version?.toString(),
          };
        }) || [];
      setBoardVersions([...newBoardVersion]);
      setMaxVersion(newMaxVersion);
      setMinVersion(newMinVersion);
      // console.log({ boardVersions, newBoardVersion, maxVersion });
    }
  }, [boards, boardVersions, maxVersion]);

  useEffect(() => {
    function valueLabelFormat(value: number) {
      return boardVersions
        ? boardVersions?.find((board) => board?.value == value)?.name
        : 'N/A';
    }

    const handleChange = (event: Event, newValue: number | number[]) => {
      if (typeof newValue == 'number') {
        changeBoard(newValue);
      } else {
        changeBoard(newValue[0]);
      }
    };

    // console.log({ boardVersions });
    if (boardVersions) {
      setSlider(
        <Slider
          aria-label="Restricted values"
          defaultValue={maxVersion}
          min={minVersion}
          max={maxVersion} //{boards ? (minVersion - boards[boards?.length - 1]?.version) : 0}
          valueLabelFormat={valueLabelFormat}
          step={null}
          valueLabelDisplay="auto"
          marks={boardVersions}
          onChange={handleChange}
        />,
      );
    }
  }, [boardVersions, maxVersion, minVersion]);

  return (
    <>
      <React.Fragment key={'top'}>
        <button
          className="rounded-md p-2 bg-transparent border border-black hover:bg-yellow-500"
          onClick={toggleDrawer(true)}
        >
          <div className="flex gap-2">
            <HistoryIcon></HistoryIcon>
            <p className="italic font-bold">Board History</p>
          </div>
        </button>
        <Drawer
          anchor={'top'}
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
        >
          <div className="w-full p-2 flex flex-col items-center justify-center">
            <p className="font-bold text-lg">History Tracking</p>
            <div className="w-[80%] pt-6">{slider}</div>
          </div>
        </Drawer>
      </React.Fragment>
    </>
  );
}
