import { Router } from "express"
import { hash } from "bcryptjs"
import knex from "../database/connection"

const userRouter = Router()

userRouter.get("/", async (request, response) => {
    const user = await knex("user").select("*")

    !user ? response.status(400).json({ message: "User not found" }) :
    response.json(user)
})

userRouter.post("/", async (request, response) => {
    const { name, email, password } = request.body

    const passwordHashed = await hash(password, 8)

    const user = { 
        email, 
        password: passwordHashed 
    }

    const newIds = await knex("users").insert(user)

    return response.json({
        id: newIds[0],
        ...user
    })
})

export default userRouter;