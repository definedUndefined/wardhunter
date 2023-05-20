import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/server/db'
import bcrypt from 'bcrypt'
import { registerUserSchema } from '@/utils/utils'


export default async function registerUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email, password, username } = registerUserSchema.parse(req.body)
  const user = await prisma.user.findUnique({
    where: { email: email },
  })

  if (user) {
    return res.send({ user: user.name, message: 'User already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const insertUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: username,
    },
  })

  return res.send({ user: insertUser, message: 'User created successfully' })
}
