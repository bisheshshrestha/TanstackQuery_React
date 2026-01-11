import { useTodos, useTodosIds } from "../services/queries"

export default function Todo() {
    const todosIdsQuery = useTodosIds();
    // const isFetching = useIsFetching()
    const todoQueries = useTodos(todosIdsQuery.data);

    // if (todosIdsQuery.isPending) {
    //     return <span>loading...</span>
    // }

    // if (todosIdsQuery.isError) {
    //     return <span>there is an error!</span>
    // }
    return (
        <>
            {/* <p>Query function status: {todosIdsQuery.fetchStatus}</p>
            <p>Query data status:{todosIdsQuery.status}</p>
            <p>Global isFetching:{isFetching}</p> */}
            {/* {todosIdsQuery.data?.map((id) => (
                <p key={id}>id: {id}</p>
            ))} */}
            <ul>
                {todoQueries.map(({ data }) => (
                    <li key={data?.id}>
                        <div>Id: {data?.id}</div>
                        <span>
                            <strong>Title: </strong>{data?.title}, {""}
                            <strong>Description</strong> {data?.description}
                        </span>
                    </li>
                ))}
            </ul>
        </>
    )
}