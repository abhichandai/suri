"use client";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.07 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main style={{ fontFamily: "var(--sans)" }}>

      {/* ── HERO ── */}
      <header style={{
        background: "var(--forest)",
        color: "var(--cream)",
        padding: "80px 40px 72px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position:"absolute", top:"-60px", right:"-80px", width:"400px", height:"400px", borderRadius:"50%", border:"1px solid rgba(184,149,74,0.12)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-40px", left:"-60px", width:"280px", height:"280px", borderRadius:"50%", border:"1px solid rgba(184,149,74,0.08)", pointerEvents:"none" }} />

        <div style={{ maxWidth:"760px", margin:"0 auto", position:"relative", zIndex:1 }}>
          <div style={{ fontSize:"11px", fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--gold-light)", marginBottom:"20px", display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ display:"inline-block", width:"24px", height:"1px", background:"var(--gold)" }} />
            Prepared exclusively for Hermeet Suri
          </div>

          <h1 style={{ fontFamily:"var(--serif)", fontSize:"clamp(38px,5vw,56px)", fontWeight:400, lineHeight:1.15, letterSpacing:"-0.01em", marginBottom:"20px", color:"var(--cream)" }}>
            A growth roadmap for<br />
            <em style={{ fontStyle:"italic", color:"var(--gold-light)" }}>Homeopathic Plus Centre</em>
          </h1>

          <p style={{ fontSize:"16px", fontWeight:300, color:"rgba(248,245,239,0.75)", maxWidth:"540px", marginBottom:"40px", lineHeight:1.65 }}>
            A phased strategy to consistently reach 14 patients per week — starting with your highest-leverage asset: the people who already trust you.
          </p>

          <div style={{ display:"flex", gap:"32px", flexWrap:"wrap" }}>
            {[["14","patients/week target"],["10×","ROI in month one"],["3","phases to compound growth"]].map(([n, label], i, arr) => (
              <div key={n} style={{ display:"flex", gap:"32px", alignItems:"center" }}>
                <div>
                  <div style={{ fontFamily:"var(--serif)", fontSize:"28px", fontWeight:500, color:"var(--gold-light)", lineHeight:1 }}>{n}</div>
                  <div style={{ fontSize:"11px", color:"rgba(248,245,239,0.5)", letterSpacing:"0.05em", marginTop:"3px" }}>{label}</div>
                </div>
                {i < arr.length - 1 && <div style={{ width:"1px", height:"44px", background:"rgba(248,245,239,0.15)" }} />}
              </div>
            ))}
          </div>

          <div style={{ marginTop:"48px", paddingTop:"24px", borderTop:"1px solid rgba(248,245,239,0.1)", display:"flex", alignItems:"center", gap:"14px" }}>
            <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:"var(--gold)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--serif)", fontSize:"14px", fontWeight:600, color:"var(--forest)", flexShrink:0 }}>AC</div>
            <div style={{ fontSize:"13px", color:"rgba(248,245,239,0.6)", lineHeight:1.4 }}>
              <span style={{ color:"rgba(248,245,239,0.9)", fontWeight:500 }}>Abhi Chand</span><br />
              Digital Marketing Strategist · abhichand.com
            </div>
          </div>
        </div>
      </header>

      {/* ── ICA ── */}
      <section className="fade-up" style={{ padding:"72px 40px", background:"var(--warm-white)" }}>
        <div style={{ maxWidth:"760px", margin:"0 auto" }}>
          <SectionLabel>Who we&apos;re targeting</SectionLabel>
          <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(28px,3.5vw,38px)", fontWeight:400, lineHeight:1.2, letterSpacing:"-0.01em", marginBottom:"16px" }}>
            Your ideal patient, <em style={{ fontStyle:"italic", color:"var(--forest-mid)" }}>profiled</em>
          </h2>
          <p style={{ fontSize:"16px", fontWeight:300, color:"var(--ink-mid)", maxWidth:"600px", marginBottom:"36px", lineHeight:1.7 }}>
            Based on our conversation, here is a precise picture of the person most likely to book, pay without price objection, refer others, and stay long-term.
          </p>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", background:"var(--border)", border:"1px solid var(--border)", borderRadius:"12px", overflow:"hidden", marginBottom:"24px" }}>
            {[
              ["Primary profile", "Indian woman, 30–45, GTA. Educated. Health-conscious decision-maker for her entire family."],
              ["How she enters", "Through her daughter — teenage acne or menstrual issues. Once the daughter improves, she books for herself. Then the rest of the family follows."],
              ["Core belief", "The medical system has already failed her. She's tried Accutane, birth control, the standard options. She wants root-cause treatment — not symptom suppression."],
              ["Top 3 conditions", "Acne (teens + young women) · Menstrual issues (cramping, irregular cycles) · Menopause (sweating, mood instability)"],
              ["Pricing sensitivity", "When she comes through a referral — zero price objection. She's already sold before she walks in the door."],
              ["Decision dynamic", "She is the household health decision-maker. Her husband defers to her. Earn her trust and you have the whole family."],
            ].map(([label, value]) => (
              <div key={label} style={{ background:"var(--warm-white)", padding:"22px 24px" }}>
                <div style={{ fontSize:"10px", letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--ink-light)", marginBottom:"8px", fontWeight:500 }}>{label}</div>
                <div style={{ fontSize:"14px", color:"var(--ink)", lineHeight:1.55 }}>{value}</div>
              </div>
            ))}
          </div>

          <InsightBox>
            <strong>The strategic implication:</strong> Everything we build should speak to her, in the language she already uses when searching for help. She&apos;s not searching &ldquo;homeopathy&rdquo; — she&apos;s searching &ldquo;why does my daughter keep getting acne after Accutane&rdquo; and &ldquo;natural alternative to birth control for period pain.&rdquo;
          </InsightBox>
        </div>
      </section>

      {/* ── REFERRAL MATH ── */}
      <section className="fade-up" style={{ padding:"72px 40px", background:"var(--cream)" }}>
        <div style={{ maxWidth:"760px", margin:"0 auto" }}>
          <SectionLabel>Why referrals first</SectionLabel>
          <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(28px,3.5vw,38px)", fontWeight:400, lineHeight:1.2, letterSpacing:"-0.01em", marginBottom:"16px" }}>
            The fastest path to <em style={{ fontStyle:"italic", color:"var(--forest-mid)" }}>month-one ROI</em>
          </h2>
          <p style={{ fontSize:"16px", fontWeight:300, color:"var(--ink-mid)", maxWidth:"600px", marginBottom:"36px", lineHeight:1.7 }}>
            You told me that every time you get a Google review, you get busy. That referral clients never question your price. That&apos;s not anecdotal — that&apos;s your highest-leverage channel. And there&apos;s no formal system around it yet.
          </p>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"12px", marginBottom:"20px" }}>
            {[
              ["10","new patients needed per month to cover the investment"],
              ["$200","average first session fee"],
              ["2.5","new patients per week is the only number that matters in month one"],
              ["$400+","average spend when a client comes through a warm referral"],
            ].map(([n, label]) => (
              <div key={n} style={{ background:"var(--warm-white)", border:"1px solid var(--border)", borderRadius:"10px", padding:"20px 16px", textAlign:"center" }}>
                <div style={{ fontFamily:"var(--serif)", fontSize:"30px", fontWeight:500, color:"var(--forest)", lineHeight:1, marginBottom:"8px" }}>{n}</div>
                <div style={{ fontSize:"11px", color:"var(--ink-light)", lineHeight:1.4 }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign:"center", fontSize:"13px", color:"var(--ink-light)", padding:"14px 0", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", marginBottom:"24px" }}>
            10 referral patients × $200 = <strong style={{ color:"var(--forest-mid)" }}>$2,000 — your marketing investment covered in month one.</strong> Everything above that is net growth.
          </div>

          <InsightBox>
            Before we spend a single dollar on ads or content, we mine the list of people who already love you. You have years of patient relationships and zero formal referral mechanism. That changes in week one.
          </InsightBox>
        </div>
      </section>

      {/* ── PHASES ── */}
      <section className="fade-up" style={{ padding:"72px 40px", background:"var(--warm-white)" }}>
        <div style={{ maxWidth:"760px", margin:"0 auto" }}>
          <SectionLabel>The strategy</SectionLabel>
          <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(28px,3.5vw,38px)", fontWeight:400, lineHeight:1.2, letterSpacing:"-0.01em", marginBottom:"16px" }}>
            Three phases. <em style={{ fontStyle:"italic", color:"var(--forest-mid)" }}>One compounding system.</em>
          </h2>
          <p style={{ fontSize:"16px", fontWeight:300, color:"var(--ink-mid)", maxWidth:"600px", marginBottom:"48px", lineHeight:1.7 }}>
            Each phase builds on the previous one. Phase 1 produces revenue and data. Phase 2 converts cold traffic. Phase 3 builds the asset that works forever.
          </p>

          <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
            {[
              {
                tag:"Phase 1", timing:"Months 1–2 · Fastest ROI", dotColor:"var(--gold)",
                title:"Referral Activation + ICA Research",
                desc:"Mine your existing patient base before spending anything on ads or content. Every outreach call produces revenue, referrals, and research data at the same time.",
                items:["Referral program design with incentive structure","Patient list outreach calls","Systematic Google review campaign","Patient survey → ICA profile document","AI SEO quick wins on existing website content","Discovery call booking flow optimization"],
              },
              {
                tag:"Phase 2", timing:"Months 2–3 · Convert cold traffic", dotColor:"var(--forest-mid)",
                title:"Lead Magnet + Nurture Funnel",
                desc:"Use the ICA data from Phase 1 to build the right free resource. Connect it to a short email sequence that leads cold traffic to a 20-minute discovery call — working while you sleep.",
                items:["Lead magnet (e.g. zinc + acne protocol guide)","3–5 email nurture → discovery call CTA","Landing page + opt-in flow","Meta lookalike audience from referral data"],
              },
              {
                tag:"Phase 3", timing:"Months 3–6 · The long game", dotColor:"var(--forest)",
                title:"Content Engine (90-Day Test)",
                desc:"Your knowledge depth — the cases you described, the things you see every day — is extraordinary. If content works, it builds an asset that generates trust and patients indefinitely. The case stories are the videos. You don't need to find topics.",
                items:["1 short video per day · 30s–1min · phone-only","Growth, core + connection framework","Weekly trending topic briefs","Hook + scripting coaching session","Monthly content calendar management","North American diaspora positioning strategy"],
              },
            ].map((phase, i, arr) => (
              <div key={phase.tag} style={{ display:"grid", gridTemplateColumns:"52px 1fr", gap:0 }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingTop:"4px" }}>
                  <div style={{ width:"14px", height:"14px", borderRadius:"50%", background:phase.dotColor, flexShrink:0, marginTop:"4px" }} />
                  {i < arr.length - 1 && <div style={{ width:"1px", flex:1, background:"var(--border)", marginTop:"8px" }} />}
                </div>
                <div style={{ paddingBottom: i < arr.length - 1 ? "40px" : "0" }}>
                  <div style={{ display:"flex", alignItems:"baseline", gap:"12px", marginBottom:"10px" }}>
                    <span style={{ fontSize:"10px", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--ink-light)" }}>{phase.tag}</span>
                    <span style={{ fontSize:"11px", color:"var(--gold)", fontWeight:500, marginLeft:"auto" }}>{phase.timing}</span>
                  </div>
                  <div style={{ fontFamily:"var(--serif)", fontSize:"20px", fontWeight:500, color:"var(--ink)", marginBottom:"8px", lineHeight:1.3 }}>{phase.title}</div>
                  <div style={{ fontSize:"14px", color:"var(--ink-mid)", marginBottom:"14px", lineHeight:1.6 }}>{phase.desc}</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px" }}>
                    {phase.items.map((item) => (
                      <div key={item} style={{ fontSize:"13px", color:"var(--ink-mid)", padding:"8px 12px", background:"var(--cream)", borderRadius:"6px", lineHeight:1.4, display:"flex", gap:"8px", alignItems:"flex-start" }}>
                        <span style={{ color:"var(--gold)", flexShrink:0, fontSize:"12px", marginTop:"1px" }}>→</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI SEO ── */}
      <section className="fade-up" style={{ padding:"72px 40px", background:"var(--cream)" }}>
        <div style={{ maxWidth:"760px", margin:"0 auto" }}>
          <div style={{ background:"var(--ink)", borderRadius:"14px", padding:"36px" }}>
            <span style={{ display:"inline-block", background:"rgba(184,149,74,0.15)", color:"var(--gold-light)", fontSize:"10px", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", padding:"4px 14px", borderRadius:"20px", marginBottom:"18px", border:"1px solid rgba(184,149,74,0.2)" }}>
              Untapped asset
            </span>
            <h3 style={{ fontFamily:"var(--serif)", fontSize:"24px", fontWeight:400, color:"var(--cream)", marginBottom:"12px", lineHeight:1.3 }}>
              Your website is a ChatGPT goldmine — it just needs restructuring
            </h3>
            <p style={{ fontSize:"14px", color:"rgba(248,245,239,0.65)", marginBottom:"24px", lineHeight:1.7 }}>
              You asked about showing up when people search on ChatGPT. The good news: your content-rich website and case study blog are exactly what AI search systems want to cite. ChatGPT, Perplexity, and Google AI Overviews now pull from sites structured to answer questions directly. You already qualify — the content just needs to be formatted the way AI reads it.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
              {[
                "Restructure key pages with conversational Q&A headings — e.g. \"Can homeopathy treat teenage acne without Accutane?\" mirrors how people actually ask ChatGPT",
                "Add FAQ schema markup to service pages so AI systems pull your answers as citation sources",
                "Your case study blog posts are perfect source material — short, specific, outcome-based. Minor reformatting makes them AI-citation ready",
                "Result: someone asking ChatGPT \"natural homeopath for teenage acne Mississauga\" gets your name as the sourced answer",
              ].map((text, i) => (
                <div key={i} style={{ display:"flex", gap:"12px", alignItems:"flex-start", fontSize:"13px", color:"rgba(248,245,239,0.75)", lineHeight:1.55 }}>
                  <div style={{ width:"20px", height:"20px", borderRadius:"50%", background:"rgba(184,149,74,0.2)", color:"var(--gold-light)", fontSize:"11px", fontWeight:500, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"1px" }}>{i+1}</div>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPETITIVE ── */}
      <section className="fade-up" style={{ padding:"72px 40px", background:"var(--warm-white)" }}>
        <div style={{ maxWidth:"760px", margin:"0 auto" }}>
          <SectionLabel>The landscape</SectionLabel>
          <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(28px,3.5vw,38px)", fontWeight:400, lineHeight:1.2, letterSpacing:"-0.01em", marginBottom:"16px" }}>
            Where the <em style={{ fontStyle:"italic", color:"var(--forest-mid)" }}>opportunity lives</em>
          </h2>
          <p style={{ fontSize:"16px", fontWeight:300, color:"var(--ink-mid)", maxWidth:"600px", marginBottom:"36px", lineHeight:1.7 }}>
            The top homeopaths with social presence are either massive in India or building philosophical movements for Western audiences. The diaspora gap in North America is wide open.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"14px", marginBottom:"20px" }}>
            <CompCard name="Dr. Kapil Dev" followers="807K" note="Hindi-language · India-based · Condition-specific Reels. Massive reach — but not your market." />
            <CompCard name="Dr. Rajendra Goyal" followers="481K" note="Hindi-language · India-based · Supplement sales via 1mg. Same story — huge, but not the GTA." />
            <CompCard name="Melissa Kupsch" followers="192K" note="English · Australian · Philosophy-led: quantum physics, myth-busting, homeopathy film, academy, conference. The ceiling — but a completely different angle." highlight />
          </div>
          <div style={{ background:"#fdf3e3", border:"1px solid rgba(184,149,74,0.25)", borderRadius:"10px", padding:"20px 22px", fontSize:"14px", color:"var(--ink-mid)", lineHeight:1.65 }}>
            <strong style={{ color:"var(--ink)" }}>The gap nobody has claimed:</strong> English-language homeopathy content built specifically for the Indian diaspora in North America — results-led, practical, case-based. These families already believe in homeopathy. They just need to know you exist and trust that you can help their daughter. <strong style={{ color:"var(--ink)" }}>That is your lane.</strong>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="fade-up" style={{ padding:"72px 40px", background:"var(--ink)" }}>
        <div style={{ maxWidth:"760px", margin:"0 auto" }}>
          <SectionLabel light>Your investment options</SectionLabel>
          <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(28px,3.5vw,38px)", fontWeight:400, lineHeight:1.2, letterSpacing:"-0.01em", marginBottom:"16px", color:"var(--cream)" }}>
            Two ways to <em style={{ fontStyle:"italic", color:"var(--gold-light)" }}>get started</em>
          </h2>
          <p style={{ fontSize:"16px", fontWeight:300, color:"rgba(248,245,239,0.65)", maxWidth:"600px", marginBottom:"40px", lineHeight:1.7 }}>
            Both options are built for where you are right now — time-constrained, results-focused, and not interested in experiments that take 18 months to pay off.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
            <PricingCard
              badge="Option A · Foundation first"
              name="Referral Activation + Foundation"
              tagline="Fastest path to 14 patients per week. We squeeze the highest-leverage fruit first, build your systems, and generate data for everything that follows."
              price="$2,000"
              term="per month · 3-month minimum"
              features={[
                "Referral program design + incentive structure",
                "Patient list outreach + Google review campaign",
                "ICA research + profile documentation",
                "AI SEO restructuring on existing content",
                "1 lead magnet + 3-email nurture sequence",
                "Discovery call booking flow optimization",
              ]}
              missing={["Content strategy + scripting coaching","Weekly hot topic discovery","Advanced monthly reporting"]}
              note="After 3 months, roll into content management if momentum is there."
            />
            <PricingCard
              badge="Option B · Full partnership"
              name={"Magnetic Content\nEngine"}
              tagline="Everything in Option A, plus the full content system. Built for someone ready to become the go-to homeopath for the Indian diaspora in North America."
              price="$2,995"
              term="per month · 6-month minimum"
              features={[
                "Everything in Option A (months 1–2)",
                "Quarterly content strategy + direction",
                "Weekly hot topic discovery for growth content",
                "Monthly content calendar management",
                "Hook + scripting coaching session (one-time)",
                "Advanced monthly reporting with insights",
                "North American diaspora positioning strategy",
                "Meta lookalike audience build from referral data",
              ]}
              missing={[]}
              note="If content works — and your knowledge depth suggests it will — this builds an asset that generates patients indefinitely."
              featured
            />
          </div>
        </div>
      </section>

      {/* ── NEXT STEPS ── */}
      <section className="fade-up" style={{ padding:"72px 40px", background:"var(--warm-white)" }}>
        <div style={{ maxWidth:"760px", margin:"0 auto" }}>
          <SectionLabel>What happens next</SectionLabel>
          <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(28px,3.5vw,38px)", fontWeight:400, lineHeight:1.2, letterSpacing:"-0.01em", marginBottom:"36px" }}>
            Simple from here
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:"16px", marginBottom:"36px" }}>
            {[
              "Choose the option that fits your goals and current budget.",
              "Sign the service agreement and clear the first invoice.",
              "We schedule a 60-minute onboarding call to map your patient list and set up outreach infrastructure.",
              "By end of week one, your referral program is live and the first patient outreach calls have gone out.",
            ].map((step, i) => (
              <div key={i} style={{ display:"flex", gap:"16px", alignItems:"flex-start", fontSize:"15px", lineHeight:1.5 }}>
                <div style={{ width:"28px", height:"28px", borderRadius:"50%", background:"var(--forest-light)", color:"var(--forest)", fontSize:"12px", fontWeight:500, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"1px" }}>{i+1}</div>
                {step}
              </div>
            ))}
          </div>
          <InsightBox style={{ marginBottom:"40px" }}>
            The only thing I need from you, beyond the financial commitment, is <strong>trust and creative freedom</strong>. When those are present, we build something that works. When they&apos;re not, nobody wins.
          </InsightBox>
          <div style={{ paddingTop:"36px", borderTop:"1px solid var(--border)", display:"flex", alignItems:"flex-start", gap:"16px" }}>
            <div style={{ width:"44px", height:"44px", borderRadius:"50%", background:"var(--forest)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--serif)", fontSize:"16px", fontWeight:600, color:"var(--cream)", flexShrink:0 }}>AC</div>
            <div>
              <div style={{ fontWeight:500, fontSize:"15px", marginBottom:"2px" }}>Abhi Chand</div>
              <div style={{ fontSize:"13px", color:"var(--ink-light)", marginBottom:"2px" }}>Digital Marketing Strategist · Abhi Chand Marketing</div>
              <div style={{ fontSize:"12px", color:"var(--ink-light)" }}>
                <a href="mailto:abhi@abhichand.com" style={{ color:"var(--forest-mid)", textDecoration:"none" }}>abhi@abhichand.com</a>
                {" · "}
                <a href="https://abhichand.com" style={{ color:"var(--forest-mid)", textDecoration:"none" }}>abhichand.com</a>
                {" · +1-647-882-8247"}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background:"var(--ink)", padding:"24px 40px", textAlign:"center", fontSize:"12px", color:"rgba(248,245,239,0.3)" }}>
        Prepared for Hermeet Suri · Homeopathic Plus Centre · May 2026 ·{" "}
        <a href="https://abhichand.com" style={{ color:"rgba(248,245,239,0.4)", textDecoration:"none" }}>abhichand.com</a>
      </footer>

    </main>
  );
}

/* ── SMALL COMPONENTS ── */

function SectionLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{
      fontSize:"10px", fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase",
      color: light ? "var(--gold-light)" : "var(--gold)",
      marginBottom:"14px", display:"flex", alignItems:"center", gap:"10px"
    }}>
      <span style={{ display:"inline-block", width:"18px", height:"1px", background: light ? "var(--gold-light)" : "var(--gold)" }} />
      {children}
    </div>
  );
}

function InsightBox({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background:"var(--forest-light)", borderLeft:"3px solid var(--forest-mid)",
      borderRadius:"0 8px 8px 0", padding:"18px 22px",
      fontSize:"14px", color:"var(--forest)", lineHeight:1.65, ...style
    }}>
      {children}
    </div>
  );
}

function CompCard({ name, followers, note, highlight }: { name: string; followers: string; note: string; highlight?: boolean }) {
  return (
    <div style={{
      border: highlight ? "1.5px solid var(--forest-mid)" : "1px solid var(--border)",
      borderRadius:"10px", padding:"20px",
      background: highlight ? "var(--forest-light)" : "var(--warm-white)"
    }}>
      {highlight && (
        <div style={{ fontSize:"10px", fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:"var(--forest)", background:"rgba(44,74,62,0.1)", padding:"3px 10px", borderRadius:"20px", display:"inline-block", marginBottom:"10px" }}>
          Study this one
        </div>
      )}
      <div style={{ fontWeight:500, fontSize:"14px", marginBottom:"4px", color:"var(--ink)" }}>{name}</div>
      <div style={{ fontFamily:"var(--serif)", fontSize:"24px", color:"var(--forest-mid)", fontWeight:500, marginBottom:"6px" }}>{followers}</div>
      <div style={{ fontSize:"12px", color:"var(--ink-light)", lineHeight:1.5 }}>{note}</div>
    </div>
  );
}

function PricingCard({ badge, name, tagline, price, term, features, missing, note, featured }: {
  badge: string; name: string; tagline: string; price: string; term: string;
  features: string[]; missing: string[]; note: string; featured?: boolean;
}) {
  return (
    <div style={{
      border: featured ? "1.5px solid var(--gold)" : "1px solid rgba(248,245,239,0.15)",
      borderRadius:"14px", padding:"28px",
      background: featured ? "rgba(184,149,74,0.06)" : "rgba(255,255,255,0.04)"
    }}>
      <div style={{
        display:"inline-block", fontSize:"10px", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase",
        padding:"4px 12px", borderRadius:"20px", marginBottom:"16px",
        background: featured ? "rgba(184,149,74,0.2)" : "rgba(248,245,239,0.08)",
        color: featured ? "var(--gold-light)" : "rgba(248,245,239,0.45)"
      }}>{badge}</div>
      <div style={{ fontFamily:"var(--serif)", fontSize:"20px", fontWeight:400, color:"var(--cream)", marginBottom:"8px", lineHeight:1.25, whiteSpace:"pre-line" }}>{name}</div>
      <div style={{ fontSize:"13px", color:"rgba(248,245,239,0.5)", marginBottom:"20px", lineHeight:1.5 }}>{tagline}</div>
      <div style={{ fontFamily:"var(--serif)", fontSize:"34px", fontWeight:500, color: featured ? "var(--gold-light)" : "var(--cream)", lineHeight:1, marginBottom:"4px" }}>{price}</div>
      <div style={{ fontSize:"12px", color:"rgba(248,245,239,0.4)", marginBottom:"22px" }}>{term}</div>
      <div style={{ height:"1px", background:"rgba(248,245,239,0.1)", marginBottom:"20px" }} />
      <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"10px" }}>
        {features.map(f => (
          <li key={f} style={{ fontSize:"13px", color:"rgba(248,245,239,0.75)", display:"flex", gap:"10px", alignItems:"flex-start", lineHeight:1.4 }}>
            <span style={{ color:"var(--gold)", fontWeight:500, flexShrink:0, fontSize:"12px", marginTop:"1px" }}>✓</span>{f}
          </li>
        ))}
        {missing.map(m => (
          <li key={m} style={{ fontSize:"13px", color:"rgba(248,245,239,0.25)", display:"flex", gap:"10px", alignItems:"flex-start", lineHeight:1.4 }}>
            <span style={{ flexShrink:0, fontSize:"12px", marginTop:"1px" }}>—</span>{m}
          </li>
        ))}
      </ul>
      <div style={{ marginTop:"16px", fontSize:"12px", color:"rgba(248,245,239,0.3)", lineHeight:1.5, paddingTop:"14px", borderTop:"1px solid rgba(248,245,239,0.08)" }}>{note}</div>
    </div>
  );
}
