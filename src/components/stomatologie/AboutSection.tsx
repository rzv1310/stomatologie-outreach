import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, ShieldCheck, HeartPulse } from 'lucide-react';
import DisplayCards from '@/components/ui/display-cards';

const FRAME_COUNT = 150;
const FRAME_PREFIX = '/frames/frame_';
const HEIGHT_VH = 500;
const LERP_FACTOR = 0.12;
const PRELOAD_AHEAD = 15;
const BATCH_SIZE = 30;

function getFrameSrc(index: number): string {
  return `${FRAME_PREFIX}${String(index).padStart(4, '0')}.webp`;
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number,
) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasW / canvasH;
  let sw = img.naturalWidth;
  let sh = img.naturalHeight;
  let sx = 0;
  let sy = 0;
  if (imgRatio > canvasRatio) {
    sw = img.naturalHeight * canvasRatio;
    sx = (img.naturalWidth - sw) / 2;
  } else {
    sh = img.naturalWidth / canvasRatio;
    sy = (img.naturalHeight - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvasW, canvasH);
}

const featureCards = [
  {
    icon: <Cpu className="size-4 text-primary" />,
    title: 'Echipamente',
    description: 'Aparatură de ultimă generație',
    date: 'Tehnologie modernă',
    iconClassName: 'text-primary',
    titleClassName: 'text-primary',
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <ShieldCheck className="size-4 text-primary" />,
    title: 'Sterilizare',
    description: 'Standarde înalte de sterilizare',
    date: 'Siguranță maximă',
    iconClassName: 'text-primary',
    titleClassName: 'text-primary',
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <HeartPulse className="size-4 text-primary" />,
    title: 'Tratamente',
    description: 'Tratamente minim invazive',
    date: 'Confort pacient',
    iconClassName: 'text-primary',
    titleClassName: 'text-primary',
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];


export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef(0);
  const smoothFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const cardsRef = useRef(null);
  const isInView = useInView(cardsRef, { once: true, margin: "-100px" });

  const loadFrame = useCallback(
    (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (framesRef.current[index]) {
          resolve(framesRef.current[index]!);
          return;
        }
        const img = new Image();
        img.onload = () => {
          framesRef.current[index] = img;
          resolve(img);
        };
        img.onerror = reject;
        img.src = getFrameSrc(index + 1);
      });
    },
    [],
  );

  // Preload all frames in batches, show canvas as soon as first frame is ready
  useEffect(() => {
    framesRef.current = new Array(FRAME_COUNT).fill(null);
    let cancelled = false;
    let loadedCount = 0;

    async function loadAll() {
      for (let start = 0; start < FRAME_COUNT; start += BATCH_SIZE) {
        if (cancelled) return;
        const batch = [];
        for (let i = start; i < Math.min(start + BATCH_SIZE, FRAME_COUNT); i++) {
          batch.push(
            loadFrame(i).catch(() => {/* skip failed frame */}).then(() => {
              loadedCount++;
              if (!cancelled) {
                setLoadProgress(loadedCount / FRAME_COUNT);
                // Show canvas as soon as the first frame is available
                if (loadedCount === 1) setLoaded(true);
              }
            }),
          );
        }
        await Promise.all(batch);
      }
    }

    loadAll();
    return () => { cancelled = true; };
  }, [loadFrame]);

  // Size canvas and draw the first frame once loaded
  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    const firstFrame = framesRef.current[0];
    if (!canvas || !firstFrame) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) drawCover(ctx, firstFrame, canvas.width, canvas.height);
  }, [loaded]);

  // Scroll-driven rendering loop
  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      const frame = framesRef.current[currentFrameRef.current];
      if (frame) drawCover(ctx, frame, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resizeCanvas);

    const tick = () => {
      const rect = section.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrollableDistance = rect.height - viewportH;

      if (scrollableDistance > 0) {
        const scrolled = -rect.top;
        const progress = Math.min(1, Math.max(0, scrolled / scrollableDistance));
        const targetFrame = progress * (FRAME_COUNT - 1);

        // Lerp toward target for smooth easing
        smoothFrameRef.current += (targetFrame - smoothFrameRef.current) * LERP_FACTOR;
        const displayFrame = Math.min(
          FRAME_COUNT - 1,
          Math.max(0, Math.round(smoothFrameRef.current)),
        );

        if (displayFrame !== currentFrameRef.current) {
          const frame = framesRef.current[displayFrame];
          if (frame) {
            drawCover(ctx, frame, canvas.width, canvas.height);
            currentFrameRef.current = displayFrame;
          }
        }

        for (let i = 1; i <= PRELOAD_AHEAD; i++) {
          const ahead = displayFrame + i;
          const behind = displayFrame - i;
          if (ahead < FRAME_COUNT && !framesRef.current[ahead]) loadFrame(ahead);
          if (behind >= 0 && !framesRef.current[behind]) loadFrame(behind);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [loaded, loadFrame]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ height: `${HEIGHT_VH}vh`, position: 'relative' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Background */}
        <div className="absolute inset-0" style={{ background: '#fdfdfd' }} />

        <div className="container mx-auto px-4 relative z-10 h-full flex items-start pt-24 lg:items-center lg:pt-0">
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-16 items-center w-full">
            {/* Left - Scroll Video */}
            <div className="relative aspect-square max-w-[240px] sm:max-w-xs lg:max-w-md mx-auto w-full rounded-3xl overflow-hidden" style={{ background: '#fdfdfd' }}>
              <canvas
                ref={canvasRef}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                }}
              />

              {/* Loading overlay */}
              {!loaded && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#fdfdfd',
                    color: '#000',
                    gap: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '200px',
                      height: '4px',
                      background: '#ddd',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${loadProgress * 100}%`,
                        height: '100%',
                        background: '#888',
                        transition: 'width 0.15s ease-out',
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '14px', opacity: 0.6 }}>
                    Loading {Math.round(loadProgress * 100)}%
                  </span>
                </div>
              )}
            </div>

            {/* Right - Content */}
            <motion.div
              ref={cardsRef}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.div variants={itemVariants} className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl font-bold mb-4 text-foreground">
                    De ce să ne alegi ?
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-12">
                    Pentru noi - fiecare pacient este unic. Oferim tratamente personalizate,
                    într-un mediu confortabil și sigur.
                  </p>
                </div>

                {/* Features Display Cards */}
                <DisplayCards cards={featureCards} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
