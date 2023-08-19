import { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { TaskColumn } from './TaskColumn';

interface IBoardProp {
  columns: IColumn[];
  onEditCardSelect: (card: ICard) => void;
}

export function TaskBoard({ columns, onEditCardSelect }: IBoardProp) {
  const [myColumns, setMyColumns] = useState(columns);
  const columnElements = myColumns.map((col) => (
    <TaskColumn column={col} onEditCardClick={onEditCardSelect} />
  ));

  // Handles moving cards
  function onDragEnd(result: DropResult) {
    // console.log('drag ended ', result);
    const columnSource: IColumn | undefined = columns?.find(
      (c) => c.id == result?.source?.droppableId,
    );
    const columnDestination: IColumn | undefined = columns?.find(
      (c) => c.id == result?.destination?.droppableId,
    );
    const cardToMove: ICard | undefined = columnSource?.cards?.find(
      (c) => c.id == result?.draggableId,
    );
    if (cardToMove && columnSource && columnDestination) {
      cardToMove.list_id = result?.destination?.droppableId;
      // If moving cards in the same column
      if (result?.destination?.index == null) {
        return;
      }
      if (result?.source?.droppableId == result?.destination?.droppableId) {
        columnSource?.cards?.splice(result?.source?.index, 1);
        columnDestination?.cards?.splice(
          result?.destination?.index,
          0,
          cardToMove,
        );
      } else {
        // else moving cards between columns
        columnDestination?.cards?.splice(
          result.destination.index,
          0,
          cardToMove,
        );
        columnSource?.cards?.splice(result.source.index, 1);
      }
      const newColumn = [...columns];
      setMyColumns(newColumn);
    }
  }

  return (
    <>
      <div className="bg-gray-600 p-2 h-full overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="h-full flex flex-row">{columnElements}</div>
        </DragDropContext>
      </div>
    </>
  );
}
