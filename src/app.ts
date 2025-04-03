import express from "express"
import "express-async-errors"
import { routes } from "./routes/index"
import { errors } from "./middlewares/errors"

export const app = express()

app.use(express.json())

app.use(routes)

app.use(errors)