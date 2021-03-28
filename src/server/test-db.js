import { connectDB } from './connect-db';


export const showDB = async () => {
  let db = await connectDB();
  console.log(db);
};

export async function  showCollection(collectionName,predicate={id:1234}){
  let db = await connectDB();
  let collections = await db.collection(collectionName).find(predicate);  
  
  let results = await collections.toArray();
  console.log('***********************');
  console.log('showing the count');
  console.log(results.length);
  console.log('***********************'); 
  console.log('showing the results');
  console.log(results);
  console.log('***********************');
}

  showCollection('tasks',{ id : '9ce22c71-c9a1-469a-a078-5fd1e0c3796d'});  

//showDB();