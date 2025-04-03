import request from "supertest"
import { app } from "../app"
import { prisma } from "../database/prisma"
import { env } from "../env"

describe("TaskMemberFuncs", () => {
   let token: string
   let tokenMember: string
   let user1_id: string
   let user2_id: string
   let team_id: string
   let member1_id: string
   let member2_id: string
   let task1_id: string
   let task2_id: string
   
   beforeAll(async () => {
      const user1 = await request(app).post("/users").send({
         name: "Test Member Task",
         email: "membertask1@example.com",
         password: "test123", 
      })
      
      user1_id = user1.body.id

      const user2 = await request(app).post("/users").send({
         name: "Test Member Task",
         email: "membertask2@example.com",
         password: "test123", 
      })
      
      user2_id = user2.body.id

      const sessionResponse = await request(app).post("/sessions").send({
         email: env.ADMIN_EMAIL,
         password: env.ADMIN_PASSWORD,
      })
            
      token = sessionResponse.body.token
      
      const teamResponse = await request(app).post("/teams").auth(token, {type: "bearer"}).send({
         name: "Team Test 6"
      })
      
      team_id = teamResponse.body.id

      const member1 = await request(app).post("/members").auth(token, {type: "bearer"}).send({
         teamId: team_id,
         userId: user1_id,
      })

      member1_id = member1.body.id

      const member2 = await request(app).post("/members").auth(token, {type: "bearer"}).send({
         teamId: team_id,
         userId: user2_id,
      })

      member2_id = member2.body.id

      const task1 = await request(app).post("/tasks").auth(token, {type: "bearer"}).send({
         title: "Task Test 3",
         assignedTo: user1_id,
      })
      
      task1_id = task1.body.id

      const task2 = await request(app).post("/tasks").auth(token, {type: "bearer"}).send({
         title: "Task Test 3",
         assignedTo: user2_id,
      })
      
      task2_id = task2.body.id
   })

   afterAll(async () => {
      await prisma.tasks.delete({ where: { id: task1_id } })
      await prisma.tasks.delete({ where: { id: task2_id } })
      await prisma.members.delete({ where: { id: member1_id } })
      await prisma.members.delete({ where: { id: member2_id } })
      await prisma.teams.delete({ where: { id: team_id } })
      await prisma.user.delete({ where: { id: user1_id } })
      await prisma.user.delete({ where: { id: user2_id } })
   })
   
   it("The member can view their task succesfully", async () => {
      const sessionResponse = await request(app).post("/sessions").send({
         email: "membertask1@example.com",
         password: "test123",
      })

      tokenMember = sessionResponse.body.token

      const taskResponse = await request(app).get(`/tasks/${task1_id}`).auth(tokenMember, {type: "bearer"})
      
      expect(taskResponse.status).toBe(200)
   })

   it("The member can't view another member's tasks", async () => {
      const sessionResponse = await request(app).post("/sessions").send({
         email: "membertask1@example.com",
         password: "test123",
      })

      tokenMember = sessionResponse.body.token

      const taskResponse = await request(app).get(`/tasks/${task2_id}`).auth(tokenMember, {type: "bearer"})
      
      expect(taskResponse.status).toBe(401)
      expect(taskResponse.body.message).toBe("The user can be only see their tasks")
   })

   it("The member updates their tasks succesfully", async () => {
      const sessionResponse = await request(app).post("/sessions").send({
         email: "membertask1@example.com",
         password: "test123",
      })

      tokenMember = sessionResponse.body.token

      const updateResponse = await request(app).put(`/tasks/${task1_id}`).auth(tokenMember, {type: "bearer"}).send({
         title: "Updated Title",
         description: "Task Description",
         status: "in_progress",
         priority: "low",
      })

      expect(updateResponse.status).toBe(200)
   })

   it("The member can't update another member's tasks", async () => {
      const sessionResponse = await request(app).post("/sessions").send({
         email: "membertask1@example.com",
         password: "test123",
      })

      tokenMember = sessionResponse.body.token

      const updateResponse = await request(app).put(`/tasks/${task2_id}`).auth(tokenMember, {type: "bearer"}).send({
         title: "Updated Title",
         description: "Task Description",
         status: "in_progress",
         priority: "low",
      })

      expect(updateResponse.status).toBe(401)
      expect(updateResponse.body.message).toBe("The user can only update their tasks")
   })
})