import { AccountCircle } from "@mui/icons-material";
import { MemberIcon } from "./MemberIcon";

interface IMemberProp {
  members: Member[];
}

export function MemberBar({ members }: IMemberProp) {
  const memberElements: Array<any> = []

  members.forEach((member) => {
    memberElements.push(
      <div className="mx-1">

        <MemberIcon member={member} />
      </div>
    );
  });



  return (
    <>
      <div className="flex flex-row items-center w-full h-16 bg-white m-4 p-2 rounded-md text-black font-bold">
        <p className="mx-2">Members</p>
        {memberElements}


      </div>
      <div>
      </div>
    </>
  );
}

