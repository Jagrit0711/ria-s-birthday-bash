import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  onNext: () => void;
}

const roasts = [
  {
    emoji: "📏",
    title: "Official Height Report",
    text: "Classified information. Just know she can probably walk under tables without ducking. 💅",
  },
  {
    emoji: "🌋",
    title: "Temper Rating",
    text: "Short fuse on a short queen. A DANGEROUSLY adorable combo. ⚠️",
  },
  {
    emoji: "💀",
    title: "Favourite Hobby",
    text: "Fantasizing about the sweet embrace of... you know. Very normal 17-year-old things. 🖤",
  },
  {
    emoji: "🤪",
    title: "Sanity Meter",
    text: "Goes from calm to ABSOLUTELY UNHINGED in 0.3 seconds flat. Multitasking queen. 👑",
  },
  {
    emoji: "📅",
    title: "Last Seen IRL",
    text: "2 WHOLE YEARS AGO! Has she gotten even shorter?? Is that scientifically possible?? 📐",
  },
  {
    emoji: "🤖",
    title: "AI Believer?",
    text: "NOPE. So this 100% handcrafted, artisan, organic, free-range website should impress her 🤡",
  },
];

const StepRoasts = ({ onNext }: Props) => {
  const [current, setCurrent] = useState(0);

  const nextRoast = () => {
    if (current < roasts.length - 1) setCurrent((c) => c + 1);
  };

  const r = roasts[current];

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
        className="font-display text-3xl text-primary mb-2 text-center"
      >
        📋 Ria's Official Dossier
      </motion.h2>
      <p className="text-muted-foreground text-center mb-8">(totally not a roast section)</p>

      <motion.div
        key={current}
        initial={{ opacity: 0, rotateY: 90 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm bg-card rounded-3xl p-8 shadow-xl border-2 border-primary/20 text-center"
      >
        <p className="text-5xl mb-4">{r.emoji}</p>
        <h3 className="text-xl font-bold text-foreground mb-3">{r.title}</h3>
        <p className="text-muted-foreground">{r.text}</p>
        <p className="text-xs text-muted-foreground/50 mt-4">{current + 1} / {roasts.length}</p>
      </motion.div>

      <div className="mt-8">
        {current < roasts.length - 1 ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextRoast}
            className="bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-bold shadow-md"
          >
            next roast 😈 →
          </motion.button>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg shadow-lg"
          >
            okay enough roasting 😂 →
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default StepRoasts;
