import {requestApi} from '../../api/apiService';
import {GET_TASKS} from '../../api/url';
import strings from '../../i18n/strings';
import {
  ADD_TASK_API,
  DELETE_TASK_API,
  GET_TASKS_API,
  GET_TASKS_API_LOADING,
  UPDATE_TASK_API,
} from '../types';

// get task api action
export const getTaskAction = () => {
  return async dispatch => {
    dispatch({type: GET_TASKS_API_LOADING, payload: true});
    requestApi('GET', GET_TASKS)
      .then(response => dispatch({type: GET_TASKS_API, payload: response}))
      .catch(error => dispatch({type: GET_TASKS_API_LOADING, payload: false}));
  };
};

// delete task api action
export const deleteTaskAction = id => {
  return async dispatch => {
    dispatch({type: GET_TASKS_API_LOADING, payload: true});
    requestApi('DELETE', `${GET_TASKS}/${id}`)
      .then(response => {
        dispatch({type: DELETE_TASK_API, payload: response});
        return getTaskAction()(dispatch);
      })
      .catch(error => dispatch({type: GET_TASKS_API_LOADING, payload: false}));
  };
};

// add task api action
export const addTaskAction = (task, successFunction) => {
  return async dispatch => {
    dispatch({type: GET_TASKS_API_LOADING, payload: true});
    requestApi('POST', GET_TASKS, task)
      .then(response => {
        dispatch({type: ADD_TASK_API, payload: response});
        successFunction(strings.taskAddedSuccessfully);
      })
      .catch(error => {
        dispatch({type: GET_TASKS_API_LOADING, payload: false});
      });
  };
};

// update task api action
export const updateTaskAction = (taskId, task, successFunction) => {
  return async dispatch => {
    dispatch({type: GET_TASKS_API_LOADING, payload: true});
    requestApi('PUT', `${GET_TASKS}/${taskId}`, task)
      .then(response => {
        dispatch({type: UPDATE_TASK_API, payload: response});
        successFunction(strings.taskUpdatedSuccessfully);
      })
      .catch(error => dispatch({type: GET_TASKS_API_LOADING, payload: false}));
  };
};
