import React, { useState, useEffect, useRef } from "react";

// ── Apple Liquid Glass Design - Premium Color Palettes ──
const meshConfigs = [
  {
    c1: "#E8F0E8", c2: "#F5F9F5", c3: "#D4E4D4", c4: "#E8F0E8", a1: "#C5D9C5",
    text: "#1A1A1A", btn: "#4CAF50", btnT: "#fff", lightHeart: "#81C784",
  },
  {
    c1: "#FFF0E0", c2: "#FFF8F0", c3: "#FFE0C0", c4: "#FFF0E0", a1: "#FFD4A8",
    text: "#1A1A1A", btn: "#FF9800", btnT: "#fff", lightHeart: "#FFB74D",
  },
  {
    c1: "#EDE4F5", c2: "#F5F0FA", c3: "#DCD0F0", c4: "#EDE4F5", a1: "#CDB8E8",
    text: "#1A1A1A", btn: "#9C27B0", btnT: "#fff", lightHeart: "#BA68C8",
  },
  {
    c1: "#E0F0F5", c2: "#F0F8FA", c3: "#C8E4ED", c4: "#E0F0F5", a1: "#ADD8E6",
    text: "#1A1A1A", btn: "#009688", btnT: "#fff", lightHeart: "#4DB6AC",
  },
  {
    c1: "#F5E0E0", c2: "#FAF0F0", c3: "#F0C8C8", c4: "#F5E0E0", a1: "#E8B0B0",
    text: "#1A1A1A", btn: "#E91E63", btnT: "#fff", lightHeart: "#F06292",
  },
];

// ── Content ──
const WISH = `Tum meri aadat ban chuki ho, meri khushi, meri comfort, mera favourite person… jisse baat kiye bina din adhura lagta hai Kabhi kabhi sochta hoon ki maine aisa kya achha kiya tha jo mujhe tum mil gayi. Tumhara pyaar honestly meri life ki sabse precious cheez hai
Itne time mein humne bahut moments saath jeeye — hasi, fights, cute talks, late night chats — aur har ek memory mere liye priceless hai. 
Thank you meri life mein aane ke liye, mujhe itna pyaar dene ke liye, aur har situation mein mera saath dene ke liye.
Main bas yehi chahta hoon ki hum dono hamesha aise hi saath rahein, ek dusre ko pyaar karte rahein, aur future mein aur bhi beautiful memories banayein Happy 1 Year 6 Months Anniversary meri jaan 🫶`;

const LOVE = `# Aanuu ❤️

Meri har khushi mein tum ho, har dua mein tum ho, aur mere har future wale khwaab mein bhi sirf tum ho.Tumhari voice mera sukoon hai, tumhari smile meri sabse favourite cheez hai, aur tumhara saath meri life ka sabse beautiful part hai. 

Aur sach kahun na…
Maine apna dil sirf tumse nahi lagaya… maine apni poori duniya tum mein basa li hai.
Maine honestly, maine apna dil, apni khushi, apna sukoon… sab tum mein hi rakh diya hai.

I Loveee Youuu Myy Aanuu ♡
Aaj bhi, kal bhi, aur meri har last heartbeat tak… sirf tum. ❤️
`;

// ── Global CSS with all animations ──
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Jost:wght@100;200;300;400;500;600;700&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{overflow-x:hidden;scroll-behavior:smooth}
  body{font-family:'Jost',sans-serif;background:#F5F5F7}

  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeUpFast{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes floatPhoto{0%,100%{transform:translateY(0) rotate(-0.5deg)}50%{transform:translateY(-12px) rotate(0.5deg)}}
  @keyframes floatHeart{0%{transform:translateY(100vh) scale(0.2);opacity:0}20%{opacity:0.5}80%{opacity:0.3}100%{transform:translateY(-20vh) scale(1);opacity:0}}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes btnShine{0%,100%{left:-100%}30%,70%{left:150%}}
  @keyframes heartBurst{0%{transform:translate(-50%,-50%) scale(0);opacity:1}100%{transform:translate(-50%,-50%) translate(var(--tx),var(--ty)) scale(1.3);opacity:0}}
  @keyframes heartBeat{0%,100%{transform:scale(1)}50%{transform:scale(1.25)}}

  /* Page 4 exclusive animations */
  @keyframes mainFloat{0%{transform:translateY(0px)}50%{transform:translateY(-12px)}100%{transform:translateY(0px)}}
  @keyframes pulseGlow{0%{transform:scale(1);opacity:.4}50%{transform:scale(1.18);opacity:.8}100%{transform:scale(1);opacity:.4}}
  @keyframes sparkle{0%{opacity:0;transform:scale(0) rotate(0deg)}50%{opacity:1;transform:scale(1.3) rotate(180deg)}100%{opacity:0;transform:scale(0) rotate(360deg)}}
  @keyframes fadeUpAnim{0%{opacity:0;transform:translateY(18px)}100%{opacity:1;transform:translateY(0px)}}

  .btn-shine{position:relative;overflow:hidden}
  .btn-shine::before{content:'';position:absolute;top:0;left:-100%;width:70px;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent);transform:skewX(-20deg);animation:btnShine 3.5s ease-in-out infinite}
`;

function hexToRgba(hex, a) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

// ── Mesh Canvas ──
function MeshCanvas({ pageIndex }) {
  const canvasRef = useRef(null);
  const timeRef = useRef(0);
  const frameRef = useRef(null);
  const pgRef = useRef(pageIndex);

  useEffect(() => { pgRef.current = pageIndex; }, [pageIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const drawMesh = (pg, t) => {
      const c = meshConfigs[pg];
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const bgGrad = ctx.createLinearGradient(0, 0, w * 0.8, h * 0.3);
      bgGrad.addColorStop(0, c.c2);
      bgGrad.addColorStop(1, c.c1);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      const blobs = [
        { x: 0.12 + 0.09 * Math.sin(t * 0.38), y: 0.18 + 0.07 * Math.cos(t * 0.32), r: 0.55, col: c.c3, a: 0.45 },
        { x: 0.78 + 0.08 * Math.cos(t * 0.28), y: 0.68 + 0.09 * Math.sin(t * 0.42), r: 0.52, col: c.c4, a: 0.42 },
        { x: 0.48 + 0.11 * Math.sin(t * 0.22), y: 0.42 + 0.06 * Math.cos(t * 0.48), r: 0.42, col: c.a1, a: 0.38 },
        { x: 0.88 + 0.05 * Math.cos(t * 0.52), y: 0.08 + 0.08 * Math.sin(t * 0.35), r: 0.35, col: c.c1, a: 0.32 },
        { x: 0.06 + 0.07 * Math.sin(t * 0.44), y: 0.85 + 0.05 * Math.cos(t * 0.38), r: 0.38, col: c.lightHeart, a: 0.28 },
      ];
      blobs.forEach(b => {
        const gx = b.x * w, gy = b.y * h, gr = b.r * Math.max(w, h);
        const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
        g.addColorStop(0, hexToRgba(b.col, b.a));
        g.addColorStop(0.5, hexToRgba(b.col, b.a * 0.3));
        g.addColorStop(1, hexToRgba(b.col, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(gx, gy, gr, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const tick = () => {
      timeRef.current += 0.006;
      drawMesh(pgRef.current, timeRef.current);
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, display: "block" }} />;
}

// ── Floating Hearts ──
function FloatingHearts({ color }) {
  const hearts = Array.from({ length: 20 }, () => ({
    left: Math.random() * 100,
    size: 8 + Math.random() * 18,
    dur: 10 + Math.random() * 16,
    delay: Math.random() * 15,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 2, overflow: "hidden" }}>
      {hearts.map((h, i) => (
        <div key={i} style={{
          position: "absolute", left: `${h.left}%`, bottom: "-10%",
          fontSize: h.size, lineHeight: 1,
          color: color,
          animation: `floatHeart ${h.dur}s ${h.delay}s ease-in-out infinite`,
        }}>♡</div>
      ))}
    </div>
  );
}



function useTypewriter(text, started, speed = 14) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!started || idx >= text.length) return;
    const t = setTimeout(() => setIdx(i => i + 1), speed);
    return () => clearTimeout(t);
  }, [started, idx, text, speed]);
  return { typed: text.slice(0, idx), done: idx >= text.length };
}

function useEntrance(delay = 0) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), delay); return () => clearTimeout(t); }, [delay]);
  return vis;
}

// ── Styled Components ──
const serif = "'Cormorant Garamond', serif";
const sans = "'Jost', sans-serif";

function Eyebrow({ children, color, delay = 0 }) {
  const vis = useEntrance(delay);
  return (
    <div style={{
      fontFamily: sans, fontSize: 10, fontWeight: 400, letterSpacing: 8, textTransform: "uppercase",
      color: color, opacity: vis ? 0.5 : 0, transform: vis ? "translateY(0)" : "translateY(16px)",
      transition: "all 0.8s cubic-bezier(0.2,0.9,0.4,1)",
      textAlign: "center"
    }}>{children}</div>
  );
}

function TitleXL({ children, color, delay = 0 }) {
  const vis = useEntrance(delay);
  return (
    <div style={{
      fontFamily: serif, fontSize: "clamp(56px,12vw,136px)", fontWeight: 300, lineHeight: 0.92,
      letterSpacing: -4, color: color, textAlign: "center",
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)",
      transition: `all 1s ${delay}ms cubic-bezier(0.2,0.95,0.4,1)`,
    }}>{children}</div>
  );
}

function TitleLG({ children, color, delay = 0, italic = false }) {
  const vis = useEntrance(delay);
  return (
    <div style={{
      fontFamily: serif, fontSize: "clamp(36px,7vw,82px)", fontWeight: 300, lineHeight: 1.05,
      letterSpacing: -2, color: color, fontStyle: italic ? "italic" : "normal", textAlign: "center",
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(22px)",
      transition: `all 0.9s ${delay}ms cubic-bezier(0.2,0.9,0.4,1)`,
    }}>{children}</div>
  );
}

function HeartDivider({ color, delay = 0 }) {
  const vis = useEntrance(delay);
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 12, margin: "28px 0" }}>
      {["♡", "♥", "♡"].map((h, i) => (
        <span key={i} style={{
          fontSize: i === 1 ? 18 : 13, color: color,
          opacity: vis ? 0.4 : 0, transform: vis ? "scale(1)" : "scale(0.5)",
          transition: `all 0.6s ${delay + i * 150}ms cubic-bezier(0.2,0.9,0.4,1)`,
          display: "inline-block"
        }}>{h}</span>
      ))}
    </div>
  );
}

function GlassCard({ children, delay = 0 }) {
  const vis = useEntrance(delay);
  return (
    <div style={{
      background: "rgba(255, 255, 255, 0.72)",
      backdropFilter: "blur(40px)",
      WebkitBackdropFilter: "blur(40px)",
      borderRadius: 36,
      border: "1px solid rgba(255, 255, 255, 0.95)",
      boxShadow: "0 25px 50px -20px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1), inset 0 -1px 0 rgba(0, 0, 0, 0.02)",
      padding: "38px 44px",
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(22px)",
      transition: `all 0.9s ${delay}ms cubic-bezier(0.2, 0.95, 0.4, 1)`,
    }}>{children}</div>
  );
}

function NextBtn({ onClick, label, bg, color }) {
  const [hov, setHov] = useState(false);
  const vis = useEntrance(0);
  return (
    <div style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(15px)",
      transition: "all 0.7s ease",
      textAlign: "center",
      marginTop: 45
    }}>
      <button
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="btn-shine"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: hov ? 20 : 10,
          padding: "16px 48px",
          background: bg,
          color: color,
          border: "none",
          cursor: "pointer",
          borderRadius: 60,
          fontFamily: sans,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: 5,
          textTransform: "uppercase",
          transition: "all 0.4s cubic-bezier(0.2,0.9,0.4,1)",
          boxShadow: hov ? `0 15px 35px -12px ${bg}80, inset 0 1px 0 rgba(255,255,255,0.3)` : `0 4px 12px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.2)`,
          transform: hov ? "translateY(-3px) scale(1.02)" : "none",
        }}
      >
        <span>{label}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
          style={{ transition: "transform 0.3s", transform: hov ? "translateX(6px)" : "none" }}>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

function BackBtn({ onClick, color }) {
  const [hov, setHov] = useState(false);
  const vis = useEntrance(200);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "fixed",
        top: 28,
        left: 28,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: hov ? 10 : 6,
        padding: "10px 20px",
        background: "rgba(255,255,255,0.65)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.9)",
        borderRadius: 40,
        cursor: "pointer",
        fontFamily: sans,
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: 3,
        textTransform: "uppercase",
        color: color,
        transition: "all 0.3s ease",
        transform: hov ? "translateX(-4px)" : "none",
        boxShadow: hov ? "0 8px 20px -10px rgba(0,0,0,0.12)" : "none",
        opacity: vis ? 1 : 0,
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      <span>back</span>
    </button>
  );
}

function RestartBtn({ onClick, color }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: hov ? 12 : 8,
        padding: "14px 36px",
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.9)",
        color: color,
        fontFamily: sans,
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: 4,
        textTransform: "uppercase",
        cursor: "pointer",
        borderRadius: 50,
        transition: "all 0.3s ease",
        marginTop: 35,
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 1 0 .49-3.67" />
      </svg>
      <span>start over</span>
    </button>
  );
}

function HeartBurst({ color }) {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100, overflow: "hidden" }}>
      {Array.from({ length: 50 }, (_, i) => {
        const angle = (360 / 50) * i * Math.PI / 180;
        const r = 55 + Math.random() * 110;
        return (
          <div key={i} style={{
            position: "absolute", left: "50%", top: "45%",
            fontSize: 11 + Math.random() * 15, color,
            "--tx": `${Math.cos(angle) * r}px`,
            "--ty": `${Math.sin(angle) * r}px`,
            animation: `heartBurst 1.1s ease-out ${i * 0.018}s forwards`,
          }}>♥</div>
        );
      })}
    </div>
  );
}

function Dots({ page, total, color }) {
  return (
    <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 10, zIndex: 50, pointerEvents: "none" }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          height: 7, width: i === page ? 28 : 7, borderRadius: 6,
          background: i === page ? color : `${color}30`,
          transition: "all 0.5s cubic-bezier(0.2,0.9,0.4,1)",
        }} />
      ))}
    </div>
  );
}

// ═══════════════════ PAGES ═══════════════════

function Page0({ onNext, c }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 24px 80px", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 600, width: "100%" }}>
        <Eyebrow color={c.text} delay={200}>a celebration of us</Eyebrow>
        <TitleXL color={c.text} delay={500}>Happy</TitleXL>
        <TitleXL color={c.text} delay={800}>1 Year</TitleXL>
        <TitleLG color={c.text} delay={1050} italic>&amp; 6 Months Anniversary Annu</TitleLG>
        <HeartDivider color={c.text} delay={1250} />
        <NextBtn onClick={onNext} label="our story" bg={c.btn} color={c.btnT} />
      </div>
    </div>
  );
}

function Page1({ onNext, onBack, c }) {
  const [started, setStarted] = useState(false);
  useEffect(() => { setTimeout(() => setStarted(true), 800); }, []);
  const { typed, done } = useTypewriter(WISH, started, 13);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px 90px", position: "relative", zIndex: 10 }}>
      <BackBtn onClick={onBack} color={c.text} />
      <div style={{ maxWidth: 640, width: "100%" }}>
        <TitleLG color={c.text} delay={450} italic>My dearest,</TitleLG>
        <GlassCard delay={800}>
          <div style={{ fontFamily: serif, fontSize: "clamp(16px,2.2vw,19px)", fontWeight: 300, lineHeight: 2.2, color: "#1A1A1A", whiteSpace: "pre-line" }}>
            {typed}
            {!done && <span style={{ display: "inline-block", width: 2.5, height: "1.1em", background: c.btn, marginLeft: 3, verticalAlign: "middle", animation: "blink 0.75s step-end infinite" }} />}
          </div>
          {done && (
            <div style={{ marginTop: 28, fontFamily: sans, fontSize: 10, letterSpacing: 6, textTransform: "uppercase", color: c.btn, opacity: 0.55, animation: "fadeUpFast 0.5s ease both", textAlign: "center" }}>
              with all my love ✦
            </div>
          )}
        </GlassCard>
        {done && <NextBtn onClick={onNext} label="next chapter" bg={c.btn} color={c.btnT} />}
      </div>
    </div>
  );
}

function Page2({ onNext, onBack, c }) {
  const vis = useEntrance(500);
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px 90px", position: "relative", zIndex: 10 }}>
      <BackBtn onClick={onBack} color={c.text} />
      <div style={{ maxWidth: 520, width: "100%" }}>
        <Eyebrow color={c.text} delay={200}>our story</Eyebrow>
        <TitleLG color={c.text} delay={450}>a glimpse of us</TitleLG>
        <div style={{
          borderRadius: 32, overflow: "hidden",
          boxShadow: "0 45px 80px -30px rgba(0,0,0,0.2)",
          opacity: vis ? 1 : 0, transform: vis ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)",
          transition: "all 1s cubic-bezier(0.2,0.95,0.4,1)",
          animation: vis ? "floatPhoto 9s ease-in-out infinite" : undefined,
          marginBottom: 28,
        }}>
          <img
            src="axv.jpeg"
            alt="us"
            style={{
              width: "100%",
              aspectRatio: "3/2",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
        <GlassCard delay={1000} style={{ textAlign: "center", padding: "24px 30px" }}>
          <p style={{ fontFamily: serif, fontSize: "clamp(15px,2vw,17px)", fontStyle: "italic", fontWeight: 300, lineHeight: 1.9, color: "#1A1A1A", margin: 0 }}>
            "Every moment with you is a beautiful page in our story."
          </p>
        </GlassCard>
        <NextBtn onClick={onNext} label="continue" bg={c.btn} color={c.btnT} />
      </div>
    </div>
  );
}

function Page3({ onNext, onBack, c }) {
  const [started, setStarted] = useState(false);
  const [burst, setBurst] = useState(false);

  useEffect(() => { setTimeout(() => setStarted(true), 700); }, []);
  const { typed, done } = useTypewriter(LOVE, started, 13);
  useEffect(() => { if (done) { setTimeout(() => setBurst(true), 500); } }, [done]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px 90px", position: "relative", zIndex: 10, background: "linear-gradient(135deg, #fff7fa 0%, #eef7fb 50%, #fff0f5 100%)" }}>
      <BackBtn onClick={onBack} color={c.text} />
      {burst && <HeartBurst color={c.lightHeart} />}
      <div style={{ maxWidth: 720, width: "100%", position: "relative", zIndex: 5 }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ fontFamily: sans, fontSize: 9, letterSpacing: 8, textTransform: "uppercase", color: c.text, opacity: 0.38, marginBottom: 14 }}>only yours forever</div>
          <h1 style={{ margin: 0, fontFamily: serif, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(54px,10vw,110px)", lineHeight: 1, letterSpacing: -4, color: "#ff92bb", textShadow: "0 6px 24px rgba(255,146,187,0.14)", animation: "mainFloat 5s ease-in-out infinite" }}>I Loveee Youuu</h1>
          <div style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(42px,8vw,82px)", color: "#ffb1cc", letterSpacing: -3 }}>Myy Aanuu <span style={{ display: "inline-block", marginLeft: 10, fontSize: "0.8em", animation: "heartBeat 1.8s ease-in-out infinite" }}>♡</span></div>
          <div style={{ marginTop: 14, fontFamily: serif, fontStyle: "italic", fontSize: 16, color: c.text, opacity: 0.55 }}>every heartbeat whispers your name</div>
        </div>
        <div style={{ borderRadius: 38, padding: "42px", background: "rgba(255,255,255,0.48)", backdropFilter: "blur(22px)", border: "1px solid rgba(255,255,255,0.55)", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
          <div style={{ fontFamily: serif, fontSize: "clamp(17px,2.1vw,20px)", fontWeight: 300, lineHeight: 2.2, color: "#232323", whiteSpace: "pre-line" }}>
            {typed}{!done && <span style={{ display: "inline-block", width: 2.5, height: "1.1em", background: "#ff8fb7", marginLeft: 4, verticalAlign: "middle", animation: "blink 0.75s step-end infinite" }} />}
          </div>
        </div>
        {done && <div style={{ display: "flex", justifyContent: "center", marginTop: 36 }}><button onClick={onNext} style={{ border: "none", padding: "18px 38px", borderRadius: 999, background: "linear-gradient(135deg,#ff8fb7,#ffbfd5)", color: "#fff", fontFamily: sans, fontSize: 12, letterSpacing: 5, textTransform: "uppercase", cursor: "pointer", boxShadow: "0 14px 35px rgba(255,143,183,0.32)" }}>final wish →</button></div>}
      </div>
    </div>
  );
}

// Page4 with all animations: mainFloat, pulseGlow, sparkle, fadeUpAnim
function Page4({ onRestart, onBack, c }) {
  const stars = Array.from({ length: 28 }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 10 + Math.random() * 20,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 4,
    color: ['#ffd6e7', '#fff', '#ffc2da'][Math.floor(Math.random() * 3)]
  }));

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 24px 80px", position: "relative", zIndex: 10, overflow: "hidden" }}>
      <BackBtn onClick={onBack} color={c.text} />
      
      {/* Sparkling stars */}
      {stars.map((star, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${star.left}%`,
          top: `${star.top}%`,
          fontSize: `${star.size}px`,
          color: star.color,
          pointerEvents: "none",
          animation: `sparkle ${star.duration}s ease-in-out infinite`,
          animationDelay: `${star.delay}s`,
          zIndex: 15,
        }}>✦</div>
      ))}
      
      {/* Pulsing glow background */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 8,
      }}>
        <div style={{
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${hexToRgba(c.lightHeart, 0.45)}, transparent 72%)`,
          filter: "blur(60px)",
          animation: "pulseGlow 5s ease-in-out infinite",
        }} />
      </div>
      
      {/* Main floating content */}
      <div style={{
        position: "relative",
        zIndex: 20,
        maxWidth: 800,
        width: "100%",
        textAlign: "center",
        animation: "mainFloat 6s ease-in-out infinite",
      }}>
        <div style={{
          fontFamily: sans,
          fontSize: 10,
          letterSpacing: 10,
          textTransform: "uppercase",
          color: c.text,
          opacity: 0.6,
          marginBottom: 26,
          animation: "fadeUpAnim 1s ease forwards",
        }}>
          made specially for my aanuu
        </div>
        <div style={{
          fontFamily: serif,
          fontStyle: "italic",
          fontWeight: 500,
          lineHeight: 0.88,
          letterSpacing: -6,
          fontSize: "clamp(72px,13vw,170px)",
          background: `linear-gradient(180deg, ${c.lightHeart} 0%, ${c.btn} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: 18,
          animation: "fadeUpAnim 1.2s ease forwards",
        }}>
          Happy<br />Anniversary
        </div>
        <div style={{
          fontFamily: serif,
          fontStyle: "italic",
          fontSize: "clamp(28px,4vw,46px)",
          color: c.text,
          opacity: 0.75,
          marginBottom: 20,
          animation: "fadeUpAnim 1.4s ease forwards",
        }}>
          1 Year &amp; 6 Months of Us ♡
        </div>
        <div style={{
          fontFamily: serif,
          fontStyle: "italic",
          fontSize: 22,
          color: c.text,
          opacity: 0.6,
          marginBottom: 48,
          animation: "fadeUpAnim 1.6s ease forwards",
        }}>
          and still falling for you every day ✨
        </div>
        <RestartBtn onClick={onRestart} color={c.btn} />
      </div>
    </div>
  );
}

// ═══════════════════ APP ═══════════════════
function App() {
  const [page, setPage] = useState(0);
  const c = meshConfigs[page];

  const nextPage = () => { window.scrollTo({ top: 0, behavior: "smooth" }); setPage(p => p + 1); };
  const prevPage = () => { window.scrollTo({ top: 0, behavior: "smooth" }); setPage(p => p - 1); };
  const restart = () => { window.scrollTo({ top: 0, behavior: "smooth" }); setPage(0); };

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <MeshCanvas pageIndex={page} />
      <div style={{
        position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.02,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
      }} />
      <FloatingHearts color={hexToRgba(c.btn, 0.18)} />

      {page === 0 && <Page0 onNext={nextPage} c={c} />}
      {page === 1 && <Page1 onNext={nextPage} onBack={prevPage} c={c} />}
      {page === 2 && <Page2 onNext={nextPage} onBack={prevPage} c={c} />}
      {page === 3 && <Page3 onNext={nextPage} onBack={prevPage} c={c} />}
      {page === 4 && <Page4 onRestart={restart} onBack={prevPage} c={c} />}

      <Dots page={page} total={5} color={c.btn} />
    </>
  );
}

// ✅ Proper export statement
export default App;

// If you want to render it directly (for standalone usage)
// const rootElement = document.getElementById("root");
// if (rootElement) {
//   const root = createRoot(rootElement);
//   root.render(<App />);
// }