import { plans } from "@/lib/billing";

export default function BillingPage() {
  return (
    <section>
      <span className="badge">Provider-neutral billing model</span>
      <h1 style={{ fontSize: 42, marginBottom: 8 }}>Plans</h1>
      <p className="muted">Connect the payment provider that matches your target market and compliance requirements.</p>
      <div className="grid-3" style={{ marginTop: 24 }}>
        {plans.map((plan) => (
          <article className="card" key={plan.id} style={{ padding: 22 }}>
            <h2>{plan.name}</h2>
            <div style={{ fontSize: 34, fontWeight: 800 }}>{plan.priceLabel}</div>
            <ul className="muted" style={{ lineHeight: 1.9, paddingLeft: 20 }}>
              {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
