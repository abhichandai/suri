"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

/* ─── ICA DATA ─── */
const ICA = {
  demographics: [
    "South Asian / Indian ethnicity",
    "Age: mid-30s to mid-40s",
    "Lives in Mississauga or surrounding GTA",
    "Mother of a teenage daughter",
  ],
  psychographics: [
    "Values natural and holistic health",
    "Prior family exposure to homeopathy",
    "Distrustful of conventional medicine",
    "Price-insensitive via a trusted referral",
    "Price-sensitive without one",
  ],
  livedReality: [
    "Daughter dealing with acne, menstrual cramping, or hormonal issues",
    "Already tried conventional medicine — disappointed by the results",
    "Resistant to birth control pills or Accutane for her child",
    "Family healthcare decision-maker — husband defers to her",
    "Once she sees results, she brings in the whole family",
  ],
};

/* ─── KEYWORD DATA ─── */
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

/* ─── AUDIENCE DATA ─── */
const AUDIENCES = [
  {
    tag: "TAM 1", name: "Hindi / Punjabi Speaking Women", size: "35,200 – 41,400",
    details: ["Mississauga + 25mi, Ontario", "Women 30–45", "Language: Hindi or Punjabi", "Advantage+: Off"],
    img: "/audience-tam1-hindi.png",
    note: "The exact person. Culturally predisposed to homeopathy, speaks the language, within range. Smaller but highest intent.",
  },
  {
    tag: "TAM 2", name: "Women with Teenagers", size: "14,200 – 16,700",
    details: ["Mississauga + 25mi, Ontario", "Women 30–45", "Parents with teenagers (13–17 years)", "Advantage+: Off"],
    img: "/audience-tam2-teens.png",
    note: "Mothers in the exact life stage where a daughter's health becomes a priority. High buying intent.",
  },
];

/* ─── PHASE DATA ─── */
const PHASES = [
  {
    month: "Month 1", title: "Foundation & Research", tagline: "Set the stage. Mine what already exists.", inProgress: true,
    purpose: "Before we spend a dollar on ads, the infrastructure has to be solid. We audit every account, begin the referral system, speak directly to existing patients, and get the pixel firing correctly.",
    activities: ["Full account audit & access review — Meta Business, Google, CRM, booking system", "Referral system design — post-appointment email, Google review ask, monthly patient raffle", "ICA Interviews — conversations with 3–5 existing patients to capture language, pain points, and desires", "Meta Pixel + Conversion API setup and verification", "MailerLite email software setup (client-paid, ~$20/mo directly)", "Booking flow audit — ensure <5 min lead response path is ready before traffic arrives"],
    deliverables: ["Referral system designed and ready to launch", "ICA hypothesis documented from patient interviews", "All accounts accessed, audited, and organized", "Meta Pixel firing and verified", "MailerLite configured with follow-up sequence skeleton"],
    note: "ICA Interviews are non-negotiable. Skipping this step is the single biggest reason niche-cracking projects fail.",
  },
  {
    month: "Month 2", title: "ICA Development & Infrastructure", tagline: "Build the profile. Build the machine.", inProgress: false,
    purpose: "We synthesize everything from Month 1 into a data-backed Ideal Customer Profile, then build the ad infrastructure around it — audiences, offers, and the referral system goes live.",
    activities: ["Referral system goes live — email sequence active, raffle mechanics in place", "ICA document — synthesize interview data into a full written profile with tested language", "Offer development — create 2–3 offers to test (downloadable guide, direct discovery call booking, etc.)", "Cold audience build in Meta", "Lookalike Audience build from patient email list"],
    deliverables: ["Referral system live and generating reviews and warm leads", "Data-backed ICA profile document completed", "2–3 offers built and ready to test in Lead Ads", "Cold Audience and LLA ready in Meta Ads Manager"],
    budget: "$500 ad spend — used to warm the pixel and begin audience validation.",
  },
  {
    month: "Months 3–4", title: "Find the Winning Offer", tagline: "Find what they click. Find what they sign up for.", inProgress: false,
    purpose: "Multiple structured testing rounds across two audiences to identify the winning creative and offer combination. We test signups via native Lead Ads — the thank-you screen sends them directly to the booking page.",
    activities: ["Creative Test R1 — run 3–5 creatives against both Cold Audience and LLA", "Lead Ads R1 — winning creatives + offers tested for signups; TY screen → booking page", "Review R1 results — evaluate which offer drives signups and booking intent", "Creative Test R2+ — additional rounds as data dictates", "Evaluate winning offer combination → guides landing page build and scaling decisions", "Appointment setter protocol active — new leads responded to within 5 minutes"],
    deliverables: ["Winning creative + offer combination identified", "Signup list generated — leads to contact directly", "Follow-up email sequence active via MailerLite", "CPL data from both audiences to inform scaling budget", "Landing page built for the confirmed winning offer"],
    budget: "$1,000–$1,500 ad spend across testing rounds.",
    note: "The <5 min response to new leads is mission-critical. We solve this before ads go live — through automation or an appointment setter add-on.",
  },
  {
    month: "Months 5–6", title: "Scale", tagline: "Increase spend. Compound the system.", inProgress: false,
    purpose: "We have a winning combination. The job now is to increase spend to reach more of the validated audience we've already identified. The referral system and the paid pipeline reinforce each other.",
    activities: ["Scale winning ad combos with increased spend against validated audiences", "Weekly data review — CPL, signup rate, booking rate, show rate, patient conversion", "LLA expansion built from patients who converted through the pipeline", "Referral system layer 2 — patients from paid pipeline become new referral sources", "Identify next optimization lever"],
    deliverables: ["Predictable weekly patient inquiries from a validated, repeatable system", "Pipeline and referral system reinforcing each other", "Full performance data set to inform what comes next", "A practice that no longer depends on word-of-mouth alone"],
  },
];

/* ─── CALCULATOR ─── */
function ROICalculator() {
  const [currentPts, setCurrentPts] = useState(8);
  const [targetPts, setTargetPts] = useState(16);
  const [ltv, setLtv] = useState(350);

  const retainer = 2000;
  const adSpend = 3500;
  const totalInvestment = retainer * 6 + adSpend;

  const currentMonthly = currentPts * 4 * ltv;
  const targetMonthly = targetPts * 4 * ltv;
  const monthlyGain = targetMonthly - currentMonthly;

  // Ramp model: months 1-4 = 0% (build + testing, no results yet)
  // Month 5 = 50% of target gain (scale begins, discovery sessions start booking)
  // Month 6 = 100% of target gain (at full run rate)
  const incrementalRevenue6mo = (monthlyGain * 0.5) + (monthlyGain * 1.0);
  const netMonth6 = incrementalRevenue6mo - totalInvestment;

  const monthsToRecoverIfNegative = netMonth6 < 0 ? Math.ceil(Math.abs(netMonth6) / monthlyGain) : 0;
  const fullBreakevenMonth = netMonth6 < 0 ? 6 + monthsToRecoverIfNegative : 6;

  const fmt = (n: number) => n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${Math.round(n)}`;

  const sliders = [
    { label: "Current patients / week", value: currentPts, min: 2, max: 20, step: 1, set: setCurrentPts, unit: "" },
    { label: "Target patients / week", value: targetPts, min: 8, max: 32, step: 1, set: setTargetPts, unit: "" },
    { label: "Patient LTV (avg. value per visit)", value: ltv, min: 100, max: 1000, step: 50, set: setLtv, unit: "$" },
  ];

  return (
    <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(240,237,230,0.12)", borderRadius:"14px", padding:"32px", marginTop:"20px" }}>
      <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--gold-dark)", marginBottom:"20px" }}>
        Return on investment calculator
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"32px" }}>
        {/* Sliders */}
        <div>
          <div style={{ marginBottom:"20px" }}>
            <div style={{ fontSize:"0.75rem", fontWeight:500, color:"rgba(240,237,230,0.70)", marginBottom:"10px" }}>How the investment ramp works</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:"4px", marginBottom:"8px" }}>
              {[
                { mo:"M1", pct:0, label:"Build" },
                { mo:"M2", pct:0, label:"Build" },
                { mo:"M3", pct:0, label:"Test" },
                { mo:"M4", pct:0, label:"Test" },
                { mo:"M5", pct:50, label:"Scale" },
                { mo:"M6", pct:100, label:"Scale" },
              ].map(({ mo, pct, label }) => (
                <div key={mo} style={{ textAlign:"center" }}>
                  <div style={{ height:"40px", display:"flex", alignItems:"flex-end", justifyContent:"center", marginBottom:"4px" }}>
                    <div style={{ width:"100%", background: pct === 0 ? "rgba(240,237,230,0.08)" : pct === 50 ? "rgba(184,150,46,0.35)" : "var(--gold-dark)", borderRadius:"2px 2px 0 0", height:`${Math.max(pct, 8)}%`, minHeight:"4px", transition:"height 0.3s" }} />
                  </div>
                  <div style={{ fontSize:"0.6rem", color: pct === 0 ? "rgba(240,237,230,0.30)" : "var(--gold-dark)", fontWeight:500 }}>{mo}</div>
                  <div style={{ fontSize:"0.55rem", color:"rgba(240,237,230,0.25)", marginTop:"1px" }}>{pct === 0 ? "0%" : `${pct}%`}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize:"0.7rem", color:"rgba(240,237,230,0.40)", lineHeight:1.55 }}>
              Months 1–4: building infrastructure and finding the winning offer — <strong style={{ color:"rgba(240,237,230,0.55)" }}>$0 incremental revenue.</strong> Month 5: scale begins, discovery sessions start booking — <strong style={{ color:"rgba(240,237,230,0.55)" }}>50% of target gain.</strong> Month 6: at full run rate — <strong style={{ color:"rgba(240,237,230,0.55)" }}>100% of target gain.</strong>
            </div>
          </div>
          <div style={{ fontSize:"0.75rem", color:"rgba(240,237,230,0.40)", marginBottom:"20px", lineHeight:1.5 }}>
            Adjust the numbers to match your reality.
          </div>
          {sliders.map(s => (
            <div key={s.label} style={{ marginBottom:"20px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                <div style={{ fontSize:"0.8rem", color:"rgba(240,237,230,0.65)" }}>{s.label}</div>
                <div style={{ fontSize:"0.9rem", fontWeight:500, color:"var(--gold-dark)" }}>
                  {s.unit}{s.value}{s.unit === "" && " / wk"}
                </div>
              </div>
              <input type="range" min={s.min} max={s.max} step={s.step} value={s.value}
                onChange={e => { const v = Number(e.target.value); if (s.set === setTargetPts && v <= currentPts) return; s.set(v); }}
                style={{ width:"100%", accentColor:"var(--gold)", cursor:"pointer", height:"4px" }}
              />
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:"3px" }}>
                <span style={{ fontSize:"0.65rem", color:"rgba(240,237,230,0.25)" }}>{s.unit}{s.min}</span>
                <span style={{ fontSize:"0.65rem", color:"rgba(240,237,230,0.25)" }}>{s.unit}{s.max}</span>
              </div>
            </div>
          ))}
          <div style={{ paddingTop:"16px", borderTop:"1px solid rgba(240,237,230,0.08)", display:"flex", flexDirection:"column", gap:"8px" }}>
            {[["Monthly retainer (fixed)","$2,000 × 6 mo = $12,000"],["Total ad spend (6 months)","$3,500"],["Total 6-month investment",`$${(totalInvestment).toLocaleString()}`]].map(([l,v]) => (
              <div key={l} style={{ display:"flex", justifyContent:"space-between", fontSize:"0.8rem" }}>
                <span style={{ color:"rgba(240,237,230,0.45)" }}>{l}</span>
                <span style={{ color:"rgba(240,237,230,0.70)", fontWeight:500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Outputs */}
        <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
          {[
            { label:"Monthly revenue today", value: fmt(currentMonthly), sub:`${currentPts} patients × 4 wks × ${fmt(ltv)} LTV`, gold:false },
            { label:"Monthly revenue at target", value: fmt(targetMonthly), sub:`${targetPts} patients × 4 wks × ${fmt(ltv)} LTV`, gold:true },
            { label:"Monthly gain at target", value:`+${fmt(monthlyGain)}`, sub:"incremental above today", gold:true },
          ].map(item => (
            <div key={item.label} style={{ background: item.gold ? "rgba(184,150,46,0.08)" : "rgba(255,255,255,0.03)", border:`1px solid ${item.gold ? "rgba(184,150,46,0.25)" : "rgba(240,237,230,0.08)"}`, borderRadius:"10px", padding:"16px 18px" }}>
              <div style={{ fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color: item.gold ? "var(--gold-dark)" : "rgba(240,237,230,0.35)", marginBottom:"6px" }}>{item.label}</div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:"2rem", fontWeight:300, color: item.gold ? "var(--gold-dark)" : "var(--bg)", lineHeight:1, marginBottom:"4px" }}>{item.value}</div>
              <div style={{ fontSize:"0.7rem", color:"rgba(240,237,230,0.35)" }}>{item.sub}</div>
            </div>
          ))}
          <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(240,237,230,0.08)", borderRadius:"10px", padding:"16px 18px" }}>
            <div style={{ fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:"rgba(240,237,230,0.35)", marginBottom:"10px" }}>6-month projection</div>
            <div style={{ display:"flex", flexDirection:"column", gap:"6px", marginBottom:"14px" }}>
              {[
                ["Revenue generated above baseline (6 mo)", fmt(incrementalRevenue6mo)],
                ["Total investment", `$${totalInvestment.toLocaleString()}`],
                ["Net position at month 6", `${netMonth6 >= 0 ? "+" : ""}${fmt(netMonth6)}`],
                ["Full breakeven", `Month ${fullBreakevenMonth}`],
              ].map(([l, v]) => (
                <div key={l} style={{ display:"flex", justifyContent:"space-between", fontSize:"0.8rem" }}>
                  <span style={{ color:"rgba(240,237,230,0.45)" }}>{l}</span>
                  <span style={{ color: l === "Full breakeven" || l === "Net position at month 6" ? "var(--gold-dark)" : "rgba(240,237,230,0.70)", fontWeight:500 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ paddingTop:"12px", borderTop:"1px solid rgba(240,237,230,0.08)", fontSize:"0.7rem", color:"rgba(240,237,230,0.30)", lineHeight:1.65 }}>
              <strong style={{ color:"rgba(240,237,230,0.40)", fontWeight:500 }}>How the ramp works:</strong> Months 1–2 = infrastructure build, zero ad spend, 0% of gain. Months 3–4 = testing phase, reaching roughly 50% of the target improvement. Months 5–6 = at target, 100% of the gain. Revenue above baseline accumulates across all 6 months using this model.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function MapPage() {
  const [activeAudience, setActiveAudience] = useState(0);
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
    <main style={{ fontFamily:"var(--font-ui)", fontWeight:300 }}>

      {/* ── HERO ── */}
      <section style={{ minHeight:"100vh", background:"var(--forest)", display:"flex", flexDirection:"column", justifyContent:"center", padding:"128px 40px", position:"relative", overflow:"hidden" }}>
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
              <div style={{ fontSize:"0.75rem", color:"rgba(240,237,230,0.40)" }}>Digital Growth Strategist · <a href="https://nava45.com" target="_blank" rel="noopener noreferrer" style={{ color:"rgba(240,237,230,0.40)", textDecoration:"none" }}>nava45.com</a></div>
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
            From 8 new patients per week to 16 — by September 1st, 2026. That&apos;s a doubling of your business, built on infrastructure that keeps compounding after we hit it.
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

      {/* ── THREE STEPS ── */}
      <section style={{ minHeight:"100vh", background:"#0E0D0C", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px" }}>
        <p style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.2rem,4vw,4rem)", fontWeight:300, lineHeight:1.1, letterSpacing:"-0.01em", color:"var(--bg)", whiteSpace:"nowrap" }}>
          3 steps to <em style={{ fontStyle:"italic", color:"var(--gold-dark)" }}>get there.</em>
        </p>
      </section>

      {/* ── STEP 1: WHO ── */}
      <section className="fade-up" style={{ background:"var(--bg)", padding:"96px 40px" }}>
        <div style={{ maxWidth:"960px", margin:"0 auto" }}>
          <EyebrowLabel>Step 1 of 3</EyebrowLabel>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.2rem,3.5vw,2.8rem)", fontWeight:300, lineHeight:1.2, letterSpacing:"-0.01em", marginBottom:"16px" }}>
            Who are we <em style={{ fontStyle:"italic", color:"var(--gold)" }}>targeting?</em>
          </h2>
          <p style={{ fontSize:"1rem", color:"var(--muted)", maxWidth:"540px", marginBottom:"40px", lineHeight:1.75 }}>
            Everything that follows is built around one specific person. Understanding her precisely is what makes every dollar of ad spend work harder.
          </p>

          {/* 3-column ICA table */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"1px", background:"var(--border)", border:"1px solid var(--border)", borderRadius:"12px", overflow:"hidden", marginBottom:"24px" }}>
            {[
              { col:"Demographics", color:"var(--forest-mid)", items: ICA.demographics },
              { col:"Psychographics", color:"var(--gold)", items: ICA.psychographics },
              { col:"Lived Reality", color:"#C0392B", items: ICA.livedReality },
            ].map(({ col, color, items }) => (
              <div key={col}>
                <div style={{ background:"var(--bg-alt)", padding:"14px 20px", borderBottom:"1px solid var(--border)" }}>
                  <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color }}>
                    {col}
                  </div>
                </div>
                {items.map((item, i) => (
                  <div key={i} style={{ background:"var(--bg)", padding:"14px 20px", borderBottom:"1px solid var(--border)", display:"flex", gap:"10px", alignItems:"flex-start" }}>
                    <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:color, flexShrink:0, marginTop:"7px" }} />
                    <div style={{ fontSize:"0.875rem", color:"var(--text)", lineHeight:1.55 }}>{item}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ background:"#FDF3E3", border:"1px solid rgba(184,150,46,0.25)", borderRadius:"10px", padding:"18px 22px", fontSize:"0.875rem", color:"var(--text)", lineHeight:1.7 }}>
            <strong style={{ fontWeight:500 }}>The multiplier effect:</strong> She is not just one patient. She is the entry point to an entire family — and an entire community. When she trusts you, everyone she knows hears about it. This is why referral patients have no price ceiling.
          </div>
        </div>
      </section>

      {/* ── STEP 2: WHERE ── */}
      <section className="fade-up" style={{ background:"var(--bg-alt)", padding:"96px 40px" }}>
        <div style={{ maxWidth:"860px", margin:"0 auto" }}>
          <EyebrowLabel>Step 2 of 3</EyebrowLabel>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.2rem,3.5vw,2.8rem)", fontWeight:300, lineHeight:1.2, letterSpacing:"-0.01em", marginBottom:"16px" }}>
            Where do we <em style={{ fontStyle:"italic", color:"var(--gold)" }}>find them?</em>
          </h2>
          <p style={{ fontSize:"1rem", color:"var(--muted)", maxWidth:"540px", marginBottom:"48px", lineHeight:1.75 }}>
            We looked at the primary channels. Here&apos;s what the data says.
          </p>

          {/* Google ruled out */}
          <div style={{ marginBottom:"48px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"16px" }}>
              <div style={{ width:"28px", height:"28px", borderRadius:"50%", background:"rgba(192,57,43,0.10)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ fontSize:"14px", color:"#C0392B" }}>✕</span>
              </div>
              <div style={{ fontWeight:500, fontSize:"1rem", color:"var(--text)" }}>Google Search Ads — ruled out</div>
            </div>
            <p style={{ fontSize:"0.875rem", color:"var(--muted)", maxWidth:"580px", marginBottom:"20px", lineHeight:1.7 }}>
              We ran a full keyword analysis across Toronto + Mississauga. Total search volume across every relevant keyword: <strong style={{ color:"var(--text)" }}>~620 searches per month.</strong> Even capturing 100% at a 3% conversion rate gives roughly 18 leads per month — not enough to build a predictable pipeline.
            </p>
            <div style={{ background:"var(--bg)", border:"1px solid var(--border)", borderRadius:"12px", overflow:"hidden", boxShadow:"var(--shadow-sm)", marginBottom:"12px" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 80px 80px 80px", padding:"10px 20px", borderBottom:"1px solid var(--border)", background:"var(--bg-alt)" }}>
                {["Keyword","Monthly","Trend","Comp."].map(h => (
                  <div key={h} style={{ fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)" }}>{h}</div>
                ))}
              </div>
              {KEYWORDS.map((k, i) => (
                <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 80px 80px 80px", padding:"12px 20px", borderBottom: i < KEYWORDS.length - 1 ? "1px solid var(--border)" : "none", alignItems:"center" }}>
                  <div style={{ fontSize:"0.8rem", color:"var(--text)" }}>{k.kw}</div>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:"1.1rem", fontWeight:300, color: k.vol >= 100 ? "var(--text)" : "var(--muted)" }}>{k.vol}</div>
                  <div style={{ fontSize:"0.75rem", color: k.up ? "#2E7D52" : "var(--muted)", fontWeight:k.up?500:300 }}>{k.up?"↑":"→"} {k.trend}</div>
                  <div style={{ fontSize:"0.75rem" }}>
                    <span style={{ padding:"2px 8px", borderRadius:"100px", fontSize:"0.7rem", fontWeight:500, background: k.comp==="High"?"rgba(192,57,43,0.08)":k.comp==="Medium"?"rgba(184,150,46,0.10)":"rgba(46,125,82,0.08)", color: k.comp==="High"?"#C0392B":k.comp==="Medium"?"#8A6914":"#2E7D52" }}>{k.comp}</span>
                  </div>
                </div>
              ))}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 80px 80px 80px", padding:"12px 20px", background:"rgba(192,57,43,0.04)", borderTop:"2px solid rgba(192,57,43,0.15)" }}>
                <div style={{ fontSize:"0.75rem", fontWeight:500, color:"#C0392B" }}>Total (all keywords, Toronto + Mississauga)</div>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"1.1rem", fontWeight:300, color:"#C0392B" }}>620</div>
                <div style={{ fontSize:"0.75rem", color:"#C0392B" }}>/ month</div>
                <div style={{ fontSize:"0.75rem", color:"#C0392B" }}>—</div>
              </div>
            </div>
            <div style={{ fontSize:"0.75rem", color:"var(--muted)", fontStyle:"italic" }}>
              Source: Google Keyword Planner · April 2025 – March 2026 · Toronto + Mississauga region
            </div>
          </div>

          {/* Meta — right channel */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"16px" }}>
              <div style={{ width:"28px", height:"28px", borderRadius:"50%", background:"rgba(46,125,82,0.10)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ fontSize:"14px", color:"#2E7D52" }}>✓</span>
              </div>
              <div style={{ fontWeight:500, fontSize:"1rem", color:"var(--text)" }}>Meta / Facebook — the right channel</div>
            </div>
            <p style={{ fontSize:"0.875rem", color:"var(--muted)", maxWidth:"580px", marginBottom:"24px", lineHeight:1.7 }}>
              She&apos;s not searching for you — she&apos;s on Instagram and Facebook every day. Here are the two audiences we&apos;ve already built and validated in Meta Ads Manager.
            </p>

            {/* Tab-style audience selector */}
            <div style={{ background:"var(--bg)", border:"1px solid var(--border)", borderRadius:"12px 12px 0 0", overflow:"hidden", display:"grid", gridTemplateColumns:"1fr 1fr" }}>
              {AUDIENCES.map((a, i) => (
                <button key={i} onClick={() => setActiveAudience(i)} style={{
                  padding:"20px 24px", border:"none",
                  borderBottom: activeAudience === i ? "2px solid var(--gold)" : "2px solid transparent",
                  borderRight: i === 0 ? "1px solid var(--border)" : "none",
                  background: activeAudience === i ? "rgba(184,150,46,0.04)" : "transparent",
                  cursor:"pointer", textAlign:"left", transition:"all 0.15s ease",
                }}>
                  <div style={{ fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color: activeAudience === i ? "var(--gold)" : "var(--muted)", marginBottom:"6px" }}>{a.tag}</div>
                  <div style={{ fontWeight:500, fontSize:"0.95rem", color: activeAudience === i ? "var(--text)" : "var(--muted)", marginBottom:"4px" }}>{a.name}</div>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:"1.5rem", fontWeight:300, color: activeAudience === i ? "var(--forest-mid)" : "var(--muted)", lineHeight:1 }}>{a.size}</div>
                </button>
              ))}
            </div>
            <div style={{ background:"var(--bg)", border:"1px solid var(--border)", borderTop:"none", borderRadius:"0 0 12px 12px", padding:"28px", boxShadow:"var(--shadow-sm)" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"24px" }}>
                <div>
                  <div style={{ fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"10px" }}>Audience parameters</div>
                  {AUDIENCES[activeAudience].details.map(d => (
                    <div key={d} style={{ display:"flex", gap:"8px", fontSize:"0.875rem", color:"var(--text)", lineHeight:1.5, marginBottom:"6px" }}>
                      <span style={{ color:"var(--gold)", flexShrink:0 }}>→</span>{d}
                    </div>
                  ))}
                  <div style={{ marginTop:"14px", padding:"12px 14px", background:"var(--forest-light)", borderRadius:"6px", fontSize:"0.8rem", color:"var(--forest)", lineHeight:1.55 }}>
                    {AUDIENCES[activeAudience].note}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"10px" }}>Meta Audience Manager</div>
                  <div style={{ borderRadius:"8px", overflow:"hidden", border:"1px solid var(--border)", boxShadow:"var(--shadow-xs)" }}>
                    <Image src={AUDIENCES[activeAudience].img} alt={AUDIENCES[activeAudience].name} width={400} height={340} style={{ width:"100%", height:"auto", display:"block" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW DO WE ATTRACT THEM ── */}
      <section style={{ minHeight:"100vh", background:"var(--forest)", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px" }}>
        <p style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.2rem,4vw,4rem)", fontWeight:300, lineHeight:1.1, letterSpacing:"-0.01em", color:"var(--bg)", whiteSpace:"nowrap" }}>
          How do we <em style={{ fontStyle:"italic", color:"var(--gold-dark)" }}>attract them?</em>
        </p>
      </section>

      {/* ── THE PLAN ── */}
      <section className="fade-up" style={{ background:"var(--bg-alt)", padding:"96px 40px" }}>
        <div style={{ maxWidth:"860px", margin:"0 auto" }}>
          <EyebrowLabel>Step 3 of 3 — The plan</EyebrowLabel>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.2rem,3.5vw,2.8rem)", fontWeight:300, lineHeight:1.2, letterSpacing:"-0.01em", marginBottom:"16px" }}>
            Four phases. <em style={{ fontStyle:"italic", color:"var(--gold)" }}>One compounding system.</em>
          </h2>
          <p style={{ fontSize:"1rem", color:"var(--muted)", maxWidth:"560px", marginBottom:"48px", lineHeight:1.75 }}>
            Click any phase to see exactly what happens, why, and what you&apos;ll have at the end of it. Nothing is skipped. Every step exists for a reason.
          </p>

          {/* Horizontal timeline */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr auto 1fr auto 1fr", alignItems:"center", marginBottom:"32px", gap:"0" }}>
            {PHASES.map((phase, i) => (
              <>
                <button key={phase.month} onClick={() => setActivePhase(i)} style={{
                  textAlign:"center", padding:"16px 8px", border:"none", background:"transparent", cursor:"pointer",
                  transition:"all 0.15s ease",
                }}>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:"6px", justifyContent:"center", marginBottom:"8px" }}>
                    <div style={{ width:"10px", height:"10px", borderRadius:"50%", background: activePhase === i ? "var(--gold)" : "var(--border)", flexShrink:0, transition:"background 0.15s" }} />
                    {phase.inProgress && <div style={{ fontSize:"0.55rem", fontWeight:500, letterSpacing:"0.06em", textTransform:"uppercase", padding:"2px 6px", borderRadius:"100px", background:"rgba(46,125,82,0.12)", color:"#2E7D52" }}>In Progress</div>}
                  </div>
                  <div style={{ fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color: activePhase === i ? "var(--gold)" : "var(--muted)", marginBottom:"4px" }}>{phase.month}</div>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:"0.95rem", fontWeight:300, color: activePhase === i ? "var(--text)" : "var(--muted)", lineHeight:1.3 }}>{phase.title}</div>
                </button>
                {i < PHASES.length - 1 && (
                  <div key={`arrow-${i}`} style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"0 4px" }}>
                    <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
                      <line x1="0" y1="6" x2="24" y2="6" stroke={activePhase > i ? "var(--gold)" : "var(--border)"} strokeWidth="1.5"/>
                      <polyline points="20,2 28,6 20,10" stroke={activePhase > i ? "var(--gold)" : "var(--border)"} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </>
            ))}
          </div>

          {/* Tab bar */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", background:"var(--bg)", border:"1px solid var(--border)", borderRadius:"12px 12px 0 0", overflow:"hidden" }}>
            {PHASES.map((phase, i) => (
              <button key={i} onClick={() => setActivePhase(i)} style={{
                padding:"16px", border:"none",
                borderBottom: activePhase === i ? "2px solid var(--gold)" : "2px solid transparent",
                borderRight: i < PHASES.length - 1 ? "1px solid var(--border)" : "none",
                background: activePhase === i ? "rgba(184,150,46,0.04)" : "transparent",
                cursor:"pointer", textAlign:"left", transition:"all 0.15s ease",
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"6px" }}>
                  <div style={{ fontSize:"0.6rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color: activePhase === i ? "var(--gold)" : "var(--muted)" }}>{phase.month}</div>
                  {phase.inProgress && <div style={{ fontSize:"0.55rem", fontWeight:500, letterSpacing:"0.06em", textTransform:"uppercase", padding:"2px 6px", borderRadius:"100px", background:"rgba(46,125,82,0.12)", color:"#2E7D52" }}>In Progress</div>}
                </div>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"0.95rem", fontWeight:300, color: activePhase === i ? "var(--text)" : "var(--muted)", lineHeight:1.3 }}>{phase.title}</div>
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
        <div style={{ maxWidth:"960px", margin:"0 auto" }}>
          <EyebrowLabel>Proof it works</EyebrowLabel>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.2rem,3.5vw,2.8rem)", fontWeight:300, lineHeight:1.2, letterSpacing:"-0.01em", marginBottom:"16px" }}>
            Same strategy. Different industry.{" "}
            <em style={{ fontStyle:"italic", color:"var(--gold)" }}>$14.5M in pipeline.</em>
          </h2>
          <p style={{ fontSize:"1rem", color:"var(--muted)", maxWidth:"560px", marginBottom:"48px", lineHeight:1.75 }}>
            We applied the same Laser Targeting and Precision-Marketing approach for Balance Catamarans — a luxury yacht company. The result was $14.5M in qualified sales pipeline. Different market. Same precision. Same commitment to results.
          </p>

          {/* BC layout: big overview left, 3 stacked right */}
          <div style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:"16px", marginBottom:"20px" }}>
            <div style={{ borderRadius:"12px", overflow:"hidden", border:"1px solid var(--border)", boxShadow:"var(--shadow-sm)" }}>
              <Image src="/balance-pipeline-overview.png" alt="Balance Catamarans — full pipeline" width={600} height={700} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
              {[
                { src:"/balance-pipeline-tof.png", label:"TOF — Awareness & Traffic" },
                { src:"/balance-pipeline-mof.png", label:"MOF — Lead Capture & Nurture" },
                { src:"/balance-pipeline-bof.png", label:"BOF — High-Intent Conversion" },
              ].map(img => (
                <div key={img.src} style={{ borderRadius:"10px", overflow:"hidden", border:"1px solid var(--border)", boxShadow:"var(--shadow-xs)", flex:1 }}>
                  <Image src={img.src} alt={img.label} width={500} height={220} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top", display:"block" }} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding:"16px 22px", background:"var(--bg-alt)", border:"1px solid rgba(184,150,46,0.15)", borderRadius:"10px", fontSize:"0.875rem", color:"var(--muted)", lineHeight:1.7 }}>
            Balance Catamarans · Digital Marketing Pipeline · Managed by Nava45 · <strong style={{ color:"var(--text)", fontWeight:500 }}>$14.5M in qualified pipeline generated</strong>
          </div>
        </div>
      </section>

      {/* ── THE QUESTION ── */}
      <section style={{ minHeight:"100vh", background:"#0E0D0C", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px" }}>
        <div style={{ textAlign:"center", maxWidth:"860px" }}>
          <p style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.2rem,3.8vw,3.8rem)", fontWeight:300, lineHeight:1.2, letterSpacing:"-0.01em", color:"var(--bg)" }}>
            Do you think this plan could{" "}
            <em style={{ fontStyle:"italic", color:"var(--gold-dark)" }}>work for you?</em>
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
            The same process that generated $14.5M in pipeline — applied to Homeopathic Plus Centre.
          </p>

          <div style={{ border:"1.5px solid var(--gold-dark)", borderRadius:"16px", padding:"36px", background:"rgba(184,150,46,0.06)", marginBottom:"20px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"20px", marginBottom:"28px" }}>
              <div>
                <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--gold-dark)", marginBottom:"10px" }}>Full-service growth partnership</div>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"1.6rem", fontWeight:300, color:"var(--bg)", lineHeight:1.2, marginBottom:"8px" }}>Patient Acquisition Infrastructure</div>
                <div style={{ fontSize:"0.875rem", color:"rgba(240,237,230,0.50)", maxWidth:"400px", lineHeight:1.55 }}>ICA development, referral system, Meta ad infrastructure, creative testing, lead generation, email automation, optimization, and reporting.</div>
              </div>
              <div style={{ textAlign:"right", flexShrink:0 }}>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"3rem", fontWeight:300, color:"var(--gold-dark)", lineHeight:1 }}>$2,000</div>
                <div style={{ fontSize:"0.75rem", color:"rgba(240,237,230,0.40)", marginTop:"6px" }}>per month · 6-month minimum</div>
              </div>
            </div>
            <div style={{ height:"1px", background:"rgba(240,237,230,0.10)", marginBottom:"20px" }} />
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
              {["ICA interviews + profile development","Referral system (email, raffle, review ask)","Meta Pixel + Conversion API setup","Audience builds (Cold + LLA)","Multiple creative testing rounds","Lead Ads campaigns + optimization","MailerLite setup + follow-up sequences","Monthly reporting + weekly data review","90-day check-in with full performance review","Landing page for confirmed winning offer"].map(f => (
                <div key={f} style={{ display:"flex", gap:"10px", fontSize:"0.8rem", color:"rgba(240,237,230,0.65)", lineHeight:1.4 }}>
                  <span style={{ color:"var(--gold-dark)", flexShrink:0 }}>✓</span>{f}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"20px" }}>
            <div style={{ border:"1px solid rgba(240,237,230,0.12)", borderRadius:"12px", padding:"24px", background:"rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(240,237,230,0.40)", marginBottom:"14px" }}>Ad budget — paid directly to Meta</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                {[["Month 2 — ICA validation","$500"],["Months 3–4 — creative + lead ad testing","$1,000–$1,500"],["Months 5–6 — scaling","$1,000–$1,500"]].map(([l,a]) => (
                  <div key={l} style={{ display:"flex", justifyContent:"space-between", fontSize:"0.8rem", color:"rgba(240,237,230,0.60)" }}>
                    <span>{l}</span><span style={{ color:"var(--gold-dark)" }}>{a}</span>
                  </div>
                ))}
                <div style={{ height:"1px", background:"rgba(240,237,230,0.08)" }} />
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:"0.875rem", fontWeight:500, color:"rgba(240,237,230,0.75)" }}>
                  <span>Est. total ad spend (6 months)</span><span style={{ color:"var(--gold-dark)" }}>~$2,500–$3,500</span>
                </div>
              </div>
            </div>
            <div style={{ border:"1px solid rgba(240,237,230,0.12)", borderRadius:"12px", padding:"24px", background:"rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(240,237,230,0.40)", marginBottom:"14px" }}>Total 6-month picture</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                {[["Retainer × 6 months","$12,000"],["Estimated ad spend","~$3,500"],["Total investment","~$15,500"]].map(([l,a]) => (
                  <div key={l} style={{ display:"flex", justifyContent:"space-between", fontSize:"0.8rem" }}>
                    <span style={{ color:"rgba(240,237,230,0.60)" }}>{l}</span>
                    <span style={{ color: l==="Total investment" ? "var(--gold-dark)" : "rgba(240,237,230,0.70)", fontWeight: l==="Total investment" ? 500 : 300 }}>{a}</span>
                  </div>
                ))}
                <div style={{ height:"1px", background:"rgba(240,237,230,0.08)" }} />
                <div style={{ fontSize:"0.75rem", color:"rgba(240,237,230,0.35)", lineHeight:1.5 }}>
                  Breakeven: 10 new patients/month at $200/first session — just 2.5 more per week than you&apos;re doing now.
                </div>
              </div>
            </div>
          </div>

          {/* Interactive calculator */}
          <ROICalculator />

          {/* Add-ons */}
          <div style={{ border:"1px solid rgba(240,237,230,0.12)", borderRadius:"12px", padding:"24px", background:"rgba(255,255,255,0.04)", marginTop:"16px" }}>
            <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(240,237,230,0.40)", marginBottom:"14px" }}>Optional add-ons</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }}>
              {[["ChatGPT / AI Search Optimization","FAQ schema + content restructuring for AI citation visibility","$500 one-time"],["Appointment Setter","<5 min lead response — converts signups before they go cold","Pricing on request"]].map(([name,desc,price]) => (
                <div key={name}>
                  <div style={{ fontSize:"0.875rem", fontWeight:500, color:"rgba(240,237,230,0.80)", marginBottom:"4px" }}>{name}</div>
                  <div style={{ fontSize:"0.8rem", color:"rgba(240,237,230,0.40)", lineHeight:1.5, marginBottom:"4px" }}>{desc}</div>
                  <div style={{ fontSize:"0.875rem", color:"var(--gold-dark)" }}>{price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTIONS ── */}
      <section className="fade-up" style={{ background:"var(--bg-alt)", padding:"96px 40px" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <EyebrowLabel>Funnel projections</EyebrowLabel>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.2rem,3.5vw,2.8rem)", fontWeight:300, lineHeight:1.2, letterSpacing:"-0.01em", marginBottom:"16px" }}>
            From ad spend to <em style={{ fontStyle:"italic", color:"var(--gold)" }}>new patients.</em>
          </h2>
          <p style={{ fontSize:"1rem", color:"var(--muted)", maxWidth:"600px", marginBottom:"40px", lineHeight:1.75 }}>
            Adjust every assumption. See the full funnel. These are projections — real numbers depend on creative quality, offer strength, and how well you close. This shows what&apos;s possible when the system is working.
          </p>
          <FunnelProjections />
        </div>
      </section>

      {/* ── GUARANTEE ── */}
      <section className="fade-up" style={{ minHeight:"100vh", background:"var(--bg)", display:"flex", alignItems:"center", padding:"96px 40px" }}>
        <div style={{ maxWidth:"860px", margin:"0 auto" }}>
          <EyebrowLabel>Our guarantee</EyebrowLabel>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:"48px", alignItems:"center" }}>
            <div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:"clamp(3rem,5vw,5rem)", fontWeight:300, color:"var(--gold)", lineHeight:1 }}>360°</div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:"1.5rem", fontWeight:300, color:"var(--text)", lineHeight:1.2, marginTop:"8px" }}>Money-Back Guarantee</div>
            </div>
            <div>
              <p style={{ fontSize:"1rem", fontWeight:300, color:"var(--text)", lineHeight:1.8, marginBottom:"24px" }}>
                Two commitments. Both unconditional.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                <div style={{ background:"var(--bg-alt)", border:"1px solid var(--border)", borderRadius:"10px", padding:"20px 22px" }}>
                  <div style={{ fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"8px" }}>Commitment 1 — Quality of work</div>
                  <p style={{ fontSize:"0.95rem", fontWeight:300, color:"var(--text)", lineHeight:1.75 }}>
                    If you&apos;re not happy with our work for any reason, give us one month to address your concern. If we can&apos;t turn things around in that month, we refund you for that month. No questions asked. No cancellation fees.
                  </p>
                </div>
                <div style={{ background:"var(--bg-alt)", border:"1px solid var(--border)", borderRadius:"10px", padding:"20px 22px" }}>
                  <div style={{ fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"8px" }}>Commitment 2 — Results</div>
                  <p style={{ fontSize:"0.95rem", fontWeight:300, color:"var(--text)", lineHeight:1.75 }}>
                    If we don&apos;t hit the goal of doubling your patient intake within six months, we refund your final month&apos;s payment — $2,000 back to you. You took a chance on this. We honour that.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL SLIDE ── */}
      <section className="fade-up" style={{ background:"var(--forest)", padding:"96px 40px", minHeight:"100vh", display:"flex", alignItems:"center" }}>
        <div style={{ maxWidth:"860px", margin:"0 auto", width:"100%" }}>
          <EyebrowLabel light>Ready to double your practice?</EyebrowLabel>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px", marginBottom:"48px" }}>
            <div style={{ border:"1.5px solid var(--gold-dark)", borderRadius:"16px", padding:"28px", background:"rgba(184,150,46,0.06)" }}>
              <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--gold-dark)", marginBottom:"10px" }}>Your investment</div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:"2.8rem", fontWeight:300, color:"var(--gold-dark)", lineHeight:1, marginBottom:"4px" }}>$2,000</div>
              <div style={{ fontSize:"0.75rem", color:"rgba(240,237,230,0.40)", marginBottom:"16px" }}>per month · 6-month minimum</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                {[["Total 6-month investment","~$15,500"],["Breakeven","10 new patients/mo"],["That&apos;s","2.5 more per week"]].map(([l,v]) => (
                  <div key={l} style={{ display:"flex", justifyContent:"space-between", fontSize:"0.8rem" }}>
                    <span style={{ color:"rgba(240,237,230,0.45)" }} dangerouslySetInnerHTML={{ __html: l }} />
                    <span style={{ color:"rgba(240,237,230,0.70)", fontWeight:500 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ border:"1px solid rgba(240,237,230,0.15)", borderRadius:"16px", padding:"28px", background:"rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(240,237,230,0.40)", marginBottom:"10px" }}>Our guarantee</div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:"2rem", fontWeight:300, color:"var(--bg)", lineHeight:1.2, marginBottom:"12px" }}>360° Money-Back</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                <div style={{ fontSize:"0.8rem", color:"rgba(240,237,230,0.55)", lineHeight:1.65 }}>
                  <strong style={{ color:"rgba(240,237,230,0.70)", fontWeight:500 }}>Quality:</strong> Not happy? One month to fix it. Can&apos;t fix it? We refund that month.
                </div>
                <div style={{ fontSize:"0.8rem", color:"rgba(240,237,230,0.55)", lineHeight:1.65 }}>
                  <strong style={{ color:"rgba(240,237,230,0.70)", fontWeight:500 }}>Results:</strong> Don&apos;t hit the doubling goal in 6 months? Your last month&apos;s payment ($2,000) comes back to you.
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign:"center" }}>
            <a href="mailto:abhi@abhichand.com?subject=Ready to get started — Homeopathic Plus Centre"
              style={{ display:"inline-block", background:"var(--gold)", color:"var(--forest)", fontFamily:"var(--font-ui)", fontSize:"0.95rem", fontWeight:500, letterSpacing:"0.04em", padding:"18px 64px", borderRadius:"8px", textDecoration:"none", boxShadow:"var(--gold-glow)", transition:"all 0.2s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="var(--gold-dark)"; (e.currentTarget as HTMLElement).style.transform="translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="var(--gold)"; (e.currentTarget as HTMLElement).style.transform="none"; }}
            >
              Let&apos;s Go
            </a>
            <div style={{ marginTop:"16px", fontSize:"0.75rem", color:"rgba(240,237,230,0.30)" }}>
              <a href="mailto:abhi@abhichand.com" style={{ color:"rgba(240,237,230,0.35)", textDecoration:"none" }}>abhi@abhichand.com</a>
              {" · "}<a href="https://nava45.com" target="_blank" rel="noopener noreferrer" style={{ color:"rgba(240,237,230,0.35)", textDecoration:"none" }}>nava45.com</a>
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

function FunnelProjections() {
  const [budget, setBudget] = useState(700);
  const [cpc, setCpc] = useState(1.5);
  const [signupRate, setSignupRate] = useState(35);
  const [bookingRate, setBookingRate] = useState(25);
  const [showRate, setShowRate] = useState(65);
  const [closeRate, setCloseRate] = useState(70);
  const [offerPrice, setOfferPrice] = useState(200);
  const [followUpRate, setFollowUpRate] = useState(10);

  const clicks = Math.round(budget / cpc);
  const signups = Math.round(clicks * signupRate / 100);
  const cpl = signups > 0 ? budget / signups : 0;
  const callsBooked = Math.round(signups * bookingRate / 100);
  const shows = Math.round(callsBooked * showRate / 100);
  const closedPatients = Math.round(shows * closeRate / 100);
  const immediateRevenue = closedPatients * offerPrice;
  const nonBookingLeads = signups - callsBooked;
  const followUpSales = Math.round(nonBookingLeads * followUpRate / 100);
  const followUpRevenue = followUpSales * offerPrice;
  const totalPatients = closedPatients + followUpSales;
  const totalRevenue = immediateRevenue + followUpRevenue;
  const roas = budget > 0 ? Math.round((totalRevenue / budget) * 100) : 0;

  const fmt$ = (n: number) => n >= 1000 ? `$${(n/1000).toFixed(1)}K` : `$${n.toFixed(0)}`;

  const stages = [
    {
      id:"spend", label:"Ad Spend", color:"var(--forest-mid)",
      inputs:[
        { label:"Monthly budget", value:budget, min:200, max:3000, step:50, set:setBudget, fmt:(v:number)=>`$${v}` },
        { label:"Cost per click", value:cpc, min:0.5, max:5, step:0.25, set:setCpc, fmt:(v:number)=>`$${v.toFixed(2)}` },
      ],
      outputs:[{ label:"Est. clicks", value:clicks.toString() }],
    },
    {
      id:"signups", label:"Signups", color:"var(--forest-mid)",
      inputs:[
        { label:"Sign-up rate", value:signupRate, min:5, max:70, step:5, set:setSignupRate, fmt:(v:number)=>`${v}%` },
      ],
      outputs:[
        { label:"Leads/mo", value:signups.toString(), big:true },
        { label:"Cost per lead", value:fmt$(cpl) },
      ],
    },
    {
      id:"calls", label:"Discovery Calls", color:"#2E7D52",
      inputs:[
        { label:"Booking rate", value:bookingRate, min:5, max:60, step:5, set:setBookingRate, fmt:(v:number)=>`${v}%` },
      ],
      outputs:[
        { label:"Calls booked", value:callsBooked.toString(), big:true },
        { label:"Cost per call", value:callsBooked > 0 ? fmt$(budget/callsBooked) : "—" },
      ],
    },
    {
      id:"shows", label:"Shows", color:"#2E7D52",
      inputs:[
        { label:"Show-up rate", value:showRate, min:20, max:95, step:5, set:setShowRate, fmt:(v:number)=>`${v}%` },
      ],
      outputs:[
        { label:"Show-ups", value:shows.toString(), big:true },
        { label:"Cost per show", value:shows > 0 ? fmt$(budget/shows) : "—" },
      ],
    },
    {
      id:"patients", label:"New Patients", color:"var(--gold)",
      inputs:[
        { label:"Close rate", value:closeRate, min:20, max:95, step:5, set:setCloseRate, fmt:(v:number)=>`${v}%` },
        { label:"Offer price", value:offerPrice, min:100, max:800, step:50, set:setOfferPrice, fmt:(v:number)=>`$${v}` },
      ],
      outputs:[
        { label:"New patients", value:closedPatients.toString(), big:true },
        { label:"Revenue", value:fmt$(immediateRevenue), big:true },
      ],
    },
  ];

  return (
    <div>
      {/* Horizontal funnel */}
      <div style={{ overflowX:"auto", paddingBottom:"8px" }}>
        <div style={{ display:"flex", gap:"0", alignItems:"stretch", minWidth:"900px" }}>
          {stages.map((stage, si) => (
            <div key={stage.id} style={{ display:"flex", alignItems:"center", flex:1 }}>
              <div style={{ flex:1, background:"var(--bg)", border:"1px solid var(--border)", borderRadius:"12px", padding:"18px 16px", boxShadow:"var(--shadow-sm)" }}>
                {/* Stage header */}
                <div style={{ fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:stage.color, marginBottom:"12px", borderBottom:"2px solid "+stage.color, paddingBottom:"6px" }}>
                  {stage.label}
                </div>
                {/* Inputs */}
                {stage.inputs.map(inp => (
                  <div key={inp.label} style={{ marginBottom:"12px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
                      <span style={{ fontSize:"0.7rem", color:"var(--muted)" }}>{inp.label}</span>
                      <span style={{ fontSize:"0.75rem", fontWeight:500, color:"var(--text)" }}>{inp.fmt(inp.value)}</span>
                    </div>
                    <input type="range" min={inp.min} max={inp.max} step={inp.step} value={inp.value}
                      onChange={e => inp.set(Number(e.target.value))}
                      style={{ width:"100%", accentColor:"var(--gold)", cursor:"pointer", height:"3px" }}
                    />
                  </div>
                ))}
                {/* Outputs */}
                <div style={{ display:"flex", flexDirection:"column", gap:"6px", marginTop:"8px", paddingTop:"8px", borderTop:"1px solid var(--border)" }}>
                  {stage.outputs.map(out => (
                    <div key={out.label}>
                      <div style={{ fontSize:"0.65rem", color:"var(--muted)", letterSpacing:"0.06em", textTransform:"uppercase" }}>{out.label}</div>
                      <div style={{ fontFamily:"var(--font-display)", fontSize: (out as {big?:boolean}).big ? "1.8rem" : "1.1rem", fontWeight:300, color: (out as {big?:boolean}).big ? "var(--gold)" : "var(--text)", lineHeight:1.1 }}>{out.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Arrow connector */}
              {si < stages.length - 1 && (
                <div style={{ flexShrink:0, width:"28px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg width="28" height="12" viewBox="0 0 28 12" fill="none">
                    <line x1="0" y1="6" x2="20" y2="6" stroke="var(--gold)" strokeWidth="1.5"/>
                    <polyline points="16,2 24,6 16,10" stroke="var(--gold)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Follow-up row */}
      <div style={{ marginTop:"16px", background:"var(--bg)", border:"1px solid var(--border)", borderRadius:"12px", padding:"20px 24px", boxShadow:"var(--shadow-sm)" }}>
        <div style={{ fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"14px" }}>Follow-up pipeline — leads who didn&apos;t book a call</div>
        <div style={{ display:"grid", gridTemplateColumns:"280px 1fr 100px 100px 100px 100px", gap:"20px", alignItems:"center" }}>
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
              <span style={{ fontSize:"0.7rem", color:"var(--muted)" }}>Follow-up conversion rate</span>
              <span style={{ fontSize:"0.75rem", fontWeight:500, color:"var(--text)" }}>{followUpRate}%</span>
            </div>
            <input type="range" min={1} max={30} step={1} value={followUpRate}
              onChange={e => setFollowUpRate(Number(e.target.value))}
              style={{ width:"100%", accentColor:"var(--gold)", cursor:"pointer", height:"3px" }}
            />
            <div style={{ fontSize:"0.65rem", color:"var(--muted)", marginTop:"3px" }}>of {nonBookingLeads} non-booking leads</div>
          </div>
          {[
            { label:"Follow-up sales", value:followUpSales.toString() },
            { label:"Follow-up revenue", value:fmt$(followUpRevenue) },
          ].map(item => (
            <div key={item.label} style={{ textAlign:"center" }}>
              <div style={{ fontSize:"0.65rem", color:"var(--muted)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"4px" }}>{item.label}</div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:"1.5rem", fontWeight:300, color:"var(--text)" }}>{item.value}</div>
            </div>
          ))}
          <div style={{ gridColumn:"span 3" }} />
        </div>
      </div>

      {/* Summary bar */}
      <div style={{ marginTop:"16px", display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:"12px" }}>
        {[
          { label:"Total new patients / mo", value:totalPatients.toString(), gold:false },
          { label:"Total revenue / mo", value:fmt$(totalRevenue), gold:true },
          { label:"Return on ad spend", value:`${roas}%`, gold:true },
          { label:"Cost per new patient", value:totalPatients > 0 ? fmt$(budget/totalPatients) : "—", gold:false },
        ].map(item => (
          <div key={item.label} style={{ background: item.gold ? "rgba(184,150,46,0.08)" : "var(--bg)", border:`1px solid ${item.gold ? "rgba(184,150,46,0.25)" : "var(--border)"}`, borderRadius:"10px", padding:"16px 18px", textAlign:"center", boxShadow:"var(--shadow-xs)" }}>
            <div style={{ fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color: item.gold ? "var(--gold)" : "var(--muted)", marginBottom:"6px" }}>{item.label}</div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:"2rem", fontWeight:300, color: item.gold ? "var(--gold)" : "var(--text)", lineHeight:1 }}>{item.value}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop:"12px", fontSize:"0.75rem", color:"var(--muted)", lineHeight:1.6, fontStyle:"italic" }}>
        Projections only. Actual results depend on creative quality, offer resonance, and conversion skill. What Nava45 controls: leads generated and discovery calls booked. What converts those calls to patients is on you — and you&apos;re already great at it.
      </div>
    </div>
  );
}


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
          {phase.deliverables.map((d) => (
            <div key={d} style={{ display:"flex", gap:"8px", fontSize:"0.8rem", color:"var(--text)", lineHeight:1.45, marginBottom:"6px" }}>
              <span style={{ color:"var(--forest-mid)", flexShrink:0, fontWeight:500 }}>✓</span>{d}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EyebrowLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{ fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:light?"var(--gold-dark)":"var(--gold)", marginBottom:"16px", display:"flex", alignItems:"center", gap:"10px" }}>
      <span style={{ display:"inline-block", width:"18px", height:"1px", background:light?"var(--gold-dark)":"var(--gold)" }} />
      {children}
    </div>
  );
}
