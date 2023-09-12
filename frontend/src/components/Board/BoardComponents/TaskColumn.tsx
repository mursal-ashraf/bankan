import { Draggable, Droppable } from '@hello-pangea/dnd';
import { TaskCard } from './TaskCard';
import { Delete } from '@mui/icons-material';

interface IColumnProp {
  column: Column;
  cards: Card[] | undefined;
  onEditCardClick: (card: Card) => void;
  onAddCardClick: (col: Column) => void;
  onEditColumn: (newName: string, col: Column) => void;
  onDeleteColumn: (col: Column) => void;
}

export function TaskColumn({
  column,
  cards,
  onEditCardClick,
  onAddCardClick,
  onEditColumn,
  onDeleteColumn,
}: IColumnProp) {
  return (
    <>
      <div className="flex flex-col h-min-full w-full min-w-[200px] mx-2 px-2 bg-gray-500 rounded-md pt-2">
        <div className="w-full flex flex-row items-center px-2 bg-gray-100 text-black font-bold text-xl rounded-md text-center border-2 border-gray-700">
          <input
            className="bg-gray-100 w-full rounded-md mx-2"
            value={column.name}
            onChange={(e) => onEditColumn(e.target.value, column)}
          />
          <Delete
            style={{ width: 15, height: 15 }}
            className="cursor-pointer"
            color="error"
            onClick={() => {
              onDeleteColumn(column);
            }}
          />
        </div>

        <div className="w-full h-full overflow-y-auto">
          <Droppable droppableId={column.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="min-h-[95%]"
              >
                {cards?.map((item: Card) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={item.index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard
                          item={item}
                          onEditCardSelect={onEditCardClick}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <button
          onClick={() => onAddCardClick(column)}
          className="flex flex-col justify-center items-center bg-gray-600 rounded-md m-2 hover:bg-gray-700"
        >
          + Add Card
        </button>
      </div>
    </>
  );
}
