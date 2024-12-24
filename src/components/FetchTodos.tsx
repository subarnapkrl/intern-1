import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

const FetchTodos = () => {
  const router = useRouter();
  const todos = trpc.todo.getAllTodos.useQuery();
  const utils = trpc.useContext();
  const deleteTodo = trpc.todo.deleteTodo.useMutation({
    onSuccess() {
      utils.todo.getAllTodos.invalidate();
      toast.success("Deleted todo", {
        autoClose: 200,
      });
    },
  });
  const toggle = trpc.todo.toggle.useMutation({
    onSuccess: () => {
      utils.todo.getAllTodos.invalidate();
    },
  });

  return (
    <div className="max-w-screen-lg mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Your Todos</h2>
      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {todos.data?.map((todo) => (
          <div
            key={todo.id}
            className={`${
              todo.completed ? "bg-gray-100" : "bg-white"
            } shadow-md rounded p-4 flex flex-col justify-between`}
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">{todo?.text}</h3>
              <p className="mb-1">
                <span className="font-medium">Description:</span>{" "}
                {todo?.description || "No description"}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {todo?.completed ? "Completed" : "Not Completed"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={todo?.completed}
                onClick={() => router.push(`/todo/${todo.id}`)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
              >
                Edit
              </button>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                onClick={() => {
                  toggle.mutate({ id: todo.id });
                  toast.info(
                    todo.completed
                      ? "Marked as Not Completed"
                      : "Marked as Completed",
                    {
                      autoClose: 500,
                    }
                  );
                }}
              >
                {todo?.completed ? "Not Completed" : "Completed"}
              </button>
              <button
                onClick={() => deleteTodo.mutate({ id: todo.id })}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchTodos;
