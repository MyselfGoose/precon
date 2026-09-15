"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Route = "home" | "services" | "trades" | "process" | "who" | "about" | "contact" | "quote" | "privacy" | "terms";

const services = [
  { id: "takeoffs", code: "01 / QUANTITY", title: "Material takeoffs", text: "Measured quantities from your plan set, organized by trade, area and unit so your team can price with confidence.", points: ["Sheet and detail references", "Assemblies and waste factors", "Editable Excel workbook"] },
  { id: "estimates", code: "02 / COST", title: "Cost estimates", text: "Labor, material and equipment pricing built around your market, production rates and the assumptions that actually matter.", points: ["Labor and material breakdown", "Local pricing inputs", "Transparent assumptions"] },
  { id: "budgets", code: "03 / PRECON", title: "Preconstruction budgets", text: "Early numbers that help owners and builders make decisions before the drawings are fully resolved.", points: ["Conceptual and schematic phases", "Alternates and allowances", "Value engineering support"] },
  { id: "bid-support", code: "04 / BID DAY", title: "Bid support", text: "A second set of eyes when the clock is moving fast, from addenda reviews to bid leveling and scope checks.", points: ["Addenda comparison", "Scope gap review", "Bid-day questions"] },
  { id: "drafting", code: "05 / DOCUMENTS", title: "Drafting support", text: "Clear takeoff markups and plan notes that make the work easy to review, communicate and defend.", points: ["Color-coded markups", "Detail callouts", "Clean PDF handoff"] },
];

const trades = [
  ["03", "Concrete", "Footings, slabs, walls and reinforcing"],
  ["04", "Masonry", "CMU, brick, stone and accessories"],
  ["05", "Metals", "Structural and miscellaneous metals"],
  ["06", "Wood & plastics", "Framing, casework and specialties"],
  ["07", "Thermal & moisture", "Roofing, waterproofing and insulation"],
  ["08", "Openings", "Doors, frames, glazing and hardware"],
  ["09", "Finishes", "Drywall, paint, flooring and ceilings"],
  ["10", "Specialties", "Accessories, signage and compartments"],
  ["22", "Plumbing", "Fixtures, piping and equipment"],
  ["23", "HVAC", "Mechanical systems and controls"],
  ["26", "Electrical", "Power, lighting and low voltage"],
  ["32", "Exterior improvements", "Paving, planting and site furnishings"],
];

const faqs = [
  ["How accurate are the estimates?", "Every quantity is tied to a sheet, scale or stated assumption. We document exclusions and waste factors so the basis of every number is clear during bid review."],
  ["What do I need to send?", "A PDF plan set and specifications if you have them, plus the trades you need, project location and bid due date. Addenda can be added as they arrive."],
  ["How long does it take?", "Most single-trade takeoffs are delivered in two to five business days. Rush work is available when the schedule allows, and we tell you the delivery date before work begins."],
  ["How is the work priced?", "Each project gets a flat fee after we review the set. There are no subscriptions, surprise hourly charges or software seats for your team."],
  ["What happens when drawings change?", "Addenda and revisions during the bid period are included in the original engagement. Redesigns or post-award changes are quoted separately."],
];

function Icon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    ruler: "M4 17 17 4l3 3L7 20H4v-3Zm4-7 3 3m1-7 3 3m1-7 3 3",
    layers: "m3 8 9-5 9 5-9 5-9-5Zm0 5 9 5 9-5M3 18l9 5 9-5",
    target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-4h.01",
    arrow: "M5 12h13m-5-5 5 5-5 5",
    check: "m5 12 4 4L19 6",
    building: "M4 21V5l8-3 8 3v16M4 9h16M8 13h2m4 0h2m-8 4h2m4 0h2",
  };
  return <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d={paths[name] ?? paths.ruler} /></svg>;
}

function Blueprint() {
  return <div className="blueprint" aria-label="Architectural estimating drawing illustration">
    <div className="blueprint-top"><span>ESTIMATE / 04-2025</span><span>NOT TO SCALE</span></div>
    <div className="blueprint-plan"><span className="dim dim-a">42&apos; - 0&quot;</span><span className="dim dim-b">28&apos; - 6&quot;</span><i className="wall wall-1" /><i className="wall wall-2" /><i className="wall wall-3" /><i className="wall wall-4" /><b className="room room-a">LIVING</b><b className="room room-b">KITCHEN</b><b className="room room-c">OFFICE</b><span className="callout callout-a">A-204</span><span className="callout callout-b">03 / 12</span></div>
    <div className="blueprint-bottom"><span>PLAN SET / A-101</span><strong>QUANTITY TAKEOFF</strong><span>REV 02</span></div>
  </div>;
}

function Button({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return <a className={`button ${secondary ? "button-secondary" : ""}`} href={href}>{children}<span aria-hidden="true">↗</span></a>;
}

function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <section className="page-header"><div className="container"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lede">{text}</p></div></section>;
}

function Services() {
  return <><PageHeader eyebrow="Services" title="Estimating that keeps the work moving." text="Five ways to turn a plan set into a number your team can use. Pick one service or combine them into a complete preconstruction package." /><section className="section"><div className="container"><div className="service-grid">{services.map((service, i) => <a className="service-card" href={`#services/${service.id}`} key={service.id}><span className="number">0{i + 1}</span><Icon name={i % 2 ? "layers" : "ruler"} /><p className="mono-label">{service.code}</p><h2>{service.title}</h2><p>{service.text}</p><ul>{service.points.map(point => <li key={point}><Icon name="check" />{point}</li>)}</ul><span className="text-link">Explore service <span>→</span></span></a>)}</div></div></section><CTA title="Have a live bid on your desk?" text="Send the set. We will come back with a fixed price and delivery date." /></>;
}

function Trades() {
  return <><PageHeader eyebrow="CSI divisions" title="A sharper takeoff, by trade." text="From concrete to controls, our estimating coverage follows the way construction teams actually scope and buy work." /><section className="section section-muted"><div className="container"><div className="trade-grid">{trades.map(([division, name, text]) => <a href={`#trades/${name.toLowerCase().replaceAll(" ", "-")}`} className="trade-card" key={division}><span className="trade-number">DIV {division}</span><span className="trade-mark">{division}</span><h2>{name}</h2><p>{text}</p><span className="text-link">View scope →</span></a>)}</div></div></section><CTA title="Need several divisions together?" text="We combine every trade into one workbook with a summary tab and one exclusions list." /></>;
}

function Detail({ kind, slug }: { kind: "service" | "trade"; slug: string }) {
  const item = kind === "service" ? services.find(service => service.id === slug) : trades.find(([, name]) => name.toLowerCase().replaceAll(" ", "-") === slug);
  if (!item) return <><PageHeader eyebrow="Not found" title="That scope is not in our library." text="Choose another service or trade, or send us the set and we will scope it with you." /><section className="section"><div className="container"><Button href={kind === "service" ? "#services" : "#trades"}>Back to {kind === "service" ? "services" : "trades"}</Button></div></section></>;
  const title = kind === "service" ? (item as typeof services[number]).title : (item as typeof trades[number])[1];
  const text = kind === "service" ? (item as typeof services[number]).text : (item as typeof trades[number])[2];
  const points = kind === "service" ? (item as typeof services[number]).points : ["Plan and detail references", "Quantity by unit and assembly", "Assumptions and exclusions", "Editable workbook delivery"];
  return <><PageHeader eyebrow={kind === "service" ? "Service detail" : `Division ${(item as string[])[0]}`} title={`${title} estimating and takeoffs.`} text={text} /><section className="section"><div className="container detail-grid"><div><p className="eyebrow">What you receive</p><h2>A number you can review, price and defend.</h2><p className="lede">We measure what is drawn, state what is assumed and organize the result so your team can move straight into pricing.</p><Button href="#quote">Request this scope</Button></div><div className="spec-card">{points.map((point, index) => <div key={point}><span>0{index + 1}</span><strong>{point}</strong><Icon name="check" /></div>)}</div></div></section><CTA title="Need this on a live bid?" text="Send the set and we will confirm scope, price and delivery." /></>;
}

function About() {
  return <><PageHeader eyebrow="About Meridian" title="Estimating is a craft. We treat it that way." text="Meridian exists to give construction teams the capacity of a great estimator without the overhead of adding one to payroll." /><section className="section"><div className="container detail-grid"><div><p className="eyebrow">Our standard</p><h2>Clear work earns trust.</h2></div><div className="stack-copy"><p>We believe an estimate should be useful long after the bid is submitted. That means clean workbooks, traceable quantities and communication that never leaves you guessing.</p><p>We work nationwide, across commercial, multifamily and light industrial projects, alongside the people who know the work best.</p></div></div></section><CTA title="Let us be the extra set of hands." text="Start with one live bid and see what comes back." /></>;
}

function Contact() {
  return <><PageHeader eyebrow="Contact" title="Talk to a real estimator." text="Questions about a scope, a deadline or whether we are the right fit? We are happy to talk it through." /><section className="section"><div className="container contact-grid"><div className="contact-card"><p className="eyebrow">Call</p><h2>(800) 555-0100</h2><p>Monday-Friday, 8am-5pm ET</p></div><div className="contact-card"><p className="eyebrow">Email</p><h2>hello@meridianestimates.com</h2><p>We reply within one business day.</p></div></div></section><CTA title="Ready to send the set?" text="Request a quote and we will get back to you with a clear next step." /></>;
}

function Process() {
  const steps = [["01", "Send your plans", "Upload a PDF set or share a link. Tell us the trades, location and bid date."], ["02", "Get a fixed quote", "We review the set and return a flat price with a delivery date before any work begins."], ["03", "We build the takeoff", "An estimator measures, prices and documents the assumptions behind every line."], ["04", "Review and bid", "You receive an editable workbook and PDF summary, with bid-period addenda included."]];
  return <><PageHeader eyebrow="How it works" title="A clear path from plans to bid day." text="No black box, no surprise invoice. You always know what is happening, what it costs and what you are getting back." /><section className="section"><div className="container"><div className="process-intro"><div><p className="eyebrow">Built for momentum</p><h2>Four steps. No friction.</h2></div><p className="lede">Your project does not need another complicated platform. It needs a dependable estimating partner who can read the set and communicate clearly.</p></div><div className="steps">{steps.map(([num, title, text]) => <div className="step" key={num}><span>{num}</span><Icon name={num === "01" ? "layers" : num === "04" ? "target" : "ruler"} /><h3>{title}</h3><p>{text}</p></div>)}</div><div className="workbook"><div className="workbook-bar"><span>●</span><span>●</span><span>●</span><b>meridian_takeoff.xlsx</b><small>LIVE EXAMPLE</small></div><div className="workbook-tabs"><span>Summary</span><span className="active">Div 03</span><span>Div 04</span><span>Exclusions</span></div><div className="table-wrap"><table><thead><tr><th>Reference</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Notes</th></tr></thead><tbody>{[["A-201 / 3", "Foundation wall - 8 in CMU", "SF", "1,248", "Includes bond beam"], ["S-102 / 1", "Footing - 24 in wide", "LF", "384", "See detail 4/S-502"], ["A-301 / 7", "Control joint", "LF", "96", "At 20 ft o.c."]].map(row => <tr key={row[0]}>{row.map((cell, i) => <td className={i > 2 ? "numeric" : ""} key={cell}>{cell}</td>)}</tr>)}</tbody></table></div><div className="workbook-total"><span>3 line items shown</span><strong>Sheet references included on every line</strong></div></div></div></section></>;
}

function Who() {
  return <><PageHeader eyebrow="Who we serve" title="More capacity, without more headcount." text="We work alongside the people already winning the work: general contractors, specialty subs, suppliers and owners." /><section className="section"><div className="container audience-grid">{[["General contractors", "Keep the pipeline moving when your in-house team is committed to another bid.", "building"], ["Subcontractors", "Get single-trade quantities priced to your own labor rates and production factors.", "ruler"], ["Suppliers & fabricators", "Give your sales team a quantity list pulled directly from the plan set.", "layers"]].map(([title, text, icon]) => <article className="audience-card" key={title}><Icon name={icon} /><h2>{title}</h2><p>{text}</p><Button href="#quote" secondary>Talk to an estimator</Button></article>)}</div></section><CTA title="Your next bid starts with a plan set." text="Tell us what you need measured and when you need it." /></>;
}

function Quote() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  if (sent) return <><PageHeader eyebrow="Request received" title="You are on the list for a fast reply." text="Thanks for sending the details. An estimator will review your scope and come back with a fixed price and delivery date." /><section className="section"><div className="container success-card"><Icon name="check" /><h2>We have your request.</h2><p>For urgent bid deadlines, call <a href="tel:+18005550100">(800) 555-0100</a>.</p><Button href="#/">Back to home</Button></div></section></>;
  return <><PageHeader eyebrow="Start a project" title="Let us take the estimate off your plate." text="Share the basics below. We will review the set and reply with a fixed fee, delivery date and any questions before work begins." /><section className="section"><div className="container form-layout"><form className="quote-form" onSubmit={submit}><div className="field-row"><label>Full name<input required name="name" placeholder="Your name" /></label><label>Work email<input required type="email" name="email" placeholder="you@company.com" /></label></div><div className="field-row"><label>Company<input name="company" placeholder="Company name" /></label><label>Bid due date<input required type="date" name="date" /></label></div><label>What do you need?<select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Material takeoff</option><option>Cost estimate</option><option>Preconstruction budget</option><option>Bid support</option></select></label><label>Project notes<textarea name="notes" rows={5} placeholder="Tell us about the project, trades and anything we should know." /></label><label className="upload"><span><strong>Drop your plan set here</strong><small>PDF, DWG or share a link after submitting</small></span><input type="file" accept=".pdf,.dwg" /></label><label className="checkbox"><input required type="checkbox" /> <span>I agree to be contacted about this quote request.</span></label><button className="button" type="submit">Request a quote <span>↗</span></button><p className="form-note">Your plan sets are treated as confidential. We do not sell or share your information.</p></form><aside className="form-aside"><p className="eyebrow">What happens next</p><ol><li><b>We review the set</b><span>Usually the same business day.</span></li><li><b>You get a fixed quote</b><span>Price and delivery date, in writing.</span></li><li><b>We get to work</b><span>Only after you approve the scope.</span></li></ol><div className="aside-contact"><span>Prefer to talk?</span><a href="tel:+18005550100">(800) 555-0100</a><a href="mailto:hello@meridianestimates.com">hello@meridianestimates.com</a></div></aside></div></section></>;
}

function Legal({ terms = false }: { terms?: boolean }) {
  const title = terms ? "Terms & Conditions" : "Privacy policy";
  return <><PageHeader eyebrow="Legal" title={title} text={terms ? "The terms under which Meridian Estimating provides estimating and takeoff services." : "How Meridian Estimating handles information, project documents and communications."} /><section className="section"><div className="container legal"><p className="mono-label">EFFECTIVE DATE: SEPTEMBER 2025 · WORKING DRAFT</p>{(terms ? ["Acceptance", "Services and quotes", "Client responsibilities", "Nature of estimates - no guarantee", "Revisions and addenda", "Fees and payment", "Confidentiality", "Intellectual property", "Limitation of liability", "General"] : ["Who we are", "Information we collect", "How we use information", "Plan sets and project documents", "How we share information", "Cookies and analytics", "Data retention", "Your rights", "Security", "Contact"]).map((heading, i) => <section key={heading}><h2>{i + 1}. {heading}</h2><p>{terms ? "Each engagement begins with a written quote stating scope, price and delivery date. Work begins only after approval in writing. Estimates are professional opinions based on the documents provided and the assumptions stated in the deliverable; they are not guarantees of actual quantities, costs or project outcomes." : "We collect only the information needed to respond to quote requests, produce estimates, communicate about projects and improve our services. Drawings, specifications and pricing you send are confidential business information and are used only for the services you request."}</p></section>)}</div></section></>;
}

function CTA({ title, text }: { title: string; text: string }) {
  return <section className="cta"><div className="container cta-inner"><div><p className="eyebrow">Ready when you are</p><h2>{title}</h2><p>{text}</p></div><Button href="#quote">Request a quote</Button></div></section>;
}

function Home() {
  return <><section className="hero"><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow">Construction estimating · Nationwide</p><h1>Bid more work without hiring an estimator.</h1><p className="lede">Material takeoffs and cost estimates for contractors across the United States. Send us your plans - get a bid-ready package back.</p><div className="button-row"><Button href="#quote">Upload your plans</Button><Button href="#process" secondary>See how it works</Button></div><div className="hero-meta"><span>QUOTE BACK IN 24 HRS</span><span>EXCEL + PDF</span><span>12 DIVISIONS</span></div></div><Blueprint /></div></section><section className="container stat-strip"><div><strong>24 hrs</strong><span>Quote turnaround</span></div><div><strong>2-5 days</strong><span>Typical delivery</span></div><div><strong>12</strong><span>Divisions covered</span></div><div><strong>100%</strong><span>Editable output</span></div></section><section className="section"><div className="container"><div className="section-heading"><div><p className="eyebrow">Why contractors outsource</p><h2>The estimate is not the bottleneck. Time is.</h2></div><p className="lede">A dependable estimating partner gives your team back the hours it needs to sell, build and win the next job.</p></div><div className="reason-grid">{[["No salary or software seats", "Pay per project, quoted before we start. Keep your fixed costs focused on the work that wins revenue.", "target"], ["More bids out the door", "Your hit rate is only half the equation. Increase bid volume without stretching your team thin.", "arrow"], ["Quantities you can defend", "Every line is tied to a sheet and a scale, with assumptions and exclusions stated up front.", "check"]].map(([title, text, icon]) => <article key={title}><Icon name={icon} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section><section className="section section-muted"><div className="container"><div className="section-heading"><div><p className="eyebrow">The deliverable</p><h2>Numbers your team can actually use.</h2></div><p className="lede">Not a summary number. A line-item workbook you can open, edit and hand to a project manager.</p></div><div className="deliverable-grid"><div className="deliverable-list">{services.slice(0, 3).map((service, i) => <div key={service.id}><span>0{i + 1}</span><div><h3>{service.title}</h3><p>{service.text}</p></div></div>)}</div><Blueprint /></div></div></section><section className="section"><div className="container"><div className="section-heading"><div><p className="eyebrow">Across the job</p><h2>Estimating by division.</h2></div><Button href="#trades" secondary>See all trades</Button></div><div className="trade-grid trade-grid-home">{trades.slice(0, 6).map(([division, name, text]) => <a href={`#trades/${name.toLowerCase().replaceAll(" ", "-")}`} className="trade-card" key={division}><span className="trade-number">DIV {division}</span><span className="trade-mark">{division}</span><h2>{name}</h2><p>{text}</p><span className="text-link">View scope →</span></a>)}</div></div></section><section className="section section-muted"><div className="container faq-section"><div className="section-heading"><div><p className="eyebrow">Common questions</p><h2>Before you send a set.</h2></div><p className="lede">A few answers before your first request.</p></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section><CTA title="Have a bid due this week?" text="Send the set. We will tell you what it costs and when you will have it." /></>;
}

function App() {
  const [hash, setHash] = useState(typeof window === "undefined" ? "" : window.location.hash);
  useEffect(() => { const onHash = () => setHash(window.location.hash); window.addEventListener("hashchange", onHash); return () => window.removeEventListener("hashchange", onHash); }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [hash]);
  const parts = useMemo(() => hash.replace(/^#\/?/, "").split("/").filter(Boolean), [hash]);
  const route = (parts[0] || "home") as Route;
  const page = route === "services" && parts[1] ? <Detail kind="service" slug={parts[1]} /> : route === "services" ? <Services /> : route === "trades" && parts[1] ? <Detail kind="trade" slug={parts[1]} /> : route === "trades" ? <Trades /> : route === "process" ? <Process /> : route === "who" ? <Who /> : route === "about" ? <About /> : route === "contact" ? <Contact /> : route === "quote" ? <Quote /> : route === "privacy" ? <Legal /> : route === "terms" ? <Legal terms /> : <Home />;
  return <>{page}</>;
}

export default App;
