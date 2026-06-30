'use strict';

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert('expenses', [
      {
        title: 'Supermercado',
        description: 'Compra del mes',
        amount: 150.50,
        date: '2026-06-01',
        status: 'PAID',
        categoryId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Internet',
        description: 'Factura mensual',
        amount: 90.00,
        date: '2026-06-10',
        status: 'PENDING',
        categoryId: 3,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cine',
        description: 'Salida con amigos',
        amount: 40.00,
        date: '2026-06-15',
        status: 'PAID',
        categoryId: 4,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('expenses', null, {});
  }
};