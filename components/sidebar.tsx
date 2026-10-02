"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Boxes,
  ChevronDown,
  CircleHelp,
  CreditCard,
  Globe2,
  LayoutDashboard,
  Settings,
  Terminal,
  Activity,
} from "lucide-react";

const items = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: Boxes },
  { href: "/deployments", label: "Deployments", icon: Activity },
  { href: "/domains", label: "Domains", icon: Globe2 },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/logs", label: "Logs", icon: Terminal },
];

const accountItems = [
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/help", label: "Help", icon: CircleHelp },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-[250px] shrink-0 border-r border-[#eaeaea] h-screen flex-col bg-white">
      <div className="h-16 px-5 flex items-center justify-between border-b border-[#eaeaea]">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs">
            ▲
          </span>
          DeployX
        </Link>

        <button className="text-gray-500">
          <ChevronDown size={16} />
        </button>
      </div>

      <div className="p-3 flex-1 overflow-y-auto">
        <div className="px-3 py-2 text-xs text-gray-500">
          Workspace
        </div>

        <nav className="space-y-1">
          {items.map(({ href, label, icon: Icon }) => {
            const active =
              pathname === href ||
              pathname.startsWith(`${href}/`);

            return (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                  active
                    ? "bg-[#f1f1f1] font-medium text-black"
                    : "text-gray-600 hover:bg-[#fafafa]"
                }`}
              >
                <Icon size={17} strokeWidth={1.8} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 px-3 py-2 text-xs text-gray-500">
          Account
        </div>

        <nav className="space-y-1">
          {accountItems.map(({ href, label, icon: Icon }) => {
            const active =
              pathname === href ||
              pathname.startsWith(`${href}/`);

            return (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                  active
                    ? "bg-[#f1f1f1] font-medium text-black"
                    : "text-gray-600 hover:bg-[#fafafa]"
                }`}
              >
                <Icon size={17} strokeWidth={1.8} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-[#eaeaea]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs">
            R
          </div>

          <div className="min-w-0">
            <div className="text-sm font-medium truncate">
              Rita
            </div>

            <div className="text-xs text-gray-500 truncate">
              Personal workspace
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}