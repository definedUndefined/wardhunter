import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient, User } from '@prisma/client'
import { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { registerUserSchema } from '@/utils/utils'

const loginUserSchema = z.object({
  username: z.string().regex(/^[a-z0-9_-]{3,15}$/g, 'Invalid username'),
  password: z.string().min(5, 'Password should be minimum 5 characters'),
})
const prisma = new PrismaClient()

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        username: { type: 'text', placeholder: 'test@test.com' },
        password: { type: 'password', placeholder: 'Pa$$w0rd' },
      },
      async authorize(credentials) {
        const { email, password } = registerUserSchema.parse(credentials)
        
        console.log('Email pwd ' + email, password)
        
        const user = await prisma.user.findUnique({
          where: { email: email },
        })
        
        if (!user) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials?.password as string, user.password as string);
        
        console.log(isPasswordValid)
        
        if (!isPasswordValid) return null;
        console.log('passed after mdp check');
        return user;
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      console.log('session ' + session, 'token ' + token)
      session.user.id = token.id
      session.user.name = token.name
      return session
    },
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = user.id
        token.username = (user as User).name
        console.log({ user })
      }
      return token
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.JWT_SECRET,
}

export default NextAuth(authOptions)
