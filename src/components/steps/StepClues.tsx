import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  onNext: () => void;
}

const clues = [
  { emoji: "📏", text: "This person is... vertically challenged 🤏", subtext: "(if you know, you know)" },
  { emoji: "👓", text: "They wear glasses", subtext: "(and look absolutely adorable in them)" },
  { emoji: "🌋", text: "They have a VERY short temper", subtext: "(short person, short fuse, coincidence? 🤔)" },
  { emoji: "💀", text: "They have... unique fantasies about the afterlife", subtext: "(we don't question it, we just support)" },
  { emoji: "🤪", text: "They go from 0 to crazy in 0.2 seconds", subtext: "(it's actually impressive)" },
  { emoji: "🤖", text: "They don't believe in AI", subtext: "(which makes this website even funnier)" },
];

const StepClues = ({ onNext }: Props) => {
  const [revealed, setRevealed] = useState(0);

  const revealNext = () => {
    if (revealed < clues.length) {
      setRevealed((r) => r + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-3xl text-primary mb-8 text-center"
      >
        🕵️ Clue Time!
      </motion.h2>

      <div className="w-full max-w-sm space-y-3 mb-8">
        {clues.map((clue, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            animate={i < revealed ? { opacity: 1, x: 0 } : { opacity: 0.2, x: 0 }}
            transition={{ duration: 0.4 }}
            className={`bg-card rounded-2xl p-4 shadow-md border-2 transition-colors ${
              i < revealed ? "border-primary/20" : "border-border"
            }`}
          >
            {i < revealed ? (
              <>
                <p className="font-bold text-foreground">
                  {clue.emoji} {clue.text}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{clue.subtext}</p>
              </>
            ) : (
              <p className="text-muted-foreground text-center">??? 🔒</p>
            )}
          </motion.div>
        ))}
      </div>

      {revealed < clues.length ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={revealNext}
          className="bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-bold shadow-md"
        >
          Reveal next clue ✨ ({revealed}/{clues.length})
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <p className="text-xl font-bold text-foreground mb-4">
            Know who it is?? 😏
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg shadow-lg"
          >
            REVEAL! 🎉
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default StepClues;
