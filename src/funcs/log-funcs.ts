import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { AppError } from "@/utils/AppError"

export class LogFuncs {
   async create(request: Request, response: Response) {
      const bodySchema = z.object({
         deliveryId: z.string().uuid(),
         description: z.string()
      })

      const { deliveryId, description } = bodySchema.parse(request.body)

      const delivery = await prisma.delivery.findUnique({
         where: { id: deliveryId }
      })

      if(!delivery) {
         throw new AppError("Delivery not found", 404)
      }

      if(delivery.status === "delivered") {
         throw new AppError("This order has already been delivered")
      }

      if(delivery.status === "processing") {
         throw new AppError("Send the delivery first")
      }

      await prisma.logs.create({
         data: {
            deliveryId: deliveryId,
            description
         }
      })

      return response.status(201).json()
   }

   async show(request: Request, response: Response) {
      const paramsSchema = z.object({
         deliveryId: z.string().uuid(),
      })

      const { deliveryId } = paramsSchema.parse(request.params)

      const delivery = await prisma.delivery.findUnique({ 
         where: { id: deliveryId },
         include: {
            user: { select: { name: true, email: true } },
            logs: true,
         }, 
      })

      if(request.user?.role === "customer" && request.user.id !== delivery?.userId) {
         throw new AppError("The user can only see their deliveries", 401)
      }

      return response.json(delivery)
   }
}