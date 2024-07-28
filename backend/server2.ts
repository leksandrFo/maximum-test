import express, { Request, Response } from 'express';
import cors from 'cors';
import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const mongoURI = process.env.MONGODB_URI || '';
const client = new MongoClient(mongoURI);
let database: Db;

async function initDB() {
  await client.connect();
  database = client.db(process.env.DB_NAME); // Используйте имя вашей базы данных
}

function getCollection(collectionName: string) {
  return database.collection(collectionName);
}

app.use(cors());
app.get('/', (req: Request, res: Response) => {
  res.send('Сервер работает!');
});

app.get('/api/stock', async (req: Request, res: Response) => {
  try {
    const collection = getCollection('stock');
    const stock = await collection.find().toArray();
    res.json(stock);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    res.status(500).send('Ошибка сервера');
  }
});

app.get('/api/brands', async (req: Request, res: Response) => {
  try {
    const collection = getCollection('stock');
    const brands = await collection.aggregate([
      {
        $group: {
          _id: '$mark', // Группируем по полю mark
          totalQuantity: { $sum: 1 },
          models: { $addToSet: '$model' },
        },
      },
    ]).toArray();

    res.json(brands);
  } catch (error) {
    console.error('Ошибка при агрегации по маркам автомобилей:', error);
    res.status(500).send('Ошибка сервера');
  }
});

// Инициализация базы данных и запуск сервера
initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Ошибка при подключении к базе данных:', error);
  });