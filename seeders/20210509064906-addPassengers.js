const faker = require(`faker`)

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const defaultData = []
    for (let i = 1; i <= 50; i++) {
      defaultData.push({
        id: i,
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
      })
    }
    await queryInterface.bulkInsert(`Passengers`, defaultData, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(`Passengers`, null, {})
  },
}
