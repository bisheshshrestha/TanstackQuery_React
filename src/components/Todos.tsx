import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreateTodo, useUpdateTodo } from "../services/mutations";
import { useTodos, useTodosIds } from "../services/queries"
import type { Todo } from "../types/todo";

export default function Todos() {
    const todosIdsQuery = useTodosIds();
    // const isFetching = useIsFetching()
    const todoQueries = useTodos(todosIdsQuery.data);

    const createTodoMutation = useCreateTodo();
    const updateTodoMutation = useUpdateTodo();

    const { register, handleSubmit } = useForm<Todo>()

    const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
        createTodoMutation.mutate(data);
    }

    const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
        if (data) {
            updateTodoMutation.mutate({ ...data, checked: true })
        }
    }



    // if (todosIdsQuery.isPending) {
    //     return <span>loading...</span>
    // }

    // if (todosIdsQuery.isError) {
    //     return <span>there is an error!</span>
    // }
    return (
        <>
            <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
                <h4>New todo:</h4>
                <input placeholder="Title" {...register('title')} />
                <br />
                <input placeholder="Description" {...register('description')} />
                <br />
                <input type="submit" disabled={createTodoMutation.isPending} value={createTodoMutation.isPending ? 'Creating...' : 'Create todo'} />
            </form>
            <ul>
                {todoQueries.map(({ data }) => (
                    <li key={data?.id}>
                        <div>Id: {data?.id}</div>
                        <span>
                            <strong>Title: </strong>{data?.title}, {""}
                            <strong>Description</strong> {data?.description}
                        </span>
                        <button onClick={() => handleMarkAsDoneSubmit(data)} disabled={data?.checked}>
                            {data?.checked ? 'Done' : 'Mark as done'}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}