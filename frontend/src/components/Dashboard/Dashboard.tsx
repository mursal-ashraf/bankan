import { Tile } from "@/common/tiles/ContentTile";
import React from "react";

const BoardContainer: React.FC = ({ children }: any) => {
  return (
    <div className="flex flex-col mx-5 my-10 rounded-xl bg-white w-2/3">
      <h1 className="text-black m-5">Dashboard</h1>

      <p className="text-black m-5">Search for a board</p>
      <div className="flex w-full my-3 h-2/3 justify-center">
        <div className="mx-5 rounded-xl bg-slate-300 w-10/12 text-center">
          hello
        </div>
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
