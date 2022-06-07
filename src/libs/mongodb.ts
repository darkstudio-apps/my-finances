import { Db, MongoClient } from "mongodb"

const MONGODB_URI = process.env.DATABASE_URL

let cachedClient: MongoClient
let cachedDb: Db

interface IConnectToDatabaseReturn {
  client: MongoClient
  db: Db
}

export async function connectToDatabase(): Promise<IConnectToDatabaseReturn> {
  // check the MongoDB URI
  if (!MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environmental variable")
  }

  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    }
  }

  // Connect to cluster
  // set the connection options
  const client = new MongoClient(MONGODB_URI)

  await client.connect()
  const db = client.db()

  // set cache
  cachedClient = client
  cachedDb = db

  return {
    client: cachedClient,
    db: cachedDb,
  }
}
