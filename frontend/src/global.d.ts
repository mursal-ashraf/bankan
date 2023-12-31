type GeneralColour = 'yellow' | 'blue' | 'white' | 'orange';

interface TextAndAction {
  text: string;
  action: () => void;
}

// Database Types
interface Member {
  id: string;
  username: string;
  given_name: string;
  surname: string;
  email: string;
  phone: string;
}

// Board Types
type Column = Database['public']['Tables']['list']['Row'];
type Card = Database['public']['Tables']['card']['Row'];
type Board = Database['public']['Tables']['board']['Row'];

interface IColumn {
  id: string;
  board_id: string;
  board_version: number;
  index: number;
  name: string;
  cards: ICard[];
  created_at: string;
}

interface boardDetails {
  name: string;
  description: string;
}

interface fetchReturn<Data> {
  data: Data;
  error: any;
  refetch: () => void;
  isLoading: boolean;
}

interface BoardData {
  cards: Card[];
  columns: Column[];
}
