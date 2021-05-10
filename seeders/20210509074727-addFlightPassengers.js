module.exports = {
  up: async (queryInterface, Sequelize) => {
    const defaultData = []
    for (let i = 1; i <= 50; i++) {
      defaultData.push({
        passengerId: i,
        flightId: Math.floor(Math.random() * 3) + 1,
      })
    }
    await queryInterface.bulkInsert(`FlightPassengers`, defaultData, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(`FlightPassengers`, null, {})
  },
}
