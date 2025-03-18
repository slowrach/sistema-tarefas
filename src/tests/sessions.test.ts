import request from "supertest"
import { app } from "@/app"
import { prisma } from "@/database/prisma"

describe("Sessions", () => {
   let user_id: string

   afterAll(async () => {
      await prisma.user.delete({ where: { id: user_id } })
   })

   it("if authenticate and receive a token", async () => {
      const userResponse = await request(app).post("/users").send({
         name: "Session Test User",
         email: "sessiontest@example.com",
         password: "test123",
      })

      user_id = userResponse.body.id

      const sessionResponse = await request(app).post("/sessions").send({
         email: "sessiontest@example.com",
         password: "test123",
      })

      expect(sessionResponse.status).toBe(201)
      expect(sessionResponse.body.token).toEqual(expect.any(String))
   })
})