import { Flight, FlightPassenger, Baggage } from 'models'
import moment from 'moment'
import Boom from '@hapi/boom'

export async function getFlights(req, res, next) {
  try {
    const rawPassengersByFlight = await Flight.findAll({
      attributes: [`id`, `name`, `code`],
      order: [[`id`, `ASC`]],
    })
    if (rawPassengersByFlight.length <= 0) {
      throw Boom.notFound(`Flights not found, please try again`)
    }
    const formattedFlights = rawPassengersByFlight.map(
      ({ id, name, code }) => ({ id, name: `${name} - ${code}` }),
    )
    return res.status(200).json({
      success: true,
      result: formattedFlights,
    })
  } catch (e) {
    return next(e)
  }
}

export async function getPassengers(req, res, next) {
  try {
    const { flightId } = req.query
    const rawPassengersByFlight = await FlightPassenger.findAll({
      attributes: [`id`],
      include: [
        {
          association: `passenger`,
          attributes: [`name`, `lastName`],
        },
      ],
      where: { flightId },
      order: [[`id`, `ASC`]],
    })
    if (rawPassengersByFlight.length <= 0) {
      throw Boom.notFound(`Passengers not found, please try again`)
    }
    const formattedPassengers = rawPassengersByFlight.map((rawPassenger) => {
      const {
        id: flightPassengerId,
        passenger: { name, lastName },
      } = rawPassenger.get({ plain: true })
      return {
        flightPassengerId,
        passenger: `${name} ${lastName}`,
      }
    })
    return res.status(200).json({
      success: true,
      result: formattedPassengers,
    })
  } catch (e) {
    return next(e)
  }
}

export async function getPassengersWithBaggage(req, res, next) {
  try {
    const { flightId } = req.query
    const rawPassengersByFlight = await FlightPassenger.findAll({
      attributes: [`id`],
      include: [
        {
          association: `baggages`,
          required: true,
          attributes: [`id`, `baggageStatusId`],
        },
        {
          association: `passenger`,
          attributes: [`name`, `lastName`],
        },
        {
          association: `flight`,
          attributes: [
            `code`,
            `origin`,
            `destination`,
            `departureDate`,
            `arrivalDate`,
          ],
        },
      ],
      where: { flightId },
      order: [[`id`, `ASC`]],
    })
    if (rawPassengersByFlight.length <= 0) {
      throw Boom.notFound(`Passengers not found, please try again`)
    }
    const formattedPassengers = rawPassengersByFlight.map((rawPassenger) => {
      const {
        id: flightPassengerId,
        passenger: { name, lastName },
        flight: { code, origin, destination, departureDate, arrivalDate },
        baggages,
      } = rawPassenger.get({ plain: true })
      return {
        flightPassengerId,
        passenger: `${name} ${lastName}`,
        baggageStatus: baggages[0].baggageStatusId === 1 ? `Saved` : `Claimed`,
        wasClaimed: baggages[0].baggageStatusId === 2,
        flight: `${origin} -> ${destination} (${code})`,
        departureDate: moment(departureDate).format(`MM/DD/YYYY hh:mm:ss`),
        arrivalDate: moment(arrivalDate).format(`MM/DD/YYYY hh:mm:ss`),
      }
    })
    return res.status(200).json({
      success: true,
      result: formattedPassengers,
    })
  } catch (e) {
    return next(e)
  }
}

export async function getPassengerBaggage(req, res, next) {
  try {
    const { flightPassengerId } = req.query
    const rawPassengerBaggages = await Baggage.findAll({
      attributes: [`id`, `description`, `savedAt`, `claimedAt`],
      include: [
        {
          association: `baggageType`,
          attributes: [`name`],
        },
        {
          association: `baggageStatus`,
          attributes: [`name`],
        },
      ],
      where: { flightPassengerId },
      order: [[`id`, `ASC`]],
    })
    if (rawPassengerBaggages.length <= 0) {
      throw Boom.notFound(`Baggages not found, please try again`)
    }
    const formattedBaggages = rawPassengerBaggages.map((rawBaggage) => {
      const {
        id,
        description,
        savedAt,
        claimedAt,
        baggageType: { name: baggageType },
        baggageStatus: { name: baggageStatus },
      } = rawBaggage.get({ plain: true })
      return {
        id,
        description,
        savedAt: moment(savedAt).format(`MM/DD/YYYY hh:mm:ss`),
        claimedAt: claimedAt
          ? moment(claimedAt).format(`MM/DD/YYYY hh:mm:ss`)
          : null,
        baggageType,
        baggageStatus,
      }
    })
    return res.status(200).json({
      success: true,
      result: formattedBaggages,
    })
  } catch (e) {
    return next(e)
  }
}
