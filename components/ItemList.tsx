import { ReactNode } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

type Props = {
  title: string[]
  description?: string[]
  children: ReactNode
  footer: ReactNode
}
export const ItemList = ({ title, description, children, footer }: Props) => {
  return (
    <Card>
      <CardHeader>
        {title.map(t => (
          <CardTitle key={`${t}`}>{t}</CardTitle>
        ))}
        {description?.map(t => <CardDescription key={`${t}`}>{t}</CardDescription>)}
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  )
}
