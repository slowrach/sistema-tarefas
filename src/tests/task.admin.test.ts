import request from "supertest"
import { app } from "../app"
import { prisma } from "../database/prisma"
import { env } from "../env"

describe("TaskAdminFuncs", () => {
   let token: string
   let team_id: string
   let user_id: string
   let task_id: string
   let member_id: string
   let userError_id: string
   let undefinedUser_id: string = "c8b3d9ad-e8a2-4ed3-b07c-bd4d4ccd209e"
   let undefinedTask_id: string = "02c4df0c-4fb6-4750-aa41-3070ec92d6ce"
   
   beforeAll(async () => {
      const sessionResponse = await request(app).post("/sessions").send({
         email: env.ADMIN_EMAIL,
         password: env.ADMIN_PASSWORD,
      })
      
      token = sessionResponse.body.token

      const userResponse = await request(app).post("/users").send({
         name: "Test User Task",
         email: "task@example.com",
         password: "test123", 
      })

      user_id = userResponse.body.id

      const teamResponse = await request(app).post("/teams").auth(token, {type: "bearer"}).send({
         name: "Team Test 4"
      })

      team_id = teamResponse.body.id
      
      const memberResponse = await request(app).post("/members").auth(token, {type: "bearer"}).send({
         teamId: team_id,
         userId: user_id,
      })

      member_id = memberResponse.body.id
   })

   afterAll(async () => {
      await prisma.members.delete({ where: { id: member_id } })
      await prisma.teams.delete({ where: { id: team_id } })
      await prisma.user.delete({ where: { id: user_id } })
      await prisma.user.delete({ where: { id: userError_id } })
   })
   
   it ("Create a task succesfully", async () => {
      const taskResponse = await request(app).post("/tasks").auth(token, {type: "bearer"}).send({
         title: "Task Test",
         assignedTo: user_id,
      })

      task_id = taskResponse.body.id

      expect(taskResponse.status).toBe(201)
   })

   it ("Error creating a task if user is not a member of a team", async () => {
      const userResponse = await request(app).post("/users").send({
         name: "Test User Task 2",
         email: "taskerror@example.com",
         password: "test123", 
      })

      userError_id = userResponse.body.id

      const taskResponse = await request(app).post("/tasks").auth(token, {type: "bearer"}).send({
         title: "Task Test 2",
         assignedTo: userError_id,
      })

      expect(taskResponse.status).toBe(400)
      expect(taskResponse.body.message).toBe("You can't create a task, because the user don't belong to a team")
   })

   it("Validation error if the task title is empty", async () => {
      const taskResponse = await request(app).post("/tasks").auth(token, {type: "bearer"}).send({
         title: " ",
         assignedTo: user_id,
      })

      expect(taskResponse.status).toBe(400)
      expect(taskResponse.body.message).toBe("validation error")
   })

   it("Validation error if the task description is empty", async () => {
      const taskResponse = await request(app).post("/tasks").auth(token, {type: "bearer"}).send({
         title: "Test Task 3",
         description: " ",
         assignedTo: user_id,
      })

      expect(taskResponse.status).toBe(400)
      expect(taskResponse.body.message).toBe("validation error")
   })

   it("Error if user doesn't exist", async () => {
      const taskResponse = await request(app).post("/tasks").auth(token, {type: "bearer"}).send({
         title: "Test Task 3",
         assignedTo: undefinedUser_id,
      })

      expect(taskResponse.status).toBe(404)
      expect(taskResponse.body.message).toBe("This user doesn't exist")
   })

   it("Validation error if 'assignedTo' id is not a string", async () => {
      const taskResponse = await request(app).post("/tasks").auth(token, {type: "bearer"}).send({
         title: "Test Task 4",
         assignedTo: 1234,
      })

      expect(taskResponse.status).toBe(400)
      expect(taskResponse.body.message).toBe("validation error")
   })

   it("Show task succesfully", async () => {
      const taskResponse = await request(app).get(`/tasks/${task_id}`).auth(token, {type: "bearer"})

      expect(taskResponse.status).toBe(200)
   })

   it("Error if task doesn't exist", async () => {
      const taskResponse = await request(app).get(`/tasks/${undefinedTask_id}`).auth(token, {type: "bearer"})

      expect(taskResponse.status).toBe(404)
      expect(taskResponse.body.message).toBe("Task not found")
   })

   it("Update a task succesfully", async () => {
      const taskResponse = await request(app).put(`/tasks/${task_id}`).auth(token, {type: "bearer"}).send({
         title: "Updated Title",
         description: "Task Description",
         status: "in_progress",
         priority: "low",
      })

      expect(taskResponse.status).toBe(200)
   })

   it("Task that's updated doesn't exist", async () => {
      const taskResponse = await request(app).put(`/tasks/${undefinedTask_id}`).auth(token, {type: "bearer"}).send({
         title: "Updated Title",
         description: "Task Description",
         status: "in_progress",
         priority: "low",
      })

      expect(taskResponse.status).toBe(404)
      expect(taskResponse.body.message).toBe("Task not found")
   })

   it("Validation error if updated status isn't 'in_progress' or 'completed'", async () => {
      const taskResponse = await request(app).put(`/tasks/${task_id}`).auth(token, {type: "bearer"}).send({
         status: "error status",
      })

      expect(taskResponse.status).toBe(400)
      expect(taskResponse.body.message).toBe("validation error")
   })

   it("Validation error if updated priority isn't 'medium' or 'low'", async () => {
      const taskResponse = await request(app).put(`/tasks/${task_id}`).auth(token, {type: "bearer"}).send({
         priority: "error priority",
      })

      expect(taskResponse.status).toBe(400)
      expect(taskResponse.body.message).toBe("validation error")
   })

   it("Delete a task succesfully", async () => {
      const taskResponse = await request(app).delete(`/tasks/${task_id}`).auth(token, {type: "bearer"})
      
      expect(taskResponse.status).toBe(200)
   })

   it("Task that's deleted doesn't exist", async () => {
      const taskResponse = await request(app).delete(`/tasks/${undefinedTask_id}`).auth(token, {type: "bearer"})

      expect(taskResponse.status).toBe(404)
      expect(taskResponse.body.message).toBe("Task not found")
   })
})