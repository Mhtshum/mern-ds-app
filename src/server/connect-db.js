import { MongoClient }  from 'mongodb';
//  nameofcollection : dstasks
const url =  "mongodb+srv://B4kXhrjiuwd6t5qm:B4kXhrjiuwd6t5qm@dstasks.jw8hr.mongodb.net/dstasks?retryWrites=true&w=majority";
// represent db connection avoid to reconnect and same db object can be used to communicate with mongodb
let db = null;

export async function connectDB(){
  if (db) return db;
  let client = await MongoClient.connect( url, {useNewUrlParser: true,  useUnifiedTopology: true});
  db = client.db();
//  console.info('Got db', db);
  return db;
}
