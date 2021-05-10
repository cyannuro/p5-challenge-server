import express from 'express'
import {
  getBaggageTypes,
  createBaggage,
  updateBaggage,
} from 'controllers/baggage'

const router = express.Router()

router.get(`/getBaggageTypes`, getBaggageTypes)
router.post(`/`, createBaggage)
router.put(`/`, updateBaggage)

export default router
