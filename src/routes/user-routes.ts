import { Router } from "express"
import { UserFuncs } from "@/funcs/user-funcs"

export const userRoutes = Router()
const userFuncs = new UserFuncs()

userRoutes.post("/", userFuncs.create)