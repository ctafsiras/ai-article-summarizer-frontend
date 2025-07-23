import * as z from "zod"

// Article Type
export interface Article {
  id: string
  title: string
  body: string
  tags: string[]
  author: string
}

// Auth Types from Zod schemas for type safety
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export type LoginCredentials = z.infer<typeof loginSchema>
export type SignupCredentials = z.infer<typeof signupSchema>
