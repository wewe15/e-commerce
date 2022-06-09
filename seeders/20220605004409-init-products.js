'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('products', [{
      name: 'Kitten heels',
      description: 'A kitten heel is a short, slender heel',
      price: 100,
      quantity: 50,
      rating: 0.0,
      num_reviews: 0,
      category_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Trainers',
      description: 'shoes for women designed more to specific sport or activity.',
      price: 100,
      quantity: 50,
      rating: 0.0,
      num_reviews: 0,
      category_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Trainers',
      description: 'Shoes with a flexible sole and lacing closure.',
      price: 100,
      quantity: 50,
      rating: 0.0,
      num_reviews: 0,
      category_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('products', null, {});
  }
};
