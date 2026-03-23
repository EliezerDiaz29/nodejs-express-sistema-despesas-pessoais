import express from 'express';
import expenseController from '../controllers/expenseController.js';

const router = express.Router();

// Rutas
router.get('/', expenseController.getAllDespesas);
router.get('/:id', expenseController.getDespesaById);
router.get('/summary/total', expenseController.getTotalGasto);
router.get('/summary/category', expenseController.getTotalPorCategoria);
router.post('/', expenseController.createDespesa);
router.put('/:id', expenseController.updateDespesa);
router.delete('/:id', expenseController.deleteDespesa);


export default router;