import { motion } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";

interface Props {
  onNext: () => void;
}

const StepCamera = ({ onNext }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const [streaming, setStreaming] = useState(false);
  const [captured, setCaptured] = useState<string | null>(null);
  const [filter, setFilter] = useState<"cap" | "glasses" | "both" | "none">("both");

  const stopLoop = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  };

  const drawLoop = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      if (!video.paused && !video.ended && video.readyState >= 2) {
        const vw = video.videoWidth || 480;
        const vh = video.videoHeight || 480;
        canvas.width = vw;
        canvas.height = vh;

        // Mirror
        ctx.save();
        ctx.translate(vw, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, vw, vh);
        ctx.restore();

        // Birthday text
        ctx.save();
        ctx.font = `bold ${Math.floor(vw * 0.055)}px Quicksand, sans-serif`;
        ctx.fillStyle = "#ff6b9d";
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;
        ctx.textAlign = "center";
        const text = "Happy Bday Tiny Monster! 🎂";
        ctx.strokeText(text, vw / 2, vh * 0.95);
        ctx.fillText(text, vw / 2, vh * 0.95);
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);
  }, [filter]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 480, height: 480 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setStreaming(true);
          setCaptured(null);
        };
      }
    } catch {
      alert("Camera access needed for the birthday magic! 📸");
    }
  };

  useEffect(() => {
    if (streaming) {
      stopLoop();
      drawLoop();
    }
    return stopLoop;
  }, [filter, streaming, drawLoop]);

  const capture = () => {
    stopLoop();
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
    stopLoop();
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
      <p className="text-muted-foreground text-center mb-6">show the tiny monster your best look! 😈</p>

      <div className="w-full max-w-sm">
        {!streaming && !captured && (
          <div className="text-center bg-card rounded-3xl p-8 shadow-xl border-2 border-primary/20">
            <p className="text-5xl mb-4">📷</p>
            <p className="text-muted-foreground mb-6">take a birthday selfie with Ria!</p>
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
            {/* Hidden video element - canvas shows the preview */}
            <video ref={videoRef} className="hidden" playsInline muted />
            {/* Canvas is the actual visible preview */}
            <canvas
              ref={canvasRef}
              className="w-full rounded-3xl shadow-xl border-2 border-primary/20"
              style={{ display: "block" }}
            />
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
