import request from "supertest"
import { app } from "@/app"
import { prisma } from "@/database/prisma"

describe("Users", () => {
   let user_id: string

   afterAll(async () => {
      await prisma.user.delete({ where: { id: user_id } })
   })

   it("create a new user successfully", async () => {
      const response = await request(app).post("/users").send({
         name: "Test User",
         email: "test@example.com",
         password: "test123",
      })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty("id")
      expect(response.body.name).toBe("Test User")

      user_id = response.body.id
   })

   it("error if the user uses an email that already exists", async () => {
      const response = await request(app).post("/users").send({
         name: "Duplicate Test User",
         email: "test@example.com",
         password: "test123",
      })

      expect(response.status).toBe(400)
      expect(response.body.message).toBe("This email already exists")
   })

   it("error validation if email is invalid", async () => {
      const response = await request(app).post("/users").send({
         name: "Test User",
         email: "invalid-email",
         password: "test123",
      })

      expect(response.status).toBe(400)
      expect(response.body.message).toBe("validation error")
   })

   it("error if user is empty", async () => {
      const response = await request(app).post("/users").send({
         name: "",
         email: "invalid-email",
         password: "test123",
      })

      expect(response.status).toBe(400)
   })
})