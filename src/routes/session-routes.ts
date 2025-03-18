import { Router } from "express"
import { SessionFuncs } from "@/funcs/session-funcs"

export const sessionRoutes = Router() 
const sessionFuncs = new SessionFuncs()

sessionRoutes.post("/", sessionFuncs.create)