import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  titleChange,
  taskDeleted,
  completeTask,
  getTasks,
  loadTasks,
  getTasksLoadingStatus,
  createTask,
} from "./store/task";
import configureStore from "./store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getError } from "./store/errors";

const store = configureStore();

const App = (params) => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChange(taskId));
  };

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };

  const taskCreated = (idQuantity) => {
    dispatch(createTask(idQuantity));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      <h1> APP</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              Complete
            </button>
            <button onClick={() => changeTitle(el.id)}>Change Title</button>
            <button onClick={() => deleteTask(el.id)}>Delete Task</button>
            <hr />
          </li>
        ))}
        <button onClick={() => taskCreated(state[state.length - 1].id)}>
          Create Task
        </button>
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
