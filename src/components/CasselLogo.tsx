import { motion } from "motion/react";
import { Shield, Sword, TreePine } from "lucide-react";

export default function CasselLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-24 h-24",
    lg: "w-32 h-32"
  };

  const iconSizes = {
    sm: 16,
    md: 32,
    lg: 48
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative flex items-center justify-center ${sizeClasses[size]} border-2 border-cassel-gold rounded-full p-2 bg-black/40 backdrop-blur-sm shadow-[0_0_20px_rgba(212,175,55,0.3)]`}
    >
      <div className="absolute inset-0 border border-cassel-gold/20 rounded-full scale-110 animate-pulse" />
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      >
        <TreePine size={iconSizes[size]} className="text-cassel-gold" />
      </motion.div>
      <Sword className="absolute -left-1 bottom-0 text-cassel-gold rotate-[-45deg]" size={iconSizes[size] / 1.5} />
      <Sword className="absolute -right-1 bottom-0 text-cassel-gold rotate-[45deg]" size={iconSizes[size] / 1.5} />
      <Shield className="absolute top-0 opacity-20 text-cassel-gold" size={iconSizes[size] * 1.5} />
    </motion.div>
  );
}
