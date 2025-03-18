import { Request, Response } from "express";
import { z } from "zod"
import { hash } from "bcrypt"
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

export class UserFuncs {
   async create(request: Request, response: Response) {
      const bodySchema = z.object({
         name: z.string().trim().min(1),
         email: z.string().email(),
         password: z.string().min(6)
      })

      const { name, email, password } = bodySchema.parse(request.body)

      const sameEmail = await prisma.user.findFirst({ where: { email } })

      if (sameEmail) {
         throw new AppError("This email already exists")
      }

      const hashedPassword = await hash(password, 8)

      const user = await prisma.user.create({
         data: {
            name,
            email,
            password: hashedPassword
         }
      })

      const { password: justpassword,...withoutPassword } = user

      return response.status(201).json(withoutPassword)
   }
}