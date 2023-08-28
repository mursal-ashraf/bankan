import { useCallback, useEffect, useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { TaskColumn } from './TaskColumn';
import { useClient } from '@/contexts/AppContext';

interface IBoardProp {
  board: Board;
  onEditCardSelect: (card: ICard) => void;
}

export function TaskBoard({ board, onEditCardSelect }: IBoardProp) {
  const supabase = useClient();
  const [columns, setColumns] = useState<Column[] | undefined | null>();
  const [cards, setCards] = useState<Card[]>([]);
  // Get Columns
  useEffect(() => {
    getColumns();
  }, [board]);

  async function getColumns() {
    const { data } = await supabase
      .from('list')
      .select()
      .match({ board_id: board.id, board_version: board.version })
      .order('index', { ascending: true });
    setColumns(data);
  }
  // Get Cards of each Column
  useEffect(() => {
    getColumnCards();
  }, [columns]);

  function getColumnCards() {
    if (!columns) {
      return;
    }
    // setCards([]);
    let count = 0;
    const card_list: Card[] = [];
    columns?.forEach((col) => {
      // console.log(col.id)
      getCards(col).then((result) => {
        // console.log('result', result)
        result?.forEach((card) => {
          card_list.push(card);
        });
        count++;
        if (count == columns?.length) {
          setCards(card_list);
        }
      });
    });
  }

  async function getCards(col: Column) {
    const { data } = await supabase
      .from('card')
      .select()
      .match({ list_id: col.id })
      .order('index', { ascending: true });
    return data;
  }

  const [columnElements, setColumnElements] = useState<JSX.Element[]>();
  useEffect(() => {
    setColumnElements(
      columns?.map((col) => (
        <TaskColumn
          column={col}
          cards={cards
            ?.filter((card) => {
              return card.list_id == col.id;
            })
            .sort((card1, card2) => {
              return card1.index - card2.index;
            })}
          onEditCardClick={onEditCardSelect}
        />
      )),
    );
    // console.log({ cards, columns})
  }, [columns, cards]);

  if (!columns) {
    return (
      <>
        <div className="bg-gray-500 h-full flex flex-col justify-center items-center">
          No Columns Found
        </div>
      </>
    );
  }

  // Handles moving cards
  function onDragEnd(result: DropResult) {
    // console.log('drag ended ', result);
    if (!result?.destination?.droppableId || !result.draggableId) {
      return;
    }
    const newCards = cards.map((c) => {
      let res: Card = undefined;
      // If moving between lists
      if (result?.source?.droppableId != result?.destination?.droppableId) {
        // If card is the card being dragged
        if (c.id == result?.draggableId) {
          res = {
            ...c,
            list_id: result?.destination?.droppableId,
            index: result?.destination?.index,
          };
        }
        // If card is in the destination list and index is larger than desintation index
        else if (
          c.list_id == result?.destination?.droppableId &&
          result?.destination &&
          c.index >= result?.destination?.index
        ) {
          res = { ...c, index: c.index + 1 };
        }
        // If card is in the source list and index is larger than source index
        else if (
          c.list_id == result?.source?.droppableId &&
          c.index >= result?.source?.index
        ) {
          res = { ...c, index: c.index - 1 };
        }
      }
      // If moving cards in within the same list
      else if (
        result?.source?.droppableId == result?.destination?.droppableId &&
        c.list_id == result?.destination?.droppableId
      ) {
        // If card is the card being dragged
        if (c.id == result?.draggableId) {
          res = {
            ...c,
            list_id: result?.destination?.droppableId,
            index: result?.destination?.index,
          };
          // If card is moving up a list
        } else if (
          result?.source?.index > result?.destination?.index &&
          c.index <= result?.source?.index &&
          c.index >= result?.destination?.index
        ) {
          res = { ...c, index: c.index + 1 };
          // If card is moving down a list
        } else if (
          result?.source.index < result?.destination?.index &&
          c.index >= result?.source?.index &&
          c.index <= result?.destination?.index
        ) {
          res = { ...c, index: c.index - 1 };
          console.log(
            'WTF',
            result?.source?.droppableId == result?.destination?.droppableId,
          );
        }
      }
      if (!res) {
        res = c;
      }

      return res;
    });
    // console.log({ newCards });
    setCards(newCards);
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
