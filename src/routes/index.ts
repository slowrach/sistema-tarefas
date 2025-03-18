import { Router } from "express"
import { userRoutes } from "./user-routes" 
import { sessionRoutes } from "./session-routes"
import { deliveryRoutes } from "./delivery-routes"
import { logRoutes } from "./log-routes"

export const routes = Router ()

routes.use("/users", userRoutes)
routes.use("/sessions", sessionRoutes)
routes.use("/deliveries", deliveryRoutes)
routes.use("/logs", logRoutes)