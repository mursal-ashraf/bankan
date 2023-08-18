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
interface IColumn {
  id: string;
  board_id: string;
  board_version: number;
  index: number;
  name: string;
  cards: ICard[];
  created_at: string;
}

interface ICard {
  id: string;
  list_id: string | undefined;
  index: number;
  user_creator: string;
  user_assigned: string | undefined;
  title: string;
  description: string;
  deadline: string | undefined;
  created_at: string;
}
