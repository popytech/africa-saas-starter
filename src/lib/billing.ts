export const plans = [
  {
    id: "free",
    name: "Free",
    priceLabel: "$0",
    features: ["1 workspace", "3 members", "Core dashboard"],
  },
  {
    id: "pro",
    name: "Pro",
    priceLabel: "$19/mo",
    features: ["5 workspaces", "20 members", "Advanced modules"],
  },
  {
    id: "business",
    name: "Business",
    priceLabel: "Custom",
    features: ["Unlimited members", "Priority support", "Custom integrations"],
  },
] as const;

export type PlanId = (typeof plans)[number]["id"];

export function getPlan(id: PlanId) {
  return plans.find((plan) => plan.id === id)!;
}
