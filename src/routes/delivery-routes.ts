import { Router } from "express"
import { DeliveryFuncs } from "@/funcs/delivery-funcs"
import { authenticated } from "@/middlewares/validToken"
import { authorization } from "@/middlewares/authorization"

export const deliveryRoutes = Router()
const deliveryFuncs = new DeliveryFuncs()

deliveryRoutes.use(authenticated, authorization(["sale"]))
deliveryRoutes.post("/", deliveryFuncs.create)
deliveryRoutes.get("/", deliveryFuncs.index)
deliveryRoutes.patch("/:id/status", deliveryFuncs.update)