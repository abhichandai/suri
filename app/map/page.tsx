"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const KEYWORDS = [
  { kw: "natural allergy relief", vol: 140, trend: "+175%", comp: "Medium", up: true },
  { kw: "natural treatment for yeast infection", vol: 110, trend: "+56%", comp: "Medium", up: true },
  { kw: "homeopath mississauga", vol: 40, trend: "+50%", comp: "Medium", up: true },
  { kw: "natural anxiety relief", vol: 30, trend: "+67%", comp: "Medium", up: true },
  { kw: "natural eczema treatment", vol: 30, trend: "+50%", comp: "High", up: true },
  { kw: "natural treatment for depression", vol: 30, trend: "+50%", comp: "Low", up: true },
  { kw: "homeopathy for hair loss", vol: 10, trend: "0%", comp: "Low", up: false },
  { kw: "homeopathic remedy for alopecia", vol: 10, trend: "0%", comp: "High", up: false },
];

const ICA_TRAITS = [
  "Indian woman, mid-30s to mid-40s",
  "Mother of a teenage daughter — the primary entry point",
  "Daughter is dealing with acne, menstrual cramping, or hormonal issues",
  "Has tried the conventional medical route and been disappointed",
  "Resistant to birth control pills or Accutane for her child",
  "Values natural, holistic health approaches",
  "Likely has prior family exposure to homeopathy",
  "Decision-maker for the whole family's healthcare",
  "Once she sees results, she brings in herself, siblings, spouse, extended family",
  "Price-insensitive when referred by someone she trusts",
];

const AUDIENCES = [
  {
    tag: "TAM 1",
    name: "Hindi / Punjabi Speaking Women",
    size: "35,200 – 41,400",
    details: ["Mississauga + 25mi, Ontario", "Women 30–45", "Language: Hindi or Punjabi", "Advantage+: Off"],
    img: "/audience-tam1-hindi.png",
    note: "The exact person. Culturally predisposed to homeopathy, speaks the language, within range. Smaller but highest intent.",
  },
  {
    tag: "TAM 2",
    name: "Women with Teenagers",
    size: "14,200 – 16,700",
    details: ["Mississauga + 25mi, Ontario", "Women 30–45", "Parents with teenagers (13–17 years)", "Advantage+: Off"],
    img: "/audience-tam2-teens.png",
    note: "Mothers in the exact life stage where a daughter's health becomes a priority. Smaller, tighter, higher buying intent.",
  },
];

export default function MapPage() {
  const [openAudience, setOpenAudience] = useState<number | null>(null);
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const obs = new IntersectionObserver(
      (e) => e.forEach((x) => { if (x.isIntersecting) x.target.classList.add("visible"); }),
      { threshold: 0.05 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main style={{ fontFamily: "var(--font-ui)", fontWeight: 300 }}>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", background: "var(--forest)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "128px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position:"absolute", top:"-80px", right:"-100px", width:"500px", height:"500px", borderRadius:"50%", border:"1px solid rgba(184,150,46,0.10)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-60px", left:"-80px", width:"360px", height:"360px", borderRadius:"50%", border:"1px solid rgba(184,150,46,0.06)", pointerEvents:"none" }} />
        <div style={{ maxWidth:"860px", margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
          <EyebrowLabel light>Prepared exclusively for Hermeet Suri</EyebrowLabel>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(3.2rem,5.5vw,5rem)", fontWeight:300, lineHeight:1.1, letterSpacing:"-0.01em", color:"var(--bg)", marginBottom:"24px", maxWidth:"800px" }}>
            From 8 to 16 patients per week.{" "}
            <em style={{ fontStyle:"italic", color:"var(--gold-dark)" }}>Here&apos;s how.</em>
          </h1>
          <p style={{ fontSize:"1.125rem", fontWeight:300, color:"rgba(240,237,230,0.70)", maxWidth:"520px", marginBottom:"56px", lineHeight:1.75 }}>
            A structured plan that doubles Homeopathic Plus Centre&apos;s patient intake in six months — through precision targeting, not guesswork.
          </p>
          <div style={{ display:"flex", gap:"40px", flexWrap:"wrap", marginBottom:"64px" }}>
            {[["8 → 16","patients / week"],["6 months","to double the practice"],["Sept 1, 2026","target date"]].map(([n, label], i, arr) => (
              <div key={n} style={{ display:"flex", gap:"40px", alignItems:"center" }}>
                <div>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:"2rem", fontWeight:300, color:"var(--gold-dark)", lineHeight:1 }}>{n}</div>
                  <div style={{ fontSize:"0.75rem", fontWeight:400, color:"rgba(240,237,230,0.45)", letterSpacing:"0.08em", textTransform:"uppercase", marginTop:"6px" }}>{label}</div>
                </div>
                {i < arr.length - 1 && <div style={{ width:"1px", height:"44px", background:"rgba(240,237,230,0.12)" }} />}
              </div>
            ))}
          </div>
          <div style={{ paddingTop:"32px", borderTop:"1px solid rgba(240,237,230,0.10)", display:"flex", alignItems:"center", gap:"14px" }}>
            <div style={{ width:"40px", height:"40px", borderRadius:"50%", background:"var(--gold)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-display)", fontSize:"15px", fontWeight:400, color:"var(--forest)", flexShrink:0 }}>AC</div>
            <div>
              <div style={{ fontSize:"0.875rem", fontWeight:500, color:"rgba(240,237,230,0.85)" }}>Abhi Chand</div>
              <div style={{ fontSize:"0.75rem", color:"rgba(240,237,230,0.40)" }}>Digital Growth Strategist ·{" "}
                <a href="https://nava45.com" target="_blank" rel="noopener noreferrer" style={{ color:"rgba(240,237,230,0.40)", textDecoration:"none" }}>nava45.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE GOAL ── */}
      <section className="fade-up" style={{ minHeight:"100vh", background:"var(--bg)", display:"flex", alignItems:"center", padding:"96px 40px" }}>
        <div style={{ maxWidth:"860px", margin:"0 auto", width:"100%" }}>
          <EyebrowLabel>The goal</EyebrowLabel>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.2rem,3.5vw,2.8rem)", fontWeight:300, lineHeight:1.2, letterSpacing:"-0.01em", marginBottom:"20px" }}>
            Double your practice in <em style={{ fontStyle:"italic", color:"var(--gold)" }}>six months</em>
          </h2>
          <p style={{ fontSize:"1rem", color:"var(--muted)", maxWidth:"560px", marginBottom:"56px", lineHeight:1.75 }}>
            From 8 new patients per week to 16 — by September 1st, 2026. That&apos;s not a stretch target. It&apos;s a doubling of your business, built on infrastructure that keeps compounding after we hit it.
          </p>
          <div style={{ background:"var(--bg-alt)", border:"1px solid var(--border)", borderRadius:"16px", padding:"48px 40px", boxShadow:"var(--shadow-sm)", marginBottom:"28px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", alignItems:"center", gap:"24px", marginBottom:"32px" }}>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:"0.75rem", fontWeight:400, letterSpacing:"0.08em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"12px" }}>Where you are</div>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"clamp(4rem,8vw,6rem)", fontWeight:300, color:"var(--text)", lineHeight:1 }}>8</div>
                <div style={{ fontSize:"0.875rem", color:"var(--muted)", marginTop:"8px" }}>new patients / week</div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"8px" }}>
                <svg width="64" height="24" viewBox="0 0 64 24" fill="none">
                  <line x1="0" y1="12" x2="52" y2="12" stroke="var(--gold)" strokeWidth="1.5"/>
                  <polyline points="44,4 56,12 44,20" stroke="var(--gold)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div style={{ fontSize:"0.75rem", color:"var(--gold)", fontWeight:400, letterSpacing:"0.06em", textTransform:"uppercase" }}>6 months</div>
              </div>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:"0.75rem", fontWeight:400, letterSpacing:"0.08em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"12px" }}>Where we&apos;re going</div>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"clamp(4rem,8vw,6rem)", fontWeight:300, color:"var(--gold)", lineHeight:1 }}>16</div>
                <div style={{ fontSize:"0.875rem", color:"var(--muted)", marginTop:"8px" }}>new patients / week · by Sept 1, 2026</div>
              </div>
            </div>
            <div style={{ borderTop:"1px solid var(--border)", paddingTop:"24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }}>
              <div>
                <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"6px" }}>Current new patient revenue / mo</div>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"1.5rem", fontWeight:300, color:"var(--text)" }}>~$6,400</div>
                <div style={{ fontSize:"0.8rem", color:"var(--muted)" }}>32 patients × $200 first session</div>
              </div>
              <div>
                <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"6px" }}>Target new patient revenue / mo</div>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"1.5rem", fontWeight:300, color:"var(--gold)" }}>~$12,800</div>
                <div style={{ fontSize:"0.8rem", color:"var(--muted)" }}>64 patients × $200 first session</div>
              </div>
            </div>
          </div>
          <div style={{ background:"var(--forest-light)", borderLeft:"3px solid var(--forest-mid)", borderRadius:"0 8px 8px 0", padding:"16px 20px", fontSize:"0.875rem", color:"var(--forest)", lineHeight:1.65 }}>
            <strong style={{ fontWeight:500 }}>Two things being built simultaneously:</strong> A paid digital pipeline that attracts new patients predictably — and a referral system that operationalizes word-of-mouth so you never have to ask manually again. Both start in Month 1.
          </div>
        </div>
      </section>

      {/* ── THREE STEPS STATEMENT ── */}
      <section style={{ minHeight:"100vh", background:"#0E0D0C", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px" }}>
        <div style={{ textAlign:"center", maxWidth:"700px" }}>
          <p style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.8rem,5vw,4.5rem)", fontWeight:300, lineHeight:1.15, letterSpacing:"-0.01em", color:"var(--bg)" }}>
            Three steps to{" "}
            <em style={{ fontStyle:"italic", color:"var(--gold-dark)" }}>get there.</em>
          </p>
        </div>
      </section>

      {/* ── STEP 1: WHO ── */}
      <section className="fade-up" style={{ background:"var(--bg)", padding:"96px 40px" }}>
        <div style={{ maxWidth:"860px", margin:"0 auto" }}>
          <EyebrowLabel>Step 1 of 3</EyebrowLabel>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.2rem,3.5vw,2.8rem)", fontWeight:300, lineHeight:1.2, letterSpacing:"-0.01em", marginBottom:"16px" }}>
            Who are we <em style={{ fontStyle:"italic", color:"var(--gold)" }}>targeting?</em>
          </h2>
          <p style={{ fontSize:"1rem", color:"var(--muted)", maxWidth:"540px", marginBottom:"48px", lineHeight:1.75 }}>
            Everything that follows is built around one specific person. Understanding her precisely is what makes every dollar of ad spend work harder.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", background:"var(--border)", border:"1px solid var(--border)", borderRadius:"14px", overflow:"hidden", marginBottom:"28px" }}>
            {ICA_TRAITS.map((trait, i) => (
              <div key={i} style={{ background:"var(--bg)", padding:"20px 24px", display:"flex", gap:"14px", alignItems:"flex-start" }}>
                <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"var(--gold)", flexShrink:0, marginTop:"7px" }} />
                <div style={{ fontSize:"0.9rem", color:"var(--text)", lineHeight:1.6 }}>{trait}</div>
              </div>
            ))}
          </div>
          <div style={{ background:"#FDF3E3", border:"1px solid rgba(184,150,46,0.25)", borderRadius:"10px", padding:"20px 24px", fontSize:"0.875rem", color:"var(--text)", lineHeight:1.7 }}>
            <strong style={{ fontWeight:500 }}>The multiplier effect:</strong> She is not just one patient. She is the entry point to an entire family — and an entire community. When she trusts you, everyone she knows hears about it. This is why referral patients have no price ceiling.
          </div>
        </div>
      </section>

      {/* ── STEP 2: WHERE ── */}
      <section className="fade-up" style={{ background:"var(--bg-alt)", padding:"96px 40px" }}>
        <div style={{ maxWidth:"860px", margin:"0 auto" }}>
          <EyebrowLabel>Step 2 of 3</EyebrowLabel>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.2rem,3.5vw,2.8rem)", fontWeight:300, lineHeight:1.2, letterSpacing:"-0.01em", marginBottom:"16px" }}>
            Where do we <em style={{ fontStyle:"italic", color:"var(--gold)" }}>find her?</em>
          </h2>
          <p style={{ fontSize:"1rem", color:"var(--muted)", maxWidth:"540px", marginBottom:"56px", lineHeight:1.75 }}>
            We looked at every channel. Here&apos;s what the data says.
          </p>

          {/* Google ruled out */}
          <div style={{ marginBottom:"48px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"20px" }}>
              <div style={{ width:"28px", height:"28px", borderRadius:"50%", background:"rgba(220,50,50,0.10)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ fontSize:"14px", color:"#C0392B" }}>✕</span>
              </div>
              <div style={{ fontWeight:500, fontSize:"1rem", color:"var(--text)" }}>Google Search Ads — ruled out</div>
            </div>
            <p style={{ fontSize:"0.875rem", color:"var(--muted)", maxWidth:"580px", marginBottom:"24px", lineHeight:1.7 }}>
              We ran a full keyword analysis across Toronto + Mississauga. Total search volume across every relevant keyword: <strong style={{ color:"var(--text)" }}>~620 searches per month.</strong> Even capturing 100% of those at a 3% conversion rate gives roughly 18 leads per month — not enough to build a predictable pipeline.
            </p>

            {/* Keyword table */}
            <div style={{ background:"var(--bg)", border:"1px solid var(--border)", borderRadius:"12px", overflow:"hidden", boxShadow:"var(--shadow-sm)", marginBottom:"16px" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 80px 80px 80px", padding:"10px 20px", borderBottom:"1px solid var(--border)", background:"var(--bg-alt)" }}>
                {["Keyword","Monthly","Trend","Comp."].map(h => (
                  <div key={h} style={{ fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)" }}>{h}</div>
                ))}
              </div>
              {KEYWORDS.map((k, i) => (
                <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 80px 80px 80px", padding:"12px 20px", borderBottom: i < KEYWORDS.length - 1 ? "1px solid var(--border)" : "none", alignItems:"center" }}>
                  <div style={{ fontSize:"0.8rem", color:"var(--text)" }}>{k.kw}</div>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:"1.1rem", fontWeight:300, color: k.vol >= 100 ? "var(--text)" : "var(--muted)" }}>{k.vol}</div>
                  <div style={{ fontSize:"0.75rem", color: k.up ? "#2E7D52" : "var(--muted)", fontWeight:k.up?500:300 }}>{k.up ? "↑" : "→"} {k.trend}</div>
                  <div style={{ fontSize:"0.75rem" }}>
                    <span style={{ padding:"2px 8px", borderRadius:"100px", fontSize:"0.7rem", fontWeight:500, background: k.comp==="High"?"rgba(220,50,50,0.08)":k.comp==="Medium"?"rgba(184,150,46,0.10)":"rgba(46,125,82,0.08)", color: k.comp==="High"?"#C0392B":k.comp==="Medium"?"#8A6914":"#2E7D52" }}>{k.comp}</span>
                  </div>
                </div>
              ))}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 80px 80px 80px", padding:"12px 20px", background:"rgba(220,50,50,0.04)", borderTop:"2px solid rgba(220,50,50,0.15)" }}>
                <div style={{ fontSize:"0.75rem", fontWeight:500, color:"#C0392B" }}>Total (all keywords, Toronto + Mississauga)</div>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"1.1rem", fontWeight:300, color:"#C0392B" }}>620</div>
                <div style={{ fontSize:"0.75rem", color:"#C0392B" }}>/ month</div>
                <div style={{ fontSize:"0.75rem", color:"#C0392B" }}>—</div>
              </div>
            </div>
            <div style={{ fontSize:"0.8rem", color:"var(--muted)", fontStyle:"italic", paddingLeft:"4px" }}>
              Source: Google Keyword Planner · April 2025 – March 2026 · Toronto + Mississauga region
            </div>
          </div>

          {/* Meta — the answer */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"20px" }}>
              <div style={{ width:"28px", height:"28px", borderRadius:"50%", background:"rgba(46,125,82,0.10)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ fontSize:"14px", color:"#2E7D52" }}>✓</span>
              </div>
              <div style={{ fontWeight:500, fontSize:"1rem", color:"var(--text)" }}>Meta / Facebook — the right channel</div>
            </div>
            <p style={{ fontSize:"0.875rem", color:"var(--muted)", maxWidth:"580px", marginBottom:"28px", lineHeight:1.7 }}>
              She&apos;s not searching for you — she&apos;s on Instagram and Facebook every day. We don&apos;t wait for her to find you. We show up exactly where she is, with a message that speaks directly to what she&apos;s going through. Here are the two audiences we&apos;ve already built and validated.
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" }}>
              {AUDIENCES.map((a, i) => (
                <div key={i}>
                  <button onClick={() => setOpenAudience(openAudience === i ? null : i)} style={{
                    width:"100%", textAlign:"left", cursor:"pointer",
                    border:"1.5px solid rgba(184,150,46,0.35)",
                    borderBottom: openAudience === i ? "none" : "1.5px solid rgba(184,150,46,0.35)",
                    borderRadius: openAudience === i ? "12px 12px 0 0" : "12px",
                    padding:"24px", background:"rgba(255,255,255,0.90)", boxShadow:"var(--shadow-sm)",
                    transition:"all 0.15s ease",
                  }}>
                    <div style={{ fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"8px" }}>{a.tag}</div>
                    <div style={{ fontWeight:500, fontSize:"0.95rem", color:"var(--text)", marginBottom:"6px" }}>{a.name}</div>
                    <div style={{ fontFamily:"var(--font-display)", fontSize:"2rem", fontWeight:300, color:"var(--forest-mid)", lineHeight:1, marginBottom:"8px" }}>{a.size}</div>
                    <div style={{ fontSize:"0.75rem", color:"var(--muted)", marginBottom:"2px" }}>Mississauga + 25mi · Advantage+ off</div>
                    <div style={{ fontSize:"0.75rem", color:"var(--gold)", marginTop:"10px" }}>{openAudience === i ? "▲ hide details" : "▼ view audience details"}</div>
                  </button>
                  {openAudience === i && (
                    <div style={{ border:"1.5px solid rgba(184,150,46,0.35)", borderTop:"none", borderRadius:"0 0 12px 12px", padding:"24px", background:"var(--bg)", boxShadow:"var(--shadow-sm)" }}>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px", marginBottom:"20px" }}>
                        <div>
                          <div style={{ fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"10px" }}>Audience parameters</div>
                          {a.details.map(d => (
                            <div key={d} style={{ display:"flex", gap:"8px", fontSize:"0.8rem", color:"var(--text)", lineHeight:1.5, marginBottom:"4px" }}>
                              <span style={{ color:"var(--gold)", flexShrink:0 }}>→</span>{d}
                            </div>
                          ))}
                          <div style={{ marginTop:"14px", padding:"10px 12px", background:"var(--forest-light)", borderRadius:"6px", fontSize:"0.8rem", color:"var(--forest)", lineHeight:1.55 }}>
                            {a.note}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"10px" }}>Meta Audience Manager</div>
                          <div style={{ borderRadius:"8px", overflow:"hidden", border:"1px solid var(--border)", boxShadow:"var(--shadow-xs)" }}>
                            <Image src={a.img} alt={a.name} width={400} height={300} style={{ width:"100%", height:"auto", display:"block" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STEP 3 STATEMENT ── */}
      <section style={{ minHeight:"100vh", background:"var(--forest)", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px" }}>
        <div style={{ textAlign:"center", maxWidth:"700px" }}>
          <p style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.8rem,5vw,4.5rem)", fontWeight:300, lineHeight:1.15, letterSpacing:"-0.01em", color:"var(--bg)" }}>
            How do we{" "}
            <em style={{ fontStyle:"italic", color:"var(--gold-dark)" }}>attract them?</em>
          </p>
        </div>
      </section>

      {/* ── THE PLAN ── */}
      <section className="fade-up" style={{ background:"var(--bg-alt)", padding:"96px 40px" }}>
        <div style={{ maxWidth:"860px", margin:"0 auto" }}>
          <EyebrowLabel>Step 3 of 3 — The plan</EyebrowLabel>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.2rem,3.5vw,2.8rem)", fontWeight:300, lineHeight:1.2, letterSpacing:"-0.01em", marginBottom:"16px" }}>
            Four phases. <em style={{ fontStyle:"italic", color:"var(--gold)" }}>One compounding system.</em>
          </h2>
          <p style={{ fontSize:"1rem", color:"var(--muted)", maxWidth:"560px", marginBottom:"40px", lineHeight:1.75 }}>
            Click any phase to see exactly what happens, why, and what you&apos;ll have at the end of it. Nothing is skipped. Every step exists for a reason.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", background:"var(--bg)", border:"1px solid var(--border)", borderRadius:"12px 12px 0 0", overflow:"hidden" }}>
            {PHASES.map((phase, i) => (
              <button key={i} onClick={() => setActivePhase(i)} style={{
                padding:"20px 16px", border:"none",
                borderBottom: activePhase === i ? "2px solid var(--gold)" : "2px solid transparent",
                borderRight: i < PHASES.length - 1 ? "1px solid var(--border)" : "none",
                background: activePhase === i ? "rgba(184,150,46,0.04)" : "transparent",
                cursor:"pointer", textAlign:"left", transition:"all 0.15s ease",
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"8px" }}>
                  <div style={{ fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color: activePhase === i ? "var(--gold)" : "var(--muted)" }}>{phase.month}</div>
                  {phase.inProgress && <div style={{ fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.06em", textTransform:"uppercase", padding:"2px 7px", borderRadius:"100px", background:"rgba(46,125,82,0.12)", color:"#2E7D52" }}>In Progress</div>}
                </div>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"1rem", fontWeight:300, color: activePhase === i ? "var(--text)" : "var(--muted)", lineHeight:1.3, marginBottom:"4px" }}>{phase.title}</div>
                {activePhase === i && <div style={{ fontSize:"0.75rem", color:"var(--muted)", lineHeight:1.4 }}>{phase.tagline}</div>}
              </button>
            ))}
          </div>
          <div style={{ background:"var(--bg)", border:"1px solid var(--border)", borderTop:"none", borderRadius:"0 0 12px 12px", padding:"36px", boxShadow:"var(--shadow-sm)" }}>
            <PhasePanel phase={PHASES[activePhase]} />
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="fade-up" style={{ background:"var(--bg)", padding:"96px 40px" }}>
        <div style={{ maxWidth:"860px", margin:"0 auto" }}>
          <EyebrowLabel>Proof it works</EyebrowLabel>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.2rem,3.5vw,2.8rem)", fontWeight:300, lineHeight:1.2, letterSpacing:"-0.01em", marginBottom:"16px" }}>
            Same strategy. Different industry.{" "}
            <em style={{ fontStyle:"italic", color:"var(--gold)" }}>$14.5M in pipeline.</em>
          </h2>
          <p style={{ fontSize:"1rem", color:"var(--muted)", maxWidth:"560px", marginBottom:"48px", lineHeight:1.75 }}>
            We applied the same Laser Targeting and Precision-Marketing approach for Balance Catamarans — a luxury yacht company. The result was $14.5M in qualified sales pipeline. The same infrastructure is what we&apos;re building for you.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"24px" }}>
            <div style={{ borderRadius:"12px", overflow:"hidden", border:"1px solid var(--border)", boxShadow:"var(--shadow-sm)" }}>
              <Image src="/balance-pipeline-overview.png" alt="Balance Catamarans pipeline overview" width={600} height={500} style={{ width:"100%", height:"auto", display:"block" }} />
            </div>
            <div style={{ borderRadius:"12px", overflow:"hidden", border:"1px solid var(--border)", boxShadow:"var(--shadow-sm)" }}>
              <Image src="/balance-pipeline-tof.png" alt="Balance Catamarans TOF detail" width={600} height={500} style={{ width:"100%", height:"auto", display:"block" }} />
            </div>
          </div>
          <div style={{ padding:"20px 24px", background:"var(--bg-alt)", border:"1px solid rgba(184,150,46,0.15)", borderRadius:"10px", fontSize:"0.875rem", color:"var(--muted)", lineHeight:1.7 }}>
            Balance Catamarans · Digital Marketing Pipeline · Managed by Nava45 · <strong style={{ color:"var(--text)", fontWeight:500 }}>$14.5M in qualified pipeline generated</strong>
          </div>
        </div>
      </section>

      {/* ── THE QUESTION ── */}
      <section style={{ minHeight:"100vh", background:"#0E0D0C", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px" }}>
        <div style={{ textAlign:"center", maxWidth:"760px" }}>
          <p style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.2rem,4vw,3.8rem)", fontWeight:300, lineHeight:1.2, letterSpacing:"-0.01em", color:"var(--bg)" }}>
            Do you think this plan could{" "}
            <em style={{ fontStyle:"italic", color:"var(--gold-dark)" }}>double your weekly patient count?</em>
          </p>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="fade-up" style={{ background:"var(--forest)", padding:"96px 40px" }}>
        <div style={{ maxWidth:"860px", margin:"0 auto" }}>
          <EyebrowLabel light>Your investment</EyebrowLabel>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.2rem,3.5vw,2.8rem)", fontWeight:300, lineHeight:1.2, letterSpacing:"-0.01em", marginBottom:"16px", color:"var(--bg)" }}>
            What it costs to build <em style={{ fontStyle:"italic", color:"var(--gold-dark)" }}>something that lasts</em>
          </h2>
          <p style={{ fontSize:"1rem", color:"rgba(240,237,230,0.60)", maxWidth:"560px", marginBottom:"48px", lineHeight:1.75 }}>
            The same process that generated $14.5M in pipeline for luxury yachts — applied to your patient acquisition problem.
          </p>
          <div style={{ border:"1.5px solid var(--gold-dark)", borderRadius:"16px", padding:"36px", background:"rgba(184,150,46,0.06)", marginBottom:"16px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"20px", marginBottom:"28px" }}>
              <div>
                <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--gold-dark)", marginBottom:"10px" }}>Full-service growth partnership</div>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"1.6rem", fontWeight:300, color:"var(--bg)", lineHeight:1.2, marginBottom:"8px" }}>Patient Acquisition Infrastructure</div>
                <div style={{ fontSize:"0.875rem", color:"rgba(240,237,230,0.50)", maxWidth:"420px", lineHeight:1.55 }}>ICA development, referral system, Meta ad infrastructure, creative testing, lead generation, email automation, optimization, and reporting.</div>
              </div>
              <div style={{ textAlign:"right", flexShrink:0 }}>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"3rem", fontWeight:300, color:"var(--gold-dark)", lineHeight:1 }}>$2,500</div>
                <div style={{ fontSize:"0.75rem", color:"rgba(240,237,230,0.40)", marginTop:"6px" }}>per month · 4–6 month minimum</div>
              </div>
            </div>
            <div style={{ height:"1px", background:"rgba(240,237,230,0.10)", marginBottom:"24px" }} />
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
              {["ICA interviews + profile development","Referral system (email, raffle, review ask)","Meta Pixel + Conversion API setup","Audience builds (Cold + LLA)","Multiple creative testing rounds","Lead Ads campaigns + optimization","MailerLite setup + follow-up sequences","Monthly reporting + weekly data review","90-day check-in with full performance review","Landing page for confirmed winning offer"].map(f => (
                <div key={f} style={{ display:"flex", gap:"10px", fontSize:"0.8rem", color:"rgba(240,237,230,0.65)", lineHeight:1.4 }}>
                  <span style={{ color:"var(--gold-dark)", flexShrink:0 }}>✓</span>{f}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
            <div style={{ border:"1px solid rgba(240,237,230,0.12)", borderRadius:"12px", padding:"24px", background:"rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(240,237,230,0.40)", marginBottom:"14px" }}>Ad budget — paid directly to Meta</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                {[["Month 2 — ICA validation","$500"],["Months 3–4 — creative + lead ad testing","$1,000–$1,500"]].map(([l,a]) => (
                  <div key={l} style={{ display:"flex", justifyContent:"space-between", fontSize:"0.875rem", color:"rgba(240,237,230,0.60)" }}>
                    <span>{l}</span><span style={{ color:"var(--gold-dark)" }}>{a}</span>
                  </div>
                ))}
                <div style={{ height:"1px", background:"rgba(240,237,230,0.08)" }} />
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:"0.875rem", fontWeight:500, color:"rgba(240,237,230,0.75)" }}>
                  <span>Total over 4 months</span><span style={{ color:"var(--gold-dark)" }}>~$1,500–$2,000</span>
                </div>
              </div>
            </div>
            <div style={{ border:"1px solid rgba(240,237,230,0.12)", borderRadius:"12px", padding:"24px", background:"rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(240,237,230,0.40)", marginBottom:"14px" }}>Optional add-ons</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
                <div>
                  <div style={{ fontSize:"0.875rem", fontWeight:500, color:"rgba(240,237,230,0.80)", marginBottom:"3px" }}>ChatGPT / AI Search Optimization</div>
                  <div style={{ fontSize:"0.8rem", color:"rgba(240,237,230,0.40)", lineHeight:1.5, marginBottom:"4px" }}>FAQ schema + content restructuring for AI citation visibility</div>
                  <div style={{ fontSize:"0.875rem", color:"var(--gold-dark)" }}>$500 one-time</div>
                </div>
                <div style={{ height:"1px", background:"rgba(240,237,230,0.08)" }} />
                <div>
                  <div style={{ fontSize:"0.875rem", fontWeight:500, color:"rgba(240,237,230,0.80)", marginBottom:"3px" }}>Appointment Setter</div>
                  <div style={{ fontSize:"0.8rem", color:"rgba(240,237,230,0.40)", lineHeight:1.5, marginBottom:"4px" }}>&lt;5 min lead response — converts signups before they go cold</div>
                  <div style={{ fontSize:"0.875rem", color:"var(--gold-dark)" }}>Pricing on request</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RISK REVERSAL ── */}
      <section className="fade-up" style={{ background:"var(--bg)", padding:"96px 40px" }}>
        <div style={{ maxWidth:"860px", margin:"0 auto" }}>
          <EyebrowLabel>Our guarantee</EyebrowLabel>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:"48px", alignItems:"center" }}>
            <div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:"clamp(3rem,5vw,5rem)", fontWeight:300, color:"var(--gold)", lineHeight:1 }}>360°</div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:"1.5rem", fontWeight:300, color:"var(--text)", lineHeight:1.2, marginTop:"8px" }}>Money-Back Guarantee</div>
            </div>
            <div>
              <p style={{ fontSize:"1.1rem", fontWeight:300, color:"var(--text)", lineHeight:1.8, marginBottom:"20px" }}>
                If you&apos;re not happy with our work — for any reason — give us one month to address your concern.
              </p>
              <p style={{ fontSize:"1rem", fontWeight:300, color:"var(--muted)", lineHeight:1.8 }}>
                If we are unable to turn things around in that one month, we will refund you for that month. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL SLIDE ── */}
      <section className="fade-up" style={{ background:"var(--forest)", padding:"96px 40px", minHeight:"100vh", display:"flex", alignItems:"center" }}>
        <div style={{ maxWidth:"860px", margin:"0 auto", width:"100%" }}>
          <EyebrowLabel light>Ready to double your practice?</EyebrowLabel>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"24px", marginBottom:"48px" }}>
            {/* Pricing summary */}
            <div style={{ border:"1.5px solid var(--gold-dark)", borderRadius:"16px", padding:"28px", background:"rgba(184,150,46,0.06)" }}>
              <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--gold-dark)", marginBottom:"10px" }}>Your investment</div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:"2.8rem", fontWeight:300, color:"var(--gold-dark)", lineHeight:1, marginBottom:"4px" }}>$2,500</div>
              <div style={{ fontSize:"0.75rem", color:"rgba(240,237,230,0.40)", marginBottom:"20px" }}>per month · 4–6 month minimum</div>
              <div style={{ fontSize:"0.8rem", color:"rgba(240,237,230,0.55)", lineHeight:1.65 }}>
                Breakeven: 12.5 new patients per month at $200/session — just 3 more per week than you&apos;re doing now.
              </div>
            </div>
            {/* Risk reversal summary */}
            <div style={{ border:"1px solid rgba(240,237,230,0.15)", borderRadius:"16px", padding:"28px", background:"rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(240,237,230,0.40)", marginBottom:"10px" }}>Our guarantee</div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:"2rem", fontWeight:300, color:"var(--bg)", lineHeight:1.2, marginBottom:"16px" }}>360° Money-Back</div>
              <div style={{ fontSize:"0.8rem", color:"rgba(240,237,230,0.55)", lineHeight:1.65 }}>
                Not happy? Give us one month to fix it. If we can&apos;t, we refund that month. No questions asked.
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign:"center" }}>
            <a
              href="mailto:abhi@abhichand.com?subject=Ready to get started — Homeopathic Plus Centre"
              // TODO: Replace href above with Stripe subscription link when ready
              style={{
                display:"inline-block",
                background:"var(--gold)",
                color:"var(--forest)",
                fontFamily:"var(--font-ui)",
                fontSize:"0.95rem",
                fontWeight:500,
                letterSpacing:"0.04em",
                padding:"18px 56px",
                borderRadius:"8px",
                textDecoration:"none",
                boxShadow:"var(--gold-glow)",
                transition:"all 0.2s ease",
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = "var(--gold-dark)"; (e.target as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = "var(--gold)"; (e.target as HTMLElement).style.transform = "none"; }}
            >
              Let&apos;s Go
            </a>
            <div style={{ marginTop:"16px", fontSize:"0.75rem", color:"rgba(240,237,230,0.30)" }}>
              <a href="mailto:abhi@abhichand.com" style={{ color:"rgba(240,237,230,0.35)", textDecoration:"none" }}>abhi@abhichand.com</a>
              {" · "}
              <a href="https://nava45.com" target="_blank" rel="noopener noreferrer" style={{ color:"rgba(240,237,230,0.35)", textDecoration:"none" }}>nava45.com</a>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background:"var(--forest)", borderTop:"1px solid rgba(240,237,230,0.08)", padding:"24px 40px", textAlign:"center", fontSize:"0.75rem", color:"rgba(240,237,230,0.20)" }}>
        Prepared for Hermeet Suri · Homeopathic Plus Centre · May 2026 · nava45.com
      </footer>
    </main>
  );
}

/* ─── PHASE DATA ─── */
const PHASES = [
  {
    month: "Month 1", title: "Foundation & Research", tagline: "Set the stage. Mine what already exists.", inProgress: true,
    purpose: "Before we spend a dollar on ads, the infrastructure has to be solid. We audit every account, begin the referral system, speak directly to existing patients, and get the pixel firing correctly.",
    activities: ["Full account audit & access review — Meta Business, Google, CRM, booking system","Referral system design — post-appointment email, Google review ask, monthly patient raffle","ICA Interviews — conversations with 3–5 existing patients to capture language, pain points, and desires","Meta Pixel + Conversion API setup and verification","MailerLite email software setup (client-paid, ~$20/mo directly)","Booking flow audit — ensure <5 min lead response path is ready before traffic arrives","ChatGPT / AI SEO optimization on existing website content (one-time add-on)"],
    deliverables: ["Referral system designed and ready to launch","ICA hypothesis documented from patient interviews","All accounts accessed, audited, and organized","Meta Pixel firing and verified","MailerLite configured with follow-up sequence skeleton","Booking flow optimized for fast lead response"],
    note: "ICA Interviews are non-negotiable. Skipping this step is the single biggest reason niche-cracking projects fail.",
  },
  {
    month: "Month 2", title: "ICA Development & Infrastructure", tagline: "Build the profile. Build the machine.", inProgress: false,
    purpose: "We synthesize everything from Month 1 into a data-backed Ideal Customer Profile, then build the ad infrastructure around it — audiences, offers, and the referral system going live.",
    activities: ["Referral system goes live — email sequence active, raffle mechanics in place","ICA document — synthesize interview data into a full written profile with tested language","Offer development — create 2–3 offers to test (downloadable guide, direct discovery call booking, etc.)","Cold audience build in Meta","Lookalike Audience build from patient email list"],
    deliverables: ["Referral system live and generating reviews and warm leads","Data-backed ICA profile document completed","2–3 offers built and ready to test in Lead Ads","Cold Audience and LLA ready in Meta Ads Manager"],
    budget: "$500 ad spend — used to warm the pixel and begin audience validation.",
  },
  {
    month: "Months 3–4", title: "Creative Testing & Lead Ads", tagline: "Find what they click. Find what they sign up for.", inProgress: false,
    purpose: "Multiple structured rounds of testing across two audiences to identify the winning creative and offer combination. We test signups via native Lead Ads — the thank-you screen sends them directly to the booking page.",
    activities: ["Creative Test R1 — run 3–5 creatives against both Cold Audience and LLA","Lead Ads R1 — winning creatives + offers tested for signups; TY screen → booking page","Review R1 results — evaluate which offer drives signups and booking intent","Creative Test R2+ — additional rounds as data dictates","Lead Ads R2+ — refined targeting and creative based on R1 learnings","Evaluate winning offer combination → guides landing page build and scaling decisions","Appointment setter protocol active — new leads responded to within 5 minutes"],
    deliverables: ["Winning creative + offer combination identified","Signup list generated — leads to contact directly","Follow-up email sequence active via MailerLite","CPL data from both audiences to inform scaling budget","Landing page built for confirmed winning offer"],
    budget: "$1,000–$1,500 ad spend across testing rounds.",
    note: "The <5 min response to new leads is mission-critical. We solve this before ads go live — through automation or an appointment setter add-on.",
  },
  {
    month: "Months 5–6", title: "Scale", tagline: "Increase spend. Compound the system.", inProgress: false,
    purpose: "We have a winning combination. The job now is to increase spend to reach more of the validated audience we've already identified — not to find new audiences. The referral system and the paid pipeline reinforce each other.",
    activities: ["Scale winning ad combos with increased spend against validated audiences","Weekly data review — CPL, signup rate, booking rate, show rate, patient conversion","LLA expansion built from patients who converted through the pipeline","Referral system layer 2 — patients from paid pipeline become new referral sources","Identify next optimization lever"],
    deliverables: ["Predictable weekly patient inquiries from a validated, repeatable system","Pipeline and referral system reinforcing each other","Full performance data set to inform what comes next","A practice that no longer depends on word-of-mouth alone"],
  },
];

/* ─── PHASE PANEL ─── */
function PhasePanel({ phase }: { phase: typeof PHASES[0] }) {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"36px" }}>
      <div>
        <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"8px" }}>Purpose</div>
        <p style={{ fontSize:"0.9rem", color:"var(--text)", lineHeight:1.75, marginBottom:"20px" }}>{phase.purpose}</p>
        {"budget" in phase && phase.budget && (
          <div style={{ background:"var(--forest-light)", border:"1px solid rgba(61,107,92,0.20)", borderRadius:"8px", padding:"14px 16px", marginBottom:"14px" }}>
            <div style={{ fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:"var(--forest-mid)", marginBottom:"4px" }}>Ad budget required</div>
            <div style={{ fontSize:"0.95rem", fontWeight:500, color:"var(--forest)" }}>{phase.budget as string}</div>
            <div style={{ fontSize:"0.75rem", color:"var(--forest-mid)", marginTop:"3px" }}>Paid to Meta directly — separate from retainer</div>
          </div>
        )}
        {"note" in phase && phase.note && (
          <div style={{ background:"rgba(184,150,46,0.06)", border:"1px solid rgba(184,150,46,0.18)", borderRadius:"8px", padding:"14px 16px" }}>
            <div style={{ fontSize:"0.8rem", color:"var(--text)", lineHeight:1.65, fontStyle:"italic" }}>&ldquo;{phase.note as string}&rdquo;</div>
          </div>
        )}
      </div>
      <div>
        <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"8px" }}>Key activities</div>
        <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginBottom:"20px" }}>
          {phase.activities.map((a) => (
            <div key={a} style={{ display:"flex", gap:"10px", fontSize:"0.875rem", color:"var(--text)", lineHeight:1.5 }}>
              <span style={{ color:"var(--gold)", flexShrink:0, marginTop:"2px" }}>→</span>{a}
            </div>
          ))}
        </div>
        <div style={{ background:"var(--bg-alt)", border:"1px solid var(--border)", borderRadius:"8px", padding:"16px 18px" }}>
          <div style={{ fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"10px" }}>Deliverables</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
            {phase.deliverables.map((d) => (
              <div key={d} style={{ display:"flex", gap:"8px", fontSize:"0.8rem", color:"var(--text)", lineHeight:1.45 }}>
                <span style={{ color:"var(--forest-mid)", flexShrink:0, fontWeight:500 }}>✓</span>{d}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── EYEBROW ─── */
function EyebrowLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{ fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:light?"var(--gold-dark)":"var(--gold)", marginBottom:"16px", display:"flex", alignItems:"center", gap:"10px" }}>
      <span style={{ display:"inline-block", width:"18px", height:"1px", background:light?"var(--gold-dark)":"var(--gold)" }} />
      {children}
    </div>
  );
}
