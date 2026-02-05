"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MistralIcon } from "../icons/MistralIcon";

const navItems = [
  { label: "Ask", href: "/" },
  { label: "Compare", href: "/compare" },
  { label: "Extract", href: "/extract" },
  { label: "Library", href: "/library" },
  { label: "Training", href: "/training" },
  { label: "Admin", href: "/admin" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A] border-b border-gray-800">
      <div className="max-w-[1920px] mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo - AI Core */}
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30"
            >
              <MistralIcon className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-white font-bold text-base tracking-tight">AI CORE</h1>
              <p className="text-[10px] text-gray-500 font-medium tracking-wide">Engineering Intelligence</p>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <span className={isActive ? "text-white" : "text-gray-400 hover:text-white"}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-[#2D2D2D] rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Badge */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm text-white font-medium">Engineering Access</div>
              <div className="text-xs text-gray-500">Full Permissions</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              JD
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
