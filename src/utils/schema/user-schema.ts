import z from "zod";

export const userRoleSchema = z.object({
  rl: z
    .string()
    .min(1, {
      message: "Role name is required",
    })
    .max(25, {
      message: "Maximum characters are 25",
    }),
});

export type userRoleSchemeType = z.infer<typeof userRoleSchema>;

export const userSchema = z.object({
  nm: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(50, {
      message: "Maximum characters are 50",
    }),
  em: z.string().email({
    message: "Invalid email",
  }),
  rl: z.string().min(1, {
    message: "Role is required",
  }),
  pw: z
    .string()
    .min(1, {
      message: "Password is required",
    })
    .max(25, {
      message: "Maximum characters are 25",
    }),
  gd: z.enum(["M", "F", "O"], {
    message: "Gender must be one of 'M', 'F', or 'O'",
  }),
});

export type userSchemeType = z.infer<typeof userSchema>;
