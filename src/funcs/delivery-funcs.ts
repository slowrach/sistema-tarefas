import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"
 
export class DeliveryFuncs {
   async create(request: Request, response: Response) {
      const bodySchema = z.object({
         userId: z.string().uuid(),
         product: z.string(),
      })

      const { userId, product } = bodySchema.parse(request.body)

      await prisma.delivery.create({
         data: {
            userId: userId,
            product
         },
      })

      return response.status(201).json()
   }

   async index(request: Request, response: Response) {
      const deliveries = await prisma.delivery.findMany({
         include: {
            user: { select: { name: true, email: true } }
         }
      })

      return response.json({ deliveries })
   }

   async update(request: Request, response: Response) {
      const paramsSchema = z.object({
         id: z.string().uuid(),
      })

      const bodySchema = z.object({
         status: z.enum(["processing", "sent", "delivered"]),
      })

      const { id } = paramsSchema.parse(request.params)
      const { status } = bodySchema.parse(request.body)

      await prisma.delivery.update({
         data: {
            status,
         },
         where: {
            id,
         },
      })

      return response.json()
   }
}