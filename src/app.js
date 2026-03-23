import express from 'express';
import expenseRoutes from './routes/expenseRoutes.js'; 

const app = express()

const PORT = 3000;

app.use(express.json())

app.use('/despesas', expenseRoutes)

app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT))