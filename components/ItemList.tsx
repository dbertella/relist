import { ReactNode } from 'react'
import { Card, CardContent, CardFooter, CardTitle } from './ui/card'

type Props = {
  title: string[]
  description?: string[]
  children: ReactNode
  footer: ReactNode
}
export const ItemList = ({ title, description, children, footer }: Props) => {
  return (
    <Card>
      <CardContent>
        {title.map(t => (
          <CardTitle key={`${t}`}>{t}</CardTitle>
        ))}
        {children}
        {footer && <CardFooter>{footer}</CardFooter>}
      </CardContent>
    </Card>
  )
}
