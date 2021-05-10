import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { errorHandler, wrapErrors } from 'middlewares'
import indexRouter from './routes/index'
const app = express()

app.use(helmet())
app.use(cors())
app.use(logger(`dev`))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, `public`)))
app.use(wrapErrors)
app.use(errorHandler)

app.use(`/api`, indexRouter)

export default app
