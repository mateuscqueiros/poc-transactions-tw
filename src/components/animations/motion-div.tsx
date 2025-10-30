import { motion } from "framer-motion";

export type MotionDivProps = {
  motionKey: string;
  direction: "next" | "prev";
  children: React.ReactNode;
};

export function MotionDiv({ motionKey, direction, children }: MotionDivProps) {
  const isNext = direction === "next";

  return (
    <motion.div
      key={motionKey}
      initial={{ opacity: 0, x: isNext ? 80 : -80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isNext ? -80 : 80 }}
      transition={{ duration: 0.15, type: "tween" }}
    >
      {children}
    </motion.div>
  );
}
