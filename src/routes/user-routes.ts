import { Router } from "express"
import { UserFuncs } from "../funcs/user-funcs"
import { authenticated } from "../middlewares/validToken"
import { authorization } from "../middlewares/authorization"

export const userRoutes = Router()
const userFuncs = new UserFuncs()

userRoutes.post("/", userFuncs.create)

userRoutes.use(authenticated, authorization(["admin"]))
userRoutes.get("/", userFuncs.show)