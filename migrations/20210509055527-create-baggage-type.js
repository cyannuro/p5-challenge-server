module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(`BaggageTypes`, {
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
        name: `Large`,
      },
      {
        id: 2,
        name: `Small`,
      },
      {
        id: 3,
        name: `Clothing`,
      },
    ]
    await queryInterface.bulkInsert(`BaggageTypes`, defaultValues)
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(`BaggageTypes`)
  },
}
