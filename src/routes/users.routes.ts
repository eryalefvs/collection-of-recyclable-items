import { Router } from "express"
import knex from "knex"

const userRouter = Router()

userRouter.get("/", async (request, response) => {
    const user = await knex("user").select("*")

    !user ? response.status(400).json({ message: "User not found" }) :
    response.json(user)
})

userRouter.post("/", async (request, response) => {
    const { name, email, password } = request.body

    const user = { name, email, password }

    const newIds = await knex("users").insert(user)

    return response.json({
        id: newIds[0],
        ...user
    })
})

export default userRouter;