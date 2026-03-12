const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Floating emojis */}
      <div className="absolute top-10 left-10 text-4xl animate-float" style={{ animationDelay: "0s" }}>🎂</div>
      <div className="absolute top-20 right-16 text-3xl animate-float" style={{ animationDelay: "1s" }}>🎈</div>
      <div className="absolute bottom-32 left-20 text-3xl animate-float" style={{ animationDelay: "0.5s" }}>✨</div>
      <div className="absolute bottom-20 right-10 text-4xl animate-float" style={{ animationDelay: "1.5s" }}>🎉</div>
      <div className="absolute top-40 left-1/3 text-2xl animate-sparkle">💖</div>
      <div className="absolute bottom-40 right-1/3 text-2xl animate-sparkle" style={{ animationDelay: "1s" }}>🌸</div>

      <div className="animate-bounce-gentle mb-6">
        <span className="text-7xl md:text-9xl">🎂</span>
      </div>

      <h1 className="font-display text-5xl md:text-7xl text-primary mb-4 drop-shadow-sm">
        Happy 17th Birthday!
      </h1>

      <div className="bg-card rounded-2xl px-8 py-4 shadow-lg mb-6 border-2 border-primary/20">
        <p className="text-2xl md:text-4xl font-bold text-foreground">
          🎀 RIA 🎀
        </p>
      </div>

      <p className="text-lg md:text-xl text-muted-foreground max-w-md font-semibold">
        March 13th, 2026 — The day the world's most ✨vertically efficient✨ queen was born
      </p>

      <div className="mt-8 bg-secondary/50 rounded-xl px-6 py-3 border border-secondary">
        <p className="text-sm text-secondary-foreground italic">
          "This website was NOT made by AI. Definitely not. Don't even think about it." 🤫
        </p>
      </div>

      <div className="mt-10 animate-bounce">
        <p className="text-muted-foreground text-sm">scroll down for chaos ↓</p>
      </div>
    </section>
  );
};

export default HeroSection;
