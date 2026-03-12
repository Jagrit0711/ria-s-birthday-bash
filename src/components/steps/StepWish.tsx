import { motion } from "framer-motion";
import { useState } from "react";

const lines = [
  { text: "Dear Ria,", delay: 0.5 },
  { text: "I know we haven't met in 2 whole years...", delay: 1.5 },
  { text: "But some people are just impossible to forget.", delay: 3 },
  { text: "Your tiny frame with that MASSIVE personality?", delay: 4.5 },
  { text: "Your glasses that make you look like the cutest nerd ever?", delay: 6 },
  { text: "Your temper that keeps everyone on their toes? 😂", delay: 7.5 },
  { text: "Even your weird death fantasies... (we worry, but we love you)", delay: 9 },
  { text: "All of it makes you YOU.", delay: 10.5 },
  { text: "And YOU are absolutely irreplaceable. 💕", delay: 12 },
];

const StepWish = () => {
  const [showFinal, setShowFinal] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
    >
      {!showFinal ? (
        <div className="max-w-md text-center space-y-1">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: line.delay, duration: 0.6 }}
              className={`text-foreground ${i === 0 ? "font-display text-2xl text-primary mb-4" : "text-lg"} ${
                i === lines.length - 1 ? "font-bold text-xl mt-4" : ""
              }`}
            >
              {line.text}
            </motion.p>
          ))}

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 14 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFinal(true)}
            className="mt-8 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg shadow-lg inline-block"
          >
            💕
          </motion.button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center max-w-sm"
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, -3, 3, 0] }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-8xl mb-6"
          >
            🎂
          </motion.div>

          <h1 className="font-display text-4xl md:text-5xl text-primary mb-4">
            Happy 17th, Ria!
          </h1>

          <div className="bg-card rounded-3xl p-6 shadow-xl border-2 border-primary/20 mb-6">
            <p className="text-foreground font-semibold mb-3">
              Here's to another year of being short, angry, and absolutely iconic. 👑
            </p>
            <p className="text-muted-foreground text-sm">
              Don't change a single thing about yourself (except maybe consider NOT wanting to d1e?? just a suggestion?? 😭💕)
            </p>
          </div>

          <p className="text-muted-foreground text-sm mb-2">
            Miss you a lot. Hope we meet soon! 🤗
          </p>

          <p className="text-xs text-muted-foreground/50 italic mt-8">
            P.S. This website was made with 100% pure love and absolutely zero AI. 
            If you don't believe in AI, then this shouldn't be possible, right? 😏🤡
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-8 flex justify-center gap-3 text-3xl"
          >
            {["🎂", "🎈", "🎉", "💕", "✨", "🎀"].map((e, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
              >
                {e}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default StepWish;
