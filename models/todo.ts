import { Main } from 'next/document';

export interface Todo {
  id: number
  name: string
  status?: Status
  isDone?: boolean
}


export enum Status {
  MainColm,
  Backlog,
  Active,
  Done
}

/* export enum WeekDay {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Satuday = 'Satuday',
  Sunday = 'Sunday'
}
export enum WeekDayTodos {
  MonTodos = 'MonTodos',
  TueTodos = 'TueTodos',
  WedTodos = 'WedTodos',
  ThuTodos = 'ThuTodos',
  FriTodos = 'FriTodos',
  SatTodos = 'SatTodos',
  SunTodos = 'SunTodos'
}
 */
export enum TodosStatus {
  BacklogTodos = 'BacklogTodos',
  ActiveTodos = 'ActiveTodos',
  CompletedTodos = 'CompletedTodos',
  MainColmTodos = "MainColmTodos"
}

export enum TodosView {
  KanbanView = 'KanbanView',
  WeeklyView = 'WeeklyView'
}
