import express from 'express';
import {PrismaClient} from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Create an item
router.post('/', async (req, res) => {
    try {
        const {name} = req.body;
        if (!name) {
            return res.status(400).json({error: 'Name is required'});
        }
        const item = await prisma.item.create({data: {name}});
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({error: 'Internal server error'});
    }
});

// List items(basic filter: name contains)
router.get('/', async (req, res) => {
    try {
        const {name, skip, take} = req.query;
        const where: any = {};

        if (name) {
            where.name = {contains: String(name)};
        }

        const items = await prisma.item.findMany({
            where,
            skip: skip ? Number(skip) : 0,
            take: take ? Number(take) : 100
        });
        res.json(items);
    } catch (err) {
        res.status(500).json({error: 'Internal server error'});
    }
});

// Get item by id
router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const item = await prisma.item.findUnique({where: {id}});
        if (!item) return res.status(404).json({error: 'Not found'});
        res.json(item);
    } catch {
        res.status(400).json({error: 'Invalid id'});
    }
});

// Update item
router.put('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const {name} = req.body;
        if (!name) {
            return res.status(400).json({error: 'Name is required'});
        }
        const item = await prisma.item.update({where: {id}, data: {name}});
        res.json(item);
    } catch (err) {
        res.status(404).json({error: 'Not found or invalid id'});
    }
});

// Delete item
router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        await prisma.item.delete({where: {id}});
        res.status(204).end();
    } catch {
        res.status(404).json({error: 'Not found or invalid id'});
    }
});

export default router;

