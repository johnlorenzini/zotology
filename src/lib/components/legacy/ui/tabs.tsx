"use client"

import * as React from "react"
import * as TabsPrimivite from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimivite.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimivite.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimivite.List>
>(({ className, ...props }, ref) => (
  <TabsPrimivite.List
    ref={ref}
    className={cn("inline-flex items-center justify-center gap-2", className)}
    {...props}
  />
))
TabsList.displayName = TabsPrimivite.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimivite.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimivite.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimivite.Trigger
    className={cn(
      "inline-flex min-w-[100px] items-center justify-center rounded-lg bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100 ",
      className
    )}
    {...props}
    ref={ref}
  />
))
TabsTrigger.displayName = TabsPrimivite.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimivite.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimivite.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimivite.Content
    className={cn(
      "mt-2 rounded-md border border-slate-200 p-6 dark:border-slate-700",
      className
    )}
    {...props}
    ref={ref}
  />
))
TabsContent.displayName = TabsPrimivite.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
