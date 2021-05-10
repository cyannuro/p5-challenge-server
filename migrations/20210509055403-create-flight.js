const moment = require(`moment`)

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(`Flights`, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      code: {
        type: Sequelize.STRING,
      },
      origin: {
        type: Sequelize.STRING,
      },
      destination: {
        type: Sequelize.STRING,
      },
      departureDate: {
        type: Sequelize.DATE,
      },
      arrivalDate: {
        type: Sequelize.DATE,
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
        name: `Santiago to Toronto`,
        code: `STO79`,
        origin: `Santiago (SCL)`,
        destination: `Toronto (YYZ)`,
        departureDate: moment().add(3, `hours`).format(),
        arrivalDate: moment().add(23, `hours`).format(),
      },
      {
        id: 2,
        name: `Santiago to Buenos Aires`,
        code: `SBA31`,
        origin: `Santiago (SCL)`,
        destination: `Buenos Aires (EZE)`,
        departureDate: moment().add(2, `hours`).format(),
        arrivalDate: moment().add(4, `hours`).format(),
      },
      {
        id: 3,
        name: `Santiago to Tokyo`,
        code: `STK66`,
        origin: `Santiago (SCL)`,
        destination: `Tokyo (NRT)`,
        departureDate: moment().add(5, `hours`).format(),
        arrivalDate: moment().add(35, `hours`).format(),
      },
    ]
    await queryInterface.bulkInsert(`Flights`, defaultValues)
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(`Flights`)
  },
}
