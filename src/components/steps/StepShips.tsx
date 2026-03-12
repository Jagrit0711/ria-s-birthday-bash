import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  onNext: () => void;
}

const ships = [
  { name: "Tejas", emoji: "👨‍💼", percentage: 87, comment: "The chemistry is UNDENIABLE 👀🔥" },
  { name: "Reyansh", emoji: "🧑‍💻", percentage: 73, comment: "Dark horse candidate. The tension is REAL 💫" },
  { name: "Her Temper", emoji: "💥", percentage: 100, comment: "The only true soulmate. Together forever 💀" },
  { name: "The Void", emoji: "🕳️", percentage: 95, comment: "She stares into it, it stares back. Romance 🖤" },
];

const StepShips = ({ onNext }: Props) => {
  const [revealed, setRevealed] = useState<number[]>([]);
  const allRevealed = revealed.length === ships.length;

  const reveal = (idx: number) => {
    if (!revealed.includes(idx)) {
      setRevealed((r) => [...r, idx]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
    >
      <h2 className="font-display text-3xl text-primary mb-2 text-center">💕 Ship-o-Meter 💕</h2>
      <p className="text-muted-foreground text-center mb-8">tap each to reveal compatibility 😏</p>

      <div className="w-full max-w-sm space-y-3 mb-8">
        {ships.map((ship, idx) => (
          <motion.div
            key={ship.name}
            whileTap={{ scale: 0.97 }}
            onClick={() => reveal(idx)}
            className="bg-card rounded-2xl p-4 shadow-lg border-2 border-primary/10 cursor-pointer hover:border-primary/30 transition-all"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-foreground">
                {ship.emoji} Ria × {ship.name}
              </span>
              {revealed.includes(idx) ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-xl font-bold text-primary"
                >
                  {ship.percentage}%
                </motion.span>
              ) : (
                <span className="text-xs text-muted-foreground">tap 👆</span>
              )}
            </div>

            {revealed.includes(idx) && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="w-full bg-secondary rounded-full h-2.5 mb-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${ship.percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
                <p className="text-xs text-muted-foreground italic">{ship.comment}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {allRevealed && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg shadow-lg"
        >
          one more thing... 📸 →
        </motion.button>
      )}
    </motion.div>
  );
};

export default StepShips;
