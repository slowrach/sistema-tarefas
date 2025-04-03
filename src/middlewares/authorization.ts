import { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/AppError"

export function authorization(role: string[]) {
   return (request: Request, response: Response, next: NextFunction) => {
      if(!request.user || request.user && !role.includes(request.user.role)) {
         throw new AppError("Unauthorized", 401)
      }

      return next()
   }
}