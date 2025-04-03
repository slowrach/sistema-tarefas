import { Router } from "express"
import { TaskFuncs } from "../funcs/task-funcs"
import { authenticated } from "../middlewares/validToken"
import { authorization } from "../middlewares/authorization"

export const taskRoutes = Router()
const taskFuncs = new TaskFuncs()

taskRoutes.use(authenticated)
taskRoutes.get("/:id", authorization(["admin", "member"]), taskFuncs.show)
taskRoutes.put("/:id",  authorization(["admin", "member"]), taskFuncs.update)

taskRoutes.use(authorization(["admin"]))
taskRoutes.post("/", taskFuncs.create)
taskRoutes.delete("/:id", taskFuncs.remove)