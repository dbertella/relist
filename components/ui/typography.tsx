import { ReactNode } from 'react'

type Props = { children: ReactNode }

export function H1({ children }: Props) {
  return <h1 className="mb-2.5 tracking-wide text-paper-75 text-3xl">{children}</h1>
}

export function H2({ children }: Props) {
  return <h2 className="text-sm text-paper-50">{children}</h2>
}

export function H3({ children }: Props) {
  return <h3 className="mt-4 text-sm text-paper-75">{children}</h3>
}

export function Text({ children }: Props) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
}
