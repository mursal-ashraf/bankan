import { Tile } from "@/common/ContentTile";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Repeater } from "@/common/Repeater";

interface BoardCardProps {
  project: string;
  description: string;
  lastModified: string;
}

//Mock data... remove once we fetch.
const boardCards: BoardCardProps[] = [
  {
    project: "Project A",
    description: "This is the description for Project A",
    lastModified: "2023-08-10",
  },
  {
    project: "Project B",
    description: "Description for Project B goes here",
    lastModified: "2023-08-09",
  },
  {
    project: "Project C",
    description: "Description for Project C",
    lastModified: "2023-08-08",
  },
  {
    project: "Project A",
    description: "This is the description for Project A",
    lastModified: "2023-08-10",
  },
  {
    project: "Project B",
    description: "Description for Project B goes here",
    lastModified: "2023-08-09",
  },
  {
    project: "Project C",
    description: "Description for Project C",
    lastModified: "2023-08-08",
  },
  {
    project: "Project A",
    description: "This is the description for Project A",
    lastModified: "2023-08-10",
  },
  {
    project: "Project B",
    description: "Description for Project B goes here",
    lastModified: "2023-08-09",
  },
  {
    project: "Project C",
    description: "Description for Project C",
    lastModified: "2023-08-08",
  },
];

const BoardCardElement: React.FC<BoardCardProps> = ({
  project,
  description,
  lastModified,
}) => (
  <div className="relative rounded-lg shadow-md bg-slate-300 p-6">
    <h2 className="text-xl font-semibold mb-2">{project}</h2>
    <p className="text-gray-700">{description}</p>
    <p className="text-gray-500 mt-2">Last Modified: {lastModified}</p>
  </div>
);

const BoardContainer: React.FC = () => {
  return (
    <div className="flex flex-col mx-5 my-10 py-3 rounded-xl bg-white w-2/3 items-center">
      <div className="mx-10 my-5 p-2 rounded-3xl shadow-md bg-slate-300 w-2/3 self-start">
        Search...
      </div>

      <div className="flex flex-col w-full my-3 overflow-y-auto">
        <Repeater
          Component={BoardCardElement}
          feedList={boardCards}
          IconRight={{ icon: <DeleteIcon />, colour: "orange" }}
        />
      </div>

      <div className="flex my-5 w-1/3 h-20">
        <Button className="w-full" variant="contained" startIcon={<AddIcon />}>
          Create New
        </Button>
      </div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  return (
    <Tile colour="yellow" height={100}>
      <BoardContainer />
    </Tile>
  );
};
