import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { AppError } from "@/utils/AppError"
import { compare } from "bcrypt"
import { authConfig } from "@/configs/auth"
import { sign } from "jsonwebtoken"

export class SessionFuncs {
   async create(request: Request, response: Response) {
      const bodySchema = z.object({
         email: z.string().email(),
         password: z.string()
      })

      const { email, password } = bodySchema.parse(request.body)

      const user = await prisma.user.findFirst({ where: { email } })

      if (!user) {
         throw new AppError("Invalid email or password", 401)
      }

      const passwordComparison = await compare(password, user.password)

      if (!passwordComparison) {
         throw new AppError("Invalid email or password", 401)
      }

      const { expiresIn, secret } = authConfig.jwt

      const token = sign({ role: user.role ?? "customer" }, secret, {
         subject: user.id,
         expiresIn,
      })

      const { password: justPassword, ...withoutPassword } = user

      return response.status(201).json({ token, user: withoutPassword })
   }
}