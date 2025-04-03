import request from "supertest"
import { app } from "../app"
import { prisma } from "../database/prisma"
import { env } from "../env"

describe("TeamFuncs", () => {
   let team_id: string
   let token: string
   let id: string
   let invalidTeam_id: string = "a6dc3f21-7c40-4360-8d25-f48d45978877"

   beforeAll(async () => {
      const sessionResponse = await request(app).post("/sessions").send({
         email: env.ADMIN_EMAIL,
         password: env.ADMIN_PASSWORD,
      })

      token = sessionResponse.body.token
   })

   afterAll(async () => {
      await prisma.teams.delete({ where: { id: team_id } })
   })

   it("create a team succesfully", async () => {
      const teamResponse = await request(app).post("/teams").auth(token, {type: "bearer"}).send({
         name: "Team Test"
      })

      team_id = teamResponse.body.id

      expect(teamResponse.status).toBe(201)
   })

   it("validation error if name of team is empty", async () => {
      const teamResponse = await request(app).post("/teams").auth(token, {type: "bearer"}).send({
         name: " "
      })

      expect(teamResponse.status).toBe(400)
      expect(teamResponse.body.message).toBe("validation error")
   })
   
   it("update team succesfully", async () => {
      const updateResponse = await request(app).put(`/teams/${team_id}`).auth(token, {type: "bearer"}).send({
         name: "Update Name",
         description: "Update Description"
      })

      expect(updateResponse.status).toBe(200)
   })

   it("validation error if updated name is empty", async () => {
      const updateResponse = await request(app).put(`/teams/${team_id}`).auth(token, {type: "bearer"}).send({
         name: " ",
      })

      expect(updateResponse.status).toBe(400)
      expect(updateResponse.body.message).toBe("validation error")
   })

   it("validation error if updated description is empty", async () => {
      const updateResponse = await request(app).put(`/teams/${team_id}`).auth(token, {type: "bearer"}).send({
         description: " ",
      })

      expect(updateResponse.status).toBe(400)
      expect(updateResponse.body.message).toBe("validation error")
   })

   it("Error if the team you want to update doesn't exist", async () => {
      const updateResponse = await request(app).put(`/teams/${invalidTeam_id}`).auth(token, {type: "bearer"}).send({
         title: "Test title",
         description: "Test description",
      })

      expect(updateResponse.status).toBe(404)
      expect(updateResponse.body.message).toBe("Team not found")
   })

   it("remove a team succesfully", async () => {
      const teamResponse = await request(app).post("/teams").auth(token, {type: "bearer"}).send({
         name: "Team Test"
      })

      id = teamResponse.body.id

      const removeResponse = await request(app).delete(`/teams/${id}`).auth(token, {type: "bearer"})

      expect(removeResponse.status).toBe(200)
   })

   it("Error if the team you want to remove doesn't exist", async () => {
      const removeResponse = await request(app).delete(`/teams/${invalidTeam_id}`).auth(token, {type: "bearer"})

      expect(removeResponse.status).toBe(404)
      expect(removeResponse.body.message).toBe("Team not found")
   })

   it("show teams succesfully", async () => {
      const teamResponse = await request(app).get("/teams").auth(token, {type: "bearer"})

      expect(teamResponse.status).toBe(200)
   })
})