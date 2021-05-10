module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(`BaggageStatuses`, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
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
    const defaultValues = [
      {
        id: 1,
        name: `Saved`,
      },
      {
        id: 2,
        name: `Claimed`,
      },
    ]
    await queryInterface.bulkInsert(`BaggageStatuses`, defaultValues)
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(`BaggageStatuses`)
  },
}
