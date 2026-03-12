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

const RIA_IMG = "data:image/jpeg;base64,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";

const POSITIONS = [
  { top: "4%", left: "1%", size: 52, delay: 0, rot: -10 },
  { top: "6%", right: "2%", size: 44, delay: 0.6, rot: 8 },
  { top: "28%", left: "0.5%", size: 40, delay: 1.1, rot: -6 },
  { top: "48%", right: "1%", size: 48, delay: 1.7, rot: 13 },
  { top: "68%", left: "1.5%", size: 38, delay: 0.9, rot: -9 },
  { top: "82%", right: "2.5%", size: 46, delay: 0.4, rot: 5 },
  { top: "90%", left: "3%", size: 34, delay: 1.4, rot: -13 },
];

const FloatingRia = () => (
  <>
    {POSITIONS.map((pos, i) => (
      <div
        key={i}
        className="fixed z-10 pointer-events-none"
        style={{
          top: pos.top,
          left: (pos as any).left,
          right: (pos as any).right,
          animation: `riatwinkle ${2.2 + i * 0.35}s ease-in-out infinite`,
          animationDelay: `${pos.delay}s`,
        }}
      >
        <div
          style={{
            width: pos.size,
            height: pos.size,
            borderRadius: "50%",
            overflow: "hidden",
            border: "2.5px solid rgba(255,107,157,0.7)",
            transform: `rotate(${pos.rot}deg)`,
          }}
        >
          <img
            src={RIA_IMG}
            alt="✨"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
        <div style={{ textAlign: "center", fontSize: 9, color: "#ff6b9d", fontWeight: 800, marginTop: 1 }}>✨</div>
      </div>
    ))}
    <style>{`
      @keyframes riatwinkle {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.55; transform: scale(0.88); }
      }
    `}</style>
  </>
);

const Index = () => {
  const [step, setStep] = useState(0);
  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {step >= 2 && <Confetti />}
      <FloatingRia />
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
