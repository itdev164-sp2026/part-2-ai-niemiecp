import * as React from "react"

import { cn } from "@/lib/utils"

type CardProps = React.HTMLAttributes<HTMLDivElement>

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>

type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

type CardContentProps = React.HTMLAttributes<HTMLDivElement>

type CardFooterProps = React.HTMLAttributes<HTMLDivElement>

const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { className, ...rest } = props
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-border bg-card shadow-sm transition-colors",
        className
      )}
      {...rest}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>((props, ref) => {
  const { className, ...rest } = props
  return (
    <div ref={ref} className={cn("space-y-2 p-6", className)} {...rest} />
  )
})
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>((props, ref) => {
  const { className, ...rest } = props
  return (
    <h3 ref={ref} className={cn("text-xl font-semibold tracking-tight", className)} {...rest} />
  )
})
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>((props, ref) => {
  const { className, ...rest } = props
  return (
    <p ref={ref} className={cn("text-sm leading-6 text-muted-foreground", className)} {...rest} />
  )
})
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>((props, ref) => {
  const { className, ...rest } = props
  return (
    <div ref={ref} className={cn("px-6 pb-6", className)} {...rest} />
  )
})
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>((props, ref) => {
  const { className, ...rest } = props
  return (
    <div ref={ref} className={cn("flex items-center gap-2 px-6 pb-6", className)} {...rest} />
  )
})
CardFooter.displayName = "CardFooter"

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
