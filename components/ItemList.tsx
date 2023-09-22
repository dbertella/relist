import { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"


type Props = {
    title: ReactNode,
    description?: ReactNode,
    children: ReactNode,
    footer: ReactNode
}
export const ItemList = ({ title, description, children, footer }: Props) => {
    return <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        <CardFooter>
            {footer}
        </CardFooter>
    </Card>
}