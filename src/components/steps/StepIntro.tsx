import { motion } from "framer-motion";

interface Props {
  onNext: () => void;
}

const StepIntro = ({ onNext }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-muted-foreground text-lg mb-6"
      >
        psst... hey... 👀
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="text-foreground text-2xl font-bold mb-4"
      >
        someone very special has a birthday...
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}
        className="text-muted-foreground text-lg mb-10"
      >
        let me give you some clues about who it is 🕵️
      </motion.p>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg shadow-lg"
      >
        who is it?? 🤔
      </motion.button>
    </motion.div>
  );
};

export default StepIntro;
