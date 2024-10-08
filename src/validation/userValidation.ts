import z from "zod"

export const loginValidation = z.object({
    name : z.string().min(1, {
        message : "name is required"
    }).max(50 , {
        message : "Max characters are 50"
    }),
    password : z.string().min(1, {
        message : "password is required"
    }),
})