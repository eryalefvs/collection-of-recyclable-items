import { Router } from "express"
import { compare } from "bcryptjs"
import knex from "../database/connection"
import { sign } from "jsonwebtoken"
import authConfig from "../config/auth"

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

    const token = sign({}, authConfig.jwt.secret, {
        subject: String(user.id),
        expiresIn: authConfig.jwt.expiresIn
    })

    return response.json({ user, token })
})

export default sessionsRoute;