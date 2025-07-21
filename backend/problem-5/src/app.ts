import express from 'express';
import itemsRouter from './routes/items';

const app = express();

app.use(express.json()); app.use('/items', itemsRouter);

app.get('/', (_req, res) => {
    res.send('Welcome to the Express TypeScript CRUD API!');
});

export default app;

