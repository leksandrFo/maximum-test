import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || '';
const client = new MongoClient(mongoURI);
let database: Db;

export async function initDB() {
  try {
      await client.connect();
      database = client.db(process.env.DB_NAME);
      console.log('Подключено к базе данных');
  } catch (error) {
      console.error('Ошибка при подключении к базе данных:', error);
      process.exit(1);
  }
}

export function getCollection(collectionName: string) {
  return database.collection(collectionName);
}
