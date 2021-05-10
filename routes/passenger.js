import express from 'express'
import {
  getFlights,
  getPassengers,
  getPassengersWithBaggage,
  getPassengerBaggage,
} from 'controllers/passenger'

const router = express.Router()

router.get(`/getFlights`, getFlights)
router.get(`/getPassengers`, getPassengers)
router.get(`/getPassengersWithBaggage`, getPassengersWithBaggage)
router.get(`/getPassengerBaggage`, getPassengerBaggage)

export default router
