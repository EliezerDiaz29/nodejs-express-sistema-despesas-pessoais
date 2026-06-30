import express from 'express';
import expenseRoutes from './routes/expenseRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import sequelize from './models/database.js';
import './models/associations.js';

const app = express();

app.use(express.json());

const PORT = 3000;

// API VERSIONING
app.use('/api/v1', userRoutes);
app.use('/api/v1/expenses', expenseRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

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

// GLOBAL ERROR HANDLER (must be last)
app.use(errorHandler);

async function databaseConnect() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('The database connection has been established');
        app.listen(PORT, () => {
            console.log('Server running on port', PORT);
        });

    } catch (err) {
        console.error('Could not connect to the Database', err);
    }
}

databaseConnect();