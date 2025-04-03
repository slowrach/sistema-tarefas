import { Router } from "express"
import { userRoutes } from "./user-routes"
import { sessionRoutes } from "./session-routes"
import { teamRoutes } from "./team-routes"
import { memberRoutes } from "./member-routes"
import { taskRoutes } from "./task-routes"

export const routes = Router()

routes.use("/users", userRoutes)
routes.use("/sessions", sessionRoutes)
routes.use("/teams", teamRoutes)
routes.use("/members", memberRoutes)
routes.use("/tasks", taskRoutes)