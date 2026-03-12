import { motion } from "framer-motion";

interface Props {
  onNext: () => void;
}

const StepReveal = ({ onNext }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="text-8xl mb-6"
      >
        🎂
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="font-display text-5xl md:text-7xl text-primary mb-4"
      >
        IT'S RIA!!!
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="bg-card rounded-2xl px-8 py-4 shadow-xl border-2 border-primary/20 mb-4"
      >
        <p className="text-2xl font-bold text-foreground">
          🎀 Happy 17th Birthday! 🎀
        </p>
        <p className="text-muted-foreground mt-1">March 13th, 2026</p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="text-muted-foreground text-lg mb-2 max-w-xs"
      >
        The world's most ✨vertically efficient✨ queen turns 17!
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="text-sm text-muted-foreground italic mb-8"
      >
        (this website was definitely NOT made by AI btw 🤫)
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg shadow-lg"
      >
        but wait, there's more... 👀
      </motion.button>
    </motion.div>
  );
};

export default StepReveal;
