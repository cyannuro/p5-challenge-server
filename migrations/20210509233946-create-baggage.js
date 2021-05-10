module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(`Baggage`, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
      },
      savedAt: {
        type: Sequelize.DATE,
      },
      claimedAt: {
        type: Sequelize.DATE,
      },
      flightPassengerId: {
        type: Sequelize.INTEGER,
        references: {
          model: `FlightPassengers`,
          key: `id`,
        },
        allowNull: false,
      },
      baggageTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: `BaggageTypes`,
          key: `id`,
        },
        allowNull: false,
      },
      baggageStatusId: {
        type: Sequelize.INTEGER,
        references: {
          model: `BaggageStatuses`,
          key: `id`,
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(`Baggage`)
  },
}
