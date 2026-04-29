"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { type ButtonProps, buttonVariants } from "@/components/ui/button"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
  onClick?: () => void
} & Pick<ButtonProps, "size"> &
  Omit<React.ComponentProps<typeof Link>, "href"> & { href?: string }

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  onClick,
  href,
  ...props
}: PaginationLinkProps) => {
  if (onClick) {
    return (
      <button
        aria-current={isActive ? "page" : undefined}
        onClick={onClick}
        className={cn(
          buttonVariants({
            variant: isActive ? "default" : "ghost",
            size,
          }),
          "cursor-pointer",
          className
        )}
        {...props}
      />
    )
  }
  
  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      href={href || "#"}
      className={cn(
        buttonVariants({
          variant: isActive ? "default" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  )
}
PaginationLink.displayName = "PaginationLink"

type PaginationNavProps = {
  onClick?: () => void
  className?: string
  disabled?: boolean
} & Omit<React.ComponentProps<typeof Link>, "href">

const PaginationPrevious = ({
  className,
  onClick,
  disabled,
  ...props
}: PaginationNavProps) => {
  if (onClick) {
    return (
      <button
        aria-label="Go to previous page"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          buttonVariants({
            variant: "ghost",
            size: "default",
          }),
          "gap-1 pl-2.5 cursor-pointer",
          disabled && "pointer-events-none opacity-50",
          className
        )}
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Prev</span>
      </button>
    )
  }
  
  return (
    <Link
      aria-label="Go to previous page"
      className={cn(
        buttonVariants({
          variant: "ghost",
          size: "default",
        }),
        "gap-1 pl-2.5",
        props["aria-disabled"] && "cursor-not-allowed opacity-50",
        className
      )}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>Prev</span>
    </Link>
  )
}
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  onClick,
  disabled,
  ...props
}: PaginationNavProps) => {
  if (onClick) {
    return (
      <button
        aria-label="Go to next page"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          buttonVariants({
            variant: "ghost",
            size: "default",
          }),
          "gap-1 pr-2.5 cursor-pointer",
          disabled && "pointer-events-none opacity-50",
          className
        )}
      >
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    )
  }
  
  return (
    <Link
      aria-label="Go to next page"
      className={cn(
        buttonVariants({
          variant: "ghost",
          size: "default",
        }),
        "gap-1 pr-2.5",
        props["aria-disabled"] && "cursor-not-allowed opacity-50",
        className
      )}
      {...props}
    >
      <span>Next</span>
      <ChevronRight className="h-4 w-4" />
    </Link>
  )
}
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
