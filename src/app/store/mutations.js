export const REQUEST_TASK_CREATION = 'REQUEST_TASK_CREATION';
export const CREATE_TASK = 'CREATE_TASK';
export const SET_TASK_COMPLETE = 'SET_TASK_COMPLETE';
export const SET_TASK_GROUP = 'SET_TASK_GROUP';
export const SET_TASK_NAME = 'SET_TASK_NAME';


export const requestTaskCreation = (groupID) => ({
  type:REQUEST_TASK_CREATION,
  groupID
});

//it will be dispatched by saga once it done with creating task with randomIDs
export const createTask = (taskID,groupID,ownerID) => ({
  type:CREATE_TASK,
  taskID,
  groupID,  
  ownerID
});

export const setTaskComplete = (taskID,isComplete) => ({
  type:SET_TASK_COMPLETE,
  taskID,
  isComplete
});


export const setTaskGroup = (taskID,groupID) => ({
  type:SET_TASK_GROUP,
  taskID,
  groupID
});

export const setTaskName = (taskID,name) => ({
  type:SET_TASK_NAME,
  taskID,
  name
});
