const { Model } = require(`sequelize`)
module.exports = (sequelize, DataTypes) => {
  class Baggage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Baggage.belongsTo(models.FlightPassenger, {
        as: `flightPassenger`,
        foreignKey: `flightPassengerId`,
      })
      Baggage.belongsTo(models.BaggageType, {
        as: `baggageType`,
        foreignKey: `baggageTypeId`,
      })
      Baggage.belongsTo(models.BaggageStatus, {
        as: `baggageStatus`,
        foreignKey: `baggageStatusId`,
      })
    }
  }
  Baggage.init(
    {
      description: DataTypes.STRING,
      savedAt: DataTypes.DATE,
      claimedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: `Baggage`,
      paranoid: true,
    },
  )
  return Baggage
}
