import { Router } from "express"
import { compare } from "bcryptjs"
import knex from "knex"
import { sign } from "jsonwebtoken"

const sessionsRoute = Router()

sessionsRoute.post("/", async (request, response) => {
    const { email, password } = request.body

    const user = await knex("users").where("email", email).first()

    if(!user) {
        return response.status(400).json({ message: "Credentials not found!" })
    }

    const comparePassword = await compare(password, user.password)

    if(!comparePassword) {
        return response.status(400).json({ message: "Credentials not found!" })
    }

    const token = sign({}, "685f802d2ffcd5e9f2f2635456f3bc66", {
        subject: String(user.id),
        expiresIn: "1d"
    })

    return response.json({ user, token })
})

export default sessionsRoute;