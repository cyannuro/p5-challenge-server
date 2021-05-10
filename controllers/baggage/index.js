import { Baggage, BaggageType, sequelize } from 'models'
import moment from 'moment'

export async function getBaggageTypes(req, res, next) {
  try {
    const baggageTypes = await BaggageType.findAll({
      attributes: [`id`, `name`],
      order: [[`id`, `ASC`]],
      raw: true,
    })
    return res.status(200).json({
      success: true,
      result: baggageTypes,
    })
  } catch (e) {
    return next(e)
  }
}

export async function createBaggage(req, res, next) {
  const transaction = await sequelize.transaction()
  try {
    const { payload } = req.body
    for await (const baggage of payload) {
      const { description, flightPassengerId, baggageTypeId } = baggage
      await Baggage.create(
        {
          description,
          savedAt: moment().format(),
          flightPassengerId,
          baggageTypeId,
          baggageStatusId: 1,
        },
        { transaction },
      )
    }
    await transaction.commit()
    return res.status(200).json({
      success: true,
      result: true,
    })
  } catch (e) {
    await transaction.rollback()
    return next(e)
  }
}

export async function updateBaggage(req, res, next) {
  const transaction = await sequelize.transaction()
  try {
    const { baggageIds } = req.body
    await Baggage.update(
      { baggageStatusId: 2, claimedAt: moment().format() },
      { where: { id: baggageIds }, transaction },
    )
    await transaction.commit()
    return res.status(200).json({
      success: true,
      result: true,
    })
  } catch (e) {
    await transaction.rollback()
    return next(e)
  }
}
