import {
  take, put , select
} from 'redux-saga/effects';
import * as mutations from './mutations';
import { v4 as uuid} from 'uuid';
import axios from 'axios';

const url = "http://11.11.11.5:7070";
//const url = "http://localhost:7070";

export function* taskCreationSaga(){
  while (true) {
    const {groupID} = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerID = 'U1';
    const taskID = uuid();
    //put send out action we have to the store. 
    yield put(mutations.createTask(taskID,groupID,ownerID))
    console.log('task id is ', taskID);
    const { res } = yield axios.post(url + '/task/new' ,{ 
        task:{
        id: taskID,
        owner: ownerID,
        group: groupID,
        isComplete : false,
        name : 'My saga new task2'
      }
    });   
 //   console.info('got new task', res);
  }
}

export function* taskModificaitonSaga(){
  while(true){
    const task = yield take([
      mutations.SET_TASK_GROUP,
      mutations.SET_TASK_NAME,
      mutations.SET_TASK_COMPLETE
    ]);
    axios.post( url + '/task/update',{
       task:{
        id: task.taskID,
        group: task.groupID,
        isComplete : task.isComplete,
        name : task.name
      }
    });
  }
}