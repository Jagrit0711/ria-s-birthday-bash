import { motion } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import birthdayCap from "@/assets/birthday-cap.png";
import partyGlasses from "@/assets/party-glasses.png";

interface Props {
  onNext: () => void;
}

const StepCamera = ({ onNext }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [streaming, setStreaming] = useState(false);
  const [captured, setCaptured] = useState<string | null>(null);
  const [filter, setFilter] = useState<"cap" | "glasses" | "both">("both");
  const capImg = useRef<HTMLImageElement | null>(null);
  const glassesImg = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const cap = new Image();
    cap.src = birthdayCap;
    cap.onload = () => (capImg.current = cap);
    const glasses = new Image();
    glasses.src = partyGlasses;
    glasses.onload = () => (glassesImg.current = glasses);
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 480, height: 480 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreaming(true);
        setCaptured(null);
      }
    } catch {
      alert("Camera access needed for the birthday magic! 📸");
    }
  };

  const drawLoop = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      if (!video.paused && !video.ended) {
        canvas.width = video.videoWidth || 480;
        canvas.height = video.videoHeight || 480;
        ctx.save();
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        ctx.restore();

        const w = canvas.width;
        const h = canvas.height;

        if ((filter === "cap" || filter === "both") && capImg.current) {
          const capW = w * 0.4;
          ctx.drawImage(capImg.current, w * 0.3, h * 0.02, capW, capW);
        }
        if ((filter === "glasses" || filter === "both") && glassesImg.current) {
          const gW = w * 0.35;
          ctx.drawImage(glassesImg.current, w * 0.33, h * 0.32, gW, gW * 0.6);
        }

        ctx.save();
        ctx.font = `bold ${Math.floor(w * 0.055)}px Quicksand, sans-serif`;
        ctx.fillStyle = "#ff6b9d";
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;
        ctx.textAlign = "center";
        const text = "Happy Bday Ria! 🎂";
        ctx.strokeText(text, w / 2, h * 0.95);
        ctx.fillText(text, w / 2, h * 0.95);
        ctx.restore();

        requestAnimationFrame(draw);
      }
    };
    requestAnimationFrame(draw);
  }, [filter]);

  useEffect(() => {
    if (streaming) drawLoop();
  }, [filter, streaming, drawLoop]);

  const capture = () => {
    if (canvasRef.current) setCaptured(canvasRef.current.toDataURL("image/png"));
  };

  const download = () => {
    if (!captured) return;
    const a = document.createElement("a");
    a.href = captured;
    a.download = "ria-birthday-2026.png";
    a.click();
  };

  const stopCamera = () => {
    const video = videoRef.current;
    if (video?.srcObject) {
      (video.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      video.srcObject = null;
    }
    setStreaming(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
    >
      <h2 className="font-display text-3xl text-primary mb-2 text-center">📸 Birthday Selfie!</h2>
      <p className="text-muted-foreground text-center mb-6">get your birthday look on, Ria!</p>

      <div className="w-full max-w-sm">
        {!streaming && !captured && (
          <div className="text-center bg-card rounded-3xl p-8 shadow-xl border-2 border-primary/20">
            <p className="text-5xl mb-4">📷</p>
            <p className="text-muted-foreground mb-6">take a birthday selfie with filters!</p>
            <div className="flex flex-col gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={startCamera}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold shadow-lg"
              >
                Open Camera 🎉
              </motion.button>
              <button
                onClick={onNext}
                className="text-muted-foreground text-sm underline"
              >
                skip to the good part →
              </button>
            </div>
          </div>
        )}

        {streaming && (
          <div className="space-y-3">
            <video ref={videoRef} className="hidden" playsInline muted />
            <canvas ref={canvasRef} className="w-full rounded-3xl shadow-xl border-2 border-primary/20" />
            <div className="flex gap-2 justify-center">
              {(["cap", "glasses", "both"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-full font-semibold text-xs transition-all ${
                    filter === f
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground border-2 border-border"
                  }`}
                >
                  {f === "cap" ? "🎩 Cap" : f === "glasses" ? "👓 Glasses" : "✨ Both"}
                </button>
              ))}
            </div>
            <div className="flex gap-2 justify-center">
              <button onClick={capture} className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-bold">
                📸 Snap!
              </button>
              <button onClick={() => { stopCamera(); }} className="bg-secondary text-secondary-foreground px-5 py-2.5 rounded-full font-bold">
                Close
              </button>
            </div>
          </div>
        )}

        {captured && (
          <div className="text-center space-y-3">
            <img src={captured} alt="Birthday selfie" className="w-full rounded-3xl shadow-xl border-2 border-primary/20" />
            <div className="flex gap-2 justify-center">
              <button onClick={download} className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-bold">
                💾 Save
              </button>
              <button onClick={() => { setCaptured(null); startCamera(); }} className="bg-secondary text-secondary-foreground px-5 py-2.5 rounded-full font-bold">
                🔄 Retake
              </button>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { stopCamera(); onNext(); }}
              className="mt-4 bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold shadow-lg"
            >
              now for the real surprise... 🎁 →
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StepCamera;
