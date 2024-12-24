import { trpc } from "@/utils/trpc";
import { Todo } from "@prisma/client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateTodo = () => {
  const [inputData, setInputData] = useState<Todo>({
    id: 0,
    text: "",
    description: "",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const utils = trpc.useContext();
  const createTodo = trpc.todo.createTodo.useMutation({
    onSuccess() {
      utils.todo.getAllTodos.invalidate();
      toast.success(`Successfully created todo!`, {
        autoClose: 500,
      });
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputData.text.trim() === "") {
      toast.error("Empty Todo not allowed");
      return;
    }

    createTodo.mutate({
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
        <h1 className="text-3xl font-bold text-center mb-4">Add Your Todos</h1>
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
                setInputData({ ...inputData, description: e.target.value })
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
            Add Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTodo;
