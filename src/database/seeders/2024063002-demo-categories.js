'use strict';

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Comida',
        description: 'Gastos en alimentación diaria',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Transporte',
        description: 'Bus, gasolina, Uber',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Servicios',
        description: 'Internet, luz, agua',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Entretenimiento',
        description: 'Cine, streaming, salidas',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};