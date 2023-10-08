import dayjs from 'dayjs';
import React from 'react';

interface IFutureProp {
  isFuture: boolean;
  board: Board;
  presentBoardData: BoardData | undefined;
  setRefreshCards: React.Dispatch<React.SetStateAction<boolean>>;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

export default function BoardFuture({
  isFuture,
  board,
  presentBoardData,
  setRefreshCards,
  setCards,
}: IFutureProp) {
  const [futureCards, setFutureCards] = React.useState<Card[]>([]);
  const [reverseCards, setReverseCards] = React.useState<Card[]>([]); // Allows us to reverse the future cards
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  React.useEffect(() => {
    if (!isFuture) {
      setCards((prevCards) => {
        if (presentBoardData?.cards) {
          console.log('WELP');
          setCurrentIndex(0);
          setReverseCards([]);
          return presentBoardData?.cards;
        }
        return prevCards;
      });
    }
  }, [isFuture]);
  React.useEffect(() => {
    const finalColumn =
      presentBoardData?.columns[presentBoardData?.columns.length - 1];
    // cards with deadlines and is not already in the final column
    const cardsWithDeadlines = presentBoardData?.cards.filter((card) => {
      return card.deadline && card.list_id != finalColumn.id;
    });
    // Create list of ghost cards to show
    let tempFutureCards: Card[] = [];
    const boardTime = new Date(board?.saved_date).getTime();
    cardsWithDeadlines?.forEach((card) => {
      const deadlineTime = new Date(card?.deadline).getTime();
      const cardColumn = presentBoardData?.columns?.find((column) => {
        return column.id == card.list_id;
      });
      const columnsTilEnd = finalColumn.index - cardColumn.index;
      if (deadlineTime > boardTime) {
        const tick = deadlineTime - boardTime / columnsTilEnd;
        for (let i = 1; i <= columnsTilEnd; i++) {
          tempFutureCards.push({
            ...card,
            isGhost: true,
            index: -1,
            sort_date: boardTime + tick * i,
            list_id: presentBoardData?.columns.find(
              (column) => column.index == cardColumn.index + i,
            )?.id,
          });
        }
      } else {
        tempFutureCards.push({
          ...card,
          isGhost: true,
          index: -1,
          sort_date: boardTime,
          list_id: finalColumn.id,
        });
      }
    });
    tempFutureCards = tempFutureCards.sort((a, b) =>
      a.sort_date > b.sort_date ? 1 : -1,
    );
    setFutureCards([...tempFutureCards]);
    console.log({
      presentBoardData,
      cardsWithDeadlines,
      board,
      futureCards,
      tempFutureCards,
    });
  }, [presentBoardData]);

  const nextDate = () => {
    console.log('NEXT DATE');
    setCurrentIndex((index) => {
      return index + 1;
    });
    const ghostCardToAdd = futureCards[currentIndex];
    setCards((prevCards) => {
      const cardToRemove = prevCards.find((card) => {
        return card.id == ghostCardToAdd.id;
      });
      setReverseCards((prev) => {
        return [...prev, { ...cardToRemove }];
      });
      const filteredCards = prevCards.filter((card) => {
        return card.id != ghostCardToAdd.id;
      });
      return [
        ...filteredCards,
        {
          ...ghostCardToAdd,
        },
      ];
    });
  };

  const prevDate = () => {
    console.log('PREV DATE');
    console.log({ reverseCards, currentIndex });
    const reverseCardToAdd = reverseCards[currentIndex - 1];
    setCards((prevCards) => {
      setReverseCards((prev) => {
        prev.pop();
        return [...prev];
      });
      const filteredCards = prevCards.filter((card) => {
        return card.id != reverseCardToAdd.id;
      });
      return [
        ...filteredCards,
        {
          ...reverseCardToAdd,
        },
      ];
    });
    setCurrentIndex((index) => {
      return index - 1;
    });
  };

  return (
    <>
      {isFuture && (
        <div className="flex flex-row items-center gap-4">
          <button
            className="font-bold outline outline-1 outline-black rounded-md p-1 bg-gray-700 disabled:opacity-50 text-white"
            onClick={prevDate}
            disabled={currentIndex == 0}
          >
            {'<'}
          </button>
          <p className="min-w-[150px] text-center">
            {currentIndex - 1 == -1
              ? 'Present'
              : dayjs(
                  new Date(futureCards[currentIndex - 1]?.sort_date),
                ).format('DD/MM/YY h:ss A')}
          </p>
          <button
            className="font-bold outline outline-1 outline-black rounded-md p-1 bg-gray-700 disabled:opacity-50 text-white"
            onClick={nextDate}
            disabled={currentIndex == futureCards.length}
          >
            {'>'}
          </button>
        </div>
      )}
    </>
  );
}
