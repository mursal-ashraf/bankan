import { RefreshAlert } from '@/components/common/Utils';
import { useTypedSupabaseMutation } from '@/hooks/utils';
import { getISODate } from '@/utils/common-utils';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Board } from 'schema';

interface HandleSaveProps {
  boardData: BoardData;
  board: Board;
}

const HandleSave = ({
  boardData: { cards, columns },
  board,
}: HandleSaveProps) => {
  const [isDirty, setIsDirty] = useState(false);

  const { mutate, isLoading, isError, isSuccess } = useTypedSupabaseMutation();

  const updateCardsAndColumns = () => {
    mutate((supabase) =>
      supabase.from('card').upsert(
        cards.map((c) => ({
          ...c,
          created_at: getISODate(c.created_at),
          deadline: getISODate(c.deadline),
        })),
        { onConflict: 'id', ignoreDuplicates: false },
      ),
    );

    mutate((supabase) =>
      supabase.from('list').upsert(
        columns.map((c) => ({
          ...c,
          created_at: getISODate(c.created_at),
          board_id: board.id,
        })),
        { onConflict: 'id', ignoreDuplicates: false },
      ),
    );
  };

  useEffect(() => {
    if (isSuccess) {
      setIsDirty(false);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    console.log('Dirty data present');
    setIsDirty(true);
  }, [cards, columns]);

  return (
    <>
      {isDirty && <RefreshAlert />}
      <Button variant="contained" onClick={updateCardsAndColumns}>
        Save Changes
      </Button>
    </>
  );
};

export default HandleSave;
