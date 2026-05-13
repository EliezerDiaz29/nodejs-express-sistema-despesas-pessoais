import express from 'express';
import expenseRoutes from './routes/expenseRoutes.js';
import sequelize from './models/database.js';
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

async function databaseConnect() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({alter: true});
        console.log('The Database connection as been established'); 
        app.listen(3000, () => {
            console.log('Server running on port 3000');
    });

    } catch (err) {
        console.error('Could not connect to the Database', err)
    }
    
}

databaseConnect()




