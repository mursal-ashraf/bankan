import { useEffect, useState } from 'react';
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

    getCards(columns).then((res) => {
      const card_list: Card[] | null = res;
      if (card_list) {
        setCards(card_list);
      }
    });
  }

  async function getCards(col: Column) {
    const { data } = await supabase
      .from('card')
      .select()
      .in(
        'list_id',
        col.map((col: Column) => col.id),
      )
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
              return card.list_id === col.id;
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
    const isDragInvalid =
      !result?.destination?.droppableId || !result.draggableId;
    if (isDragInvalid) {
      return;
    }
    const newCards = cards.map((c) => {
      let res: Card = undefined;
      const isDragInDifferentList =
        result?.source?.droppableId != result?.destination?.droppableId;
      const isDragInSameList =
        result?.source?.droppableId == result?.destination?.droppableId &&
        c.list_id == result?.destination?.droppableId;
      const isDragCard = c.id == result?.draggableId;
      const isCardAboveDragCardInDestinationList =
        c.list_id == result?.destination?.droppableId &&
        result?.destination &&
        c.index >= result?.destination?.index;
      const isCardAboveDragCardInSourceList =
        c.list_id == result?.source?.droppableId &&
        c.index >= result?.source?.index;
      const isCardBelowDragCard =
        result?.destination &&
        result?.source?.index > result?.destination?.index &&
        c.index <= result?.source?.index &&
        c.index >= result?.destination?.index;
      const isCardAboveDragCard =
        result?.destination &&
        result?.source.index < result?.destination?.index &&
        c.index >= result?.source?.index &&
        c.index <= result?.destination?.index;

      // If moving between lists
      if (isDragInDifferentList) {
        if (isDragCard) {
          // If card is the card being dragged
          res = {
            ...c,
            list_id: result?.destination?.droppableId,
            index: result?.destination?.index,
          };
        } else if (isCardAboveDragCardInDestinationList) {
          // If card is in the destination list and index is larger than destination index
          res = { ...c, index: c.index + 1 };
        } else if (isCardAboveDragCardInSourceList) {
          // If card is in the source list and index is larger than source index
          res = { ...c, index: c.index - 1 };
        }
      }
      // If moving cards in within the same list
      else if (isDragInSameList) {
        if (isDragCard) {
          // If card is the card being dragged
          res = {
            ...c,
            list_id: result?.destination?.droppableId,
            index: result?.destination?.index,
          };
        } else if (isCardBelowDragCard) {
          // If card is moving up a list
          res = { ...c, index: c.index + 1 };
        } else if (isCardAboveDragCard) {
          // If card is moving down a list
          res = { ...c, index: c.index - 1 };
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
