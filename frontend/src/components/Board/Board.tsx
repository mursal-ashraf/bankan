import { useState } from 'react';
import { Tile } from '@/common/ContentTile';
import { MemberBar } from './BoardComponents/MemberBar';
import { TaskBoard } from './BoardComponents/TaskBoard';
import EditCardModal from './BoardComponents/EditCardModal';
import dayjs from 'dayjs';

// Mock data
const board = {
  id: '123456789',
  version: 1,
  saved_date: new Date().toDateString(),
  created_at: new Date().toDateString(),
  user_id: '1111',
  team_id: '2222',
  name: 'FIT3162 Board',
  description:
    'This board is used to monitor the progress of the FIT3162 CS_20 Project.',
};

// list table
const columns: IColumn[] = [
  {
    id: '1',
    board_id: '123456789',
    board_version: 1,
    index: 1,
    name: 'Backlog',
    created_at: new Date().toDateString(),
    cards: [
      {
        id: '1',
        list_id: '1',
        index: 1,
        user_creator: '1',
        user_assigned: undefined,
        title: 'Design the UI!',
        description:
          'Create a figma design of the initial UI to demo to the clients.',
        deadline: dayjs('2023-04-20 1:30 PM').format('DD-MM-YYYY HH:mm A'),
        created_at: new Date().toDateString(),
      },
    ],
  },
  {
    id: '2',
    board_id: '123456789',
    board_version: 1,
    index: 2,
    name: 'Doing',
    cards: [
      {
        id: '2',
        list_id: '2',
        index: 1,
        user_creator: '1',
        user_assigned: '1',
        title: 'Get to know the team!',
        description: 'Do ice breaker activities to understand the team better.',
        deadline: dayjs('2023-05-31 10:45 AM').format('DD-MM-YYYY HH:mm A'),
        created_at: new Date().toDateString(),
      },
    ],
    created_at: new Date().toDateString(),
  },
  {
    id: '3',
    board_id: '123456789',
    board_version: 1,
    index: 3,
    name: 'Code Review',
    cards: [],
    created_at: new Date().toDateString(),
  },
  {
    id: '4',
    board_id: '123456789',
    board_version: 1,
    index: 4,
    name: 'Testing',
    cards: [],
    created_at: new Date().toDateString(),
  },
  {
    id: '5',
    board_id: '123456789',
    board_version: 1,
    index: 5,
    name: 'Done',
    cards: [
      {
        id: '3',
        list_id: '5',
        index: 1,
        user_creator: '1',
        user_assigned: '1',
        title: 'Watch Seminar Recordings',
        description:
          'Watch the Seminar recordings before meeting with the team.',
        deadline: dayjs().format('DD-MM-YYYY HH:mm A'),
        created_at: new Date().toDateString(),
      },
    ],
    created_at: new Date().toDateString(),
  },
];

// const cards = [
//   {
//     id: "1",
//     list_id: "1",
//     index: 1,
//     user_creator: "1",
//     user_assigned: undefined,
//     title: "Design the UI!",
//     description:
//       "Create a figma design of the initial UI to demo to the clients.",
//     deadline: undefined,
//     created_at: new Date().toDateString(),
//   },
//   {
//     id: "2",
//     list_id: "2",
//     index: 2,
//     user_creator: "1",
//     user_assigned: "1",
//     title: "Get to know the team!",
//     description: "Do ice breaker activities to understand the team better.",
//     deadline: new Date().toDateString(),
//     created_at: new Date().toDateString(),
//   },
// ];

const team = {
  id: '123123',
  board_id: '123456789',
  user_id: '1',
  created_at: new Date().getDate(),
};

// user_team table
const members = [
  {
    id: '1',
    username: 'kevinbuilderman',
    given_name: 'Kevin',
    surname: 'L',
    email: 'kev@example.com',
    phone: '123123123',
  },
  {
    id: '2',
    username: 'mursalcoolkid',
    given_name: 'Mursal',
    surname: 'A',
    email: 'mursal@example.com',
    phone: '123123123',
  },
];

export const Board: React.FC = () => {
  const [currentEditCard, setCurrentEditCard] = useState<ICard>();
  const [editModalVisibility, setEditModalVisibility] = useState(false);

  const onEditCardClick = (card: ICard) => {
    setCurrentEditCard(card);
    toggleEditModalVisibility();
  };

  const toggleEditModalVisibility = () => {
    setEditModalVisibility(!editModalVisibility.valueOf());
  };

  return (
    <>
      <Tile colour="yellow" height={93} className="">
        <div className=" inset-0 h-full w-full flex flex-col items-center">
          <div className="w-[95%] h-[90%] flex flex-col items-center justify-center">
            <p className="bg-white text-black text-bold px-10 text-4xl font-mono font-bold m-4 rounded-md">
              {board.name}
            </p>
            <MemberBar members={members} />
            <div className="bg-white p-2 md:p-6 rounded-md shadow-md w-full h-full overflow-auto">
              <TaskBoard columns={columns} onEditCardSelect={onEditCardClick} />
            </div>
          </div>
        </div>
        <EditCardModal
          card={currentEditCard}
          isVisible={editModalVisibility}
          toggleIsVisible={toggleEditModalVisibility}
        />
      </Tile>
    </>
  );
};
