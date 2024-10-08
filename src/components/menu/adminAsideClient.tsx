"use client";

import { cn } from "@/lib/utils";
import { HousePlus, LayoutDashboard, LucideLayoutGrid, School2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AdminAsidePublic = () => {
    const pathname = usePathname();
    const className = {
        link : {
            base : "w-full btn btn-sm justify-start font-medium",
            dashboard : {
                active :  pathname === "/admin" ? "btn-info text-white" : "btn-ghost",
                icon : pathname === "/admin" ? "text-white" : "text-gray-500",
            },
            Dashboard : pathname === "/admin" ? "btn-info text-white" : "btn-ghost",
            school : pathname === "/admin/s" ? "btn-info text-white" : "btn-ghost",
        }
    }
    return (
        <div className=" w-full flex flex-col gap-1">
            <Link className={cn(className.link.base , className.link.dashboard.active)} href={`/admin`}>
                <LayoutDashboard size={20} className={className.link.dashboard.icon}/>
                <span>Dashboard</span>
            </Link>
            <Link className={cn(className.link.base , className.link.school)} href={`/admin/s`}>
                <School2 size={20} className={pathname === "/admin/s" ? "text-white" : "text-gray-500"}/>
                <span>Schools</span>
            </Link>
        </div>
    )
}

export const AdminAsideRequest = () => {
    return (
        <Link href={`/admin/r`} className=" btn btn-sm btn-ghost font-medium justify-start w-full">
            <HousePlus size={24} className=" text-gray-500"/>
            <span>Schools Requests</span>
        </Link>
    )
}

