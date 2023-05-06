import type { NextPage } from "next";
import Head from "next/head";

import { useEffect, useState } from "react";

import { FaCalendarWeek } from "react-icons/fa";
import { BsFillKanbanFill } from "react-icons/bs";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

import InputField from "../components/inputfield";
import Todos from "../components/todos";

import { Status, Todo, TodosStatus, TodosView } from "../models/todo";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [name, setName] = useState<string>("");
  const [view, setView] = useState<TodosView>(TodosView.KanbanView);
  const [backlogTodos, setBacklogTodos] = useState<Todo[]>([]);
  const [activeTodos, setActiveTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [mainColmTodos, setMainColmTodos] = useState<Todo[]>([{"id":0,"name":"Backlog"},{"id":1,"name":"Active"},{"id":2,"name":"Completed"}]);
  useEffect(() => {
    console.log("backlogTodos: ",JSON.stringify(backlogTodos));
    console.log("activeTodos: ",activeTodos);
    console.log("completedTodos: ",completedTodos);
    console.log("mainColmTodos: ",mainColmTodos); 
    
  }, [backlogTodos, activeTodos, completedTodos, mainColmTodos]);
  useEffect(() => {
    let backlogTodos = window.localStorage.getItem("backlogTodos");
    if (backlogTodos) {
      let parsed = JSON.parse(backlogTodos);
      setBacklogTodos(parsed);
    }
    let activeTodos = window.localStorage.getItem("activeTodos");
    if (activeTodos) {
      let parsed = JSON.parse(activeTodos);
      setActiveTodos(parsed);
    }
    let completedTodos = window.localStorage.getItem("completedTodos");
    if (completedTodos) {
      let parsed = JSON.parse(completedTodos);
      setCompletedTodos(parsed);
    }
    let mainColmTodos = window.localStorage.getItem("mainColmTodos");
    if (mainColmTodos) {
      let parsed = JSON.parse(mainColmTodos);
      setMainColmTodos(parsed);
    }
  }, []);

  //  type Actions =
  //    { type: 'add', payload: string }
  //  | { type: 'remove', payload: number }
  //  | { type: 'done', payload: number }
  //
  //  const TodoReducer = (state: Todo[], action: Actions) => {
  //    switch (action.type) {
  //      case 'add':
  //        return [
  //          ...state,
  //          {id: Date.now(), name: action.payload, isDone: false}
  //        ]
  //      case 'remove':
  //        return state.filter((item) => item.id !== action.payload)
  //      case 'done':
  //        return state.map((item) => item.id === action.payload ? {...item, isDone: !item.isDone} : item)
  //    }
  //  }
  //  const [state, dispatch] = useReducer(TodoReducer, [])
  //

  const addNewTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (name) {
      const newTodo = {
        id: Date.now(),
        name,
        status: Status.Backlog,
        isDone: false,
      };

      setBacklogTodos([...backlogTodos, newTodo]);

      setName("");
    }
  };

  const onDragEndHandler = (result: DropResult) => {
    console.log(result);
    
    const { destination, source } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    let add,
      backlog = backlogTodos,
      active = activeTodos,
      complete = completedTodos,
      mainColm = mainColmTodos;

    switch (source.droppableId) {
      case TodosStatus.BacklogTodos:
        add = backlogTodos[source.index];
        backlog.splice(source.index, 1);
        break;
      case TodosStatus.ActiveTodos:
        add = active[source.index];
        active.splice(source.index, 1);
        break;
      case TodosStatus.CompletedTodos:
        add = complete[source.index];
        complete.splice(source.index, 1);
        break;
      case TodosStatus.MainColmTodos:
        add = mainColm[source.index];
        mainColm.splice(source.index, 1);
        break;
    }

    if (add) {
      switch (destination.droppableId) {
        case TodosStatus.BacklogTodos:
          backlog.splice(destination.index, 0, add);
          break;
        case TodosStatus.ActiveTodos:
          active.splice(destination.index, 0, add);
          break;
        case TodosStatus.CompletedTodos:
          complete.splice(destination.index, 0, add);
          break;
        case TodosStatus.MainColmTodos:
          mainColm.splice(destination.index, 0, add);
          break;
      }
    }

    setBacklogTodos(backlog);
    setActiveTodos(active);
    setCompletedTodos(complete);

    if (window) {
      window.localStorage.setItem("backlogTodos", JSON.stringify(backlog));
      window.localStorage.setItem("activeTodos", JSON.stringify(active));
      window.localStorage.setItem("completedTodos", JSON.stringify(complete));
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Drag-Drop-Animated-Todo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center  min-h-screen pt-10">
        <h2 className="text-4xl font-bold">Taskify</h2>
        <div className="flex gap-3">
          <span
            onClick={() => setView(TodosView.KanbanView)}
            className={`text-3xl text-gray-300 cursor-pointer ${
              view === TodosView.KanbanView ? "text-gray-900" : ""
            }`}
          >
            <BsFillKanbanFill />
          </span>
        </div>
        <InputField name={name} setName={setName} addNewTodo={addNewTodo} />
        <Todos
          view={view}
          backlogTodos={backlogTodos}
          setBacklogTodos={setBacklogTodos}
          activeTodos={activeTodos}
          setActiveTodos={setActiveTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
          mainColmTodos={mainColmTodos} setMainColmTodos={setMainColmTodos}
          onDragEndHandler={onDragEndHandler}        />
      </div>
    </div>
  );
};

export default Home;