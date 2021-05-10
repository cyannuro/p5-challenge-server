const { Model } = require(`sequelize`)
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Flight.hasMany(models.FlightPassenger, {
        as: `flightPassengers`,
        foreignKey: `flightId`,
      })
    }
  }
  Flight.init(
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      origin: DataTypes.STRING,
      destination: DataTypes.STRING,
      departureDate: DataTypes.DATE,
      arrivalDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: `Flight`,
      paranoid: true,
    },
  )
  return Flight
}
