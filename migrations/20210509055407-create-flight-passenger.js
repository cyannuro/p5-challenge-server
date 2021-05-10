module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(`FlightPassengers`, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      passengerId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Passengers`,
          key: `id`,
        },
        allowNull: false,
      },
      flightId: {
        type: Sequelize.INTEGER,
        references: {
          model: `Flights`,
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
    await queryInterface.dropTable(`FlightPassengers`)
  },
}
