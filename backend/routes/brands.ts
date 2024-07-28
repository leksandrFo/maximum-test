import { Router, Request, Response } from 'express';
import { getCollection } from '../db/mongo';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const collection = getCollection('stock');
        const brands = await collection.aggregate([
            {
                $group: {
                    _id: '$mark',
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

export default router;