import { useState } from "react";

const ships = [
  { name: "Tejas", emoji: "👨‍💼", percentage: 87, comment: "The chemistry is UNDENIABLE. We see you Ria 👀" },
  { name: "Reyansh", emoji: "🧑‍💻", percentage: 73, comment: "Dark horse candidate. The tension is REAL 🔥" },
  { name: "Her short temper", emoji: "💥", percentage: 100, comment: "The only true soulmate. Together forever 💀" },
  { name: "The void", emoji: "🕳️", percentage: 95, comment: "She stares into it, and it stares back. Romance! 🖤" },
];

const ShipMeter = () => {
  const [revealed, setRevealed] = useState<boolean[]>(ships.map(() => false));

  const reveal = (idx: number) => {
    setRevealed((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  };

  return (
    <section className="py-20 px-4 bg-lavender/30" id="ships">
      <h2 className="font-display text-4xl md:text-5xl text-center text-primary mb-2">
        💕 Ship-o-Meter 💕
      </h2>
      <p className="text-center text-muted-foreground mb-10">
        Click to reveal Ria's compatibility score
      </p>

      <div className="max-w-lg mx-auto space-y-4">
        {ships.map((ship, idx) => (
          <div
            key={ship.name}
            onClick={() => reveal(idx)}
            className="bg-card rounded-2xl p-5 shadow-lg border-2 border-primary/10 cursor-pointer hover:border-primary/30 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold text-foreground">
                {ship.emoji} Ria × {ship.name}
              </span>
              {revealed[idx] ? (
                <span className="text-2xl font-bold text-primary">{ship.percentage}%</span>
              ) : (
                <span className="text-sm text-muted-foreground">tap to reveal 👆</span>
              )}
            </div>

            {revealed[idx] && (
              <>
                <div className="w-full bg-secondary rounded-full h-3 mb-3 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-1000"
                    style={{ width: `${ship.percentage}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground italic">{ship.comment}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShipMeter;
