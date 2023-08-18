import { MemberIcon } from './MemberIcon';

interface IMemberProp {
  members: Member[];
}

export function MemberBar({ members }: IMemberProp) {
  return (
    <>
      <div className="flex flex-row items-center w-full h-16 bg-white m-4 p-2 rounded-md text-black font-bold">
        <p className="mx-2">Members</p>
        {members.map((member) => (
          <div className="mx-1">
            <MemberIcon member={member} />
          </div>
        ))}
      </div>
    </>
  );
}
