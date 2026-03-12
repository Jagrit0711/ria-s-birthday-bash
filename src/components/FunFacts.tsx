const facts = [
  { emoji: "📏", title: "Height", text: "Classified information. Just know she can walk under tables without ducking. 💅" },
  { emoji: "👓", title: "Glasses", text: "Iconic. Legendary. The world isn't ready for Ria without them." },
  { emoji: "🌋", title: "Temper", text: "Short fuse on a short queen. A dangerous combo. Handle with extreme caution." },
  { emoji: "💀", title: "Hobbies", text: "Fantasizing about the sweet release. Normal 17-year-old things. 🖤" },
  { emoji: "🤪", title: "Sanity Level", text: "Goes from 0 to 100 real quick. Sometimes both at once. Multitasking queen." },
  { emoji: "📅", title: "Last Seen IRL", text: "2 years ago! She might be even shorter now (is that possible?? 📐)" },
  { emoji: "🤖", title: "AI Opinion", text: "Doesn't believe in it. So this website was clearly hand-coded. Obviously. 100%. No AI. None. Zero. 🫠" },
];

const FunFacts = () => {
  return (
    <section className="py-20 px-4" id="facts">
      <h2 className="font-display text-4xl md:text-5xl text-center text-primary mb-2">
        📋 Ria's Official Dossier
      </h2>
      <p className="text-center text-muted-foreground mb-10">
        (totally not a roast section)
      </p>

      <div className="max-w-2xl mx-auto grid gap-4 md:grid-cols-2">
        {facts.map((fact) => (
          <div
            key={fact.title}
            className="bg-card rounded-2xl p-5 shadow-lg border-2 border-primary/10 hover:border-primary/30 transition-all hover:-translate-y-1"
          >
            <div className="text-3xl mb-2">{fact.emoji}</div>
            <h3 className="font-bold text-foreground text-lg mb-1">{fact.title}</h3>
            <p className="text-sm text-muted-foreground">{fact.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FunFacts;
