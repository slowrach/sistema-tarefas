import { Router } from "express"
import { TeamFuncs } from "../funcs/team-funcs"
import { authenticated } from "../middlewares/validToken"
import { authorization } from "../middlewares/authorization"

export const teamRoutes = Router()
const teamFuncs = new TeamFuncs()

teamRoutes.use(authenticated, authorization(["admin"]))

teamRoutes.post("/", teamFuncs.create)
teamRoutes.put("/:id", teamFuncs.update)
teamRoutes.delete("/:id", teamFuncs.remove)
teamRoutes.get("/", teamFuncs.show)