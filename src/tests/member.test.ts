import request from "supertest"
import { app } from "../app"
import { prisma } from "../database/prisma"
import { env } from "../env"

describe("MemberFuncs", () => {
   let token: string
   let team_id: string
   let user_id: string
   let undefined_team: number = 1234
   let undefined_user: number = 456
   let error_team: string = "c7d0c230-fa0d-47eb-9f0b-00769d4a11de"
   let error_user: string = "126c9477-dcef-4c21-94a9-a38ed7f9ae5a"
   
   beforeAll(async () => {
      const sessionResponse = await request(app).post("/sessions").send({
         email: env.ADMIN_EMAIL,
         password: env.ADMIN_PASSWORD,
      })
   
      token = sessionResponse.body.token

      const teamResponse = await request(app).post("/teams").auth(token, {type: "bearer"}).send({
         name: "Team Test 2"
      })

      team_id = teamResponse.body.id

      const userResponse = await request(app).post("/users").send({
         name: "Test Member",
         email: "member@example.com",
         password: "test123", 
      })

      user_id = userResponse.body.id
   })

   afterAll(async () => {
      await prisma.teams.delete({ where: { id: team_id } })
      await prisma.user.delete({ where: { id: user_id } })
   })

   it("create a member succesfully", async () => {
      const memberResponse = await request(app).post("/members").auth(token, {type: "bearer"}).send({
         teamId: team_id,
         userId: user_id,
      })

      expect(memberResponse.status).toBe(201)
   })

   it("error if team is not found", async () => {
      const memberResponse = await request(app).post("/members").auth(token, {type: "bearer"}).send({
         teamId: error_team,
         userId: user_id,
      })

      expect(memberResponse.status).toBe(404)
      expect(memberResponse.body.message).toBe("Team not found")
   })

   it("error if user is not found", async () => {
      const memberResponse = await request(app).post("/members").auth(token, {type: "bearer"}).send({
         teamId: team_id,
         userId: error_user,
      })

      expect(memberResponse.status).toBe(404)
      expect(memberResponse.body.message).toBe("User not found")
   })

   it("validation error if user id is not a string", async () => {
      const memberResponse = await request(app).post("/members").auth(token, {type: "bearer"}).send({
         teamId: team_id,
         userId: undefined_user,
      })

      expect(memberResponse.status).toBe(400)
      expect(memberResponse.body.message).toBe("validation error")
   })

   it("validation error if team id is not a string", async () => {
      const memberResponse = await request(app).post("/members").auth(token, {type: "bearer"}).send({
         teamId: undefined_team,
         userId: user_id,
      })

      expect(memberResponse.status).toBe(400)
      expect(memberResponse.body.message).toBe("validation error")
   })

   it("remove a member not found", async () => {
      const removeResponse = await request(app).delete(`/members/${error_user}`).auth(token, {type: "bearer"})

      expect(removeResponse.status).toBe(404)
      expect(removeResponse.body.message).toBe("User not found")
   })

   it("remove a member succesfully", async () => {
      const removeResponse = await request(app).delete(`/members/${user_id}`).auth(token, {type: "bearer"})

      expect(removeResponse.status).toBe(200)
   })
})