import request from "supertest"
import { app } from "../app"
import { prisma } from "../database/prisma"

describe("UserFuncs", () => {
   let user_id: string

   afterAll(async () => {
      await prisma.user.delete({ where: { id: user_id } })
   })

   it("user is being created successfully", async () => {
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

   it("error if the user uses an email that already exists", async() => {
      const response = await request(app).post("/users").send({
         name: "Duplicate Test User",
         email: "test@example.com",
         password: "test123"
      })

      expect(response.status).toBe(400)
      expect(response.body.message).toBe("This email already exists")
   })

   it("validation error if email is invalid", async () => {
      const response = await request(app).post("/users").send({
         name: "Test User 2",
         email: "invalid-email",
         password: "test123",
      })

      expect(response.status).toBe(400)
      expect(response.body.message).toBe("validation error")
   })

   it("validation error if user is empty", async () => {
      const response = await request(app).post("/users").send({
         name: "",
         email: "test2@example.com",
         password: "test123",
      })

      expect(response.status).toBe(400)
      expect(response.body.message).toBe("validation error")
   })

   it("validation error if password contains less than 5 letters", async () => {
      const response = await request(app).post("/users").send({
         name: "Test User 3",
         email: "test3@example.com",
         password: "t12",
      })

      expect(response.status).toBe(400)
      expect(response.body.message).toBe("validation error")
   })
})