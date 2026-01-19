import { Router, Request, Response } from 'express';
import { getAuth } from '@clerk/express';
import { prisma } from './db';

const router = Router();

// Get all projects for the authenticated user
router.get('/', async (req: Request, res: Response) => {
    try {
        const auth = getAuth(req);
        if (!auth.userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const projects = await prisma.project.findMany({
            where: { userId: auth.userId },
            orderBy: { updatedAt: 'desc' },
        });

        res.json({ projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// Create a new project
router.post('/', async (req: Request, res: Response) => {
    try {
        const auth = getAuth(req);
        if (!auth.userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const { name, prompt, template } = req.body;

        if (!name || !prompt || !template) {
            res.status(400).json({ error: 'Name, prompt, and template are required' });
            return;
        }

        if (!['react', 'node'].includes(template)) {
            res.status(400).json({ error: 'Template must be "react" or "node"' });
            return;
        }

        const project = await prisma.project.create({
            data: {
                userId: auth.userId,
                name,
                prompt,
                template,
            },
        });

        res.status(201).json({ project });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Failed to create project' });
    }
});

// Get a specific project
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const auth = getAuth(req);
        if (!auth.userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const { id } = req.params;

        const project = await prisma.project.findFirst({
            where: {
                id: parseInt(id),
                userId: auth.userId,
            },
        });

        if (!project) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }

        res.json({ project });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
});

// Delete a project
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const auth = getAuth(req);
        if (!auth.userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const { id } = req.params;

        const project = await prisma.project.deleteMany({
            where: {
                id: parseInt(id),
                userId: auth.userId,
            },
        });

        if (project.count === 0) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }

        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

export default router;
