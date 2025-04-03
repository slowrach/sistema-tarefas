import { Router } from "express"
import { MemberFuncs } from "../funcs/member-funcs"
import { authenticated } from "../middlewares/validToken"
import { authorization } from "../middlewares/authorization"

export const memberRoutes = Router()
const memberFuncs = new MemberFuncs()

memberRoutes.use(authenticated, authorization(["admin"]))
memberRoutes.post("/", memberFuncs.create)
memberRoutes.delete("/:id", memberFuncs.remove)