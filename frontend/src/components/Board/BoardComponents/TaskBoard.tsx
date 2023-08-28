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
  // const [column_cards, column_setCards] = useState<Card[]>([]);
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
    // console.log("RETRIEVING COLUMN CARDS!!!")
    // console.log(columns)
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
            .sort((card) => {
              return card.index;
            })}
          onEditCardClick={onEditCardSelect}
        />
      )),
    );
    // console.log({ cards, columns})
  }, [columns, cards]);

  // const addColumnCards = (cardsToAdd: Card[] | null | undefined) => {
  //   // console.log({ cards });
  //   if (!cardsToAdd) {
  //     return
  //   }
  //   setCards((arr) => arr?.concat(cardsToAdd));
  //   // console.log({ cards });
  // }

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
    console.log('drag ended ', result);
    if (!result?.destination?.droppableId || !result.draggableId) {
      return;
    }
    const newCards = cards.map((c) => {
      let res: Card;
      // if (c.id == result?.draggableId) { // if the card is the dragged card
      //   res = { ...c, list_id: result?.destination?.droppableId, index: result?.destination?.index };
      // }
      // // TODO: Correct Indices when dragging around cards.
      // else if (result?.source?.droppableId != result?.destination?.droppableId && c.list_id == result?.destination?.droppableId && result?.destination && c.index >= result?.destination?.index) {  // If the card is in the same list as the dragged card and greater or equal in index
      //   res = { ...c, index: c.index + 1 };
      // }
      // else if (result?.source?.droppableId != result?.destination?.droppableId && c.list_id == result?.source?.droppableId && c.index >= result?.source?.index) {
      //   res = { ...c, index: c.index - 1 };
      // }
      // // else if (result?.source?.droppableId == result?.destination?.droppableId && c.) {
      // //   res = { ...c, index: c.index };
      // // }
      // else {
      //   res = c;
      // }

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
        } else {
          res = c;
        }
      }
      // If moving cards in within the same list
      else {
        // If card is the card being dragged
        if (c.id == result?.draggableId) {
          res = {
            ...c,
            list_id: result?.destination?.droppableId,
            index: result?.destination?.index,
          };
        } else if (
          result?.source?.index > result?.destination?.index &&
          c.index > result?.source?.index &&
          c.index < result?.destination?.index
        ) {
          res = { ...c, index: c.index + 1 };
        } else if (
          result?.source.index < result?.destination?.index &&
          c.index < result?.source?.index &&
          c.index > result?.destination?.index
        ) {
          res = { ...c, index: c.index - 1 };
        } else {
          res = c;
        }
      }

      return res;
    });
    console.log({ newCards });
    setCards(newCards);
    // const cardSource: Card = cards.find((c) => { return c.id == result?.draggableId });
    // const columnSource: IColumn | undefined = columns?.find(
    //   (c) => c.id == result?.source?.droppableId,
    // );
    // const columnDestination: IColumn | undefined = columns?.find(
    //   (c) => c.id == result?.destination?.droppableId,
    // );
    // const cardToMove: ICard | undefined = columnSource?.cards?.find(
    //   (c) => c.id == result?.draggableId,
    // );
    // if (cardToMove && columnSource && columnDestination) {
    //   cardToMove.list_id = result?.destination?.droppableId;
    //   // If moving cards in the same column
    //   if (result?.destination?.index == null) {
    //     return;
    //   }
    //   if (result?.source?.droppableId == result?.destination?.droppableId) {
    //     columnSource?.cards?.splice(result?.source?.index, 1);
    //     columnDestination?.cards?.splice(
    //       result?.destination?.index,
    //       0,
    //       cardToMove,
    //     );
    //   } else {
    //     // else moving cards between columns
    //     columnDestination?.cards?.splice(
    //       result.destination.index,
    //       0,
    //       cardToMove,
    //     );
    //     columnSource?.cards?.splice(result.source.index, 1);
    //   }
    // }
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
