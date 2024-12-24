import { trpc } from "@/utils/trpc";
import { Todo } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SingleTodo = () => {
  const router = useRouter();
  const id = parseInt(router.query.todoId as string);

  const singleTodo = trpc.todo.getSingleTodo.useQuery({ id });

  const [inputData, setInputData] = useState<Todo>({
    id: 0,
    text: "",
    description: "",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const utils = trpc.useContext();

  const updateTodo = trpc.todo.updateTodo.useMutation({
    onSuccess() {
      utils.todo.getSingleTodo.invalidate();
      toast.success(`Successfully updated todo!`, {
        autoClose: 500,
      });
      router.push("/");
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (inputData.text.trim() === "") {
      return router.push("/");
    }

    updateTodo.mutate({
      id,
      text: inputData.text,
      description: inputData.description,
    });

    setInputData({
      id: 0,
      text: "",
      description: "",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  return (
    <div className="max-w-screen-md mx-auto py-8 px-4">
      <div className="bg-white shadow-md rounded p-6">
        <div className="mb-6 space-y-2">
          <h1 className="text-4xl font-extrabold text-center">
            {singleTodo.data?.text}
          </h1>
          <p className="text-lg">
            <span className="font-bold">Description:</span>{" "}
            {singleTodo.data?.description || "No description"}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Status:</span>{" "}
            {singleTodo.data?.completed ? "Completed" : "Not Completed"}
          </p>
        </div>
        <hr className="my-4" />
        <h3 className="text-xl font-semibold mb-2">Update Your Todo</h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="todo" className="font-medium">
              Todo
            </label>
            <input
              id="todo"
              type="text"
              value={inputData.text}
              onChange={(e) =>
                setInputData({ ...inputData, text: e.target.value })
              }
              placeholder="Enter your todo"
              className="border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={inputData.description ?? ""}
              onChange={(e) =>
                setInputData({
                  ...inputData,
                  description: e.target.value,
                })
              }
              placeholder="Any Description of the Todo"
              className="border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
              rows={4}
            />
          </div>
          <button
            onClick={handleClick}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Update Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleTodo;
