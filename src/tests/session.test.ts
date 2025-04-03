import request from "supertest"
import { app } from "../app"
import { prisma } from "../database/prisma"

describe("SessionFuncs", () => {
   let user_id: string

   afterAll(async () => {
      await prisma.user.delete({ where: { id: user_id } })
   })

   it("authenticate and receive a token", async () => {
      const userResponse = await request(app).post("/users").send({
         name: "Session Test User",
         email: "session@example.com",
         password: "session123"
      })

      user_id = userResponse.body.id

      const sessionResponse = await request(app).post("/sessions").send({
         email: "session@example.com",
         password: "session123",
      })

      expect(sessionResponse.status).toBe(201)
      expect(sessionResponse.body.token).toEqual(expect.any(String))
   })

   it("validation error if email is invalid", async () => {
      const sessionResponse = await request(app).post("/sessions").send({
         email: "error@example.com",
         password: "session123",
      })

      expect(sessionResponse.status).toBe(401)
      expect(sessionResponse.body.message).toBe("Invalid email or password")
   })

   it("validation error if password is invalid", async () => {
      const sessionResponse = await request(app).post("/sessions").send({
         email: "session@example.com",
         password: "error123",
      })

      expect(sessionResponse.status).toBe(401)
      expect(sessionResponse.body.message).toBe("Invalid email or password")
   })
})