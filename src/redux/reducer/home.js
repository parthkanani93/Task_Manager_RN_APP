import {
  ADD_TASK_API,
  DELETE_TASK_API,
  GET_TASKS_API,
  GET_TASKS_API_LOADING,
  UPDATE_TASK_API,
} from '../types';

const initialState = {
  tasks: [],
  addTasks: {},
  loader: false,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS_API_LOADING:
      return {...state, loader: action.payload};
    case GET_TASKS_API:
      return {
        ...state,
        tasks: action.payload,
        loader: false,
      };
    case DELETE_TASK_API:
      return {
        ...state,
        loader: false,
      };
    case ADD_TASK_API:
      return {
        ...state,
        addTasks: action.payload,
        loader: false,
      };
    case UPDATE_TASK_API:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task,
        ),
        loader: false,
      };
    default:
      return state;
  }
}
