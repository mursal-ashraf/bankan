import { Tile } from "@/common/tiles/ContentTile";
import React from "react";

export const Dashboard: React.FC = () => {
  return (
    <Tile colour="yellow" height={100}>
      <div className="flex items-center px-4 py-3 text-black">
        <h1>This is dashboard component</h1>
      </div>
    </Tile>
  );
};
