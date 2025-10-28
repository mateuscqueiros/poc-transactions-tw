"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export type AnimatedLayoutProps = {} & React.PropsWithChildren;

export function AnimatedLayout({ children }: AnimatedLayoutProps) {
  const pathname = usePathname();
  return (
    <AnimatePresence>
      <motion.div
        key={pathname}
        initial={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="p-6 flex flex-col h-full justify-between"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
