import {
  Draggable,
  Droppable,
} from '@hello-pangea/dnd';
import { TaskCard } from './TaskCard';

export function TaskColumn({ column }: IColumnProp) {
  const items = column.cards
    .filter((i: ICard) => i.list_id == column.id)
    .sort((c) => c.index);
  // console.log("Column: ", {column}, {items})
  return (
    <>
      <div className="flex flex-col h-min-full w-full min-w-[200px] mx-2 px-2 bg-gray-500 rounded-md pt-2">
        <div className="w-full bg-gray-100 text-black font-bold text-xl rounded-md text-center border-2 border-gray-700">
          {column.name}
        </div>
        <div className="w-full h-full overflow-y-auto">
          <Droppable droppableId={column.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="min-h-[95%]"
              >
                {items.map((item: ICard, index: number) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard item={item} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </>
  );
};