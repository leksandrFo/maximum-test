import { Router, Request, Response } from 'express';
import { getCollection } from '../db/mongo';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const collection = getCollection('stock');
        const stock = await collection.find().toArray();
        res.json(stock);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        res.status(500).send('Ошибка сервера');
    }
});

export default router;