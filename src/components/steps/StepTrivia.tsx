import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  onNext: () => void;
}

const questions = [
  {
    question: "What is Ria's most iconic trait?",
    options: ["She's tall and graceful", "She's vertically challenged 👓", "She's always calm", "She loves mornings"],
    correct: 1,
    reaction: "YES! Our pocket-sized queen with the cutest glasses! 🤓✨",
  },
  {
    question: "What happens when you call Ria 'tiny'?",
    options: ["She laughs it off", "She thanks you", "NUCLEAR EXPLOSION 💥", "She agrees politely"],
    correct: 2,
    reaction: "RUN. JUST RUN. The tiny volcano has erupted! 🌋",
  },
  {
    question: "Who does Ria get shipped with?",
    options: ["Nobody ever", "Tejas 💕", "Reyansh 💕", "Both, obviously 😏"],
    correct: 3,
    reaction: "THE SHIP SAILS IN ALL DIRECTIONS! Ria x Everyone supremacy! 🚢💕",
  },
  {
    question: "What does Ria fantasize about?",
    options: ["Being taller", "World domination", "The sweet embrace of d3ath 💀", "Getting a pet cat"],
    correct: 2,
    reaction: "She's just... built different. Very dramatically different. 💀🖤",
  },
  {
    question: "How does Ria feel about AI?",
    options: ["Loves it!", "Doesn't believe in it 🙄", "Thinks it's cool", "Uses it daily"],
    correct: 1,
    reaction: "AI? What AI? This website was clearly made by hand 🤡",
  },
];

const StepTrivia = ({ onNext }: Props) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[current].correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  if (finished) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        <p className="text-6xl mb-4">{score === questions.length ? "👑" : score >= 3 ? "🎉" : "💀"}</p>
        <h2 className="font-display text-3xl text-primary mb-2">Quiz Results!</h2>
        <p className="text-2xl font-bold text-foreground mb-2">{score}/{questions.length}</p>
        <p className="text-muted-foreground mb-8 max-w-xs">
          {score === questions.length
            ? "You know Ria better than she knows herself!"
            : score >= 3
            ? "Not bad! You're a certified Ria fan!"
            : "Do you even KNOW Ria?? 😭"}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg shadow-lg"
        >
          continue the journey 💕 →
        </motion.button>
      </motion.div>
    );
  }

  const q = questions[current];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
    >
      <h2 className="font-display text-3xl text-primary mb-2 text-center">🧠 Ria Trivia</h2>
      <p className="text-muted-foreground text-center mb-8">(how well do you REALLY know her?)</p>

      <div className="w-full max-w-sm bg-card rounded-3xl p-6 shadow-xl border-2 border-primary/20">
        <div className="flex justify-between mb-4">
          <span className="text-sm text-muted-foreground font-semibold">{current + 1}/{questions.length}</span>
          <span className="text-sm font-bold text-primary">Score: {score}</span>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-5">{q.question}</h3>

        <div className="space-y-2">
          {q.options.map((opt, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm transition-all border-2 ${
                selected === null
                  ? "border-border hover:border-primary/50 text-foreground"
                  : idx === q.correct
                  ? "border-green-400 bg-green-50 text-green-800"
                  : idx === selected
                  ? "border-red-400 bg-red-50 text-red-800"
                  : "border-border text-muted-foreground opacity-40"
              }`}
            >
              {opt}
            </motion.button>
          ))}
        </div>

        {selected !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-muted rounded-xl"
          >
            <p className="text-sm font-semibold text-foreground">{q.reaction}</p>
          </motion.div>
        )}

        {selected !== null && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="mt-4 w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold"
          >
            {current + 1 >= questions.length ? "See Results! 🏆" : "Next →"}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default StepTrivia;
