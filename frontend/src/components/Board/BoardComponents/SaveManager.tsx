import { RefreshAlert } from '@/components/common/Utils';
import { useTypedSupabaseMutation } from '@/hooks/utils';
import {
  getISODate,
  getSQLStringifiedArr,
  stripField,
} from '@/utils/common-utils';
import { Button } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
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

  const card_ids = useMemo(
    () => getSQLStringifiedArr(cards.map((c) => c.id)),
    [cards],
  );
  const col_ids = useMemo(
    () => getSQLStringifiedArr(columns.map((c) => c.id)),
    [columns],
  );

  // console.log('ids', card_ids, col_ids);

  const updateCardsAndColumns = () => {
    // Insert / Update the new/changed cards & columns

    mutate((supabase) =>
      supabase.from('card').upsert(
        cards
          .map((c) => ({
            ...c,
            deadline: c.deadline ? getISODate(c.deadline) : null,
          }))
          .map((c: any) => stripField(c, 'created_at')), // what can we do with the dates here? Can suss my getISODate function.
        { onConflict: 'id', ignoreDuplicates: false },
      ),
    );

    mutate((supabase) =>
      supabase.from('list').upsert(
        columns
          .map((c) => ({
            ...c,
            board_id: board.id,
          }))
          .map((c: any) => stripField(c, 'created_at')), // what can we do with the dates here? Can suss my getISODate function.
        { onConflict: 'id', ignoreDuplicates: false },
      ),
    );

    // now delete any cards & columns we do not have any more

    mutate((supabase) =>
      supabase
        .from('card')
        .delete()
        .in(
          'list_id',
          columns.map((c) => c.id),
        )
        .not('id', 'in', card_ids),
    );

    mutate((supabase) =>
      supabase
        .from('list')
        .delete()
        .eq('board_id', board.id)
        .not('id', 'in', col_ids),
    );
  };

  useEffect(() => {
    if (isSuccess) {
      setIsDirty(false);
    }

    if (isError) {
      setIsDirty(true);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    // console.log('Dirty data present');
    setIsDirty(true);
  }, [cards, columns]);

  return (
    <>
      {isDirty && <RefreshAlert />}

      <Button
        variant="contained"
        onClick={updateCardsAndColumns}
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save Changes'}
      </Button>
    </>
  );
};

export default HandleSave;
