import { Request, Response } from "express"
import { z } from "zod"
import { prisma } from "../database/prisma"
import { AppError } from "../utils/AppError"

export class MemberFuncs {
   async create(request: Request, response: Response) {
      const bodySchema = z.object({
         teamId: z.string().uuid(),
         userId: z.string().uuid()
      })

      const { teamId, userId } = bodySchema.parse(request.body)

      const user = await prisma.user.findUnique({ where: { id: userId } })
      const team = await prisma.teams.findUnique({ where: { id: teamId } })

      if(!user) {
         throw new AppError("User not found", 404)
      }

      if(!team) {
         throw new AppError("Team not found", 404)
      }

      const members = await prisma.members.create({
         data: {
            teamId: teamId,
            userId: userId
         }
      })

      return response.status(201).json({ id: members.id })
   }

   async remove(request: Request, response: Response) {
      const paramsSchema = z.object({
         id: z.string().uuid()
      })

      const { id } = paramsSchema.parse(request.params)

      const user = await prisma.members.findUnique({ where: { userId: id }})

      if (!user) {
         throw new AppError("User not found", 404)
      }

      await prisma.members.delete({ where: { userId: id } })

      return response.json()
   }
}