"use client";
import { useEffect, useState } from "react";

type Phase = {
  month: string; title: string; tagline: string; purpose: string;
  activities: string[]; deliverables: string[]; budget?: string; note?: string;
};

type Competitor = {
  name: string; handle: string; followers: string; location: string;
  summary: string; igUrl: string; threat: boolean;
};

const PHASES: Phase[] = [
  {
    month: "Month 1",
    title: "Foundation & Research",
    tagline: "Set the stage. Mine what already exists.",
    purpose: "Before we spend a dollar on ads, the infrastructure has to be solid. We audit every account, begin the referral system, speak directly to existing patients, and get the pixel firing correctly.",
    activities: [
      "Full account audit & access review — Meta Business, Google, CRM, booking system",
      "Referral system design — post-appointment email sequence, Google review ask, monthly patient raffle",
      "ICA Interviews — conversations with 3–5 existing patients to capture language, pain points, and desires",
      "Meta Pixel + Conversion API setup and verification",
      "MailerLite email software setup (client-paid, ~$20/mo directly)",
      "Booking flow audit — ensure <5 min lead response path is ready before traffic arrives",
      "ChatGPT / AI SEO optimization on existing website content (one-time add-on)",
    ],
    deliverables: [
      "Referral system designed and ready to launch",
      "ICA hypothesis documented from patient interviews",
      "All accounts accessed, audited, and organized",
      "Meta Pixel firing and verified",
      "MailerLite configured with follow-up sequence skeleton",
      "Booking flow optimized for fast lead response",
    ],
    note: "ICA Interviews are non-negotiable. Skipping this step is the single biggest reason niche-cracking projects fail.",
  },
  {
    month: "Month 2",
    title: "ICA Development & Infrastructure",
    tagline: "Build the profile. Build the machine.",
    purpose: "We synthesize everything from Month 1 into a data-backed Ideal Customer Profile, then build the ad infrastructure around it — audiences, offers, and the referral system going live.",
    activities: [
      "Referral system goes live — email sequence active, raffle mechanics in place, winner announcements scheduled",
      "ICA document — synthesize interview data into a full written profile with tested language",
      "Offer development — create 2–3 offers to test (downloadable guide, direct discovery call booking, etc.)",
      "Cold audience build in Meta",
      "Lookalike Audience build from patient email list (25 years in business = valuable list)",
    ],
    deliverables: [
      "Referral system live and generating reviews and warm leads",
      "Data-backed ICA profile document completed",
      "2–3 offers built and ready to test in Lead Ads",
      "Cold Audience and LLA ready in Meta Ads Manager",
    ],
    budget: "$500 ad spend — used to warm the pixel and begin audience validation.",
  },
  {
    month: "Months 3–4",
    title: "Creative Testing & Lead Ads",
    tagline: "Find what they click. Find what they sign up for.",
    purpose: "Multiple structured rounds of testing across two audiences to identify the winning creative and offer combination. We test signups via native Lead Ads — the thank-you screen sends them directly to the booking page. We don't build landing pages until we know what's working.",
    activities: [
      "Creative Test R1 — run 3–5 creatives against both Cold Audience and LLA simultaneously",
      "Lead Ads R1 — winning creatives + offers tested for signups; TY screen → booking page",
      "Review R1 results — evaluate which offer drives signups and booking intent",
      "Creative Test R2 — additional rounds as data dictates",
      "Lead Ads R2 — refined targeting and creative based on R1 learnings",
      "Evaluate winning offer combination → informs landing page build and scaling decisions",
      "Appointment setter protocol active — new leads responded to within 5 minutes",
    ],
    deliverables: [
      "Winning creative + offer combination identified with sign-up proof",
      "Signup list generated — leads to contact directly",
      "Follow-up email sequence active via MailerLite, pushing signups toward discovery call",
      "CPL data from both audiences to inform scaling budget",
      "Landing page built for the confirmed winning offer",
    ],
    budget: "$1,000–$1,500 ad spend across testing rounds.",
    note: "The <5 min response to new leads is mission-critical. We solve this before ads go live — either through automation or an appointment setter add-on.",
  },
  {
    month: "Months 5–6",
    title: "Scale",
    tagline: "Increase spend. Compound the system.",
    purpose: "We have a winning combination. The job now is to increase spend to reach more of the validated audience we've already identified — not to find new audiences. The referral system and the paid pipeline reinforce each other.",
    activities: [
      "Scale winning ad combos with increased spend against validated audiences",
      "Weekly data review — CPL, signup rate, booking rate, show rate, patient conversion",
      "LLA expansion built from patients who converted through the pipeline",
      "Referral system layer 2 — patients from paid pipeline become new referral sources",
      "Identify next optimization lever: ad copy, offer angle, or audience expansion",
    ],
    deliverables: [
      "Predictable weekly patient inquiries from a validated, repeatable system",
      "Pipeline and referral system reinforcing each other",
      "Full performance data set to inform what comes next",
      "A practice that no longer depends on word-of-mouth alone",
    ],
  },
];

const COMPETITORS: Competitor[] = [
  {
    name: "Dr. Rattandeep Kaur",
    handle: "@homeopathic_wonders",
    followers: "8.9K",
    location: "Mississauga, ON",
    summary: "Senior Homeopath at Rattan Homeo Clinic — same city, same audience, active on Instagram. Condition-specific content (eczema, vaccination side effects, supplements). Modest reach but a real local presence. The closest direct competitor.",
    igUrl: "https://www.instagram.com/homeopathic_wonders/",
    threat: true,
  },
  {
    name: "Melissa Kupsch",
    handle: "@thathomeopath",
    followers: "192K",
    location: "Australia",
    summary: "The English-language ceiling. Philosophy-led content: quantum physics framing, myth-busting, homeopathy as a worldview. Built an academy, conference, and product ecosystem. A different angle — but the best proof that English-language homeopathy content can scale.",
    igUrl: "https://www.instagram.com/thathomeopath/",
    threat: false,
  },
  {
    name: "Dr. Kapil Dev",
    handle: "@dr_kapil_dev_",
    followers: "807K",
    location: "India",
    summary: "Hindi-language condition-specific Reels. Enormous reach, proven model — India-only market. Proof that short-form video works for homeopaths at scale.",
    igUrl: "https://www.instagram.com/dr_kapil_dev_/",
    threat: false,
  },
  {
    name: "Dr. Rajendra Goyal",
    handle: "@dr.rajendragoyal",
    followers: "481K",
    location: "India",
    summary: "Hindi content, supplement sales via 1mg. Massive Hindi-language reach, wrong geography. Reference market only.",
    igUrl: "https://www.instagram.com/dr.rajendragoyal/",
    threat: false,
  },
];

export default function Page() {
  const [activePhase, setActivePhase] = useState<number>(0);
  const [openComp, setOpenComp] = useState<number | null>(null);

  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const obs = new IntersectionObserver(
      (e) => e.forEach((x) => { if (x.isIntersecting) x.target.classList.add("visible"); }),
      { threshold: 0.06 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main style={{ fontFamily: "var(--font-ui)", fontWeight: 300 }}>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh", background: "var(--forest)",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "128px 40px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position:"absolute", top:"-80px", right:"-100px", width:"500px", height:"500px", borderRadius:"50%", border:"1px solid rgba(184,150,46,0.10)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-60px", left:"-80px", width:"360px", height:"360px", borderRadius:"50%", border:"1px solid rgba(184,150,46,0.06)", pointerEvents:"none" }} />

        <div style={{ maxWidth:"860px", margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
          <EyebrowLabel light>Prepared exclusively for Hermeet Suri</EyebrowLabel>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(3.2rem,5.5vw,5rem)", fontWeight:300, lineHeight:1.1, letterSpacing:"-0.01em", color:"var(--bg)", marginBottom:"24px", maxWidth:"800px" }}>
            From 8 to 16 patients per week.{" "}
            <em style={{ fontStyle:"italic", color:"var(--gold-dark)" }}>Here&apos;s how.</em>
          </h1>
          <p style={{ fontSize:"1.125rem", fontWeight:300, color:"rgba(240,237,230,0.70)", maxWidth:"520px", marginBottom:"56px", lineHeight:1.75 }}>
            A structured infrastructure build that doubles Homeopathic Plus Centre&apos;s patient intake in six months — through data, not guesswork.
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
            <div style={{ borderTop:"1px solid var(--border)", paddingTop:"24px" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }}>
                <div>
                  <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"6px" }}>Current monthly revenue (new patients)</div>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:"1.5rem", fontWeight:300, color:"var(--text)" }}>~$6,400</div>
                  <div style={{ fontSize:"0.8rem", color:"var(--muted)" }}>32 patients × $200 first session</div>
                </div>
                <div>
                  <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"6px" }}>Target monthly revenue (new patients)</div>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:"1.5rem", fontWeight:300, color:"var(--gold)" }}>~$12,800</div>
                  <div style={{ fontSize:"0.8rem", color:"var(--muted)" }}>64 patients × $200 first session</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background:"var(--forest-light)", borderLeft:"3px solid var(--forest-mid)", borderRadius:"0 8px 8px 0", padding:"16px 20px", fontSize:"0.875rem", color:"var(--forest)", lineHeight:1.65 }}>
            <strong style={{ fontWeight:500 }}>Two things being built simultaneously:</strong> A paid digital pipeline that attracts new patients predictably — and a referral system that operationalizes word-of-mouth so you never have to ask manually again. Both start in Month 1.
          </div>
        </div>
      </section>

      {/* ── THE PLAN ── */}
      <section className="fade-up" style={{ background:"var(--bg-alt)", padding:"96px 40px" }}>
        <div style={{ maxWidth:"860px", margin:"0 auto" }}>
          <EyebrowLabel>The plan</EyebrowLabel>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.2rem,3.5vw,2.8rem)", fontWeight:300, lineHeight:1.2, letterSpacing:"-0.01em", marginBottom:"16px" }}>
            Four phases. <em style={{ fontStyle:"italic", color:"var(--gold)" }}>One compounding system.</em>
          </h2>
          <p style={{ fontSize:"1rem", color:"var(--muted)", maxWidth:"560px", marginBottom:"40px", lineHeight:1.75 }}>
            Click any phase to see exactly what happens, why, and what you&apos;ll have at the end of it. Nothing is skipped. Every step exists for a reason.
          </p>

          {/* Tab bar */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", background:"var(--bg)", border:"1px solid var(--border)", borderRadius:"12px 12px 0 0", overflow:"hidden" }}>
            {PHASES.map((phase, i) => (
              <button key={i} onClick={() => setActivePhase(i)} style={{
                padding:"20px 16px", border:"none",
                borderBottom: activePhase === i ? "2px solid var(--gold)" : "2px solid transparent",
                borderRight: i < PHASES.length - 1 ? "1px solid var(--border)" : "none",
                background: activePhase === i ? "rgba(184,150,46,0.04)" : "transparent",
                cursor:"pointer", textAlign:"left", transition:"all 0.15s ease",
              }}>
                <div style={{ fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color: activePhase === i ? "var(--gold)" : "var(--muted)", marginBottom:"8px" }}>{phase.month}</div>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"1rem", fontWeight:300, color: activePhase === i ? "var(--text)" : "var(--muted)", lineHeight:1.3, marginBottom:"4px" }}>{phase.title}</div>
                {activePhase === i && <div style={{ fontSize:"0.75rem", color:"var(--muted)", lineHeight:1.4 }}>{phase.tagline}</div>}
              </button>
            ))}
          </div>

          {/* Panel */}
          <div style={{ background:"var(--bg)", border:"1px solid var(--border)", borderTop:"none", borderRadius:"0 0 12px 12px", padding:"36px", boxShadow:"var(--shadow-sm)" }}>
            <PhasePanel phase={PHASES[activePhase]} />
          </div>
        </div>
      </section>

      {/* ── COMPETITIVE ── */}
      <section className="fade-up" style={{ background:"var(--bg)", padding:"96px 40px" }}>
        <div style={{ maxWidth:"860px", margin:"0 auto" }}>
          <EyebrowLabel>The landscape</EyebrowLabel>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.2rem,3.5vw,2.8rem)", fontWeight:300, lineHeight:1.2, letterSpacing:"-0.01em", marginBottom:"16px" }}>
            Who else is in the <em style={{ fontStyle:"italic", color:"var(--gold)" }}>room</em>
          </h2>
          <p style={{ fontSize:"1rem", color:"var(--muted)", maxWidth:"560px", marginBottom:"40px", lineHeight:1.75 }}>
            One local competitor. One who shows the ceiling. Two who prove the model works — just not in your market. Click any card to learn more.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"20px" }}>
            {COMPETITORS.map((c, i) => (
              <div key={c.name}>
                <button onClick={() => setOpenComp(openComp === i ? null : i)} style={{
                  width:"100%", textAlign:"left", cursor:"pointer",
                  border: c.threat ? "1.5px solid rgba(184,150,46,0.40)" : "1px solid rgba(184,150,46,0.15)",
                  borderBottom: openComp === i ? "none" : undefined,
                  borderRadius: openComp === i ? "12px 12px 0 0" : "12px",
                  padding:"24px",
                  background: openComp === i || c.threat ? "rgba(184,150,46,0.03)" : "rgba(255,255,255,0.80)",
                  boxShadow:"var(--shadow-sm)", transition:"all 0.15s ease",
                }}>
                  {c.threat && <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:"var(--gold)", background:"rgba(184,150,46,0.10)", padding:"3px 10px", borderRadius:"100px", display:"inline-block", marginBottom:"10px" }}>Local competitor</div>}
                  <div style={{ fontWeight:500, fontSize:"0.95rem", color:"var(--text)", marginBottom:"3px" }}>{c.name}</div>
                  <div style={{ fontSize:"0.75rem", color:"var(--muted)", marginBottom:"10px" }}>{c.location}</div>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:"2rem", fontWeight:300, color: c.threat ? "var(--gold)" : "var(--forest-mid)", lineHeight:1, marginBottom:"8px" }}>{c.followers}</div>
                  <div style={{ fontSize:"0.75rem", color:"var(--gold)", fontWeight:400 }}>{openComp === i ? "▲ less" : "▼ more"}</div>
                </button>
                {openComp === i && (
                  <div style={{ border: c.threat ? "1.5px solid rgba(184,150,46,0.40)" : "1px solid rgba(184,150,46,0.15)", borderTop:"none", borderRadius:"0 0 12px 12px", padding:"20px 24px", background:"var(--bg-alt)", boxShadow:"var(--shadow-sm)" }}>
                    <div style={{ fontSize:"0.875rem", color:"var(--text)", lineHeight:1.7, marginBottom:"14px" }}>{c.summary}</div>
                    <a href={c.igUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize:"0.8rem", color:"var(--gold)", fontWeight:400, textDecoration:"none" }}>
                      {c.handle} → view on Instagram
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ background:"#FDF3E3", border:"1px solid rgba(184,150,46,0.25)", borderRadius:"8px", padding:"18px 22px", fontSize:"0.875rem", color:"var(--text)", lineHeight:1.65 }}>
            <strong style={{ fontWeight:500 }}>The gap nobody has claimed:</strong> English-language homeopathy content and paid acquisition built specifically for the Indian diaspora in North America. These families already believe in homeopathy — they just need to find you first.
          </div>
        </div>
      </section>

      {/* ── INVESTMENT ── */}
      <section className="fade-up" style={{ background:"var(--forest)", padding:"96px 40px" }}>
        <div style={{ maxWidth:"860px", margin:"0 auto" }}>
          <EyebrowLabel light>Your investment</EyebrowLabel>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.2rem,3.5vw,2.8rem)", fontWeight:300, lineHeight:1.2, letterSpacing:"-0.01em", marginBottom:"16px", color:"var(--bg)" }}>
            What it costs to build <em style={{ fontStyle:"italic", color:"var(--gold-dark)" }}>something that lasts</em>
          </h2>
          <p style={{ fontSize:"1rem", color:"rgba(240,237,230,0.60)", maxWidth:"560px", marginBottom:"48px", lineHeight:1.75 }}>
            The same process that generated $14.5M in pipeline for luxury yachts — applied to your patient acquisition problem.
          </p>

          {/* Main card */}
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
            <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:"rgba(240,237,230,0.40)", marginBottom:"14px" }}>Includes</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
              {[
                "ICA interviews + profile development",
                "Referral system (email, raffle, review ask)",
                "Meta Pixel + Conversion API setup",
                "Audience builds (Cold + LLA)",
                "Multiple creative testing rounds",
                "Lead Ads campaigns + optimization",
                "MailerLite setup + follow-up sequences",
                "Monthly reporting + weekly data review",
                "90-day check-in with full performance review",
                "Landing page for confirmed winning offer",
              ].map(f => (
                <div key={f} style={{ display:"flex", gap:"10px", fontSize:"0.8rem", color:"rgba(240,237,230,0.65)", lineHeight:1.4 }}>
                  <span style={{ color:"var(--gold-dark)", flexShrink:0 }}>✓</span>{f}
                </div>
              ))}
            </div>
          </div>

          {/* Ad budget + add-ons */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"20px" }}>
            <div style={{ border:"1px solid rgba(240,237,230,0.12)", borderRadius:"12px", padding:"24px", background:"rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(240,237,230,0.40)", marginBottom:"14px" }}>Ad budget — paid directly to Meta</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                {[
                  ["Month 2 — ICA validation", "$500"],
                  ["Months 3–4 — creative + lead ad testing", "$1,000–$1,500"],
                ].map(([label, amount]) => (
                  <div key={label} style={{ display:"flex", justifyContent:"space-between", fontSize:"0.875rem", color:"rgba(240,237,230,0.60)" }}>
                    <span>{label}</span><span style={{ color:"var(--gold-dark)" }}>{amount}</span>
                  </div>
                ))}
                <div style={{ height:"1px", background:"rgba(240,237,230,0.08)" }} />
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:"0.875rem", fontWeight:500, color:"rgba(240,237,230,0.75)" }}>
                  <span>Total over 4 months</span><span style={{ color:"var(--gold-dark)" }}>~$1,500–$2,000</span>
                </div>
              </div>
              <div style={{ marginTop:"12px", fontSize:"0.75rem", color:"rgba(240,237,230,0.30)", lineHeight:1.5 }}>Separate from retainer. Referral revenue from Month 1 is designed to fund this.</div>
            </div>
            <div style={{ border:"1px solid rgba(240,237,230,0.12)", borderRadius:"12px", padding:"24px", background:"rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(240,237,230,0.40)", marginBottom:"14px" }}>Tools + add-ons</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
                <div>
                  <div style={{ fontSize:"0.875rem", fontWeight:500, color:"rgba(240,237,230,0.80)", marginBottom:"3px" }}>MailerLite</div>
                  <div style={{ fontSize:"0.8rem", color:"rgba(240,237,230,0.40)", lineHeight:1.5, marginBottom:"4px" }}>Email software for follow-up sequences and patient communication</div>
                  <div style={{ fontSize:"0.875rem", color:"var(--gold-dark)" }}>~$20/mo · paid directly by you</div>
                </div>
                <div style={{ height:"1px", background:"rgba(240,237,230,0.08)" }} />
                <div>
                  <div style={{ fontSize:"0.875rem", fontWeight:500, color:"rgba(240,237,230,0.80)", marginBottom:"3px" }}>ChatGPT / AI Search Optimization</div>
                  <div style={{ fontSize:"0.8rem", color:"rgba(240,237,230,0.40)", lineHeight:1.5, marginBottom:"4px" }}>Restructure website content + FAQ schema for AI citation visibility</div>
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

          <div style={{ padding:"20px 24px", background:"rgba(240,237,230,0.04)", border:"1px solid rgba(240,237,230,0.08)", borderRadius:"8px", fontSize:"0.875rem", color:"rgba(240,237,230,0.50)", lineHeight:1.65 }}>
            <strong style={{ color:"rgba(240,237,230,0.70)", fontWeight:500 }}>On breakeven: </strong>12.5 new patients per month at $200/session covers the retainer — roughly 3 more per week than you&apos;re doing now. Referral patients typically spend $400–500 (supplements + session), so the real breakeven is lower. The referral system is designed to generate that number before we spend anything on ads.
          </div>
        </div>
      </section>

      {/* ── NEXT STEPS ── */}
      <section className="fade-up" style={{ background:"var(--bg)", padding:"96px 40px" }}>
        <div style={{ maxWidth:"860px", margin:"0 auto" }}>
          <EyebrowLabel>What happens next</EyebrowLabel>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2.2rem,3.5vw,2.8rem)", fontWeight:300, lineHeight:1.2, letterSpacing:"-0.01em", marginBottom:"36px" }}>
            Simple from here
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:"20px", marginBottom:"40px" }}>
            {[
              ["Decide","We walk through this proposal together and you decide if this is the right investment for where you are."],
              ["Sign and invoice","Agreement signed, first invoice cleared. Work begins."],
              ["60-min onboarding","We map your patient list, review all current accounts, and begin designing the referral system."],
              ["Week one","Access gained, accounts audited, referral system design underway. We move deliberately — the foundation has to be right before we build on top of it."],
            ].map(([title, desc], i) => (
              <div key={i} style={{ display:"flex", gap:"20px", alignItems:"flex-start" }}>
                <div style={{ width:"32px", height:"32px", borderRadius:"50%", background:"var(--forest-light)", color:"var(--forest)", fontSize:"0.8rem", fontWeight:500, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"2px" }}>{i + 1}</div>
                <div>
                  <div style={{ fontWeight:500, fontSize:"0.95rem", marginBottom:"3px" }}>{title as string}</div>
                  <div style={{ fontSize:"0.875rem", color:"var(--muted)", lineHeight:1.6 }}>{desc as string}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background:"var(--bg-alt)", border:"1px solid rgba(184,150,46,0.15)", borderRadius:"12px", padding:"28px 32px", boxShadow:"var(--shadow-sm)", marginBottom:"48px" }}>
            <div style={{ fontSize:"0.875rem", color:"var(--muted)", lineHeight:1.75 }}>
              The only thing I need from you — beyond the financial commitment — is <strong style={{ color:"var(--text)", fontWeight:500 }}>trust and creative freedom</strong>. When those are present, we build something that compounds. I don&apos;t do average work, and I won&apos;t start here.
            </div>
          </div>
          <div style={{ paddingTop:"40px", borderTop:"1px solid var(--border)", display:"flex", alignItems:"flex-start", gap:"16px" }}>
            <div style={{ width:"44px", height:"44px", borderRadius:"50%", background:"var(--forest)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-display)", fontSize:"16px", fontWeight:300, color:"var(--bg)", flexShrink:0 }}>AC</div>
            <div>
              <div style={{ fontWeight:500, fontSize:"0.95rem", marginBottom:"2px" }}>Abhi Chand</div>
              <div style={{ fontSize:"0.875rem", color:"var(--muted)", marginBottom:"2px" }}>Digital Growth Strategist · Nava45</div>
              <div style={{ fontSize:"0.8rem", color:"var(--muted)" }}>
                <a href="mailto:abhi@abhichand.com" style={{ color:"var(--forest-mid)", textDecoration:"none" }}>abhi@abhichand.com</a>
                {" · "}
                <a href="https://nava45.com" target="_blank" rel="noopener noreferrer" style={{ color:"var(--forest-mid)", textDecoration:"none" }}>nava45.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background:"var(--forest)", padding:"24px 40px", textAlign:"center", fontSize:"0.75rem", color:"rgba(240,237,230,0.25)" }}>
        Prepared for Hermeet Suri · Homeopathic Plus Centre · May 2026 ·{" "}
        <a href="https://nava45.com" target="_blank" rel="noopener noreferrer" style={{ color:"rgba(240,237,230,0.35)", textDecoration:"none" }}>nava45.com</a>
      </footer>
    </main>
  );
}

function PhasePanel({ phase }: { phase: Phase }) {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"36px" }}>
      <div>
        <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"8px" }}>Purpose</div>
        <p style={{ fontSize:"0.9rem", color:"var(--text)", lineHeight:1.75, marginBottom:"20px" }}>{phase.purpose}</p>
        {phase.budget && (
          <div style={{ background:"var(--forest-light)", border:"1px solid rgba(61,107,92,0.20)", borderRadius:"8px", padding:"14px 16px", marginBottom:"14px" }}>
            <div style={{ fontSize:"0.65rem", fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:"var(--forest-mid)", marginBottom:"4px" }}>Ad budget required</div>
            <div style={{ fontSize:"0.95rem", fontWeight:500, color:"var(--forest)" }}>{phase.budget}</div>
            <div style={{ fontSize:"0.75rem", color:"var(--forest-mid)", marginTop:"3px" }}>Paid to Meta directly — separate from retainer</div>
          </div>
        )}
        {phase.note && (
          <div style={{ background:"rgba(184,150,46,0.06)", border:"1px solid rgba(184,150,46,0.18)", borderRadius:"8px", padding:"14px 16px" }}>
            <div style={{ fontSize:"0.8rem", color:"var(--text)", lineHeight:1.65, fontStyle:"italic" }}>&ldquo;{phase.note}&rdquo;</div>
          </div>
        )}
      </div>
      <div>
        <div style={{ fontSize:"0.7rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"8px" }}>Key activities</div>
        <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginBottom:"24px" }}>
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
                <span style={{ color:"var(--forest-mid)", flexShrink:0, fontWeight:500, marginTop:"1px" }}>✓</span>{d}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EyebrowLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{ fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color: light ? "var(--gold-dark)" : "var(--gold)", marginBottom:"16px", display:"flex", alignItems:"center", gap:"10px" }}>
      <span style={{ display:"inline-block", width:"18px", height:"1px", background: light ? "var(--gold-dark)" : "var(--gold)" }} />
      {children}
    </div>
  );
}
