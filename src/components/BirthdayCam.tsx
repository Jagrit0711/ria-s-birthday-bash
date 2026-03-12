import { useRef, useState, useCallback, useEffect } from "react";
import birthdayCap from "@/assets/birthday-cap.png";
import partyGlasses from "@/assets/party-glasses.png";

const BirthdayCam = () => {
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
        drawLoop();
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

        // Mirror the video
        ctx.save();
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        ctx.restore();

        // Draw overlays
        const w = canvas.width;
        const h = canvas.height;

        if ((filter === "cap" || filter === "both") && capImg.current) {
          const capW = w * 0.4;
          const capH = capW;
          ctx.drawImage(capImg.current, w * 0.3, h * 0.02, capW, capH);
        }

        if ((filter === "glasses" || filter === "both") && glassesImg.current) {
          const gW = w * 0.35;
          const gH = gW * 0.6;
          ctx.drawImage(glassesImg.current, w * 0.33, h * 0.32, gW, gH);
        }

        // Birthday text
        ctx.save();
        ctx.font = `bold ${Math.floor(w * 0.06)}px Quicksand, sans-serif`;
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
    const canvas = canvasRef.current;
    if (canvas) {
      setCaptured(canvas.toDataURL("image/png"));
    }
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
    if (video && video.srcObject) {
      (video.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      video.srcObject = null;
    }
    setStreaming(false);
  };

  return (
    <section className="py-20 px-4 bg-peach/30" id="camera">
      <h2 className="font-display text-4xl md:text-5xl text-center text-primary mb-2">
        📸 Birthday Selfie Booth
      </h2>
      <p className="text-center text-muted-foreground mb-10">
        Get your birthday look on! (yes Ria, this means you)
      </p>

      <div className="max-w-md mx-auto">
        {!streaming && !captured && (
          <div className="text-center">
            <div className="bg-card rounded-3xl p-10 shadow-xl border-2 border-primary/20 mb-4">
              <p className="text-6xl mb-4">📷</p>
              <p className="text-muted-foreground mb-6">
                Click to open camera and get your birthday filter!
              </p>
              <button
                onClick={startCamera}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold text-lg hover:opacity-90 transition-opacity"
              >
                Open Camera 🎉
              </button>
            </div>
          </div>
        )}

        {streaming && (
          <div className="space-y-4">
            <video ref={videoRef} className="hidden" playsInline muted />
            <canvas ref={canvasRef} className="w-full rounded-3xl shadow-xl border-2 border-primary/20" />

            <div className="flex gap-2 justify-center flex-wrap">
              {(["cap", "glasses", "both"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                    filter === f
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground border-2 border-border hover:border-primary/50"
                  }`}
                >
                  {f === "cap" ? "🎩 Cap" : f === "glasses" ? "👓 Glasses" : "✨ Both"}
                </button>
              ))}
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={capture}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
              >
                📸 Snap!
              </button>
              <button
                onClick={stopCamera}
                className="bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
              >
                Close ✕
              </button>
            </div>
          </div>
        )}

        {captured && (
          <div className="text-center space-y-4">
            <img src={captured} alt="Birthday selfie" className="w-full rounded-3xl shadow-xl border-2 border-primary/20" />
            <div className="flex gap-3 justify-center">
              <button
                onClick={download}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
              >
                💾 Download
              </button>
              <button
                onClick={() => { setCaptured(null); startCamera(); }}
                className="bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
              >
                🔄 Retake
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BirthdayCam;
