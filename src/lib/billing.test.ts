import { describe, expect, it } from "vitest";
import { getPlan, plans } from "./billing";

describe("billing plans", () => {
  it("ships three starter plans", () => {
    expect(plans.map((plan) => plan.id)).toEqual(["free", "pro", "business"]);
  });

  it("resolves a plan by id", () => {
    expect(getPlan("pro").name).toBe("Pro");
  });
});
