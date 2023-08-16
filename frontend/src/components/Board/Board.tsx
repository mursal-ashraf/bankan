import React, { useState } from 'react';
// import { AccountCircle } from "@mui/icons-material";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from '@hello-pangea/dnd';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { Tile } from '@/common/ContentTile';
import ComponentContainer from '../common/ComponentContainer';

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
        deadline: undefined,
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
        deadline: new Date().toDateString(),
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
        deadline: new Date().toDateString(),
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
    email: 'kev@example.com',
    phone: '123123123',
    raw_user_meta_data: {
      username: 'Kev',
      given_name: 'Kevin',
      surname: 'L',
    }, // currently how supabase by default wants to store user data
  },
  {
    id: '2',
    email: 'mursal@example.com',
    phone: '123123123',
    raw_user_meta_data: {
      username: 'Mursal',
      given_name: 'Mursal',
      surname: 'A',
    },
  },
];

function TaskCard(props: { item: ICard }) {
  const item = props.item;
  // console.log(item)
  return (
    <>
      <Card className="m-1" sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
        <CardActions className="flex flex-col">
          <Button className="justify-self-end" size="small">
            Edit
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

const TaskColumn = ({ column }: IColumnProp) => {
  const items = column.cards
    .filter((i: ICard) => i.list_id == column.id)
    .sort((c) => c.index);
  // console.log("Column: ", {column}, {items})
  return (
    <>
      <div className="flex flex-col h-min-full w-full min-w-[200px] mx-2 px-2 bg-gray-500 rounded-md pt-2">
        <div className="w-full bg-gray-100 text-black font-bold text-xl rounded-md text-center border-2 border-gray-700">
          {column.name}
        </div>
        <div className="w-full h-full overflow-y-auto">
          <Droppable droppableId={column.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="min-h-[95%]"
              >
                {items.map((item: ICard, index: number) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard item={item} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </>
  );
};

function TaskBoard() {
  const [myColumns, setMyColumns] = useState(columns);

  // Handles moving cards
  function onDragEnd(result: DropResult) {
    // console.log('drag ended ', result);
    const columnSource: IColumn | undefined = columns?.find(
      (c) => c.id == result?.source?.droppableId,
    );
    const columnDestination: IColumn | undefined = columns?.find(
      (c) => c.id == result?.destination?.droppableId,
    );
    const cardToMove: ICard | undefined = columnSource?.cards?.find(
      (c) => c.id == result?.draggableId,
    );
    if (cardToMove && columnSource && columnDestination) {
      cardToMove.list_id = result?.destination?.droppableId;
      // If moving cards in the same column
      if (result?.source?.droppableId == result?.destination?.droppableId) {
        columnSource?.cards?.splice(result?.source?.index, 1);
        columnDestination?.cards?.splice(
          result?.destination?.index,
          0,
          cardToMove,
        );
      } else {
        // else moving cards between columns
        if (result?.destination?.index) {
          columnDestination?.cards?.splice(
            result.destination.index,
            0,
            cardToMove,
          );
          columnSource?.cards?.splice(result.source.index, 1);
        }
      }
      const newColumn = [...columns];
      setMyColumns(newColumn);
    }
  }

  return (
    <>
      <div className="bg-gray-600 p-2 h-full overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="h-full flex flex-row">
            {myColumns.map((col: IColumn) => (
              <TaskColumn column={col} />
            ))}
          </div>
        </DragDropContext>
      </div>
    </>
  );
}

const InnerBoard: React.FC = () => {
  return (
    <>
      <Tile colour="yellow" height={100}>
        <div className=" inset-0 h-full w-full flex flex-col items-center ">
          <div className="w-[95%] h-[90%] flex flex-col items-center justify-center">
            <p className="bg-white text-black text-bold px-10 text-4xl font-mono font-bold m-4 rounded-md">
              {board.name}
            </p>

            <div className="bg-white w-full m-4 p-2 rounded-md text-black font-bold">
              Members
            </div>

            <div className="bg-white p-2 md:p-6 rounded-md shadow-md w-full h-full">
              <TaskBoard />
            </div>
          </div>
        </div>
      </Tile>
    </>
  );
};

export const Board: React.FC = () => {
  return (
    <ComponentContainer>
      <InnerBoard />
    </ComponentContainer>
  );
};
