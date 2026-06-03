import { z } from 'zod'

export const loginSchema = z.object({
    username: z
        .string()
        .min(1, 'Username is required.')
        .max(50, 'Username cannot be longer than 50 characters.'),
    password: z
        .string()
        .min(1, 'Password is required.'),
})

export type LoginFormValues = z.infer<typeof loginSchema>