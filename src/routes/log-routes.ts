import { Router } from "express"
import { LogFuncs } from "@/funcs/log-funcs"
import { authenticated } from "@/middlewares/validToken"
import { authorization } from "@/middlewares/authorization"

export const logRoutes = Router()
const logFuncs = new LogFuncs()

logRoutes.post("/", authenticated, authorization(["sale"]), logFuncs.create)
logRoutes.get("/:deliveryId/log", authenticated, authorization(["sale", "customer"]), logFuncs.show)