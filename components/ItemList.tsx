import { ReactNode } from 'react'
import { Card, CardContent, CardFooter, CardTitle } from './ui/card'

type Props = {
  title: string[]
  description?: string[]
  children: ReactNode
  footer: ReactNode
}
export const ItemList = ({ title, children, footer }: Props) => {
  return (
    <Card>
      <CardContent>
        {title.map(t => !!t && <CardTitle key={`${t}`}>{t}</CardTitle>)}
        {children}
        {footer !== 'undefined' && <CardFooter>{footer}</CardFooter>}
      </CardContent>
    </Card>
  )
}
