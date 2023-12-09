import React from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { Status, Todo, TodosStatus, TodosView } from "../models/todo";
import type {
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import TodoItem from "./todoitem";
import type { QuoteMap, Quote } from "../types";
import { PartialAutoScrollerOptions } from "./auto-scroller-types";
interface Props {
  view: TodosView;
  backlogTodos: Todo[];
  setBacklogTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  activeTodos: Todo[];
  setActiveTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  mainColmTodos: Todo[];
  setMainColmTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onDragEndHandler: any;
  autoScrollerOptions?: PartialAutoScrollerOptions;
}
/* interface Props {
  initial: QuoteMap;
  withScrollableColumns?: boolean;
  isCombineEnabled?: boolean;
  containerHeight?: string;
  useClone?: boolean;
  applyGlobalStyles?: boolean;
  
} */

interface State {
  columns: QuoteMap;
  ordered: string[];
}

const Todos: React.FC<Props> = ({
  view,
  backlogTodos,
  setBacklogTodos,
  activeTodos,
  setActiveTodos,
  completedTodos,
  setCompletedTodos,
  mainColmTodos,
  setMainColmTodos,
  onDragEndHandler,
  autoScrollerOptions,
}) =>
  view === TodosView.KanbanView ? (
    <div className="grid grid-cols-1 w-full gap-6 mt-4 ">
      <DragDropContext
        onDragEnd={onDragEndHandler}
        autoScrollerOptions={autoScrollerOptions}
      >
        <Droppable
          droppableId={"MainColmTodos"}
          type="COLUMN"
          direction="vertical"
        >
          {(mainDroppableProvided, mainDroppableSnapshot) => (
            <div
              className="grid grid-cols-1 gap-6"
              ref={mainDroppableProvided.innerRef}
              {...mainDroppableProvided.droppableProps}
            >
              {mainColmTodos.map((colm, index) => (
                <Draggable key={index} draggableId={`Colm${colm.id}`} index={index}>
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      className="bg-gray-400 px-5 py-3 rounded-md"
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      <Droppable droppableId={`${colm.name}Todos`}>
                        {(droppableProvided, droppableSnapshot) => (
                          <div
                            className="bg-blue-400 px-5 py-3 rounded-md"
                            ref={droppableProvided.innerRef}
                            {...droppableProvided.droppableProps}
                          >
                            <span className="text-white text-2xl font-semibold">
                              {index+1}{" Part"}
                            </span>
                            {colm.name === 'Backlog' && backlogTodos?.map((todo, index) => (
                              <TodoItem
                                hasDoneIcon={true}
                                index={index}
                                key={todo?.id}
                                todo={todo}
                                todos={backlogTodos}
                                setTodos={setBacklogTodos}
                              />
                            ))}
                            {colm.name === 'Active' && activeTodos?.map((todo, index) => (
                              <TodoItem
                                hasDoneIcon={true}
                                index={index}
                                key={todo?.id}
                                todo={todo}
                                todos={activeTodos}
                                setTodos={setActiveTodos}
                              />
                            ))}
                            {colm.name === 'Completed' && completedTodos?.map((todo, index) => (
                              <TodoItem
                                hasDoneIcon={true}
                                index={index}
                                key={todo?.id}
                                todo={todo}
                                todos={completedTodos}
                                setTodos={setCompletedTodos}
                              />
                            ))}
                            {droppableProvided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              ))}
              {mainDroppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  ) : null;

export default Todos;
