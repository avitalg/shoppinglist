import { describe, it, expect } from "vitest";
import {
  CATEGORIES,
  CATEGORY_BY_ID,
  DEFAULT_CATEGORY,
  detectCategory,
} from "../categories.js";

// ── CATEGORIES structure ──────────────────────────────────────────────────────

describe("CATEGORIES", () => {
  it("contains at least one category", () => {
    expect(CATEGORIES.length).toBeGreaterThan(0);
  });

  it("every category has the required fields", () => {
    for (const cat of CATEGORIES) {
      expect(cat).toHaveProperty("id");
      expect(cat).toHaveProperty("label");
      expect(cat).toHaveProperty("icon");
      expect(cat).toHaveProperty("color");
    }
  });

  it("all ids are unique", () => {
    const ids = CATEGORIES.map(c => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("always includes an 'other' fallback category", () => {
    expect(CATEGORIES.some(c => c.id === "other")).toBe(true);
  });
});

// ── CATEGORY_BY_ID ────────────────────────────────────────────────────────────

describe("CATEGORY_BY_ID", () => {
  it("contains every CATEGORIES id as a key", () => {
    for (const cat of CATEGORIES) {
      expect(CATEGORY_BY_ID[cat.id]).toBeDefined();
    }
  });

  it("maps each id back to the same object", () => {
    for (const cat of CATEGORIES) {
      expect(CATEGORY_BY_ID[cat.id]).toBe(cat);
    }
  });
});

// ── DEFAULT_CATEGORY ──────────────────────────────────────────────────────────

describe("DEFAULT_CATEGORY", () => {
  it("is the 'other' category", () => {
    expect(DEFAULT_CATEGORY.id).toBe("other");
  });
});

// ── detectCategory ────────────────────────────────────────────────────────────

describe("detectCategory", () => {
  it("returns DEFAULT_CATEGORY for an empty string", () => {
    expect(detectCategory("")).toBe(DEFAULT_CATEGORY);
  });

  it("returns DEFAULT_CATEGORY for whitespace only", () => {
    expect(detectCategory("   ")).toBe(DEFAULT_CATEGORY);
  });

  it("returns DEFAULT_CATEGORY for an unknown item", () => {
    expect(detectCategory("xylophone parts")).toBe(DEFAULT_CATEGORY);
  });

  it("is case-insensitive", () => {
    expect(detectCategory("MILK").id).toBe("dairy");
    expect(detectCategory("Milk").id).toBe("dairy");
    expect(detectCategory("milk").id).toBe("dairy");
  });

  // ── Produce
  it("detects apple → produce", () => {
    expect(detectCategory("apple").id).toBe("produce");
  });
  it("detects broccoli → produce", () => {
    expect(detectCategory("broccoli").id).toBe("produce");
  });
  it("detects 'bag of spinach' → produce", () => {
    expect(detectCategory("bag of spinach").id).toBe("produce");
  });

  // ── Meat & Fish
  it("detects chicken → meat", () => {
    expect(detectCategory("chicken breast").id).toBe("meat");
  });
  it("detects salmon → meat", () => {
    expect(detectCategory("salmon fillet").id).toBe("meat");
  });

  // ── Dairy
  it("detects milk → dairy", () => {
    expect(detectCategory("oat milk").id).toBe("dairy");
  });
  it("detects 'sour cream' (multi-word) → dairy", () => {
    expect(detectCategory("sour cream").id).toBe("dairy");
  });
  it("detects 'half and half' (multi-word) → dairy", () => {
    expect(detectCategory("half and half").id).toBe("dairy");
  });

  // ── Bakery
  it("detects bread → bakery", () => {
    expect(detectCategory("whole wheat bread").id).toBe("bakery");
  });
  it("detects croissant → bakery", () => {
    expect(detectCategory("croissant").id).toBe("bakery");
  });

  // ── Pantry
  it("detects pasta → pantry", () => {
    expect(detectCategory("pasta").id).toBe("pantry");
  });
  it("detects 'peanut butter' (multi-word) → pantry", () => {
    expect(detectCategory("peanut butter").id).toBe("pantry");
  });

  // ── Frozen
  it("detects 'ice cream' (multi-word) → frozen", () => {
    expect(detectCategory("ice cream").id).toBe("frozen");
  });
  it("detects frozen → frozen", () => {
    expect(detectCategory("frozen peas").id).toBe("frozen");
  });

  // ── Beverages
  it("detects coffee → beverages", () => {
    expect(detectCategory("coffee beans").id).toBe("beverages");
  });
  it("detects 'sports drink' (multi-word) → beverages", () => {
    expect(detectCategory("sports drink").id).toBe("beverages");
  });

  // ── Snacks
  it("detects chocolate → snacks", () => {
    expect(detectCategory("dark chocolate").id).toBe("snacks");
  });
  it("detects chips → snacks", () => {
    expect(detectCategory("nacho chips").id).toBe("snacks");
  });

  // ── Personal care
  it("detects shampoo → personal", () => {
    expect(detectCategory("shampoo").id).toBe("personal");
  });

  // ── Household
  it("detects detergent → household", () => {
    expect(detectCategory("laundry detergent").id).toBe("household");
  });

  // ── Multi-word beats single-word (longer key wins)
  it("prefers 'ice cream' over 'cream' alone", () => {
    expect(detectCategory("ice cream").id).toBe("frozen");
  });
  it("prefers 'frozen pizza' over 'frozen' alone", () => {
    expect(detectCategory("frozen pizza").id).toBe("frozen");
  });

  // ── Hebrew — ירקות ופירות (produce)
  it("Hebrew: תפוח → produce", () => {
    expect(detectCategory("תפוח").id).toBe("produce");
  });
  it("Hebrew: עגבניה → produce", () => {
    expect(detectCategory("עגבניה").id).toBe("produce");
  });
  it("Hebrew: מלפפון → produce", () => {
    expect(detectCategory("מלפפון").id).toBe("produce");
  });

  // ── Hebrew — בשר ודגים (meat)
  it("Hebrew: עוף → meat", () => {
    expect(detectCategory("עוף").id).toBe("meat");
  });
  it("Hebrew: שניצל → meat", () => {
    expect(detectCategory("שניצל").id).toBe("meat");
  });
  it("Hebrew: סלמון → meat", () => {
    expect(detectCategory("סלמון").id).toBe("meat");
  });

  // ── Hebrew — חלב וביצים (dairy)
  it("Hebrew: חלב → dairy", () => {
    expect(detectCategory("חלב").id).toBe("dairy");
  });
  it("Hebrew: גבינה → dairy", () => {
    expect(detectCategory("גבינה צהובה").id).toBe("dairy");
  });
  it("Hebrew: ביצים → dairy", () => {
    expect(detectCategory("ביצים").id).toBe("dairy");
  });

  // ── Hebrew — מאפים (bakery)
  it("Hebrew: לחם → bakery", () => {
    expect(detectCategory("לחם").id).toBe("bakery");
  });
  it("Hebrew: חלה → bakery", () => {
    expect(detectCategory("חלה").id).toBe("bakery");
  });

  // ── Hebrew — מזווה (pantry)
  it("Hebrew: אורז → pantry", () => {
    expect(detectCategory("אורז").id).toBe("pantry");
  });
  it("Hebrew: שמן זית → pantry", () => {
    expect(detectCategory("שמן זית").id).toBe("pantry");
  });

  // ── Hebrew — קפוא (frozen)
  it("Hebrew: גלידה → frozen", () => {
    expect(detectCategory("גלידה").id).toBe("frozen");
  });
  it("Hebrew: קפוא → frozen", () => {
    expect(detectCategory("ירק קפוא").id).toBe("frozen");
  });

  // ── Hebrew — משקאות (beverages)
  it("Hebrew: מיץ → beverages", () => {
    expect(detectCategory("מיץ").id).toBe("beverages");
  });
  it("Hebrew: קפה → beverages", () => {
    expect(detectCategory("קפה").id).toBe("beverages");
  });

  // ── Hebrew — חטיפים (snacks)
  it("Hebrew: במבה → snacks", () => {
    expect(detectCategory("במבה").id).toBe("snacks");
  });
  it("Hebrew: שוקולד → snacks", () => {
    expect(detectCategory("שוקולד").id).toBe("snacks");
  });

  // ── Hebrew — טיפוח אישי (personal)
  it("Hebrew: שמפו → personal", () => {
    expect(detectCategory("שמפו").id).toBe("personal");
  });

  // ── Hebrew — משק בית (household)
  it("Hebrew: ספוג → household", () => {
    expect(detectCategory("ספוג").id).toBe("household");
  });
  it("Hebrew: נייר טואלט (multi-word) → household", () => {
    expect(detectCategory("נייר טואלט").id).toBe("household");
  });
});
