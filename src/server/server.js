import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDB } from './connect-db';
// importing whole file without importing any constants fn or anything
import './initialize-db';

const app = express();
const port = 7070;

app.listen(port,console.log('listening on ',port));

/*
app.get('/',(req,res)=>{
  res.send('asSalam o alaikm');
});


bodyParser lets us use post but more powerfule though harder to use
- app.use everything inside is the plugin(adding feature to app in isolated manner)
*/
app.use(
  cors(),
  bodyParser.urlencoded({extended:true}),  
  bodyParser.json()
);

export const addNewTask = async task => {
  let db = await connectDB();
  let collection = db.collection('tasks');
  await collection.insertOne(task);  
};

export const updateTask = async task => {
  let { id, name, group, isComplete} = task;
  let db = await connectDB();
  let collection = db.collection('tasks');
  
  if(group){
    await collection.updateOne({id}, {$set:{group}});    
  }  
  
  if(name){
    await collection.updateOne({id}, {$set:{name}});    
  }
  
  if(isComplete !== undefined){
    await collection.updateOne({id}, {$set:{isComplete}});    
  }  
  
};

/*currently till date we don't have front UI to test so we are using spec which is a way to do that */
app.post('/task/new', async (req,res)=>{
  let task = req.body.task;
  await addNewTask(task);
  res.status(200).send();
});

app.post('/task/update', async (req,res)=>{
  let task = req.body.task;
  await updateTask(task);
  res.status(200).send();
});
