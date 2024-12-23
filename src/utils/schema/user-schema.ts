import z from "zod";

export const userRoleSchema = z.object({
    rl : z.string().min(1 , {
        message : "role name is required"
    }).max(25, {
        message : "maximum characters are 25"
    })
})

export type userRoleSchemeType = z.infer<typeof userRoleSchema>