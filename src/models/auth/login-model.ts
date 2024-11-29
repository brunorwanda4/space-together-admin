import z from "zod";

export const LoginModel = z.object({
    email : z.string().email(),
    password : z.string().min(1 , {
        message : "Password is required, please enter your password"
    })
})

export type loginModelTypes = z.infer<typeof LoginModel>