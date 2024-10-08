"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function AuthNav() {
  const { setTheme } = useTheme()

  return (
    <div className=" flex justify-end fixed right-4">
      <button className=" dark:hidden" onClick={()=> setTheme("dark")}><Sun size={20}/></button>
      <button className=" hidden dark:flex" onClick={()=> setTheme("light")}><Moon size={20}/></button>
    </div>
  )
}
