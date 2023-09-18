import { ReactNode } from "react";

type Props = { children: ReactNode }

export function H1({ children }: Props) {
    return (
        <h1 className="text-2xl font-normal leading-snug first:mt-0">
            {children}
        </h1>
    )
}

export function H2({ children }: Props) {
    return (
        <h2 className="text-sm font-normal leading-snug first:mt-0">
            {children}
        </h2>
    )
}

export function H3({ children }: Props) {
    return (
        <h3 className="text-sm font-semibold leading-snug first:mt-0">
            {children}
        </h3>
    )
}

export function Text({ children }: Props) {
    return (
        <p className="leading-7 [&:not(:first-child)]:mt-6">
            {children}
        </p>
    )
}