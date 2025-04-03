import { Request, Response } from "express"
import { prisma } from "../database/prisma" 
import { z } from "zod"
import { AppError } from "../utils/AppError"

export class TaskFuncs {
   async create(request: Request, response: Response) {
      const bodySchema = z.object({
         title: z.string().trim().min(1),
         description: z.optional(z.string().trim().min(1)),
         assignedTo: z.string(),
      })

      const { title, description, assignedTo } = bodySchema.parse(request.body)

      const user = await prisma.user.findUnique({ where: { id: assignedTo } })
      
      if (!user) {
         throw new AppError("This user doesn't exist", 404)
      }

      const team = await prisma.members.findUnique({ where: { userId: assignedTo }, select: { teamId: true } })

      const team_id = team?.teamId

      if (!team_id) {
         throw new AppError("You can't create a task, because the user don't belong to a team")
      }


      const task = await prisma.tasks.create({
         data: {
            title,
            description,
            assignedTo,
            teamId: team_id
         }
      }) 
            
      return response.status(201).json({ id: task.id, user })
   }

   async show(request: Request, response: Response) {
      const paramsSchema = z.object({
         id: z.string().uuid()
      })

      const { id } = paramsSchema.parse(request.params)

      const task = await prisma.tasks.findUnique({ where:  { id }})

      if (!task) {
         throw new AppError("Task not found", 404)
      }

      if(request.user?.role === "member" && request.user.id !== task?.assignedTo) {
         throw new AppError("The user can be only see their tasks", 401)
      }

      return response.json(task)
   }

   async update(request: Request, response: Response) {
      const paramsSchema = z.object({
         id: z.string().uuid()
      })

      const bodySchema = z.object({
         title: z.optional(z.string().trim().min(1)),
         description: z.optional(z.string().trim().min(1)),
         status: z.optional(z.enum(["pending", "in_progress", "completed"])),
         priority: z.optional(z.enum(["high", "medium", "low"]))
      })

      const { id } = paramsSchema.parse(request.params)

      const { title, description, status, priority } = bodySchema.parse(request.body)

      const taskUpdate = await prisma.tasks.findUnique({ where: { id } })

      if (!taskUpdate) {
         throw new AppError("Task not found", 404)
      }

      if(request.user?.role === "member" && request.user.id !== taskUpdate?.assignedTo) {
         throw new AppError("The user can only update their tasks", 401)
      }

      await prisma.tasks.update({
         data: {
            title,
            description,
            status,
            priority
         }, 
         where: {
            id,
         },
      })

      return response.json()
   }

   async remove(request: Request, response: Response) {
      const paramsSchema = z.object({
         id: z.string().uuid()
      })

      const { id } = paramsSchema.parse(request.params)

      const deleteTask = await prisma.tasks.findUnique({ where: { id } })

      if (!deleteTask) {
         throw new AppError("Task not found", 404)
      }

      await prisma.tasks.delete({ where: { id } })

      return response.json()
   }
}