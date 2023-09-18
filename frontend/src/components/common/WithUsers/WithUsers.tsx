import useBoard from "@/hooks/useBoard";
import { useTypedSupabaseQuery } from "@/hooks/utils"
import { useParams } from "react-router-dom";



export const WithUsers = (Component: React.FC<any>) => () => {


    const { data, isLoading, isError } = useTypedSupabaseQuery((supabase) => supabase.from('member').select('*'));

    if (isLoading) return <div>Loading Users...</div>;

    if (isError) return <div>Error loading Users</div>;


    return <Component users={data} />;

}

export const WithUsersAndBoard = (Component: React.FC<any>) => () => {

    const { board_id } = useParams() as { board_id: string };


    const { data: boardData, isLoading: isBoardLoading, isError: isBoardError } =
        useBoard(board_id);


    const { data, isLoading, isError } = useTypedSupabaseQuery((supabase) => supabase.from('member').select('*'));

    if (isLoading || isBoardLoading) return <div>Loading Users...</div>;

    if (isError || isBoardError) return <div>Error loading Users</div>;


    return <Component users={data} board={(boardData || [])[0]} />;

}