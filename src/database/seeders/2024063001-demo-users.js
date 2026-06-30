'use strict';

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        nameUser: 'Eliezer',
        email: 'eliezer@test.com',
        password: '$2b$10$7QJx9yqv8QwXQm8v8vJ7qOe8mQv1pQm8qZk1vYxQh1bQm9pQv3aA6K',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nameUser: 'Maria',
        email: 'maria@test.com',
        password: '$2b$10$7QJx9yqv8QwXQm8v8vJ7qOe8mQv1pQm8qZk1vYxQh1bQm9pQv3aA6K',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};