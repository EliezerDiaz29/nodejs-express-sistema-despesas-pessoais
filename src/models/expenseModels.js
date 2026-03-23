const expense = []; // Array para almacenar las despesas
let proximoID = 1; // Variable para generar IDs únicos

// Función para obtener todas las despesas
function todasExpense() {
    return expense;
}

// Función para obtener una despesa por su ID
function buscarPorId(id) {
    return expense.find(despesa => despesa.id === id);
}

// Función para crear una nueva despesa
function crearExpense(data) {

    if (!data.title) throw new Error("El campo title es obligatorio");
    if (data.amount <= 0) throw new Error("El amount debe ser mayor que 0");
    if (new Date(data.date) > new Date()) throw new Error("La date no puede ser futura");

    const nuevaDespesa = {
        id: 'exp_' + proximoID++, 
        title: data.title,
        amount: data.amount,
        category: data.category,
        date: data.date,
        description: data.description || '',
        createdAt: new Date().toISOString().split('.')[0]
    };

    expense.push(nuevaDespesa);
    return nuevaDespesa;
}

// Función para actualizar una despesa por su ID
function actualizarExpense(id, data) {

    if (data.title !== undefined && !data.title) throw new Error("El campo title es obligatorio");
    if (data.amount !== undefined && data.amount <= 0) throw new Error("El amount debe ser mayor que 0");
    if (data.date !== undefined && new Date(data.date) > new Date()) throw new Error("La date no puede ser futura");

    const despesa = buscarPorId(id);
    if (!despesa) {
        return null;
    }

    if ('id' in data) delete data.id; 

    Object.assign(despesa, data);
    return despesa;
}

// Función para eliminar una despesa por su ID
function eliminarExpense(id) {
    const index = expense.findIndex(despesa => despesa.id === id);
    if (index === -1) {
        return false;
    }
    expense.splice(index, 1);
    return true;
}

// funcion para sumar todas las despesas por amount

function totalSumado(expense) {
    let total = 0;
    for(let i = 0; i < expense.length; i++){
        total = total + expense[i].amount
    }

    return total;
}

// funcion para separar por categoria el total de gastos

function totalGastadoCategorias(expense){
    
    let totales = {}

    for(let i = 0; i < expense.length; i++){
        if(!totales [expense[i].category]) {
            totales[expense[i].category] = expense[i].amount;
        } else {
            totales[expense[i].category] += expense[i].amount;
        }
    }
    return totales; 
}

export default {
    todasExpense,
    buscarPorId,
    crearExpense,
    actualizarExpense,
    eliminarExpense,
    totalSumado,
    totalGastadoCategorias
};