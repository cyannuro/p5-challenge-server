const { Model } = require(`sequelize`)
module.exports = (sequelize, DataTypes) => {
  class FlightPassenger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FlightPassenger.belongsTo(models.Passenger, {
        as: `passenger`,
        foreignKey: `passengerId`,
      })
      FlightPassenger.belongsTo(models.Flight, {
        as: `flight`,
        foreignKey: `flightId`,
      })
      FlightPassenger.hasMany(models.Baggage, {
        as: `baggages`,
        foreignKey: `flightPassengerId`,
      })
    }
  }
  FlightPassenger.init(
    {},
    {
      sequelize,
      modelName: `FlightPassenger`,
      paranoid: true,
    },
  )
  return FlightPassenger
}
