'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Airports' ,{
      type: 'FOREIGN KEY',
      fields: ['cityId'],
      name: 'city_foreign_key_constraint', // name property is optional
      references: {
        table: 'Cities',
        field: 'id'
      },
      onDelete: 'CASCADE', // this means that if a City is deleted, then all the Airports associated with it will be deleted
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Airports', 'city_foreign_key_constraint');
  }
};