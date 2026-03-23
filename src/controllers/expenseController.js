import expenseModel from '../models/expenseModels.js';

// Listar todas las despesas
function getAllDespesas(req, res) {
    const { category, startDate, endDate } = req.query; 

    let despesas = expenseModel.todasExpense();

    if (category) {
        despesas = despesas.filter(d => d.category === category);
    }

    if (startDate) {
        despesas = despesas.filter(d => new Date(d.date) >= new Date(startDate))
    }

    if (endDate) {
        despesas = despesas.filter(d => new Date(d.date) <= new Date(endDate))
    }

    if (despesas.length === 0) {
        let msg = "No se encontraron despesas";
        if (category) msg += ` para la categoría ${category}`;
        if (startDate || endDate) msg += " en ese rango de fechas";
        return res.status(404).json({ message: msg });
    }

    res.status(200).json(despesas);
}

// Buscar una despesa por ID
function getDespesaById(req, res) {
    const { id } = req.params;
    const despesa = expenseModel.buscarPorId(id);

    if (!despesa) {
        return res.status(404).json({ error: "Despesa no encontrada" });
    } 
    res.status(200).json(despesa)
}

// Crear una nueva despesa
function createDespesa(req, res) {
    try {
        const novaDespesa = expenseModel.crearExpense(req.body);
        res.status(201).json(novaDespesa);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Actualizar una despesa por ID
function updateDespesa(req, res) {
    try {
        const updated = expenseModel.actualizarExpense(req.params.id, req.body);

        if (!updated) {
            return res.status(404).json({ error: "Despesa no encontrada" });
        }

        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Eliminar una despesa por ID
function deleteDespesa(req, res) {
    const success = expenseModel.eliminarExpense(req.params.id);

    if (!success) {
        return res.status(404).json({ error: "Despesa no encontrada" });
    }

    res.json({ message: "Despesa eliminada con éxito" });
}


// Calcular total de despesas

function getTotalGasto(req, res) {
    const expense  = expenseModel.todasExpense()

    const total = expenseModel.totalSumado(expense)

    res.status(200).json({total: total})
}

// Calcular total de despesas por categoria 

function getTotalPorCategoria(req, res) {
    const expense = expenseModel.todasExpense();
    const totales = expenseModel.totalGastadoCategorias(expense);
    res.status(200).json(totales);
}
// Exportamos las funciones del controller
export default {
    getAllDespesas,
    getDespesaById,
    createDespesa,
    updateDespesa,
    deleteDespesa,
    getTotalGasto,
    getTotalPorCategoria
};