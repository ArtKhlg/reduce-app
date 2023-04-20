import { createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setError } from "./errors";

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    receive(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestFailed(state, action) {
      state.isLoading = false;
    },
    taskCreate(state, action) {
      state.entities = [...state.entities, ...action.payload];
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const {
  update,
  remove,
  receive,
  taskRequested,
  taskRequestFailed,
  taskCreate,
} = actions;

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    dispatch(receive(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const createTask = (idQuantity) => async (dispatch) => {
  try {
    const data = await todosService.create(idQuantity + 1);
    dispatch(taskCreate(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export function completeTask(id) {
  return update({ id, completed: true });
}

export function titleChange(id) {
  return update({ id, title: `New Title for ${id}` });
}

export function taskDeleted(id) {
  return remove({ id });
}

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;
export default taskReducer;
