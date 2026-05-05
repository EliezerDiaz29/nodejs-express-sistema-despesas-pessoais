import express from 'express';
import expenseController from '../controllers/expenseController.js';

const router = express.Router();

router.get('/', expenseController.list);
router.get('/:id', expenseController.getById);
router.post('/', expenseController.create);
router.put('/:id', expenseController.update);
router.delete('/:id', expenseController.remove);

export default router;