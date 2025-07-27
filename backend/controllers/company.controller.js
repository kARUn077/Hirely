import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-lg bg-[#F0F7F4] p-1 text-[#3A5A40]",
      "dark:bg-[#16213E] dark:text-[#A0AEC0]",
      "border border-[#D8F3DC] dark:border-[#2D3748]",
      "shadow-sm",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#537D5D] focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-white data-[state=active]:text-[#1B4332] data-[state=active]:shadow-sm",
      "data-[state=active]:border data-[state=active]:border-[#D8F3DC]",
      "dark:data-[state=active]:bg-[#2D3748] dark:data-[state=active]:text-[#E2E8F0]",
      "dark:focus-visible:ring-[#D8F3DC]",
      "hover:bg-[#D8F3DC]/50 dark:hover:bg-[#2D6A4F]/30",
      "transition-colors duration-200",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-3 rounded-lg p-4",
      "bg-white border border-[#F0F7F4]",
      "dark:bg-[#16213E] dark:border-[#2D3748]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#537D5D] focus-visible:ring-offset-2",
      "dark:focus-visible:ring-[#D8F3DC]",
      "shadow-sm",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };