import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Confetti from "@/components/Confetti";
import StepIntro from "@/components/steps/StepIntro";
import StepClues from "@/components/steps/StepClues";
import StepReveal from "@/components/steps/StepReveal";
import StepRoasts from "@/components/steps/StepRoasts";
import StepTrivia from "@/components/steps/StepTrivia";
import StepShips from "@/components/steps/StepShips";
import StepCamera from "@/components/steps/StepCamera";
import StepWish from "@/components/steps/StepWish";

const TOTAL_STEPS = 8;

const Index = () => {
  const [step, setStep] = useState(0);
  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {step >= 2 && <Confetti />}
      <AnimatePresence mode="wait">
        {step === 0 && <StepIntro key="intro" onNext={next} />}
        {step === 1 && <StepClues key="clues" onNext={next} />}
        {step === 2 && <StepReveal key="reveal" onNext={next} />}
        {step === 3 && <StepRoasts key="roasts" onNext={next} />}
        {step === 4 && <StepTrivia key="trivia" onNext={next} />}
        {step === 5 && <StepShips key="ships" onNext={next} />}
        {step === 6 && <StepCamera key="camera" onNext={next} />}
        {step === 7 && <StepWish key="wish" />}
      </AnimatePresence>

      {/* Progress dots */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === step ? "bg-primary w-6" : i < step ? "bg-primary/50" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
