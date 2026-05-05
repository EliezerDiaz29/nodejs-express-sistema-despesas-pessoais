import express from 'express';
import expenseRoutes from './routes/expenseRoutes.js';

const app = express();

app.use(express.json());

// API VERSIONING
app.use('/api/v1/expenses', expenseRoutes);

// HEALTH CHECK
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'API running'
    });
});

// 404 HANDLER
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});