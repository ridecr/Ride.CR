"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("admin_VerifDriverRatings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      AdminId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      DriverRatingId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      Verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      Comment: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("admin_VerifDriverRatings");
  },
};
