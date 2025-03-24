import { env } from "@/env"
import { Secret } from "jsonwebtoken"

export const authConfig: {
   jwt: {
      secret: Secret, 
      expiresIn: `${number}D`
   }
} = {
   jwt: {
      secret: env.JWT_SECRET,
      expiresIn: "1D",
   }
}