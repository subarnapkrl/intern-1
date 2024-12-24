import CreateTodo from "@/components/CreateTodo";
import FetchTodos from "@/components/FetchTodos";
import React from "react";

const Home = () => {
  return (
    <div>
      <CreateTodo />
      <FetchTodos />
    </div>
  );
};

export default Home;
