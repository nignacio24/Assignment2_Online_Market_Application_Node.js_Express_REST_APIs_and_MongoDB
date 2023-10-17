import { MongoClient } from "mongodb";

// Add your MongoDb connection string below
const connectionString = "mongodb+srv://admin:gfkdRoXfiQXNXbwN@cluster0.hdia6fw.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log("Database Connected");
} catch(e) {
  console.error(e);
}

let db = conn.db("Marketplace");

export default db;