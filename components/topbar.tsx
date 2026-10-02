"use client";

import Link from "next/link";
import { Bell, Plus, Search } from "lucide-react";

export default function Topbar({ title }: { title: string }) {
  return (
    <header className="h-16 border-b border-[#eaeaea] flex items-center justify-between px-5 md:px-8 bg-white sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <span className="md:hidden font-semibold">▲ DeployX</span>
        <span className="hidden md:block text-sm font-medium">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <button className="hidden sm:flex items-center gap-2 border border-[#eaeaea] rounded-md px-3 py-2 text-sm text-gray-500">
          <Search size={15}/> Search
          <span className="text-xs border rounded px-1.5 py-0.5">⌘K</span>
        </button>
        <button className="p-2 rounded-md hover:bg-gray-100"><Bell size={17}/></button>
        <Link href="/new" className="flex items-center gap-1.5 bg-black text-white rounded-md px-3 py-2 text-sm">
          <Plus size={16}/> New
        </Link>
      </div>
    </header>
  );
}