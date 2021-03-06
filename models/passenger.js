const { Model } = require(`sequelize`)
module.exports = (sequelize, DataTypes) => {
  class Passenger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Passenger.hasMany(models.FlightPassenger, {
        as: `flightPassengers`,
        foreignKey: `passengerId`,
      })
    }
  }
  Passenger.init(
    {
      name: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: `Passenger`,
      paranoid: true,
    },
  )
  return Passenger
}
