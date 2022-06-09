'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('images', [{
      path: 'uploads/kitten-heels.jpg',
      product_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      path: 'uploads/kitten-heels-both.jpg',
      product_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      path: 'uploads/sport-shoes-women.jpg',
      product_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      path: 'uploads/sport-shoes-women-both.jpg',
      product_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      path: 'uploads/sport-shoes-men.jpeg',
      product_id: 3,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('images', null, {});
  }
};
