import { useClient } from '@/contexts/AppContext';
import { uuidv4 } from '@/utils/common-utils';
import { CircularProgress } from '@mui/material';
import { Save } from '@mui/icons-material';
import { Board } from 'schema-v2';
import { useEffect, useState } from 'react';

interface VersionSaveProps {
  boardData: BoardData;
  board: Board;
  refetchBoards: (newBoard: Board) => void;
}

export function SaveVersion({
  boardData: { cards, columns },
  board,
  refetchBoards,
}: VersionSaveProps) {
  const supabase = useClient();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);
  const [newBoard, setNewBoard] = useState<Board | undefined>(undefined);

  async function createColumns(newColumns: Column[]) {
    const { data } = await supabase.from('list').insert(newColumns).select();
    return data;
  }

  async function createCards(newCards: Card[]) {
    const { data } = await supabase.from('card').insert(newCards).select();
    return data;
  }

  useEffect(() => {
    console.log({ board });
  });

  useEffect(() => {
    if (loadingCount >= 3) {
      setIsLoading(false);
      if (newBoard) {
        refetchBoards(newBoard);
      }
      setLoadingCount(0);
    }
  }, [loadingCount, refetchBoards, newBoard]);

  async function updateCardsAndColumns() {
    // Insert / Update the new/changed cards & columns
    // const newVersionNumber = maxVersion + 1;
    setLoadingCount(0);
    setIsLoading(true);
    const { data } = await supabase
      .from('board')
      .insert([
        {
          id: board?.id,
          version: board?.version + 1,
          description: board?.description,
          name: board?.name,
          team_id: board?.team_id,
          user_id: board?.user_id,
        },
      ])
      .select()
      .then((res) => {
        setNewBoard((prev) => {
          if (res?.data && res?.data[0]) {
            return res?.data[0];
          } else {
            return prev;
          }
        });
        setLoadingCount((prev) => {
          return prev + 1;
        });
        return res;
      });

    const newBoard = data ? data[0] : undefined;
    const newColumns: Column[] = [];
    const newCards: Card[] = [];

    // Create new UUID for each column and add associated cards
    columns.forEach((column) => {
      const newUUID = uuidv4();
      newColumns.push({
        ...column,
        id: newUUID,
        board_version: newBoard?.version,
      });
      // For each card belonging to the column
      cards
        .filter((card) => card.list_id == column.id)
        .forEach((card) => {
          newCards.push({
            created_at: card?.created_at,
            deadline: card?.deadline || null,
            description: card?.description,
            index: card?.index,
            list_id: newUUID,
            title: card?.title,
            user_assigned: card?.user_assigned,
            user_creator: card?.user_creator,
          });
        });
    });

    const updatedColumns = createColumns(newColumns).then((res) => {
      setLoadingCount((prev) => {
        return prev + 1;
      });
      const updatedCards = createCards(newCards).then((res) => {
        setLoadingCount((prev) => {
          return prev + 1;
        });
        return res;
      });
      return res;
    });
  }

  return (
    <>
      <button
        className={`p-2 rounded-xl bg-green-600 hover:bg-green-700 min-h-[40px] border border-black ${
          isLoading ? 'pointer-events-none' : ''
        }`}
        onClick={updateCardsAndColumns}
      >
        <div className="w-full flex items-center gap-2">
          {isLoading ? (
            <CircularProgress size="1rem" color="inherit" />
          ) : (
            <Save />
          )}
          {/* <p className="font-semibold text-white text-sm">SAVE VERSION</p> */}
        </div>
      </button>
    </>
  );
}
