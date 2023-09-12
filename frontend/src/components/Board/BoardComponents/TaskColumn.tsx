import { Draggable, Droppable } from '@hello-pangea/dnd';
import { TaskCard } from './TaskCard';
import { useClient } from '@/contexts/AppContext';
import { useEffect, useState } from 'react';

interface IColumnProp {
  column: Column;
  cards: Card[] | undefined;
  onEditCardClick: (card: Card) => void;
}

export function TaskColumn({ column, cards, onEditCardClick }: IColumnProp) {
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
      </div>
    </>
  );
}
