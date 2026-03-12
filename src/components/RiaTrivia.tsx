import { useState } from "react";

interface Question {
  question: string;
  options: string[];
  correct: number;
  reaction: string;
}

const questions: Question[] = [
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
    question: "Who do we ship Ria with?",
    options: ["Nobody", "Tejas 💕", "Reyansh 💕", "Both, obviously 😏"],
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
    reaction: "AI? What AI? This website was clearly made by hand, pixel by pixel 🤡",
  },
  {
    question: "Ria's mood on any given day:",
    options: ["Zen master", "Completely normal", "Somewhere between 🔥 and 💀", "Sunshine and rainbows"],
    correct: 2,
    reaction: "The range is INSANE. From wanting to unalive to wanting to fight everyone. Icon behavior 💅",
  },
];

const RiaTrivia = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[current].correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <section className="py-20 px-4" id="trivia">
        <div className="max-w-lg mx-auto text-center bg-card rounded-3xl p-8 shadow-xl border-2 border-primary/20">
          <h2 className="font-display text-3xl text-primary mb-4">Results!</h2>
          <p className="text-6xl mb-4">{score === questions.length ? "👑" : score >= 4 ? "🎉" : "💀"}</p>
          <p className="text-xl font-bold text-foreground mb-2">
            {score}/{questions.length} correct!
          </p>
          <p className="text-muted-foreground mb-6">
            {score === questions.length
              ? "You know Ria better than she knows herself! (which isn't hard tbh)"
              : score >= 4
              ? "Pretty good! You're a certified Ria expert!"
              : "Do you even KNOW Ria?? 😭"}
          </p>
          <button
            onClick={restart}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
          >
            Try Again! 🔄
          </button>
        </div>
      </section>
    );
  }

  const q = questions[current];

  return (
    <section className="py-20 px-4" id="trivia">
      <h2 className="font-display text-4xl md:text-5xl text-center text-primary mb-2">
        How Well Do You Know Ria?
      </h2>
      <p className="text-center text-muted-foreground mb-10">
        (spoiler: probably not well enough)
      </p>

      <div className="max-w-lg mx-auto bg-card rounded-3xl p-6 md:p-8 shadow-xl border-2 border-primary/20">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-muted-foreground font-semibold">
            {current + 1}/{questions.length}
          </span>
          <span className="text-sm font-bold text-primary">Score: {score}</span>
        </div>

        <h3 className="text-xl font-bold text-foreground mb-6">{q.question}</h3>

        <div className="space-y-3">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left px-5 py-3 rounded-xl font-semibold transition-all border-2 ${
                selected === null
                  ? "border-border hover:border-primary/50 hover:bg-secondary/30 text-foreground"
                  : idx === q.correct
                  ? "border-green-400 bg-green-50 text-green-800"
                  : idx === selected
                  ? "border-red-400 bg-red-50 text-red-800"
                  : "border-border text-muted-foreground opacity-50"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div className="mt-5 p-4 bg-muted rounded-xl">
            <p className="text-sm font-semibold text-foreground">{q.reaction}</p>
          </div>
        )}

        {selected !== null && (
          <button
            onClick={handleNext}
            className="mt-4 w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            {current + 1 >= questions.length ? "See Results! 🏆" : "Next Question →"}
          </button>
        )}
      </div>
    </section>
  );
};

export default RiaTrivia;
