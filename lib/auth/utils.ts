import { db } from '@/lib/db/index'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { DefaultSession, getServerSession, NextAuthOptions } from 'next-auth'
import { redirect } from 'next/navigation'
import { env } from '@/lib/env.mjs'
// import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from 'next-auth/providers/google'
// import GithubProvider from "next-auth/providers/github";
// import AppleProvider from "next-auth/providers/apple";

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string
    }
  }
}

export type AuthSession = {
  session: {
    user: {
      id: string
      name?: string
      email?: string
    }
  } | null
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id
      return session
    },
  },
  providers: [
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // GithubProvider({
    //   clientId: env.GITHUB_CLIENT_ID,
    //   clientSecret: env.GITHUB_CLIENT_SECRET,
    // }),
    // AppleProvider({
    //   clientId: env.APPLE_CLIENT_ID,
    //   clientSecret: env.APPLE_CLIENT_SECRET,
    // })
  ],
}

export const getUserAuth = async () => {
  const session = await getServerSession(authOptions)
  return { session } as AuthSession
}

export const checkAuth = async () => {
  const { session } = await getUserAuth()
  if (!session) redirect('/api/auth/signin')
}
