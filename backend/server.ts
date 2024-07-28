import express from 'express';
import cors from 'cors';
import { initDB } from './db/mongo';
import stockRouter from './routes/stock';
import brandsRouter from './routes/brands';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use('/api/stock', stockRouter);
app.use('/api/brands', brandsRouter);

app.get('/', (req, res) => {
    res.send('Сервер работает!');
});

// Инициализация базы данных и запуск сервера
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
});