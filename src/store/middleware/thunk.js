export function thunk({ getState, dispatch }) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      if (typeof action === "function") {
        action(getState, dispatch);
      } else return next(action);
    };
  };
}
