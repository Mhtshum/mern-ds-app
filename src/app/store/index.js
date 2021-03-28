import { createStore, applyMiddleware,combineReducers } from 'redux';
import { defaultState } from '../../server/defaultState';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

const sagasMiddleware = createSagaMiddleware();
//import * as sagas from './sagas.mock';
import * as sagas from './sagas';
import * as mutations from './mutations';

export const store = createStore(
  combineReducers({
    session(session = defaultState.session){
      return session;
    },
    tasks(tasks = defaultState.tasks,action){
        switch(action.type) {
            case mutations.SET_STATE:
                return action.state.tasks;
            case mutations.SET_TASK_COMPLETE:
                return tasks.map(task=>{
                    return (task.id === action.taskID) ? {...task,isComplete:action.isComplete} : task;
                });
            case mutations.SET_TASK_GROUP:
                return tasks.map(task=>{
                    return (task.id === action.taskID) ? {...task, group:action.groupID} : task;
                });
            case mutations.SET_TASK_NAME:
                return tasks.map(task=> {
                    return (task.id === action.taskID) ? {...task, name: action.name} : task;
                });
            case mutations.CREATE_TASK:
                return [...tasks,{
                    id:action.taskID,
                    name:"New Task",
                    group:action.groupID,
                    owner:action.ownerID,
                    isComplete:false
                }]
        }
        return tasks;
    },
    comments(comments = defaultState.comments){
      return comments;
    },
    users(users=defaultState.users){
      return users;
    },
    groups(groups=defaultState.groups){
      return groups;
    }
  })
  ,
  applyMiddleware(createLogger(),sagasMiddleware)
);

for (let saga in sagas){
  sagasMiddleware.run(sagas[saga])
}