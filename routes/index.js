import express from 'express'
import passengerRouter from './passenger'
import baggageRouter from './baggage'

const router = express.Router()

router.use(`/passenger`, passengerRouter)
router.use(`/baggage`, baggageRouter)

export default router
