/**
 * Supermarket category definitions and keyword-based auto-detection.
 *
 * Each category has:
 *   id       — stable key stored on items in Firestore
 *   label    — display name
 *   icon     — emoji shown in section headers
 *   color    — CSS custom-property name (defined in FamilyCart.css)
 *   keywords — lowercase substrings that map items to this category
 *              (multi-word phrases should be listed alongside single words;
 *               longer phrases win automatically at detection time)
 */

/** @typedef {{ id: string, label: string, icon: string, color: string, keywords: string[] }} Category */

/** @type {Category[]} Ordered as they appear in a typical supermarket layout. */
export const CATEGORIES = [
  {
    id: "produce", label: "Produce", icon: "🥦", color: "--cat-produce",
    keywords: [
      // English
      "apple", "banana", "orange", "grape", "lemon", "lime", "mango", "peach",
      "pear", "plum", "cherry", "berry", "strawberr", "blueberr", "raspberr",
      "watermelon", "melon", "pineapple", "avocado",
      "tomato", "potato", "onion", "garlic", "carrot", "celery", "broccoli",
      "spinach", "lettuce", "cucumber", "pepper", "zucchini", "mushroom",
      "corn", "pea", "bean", "herb", "basil", "cilantro", "parsley", "mint",
      "ginger", "vegetable", "fruit", "salad", "kale", "cabbage",
      // Hebrew — ירקות ופירות
      "אבטיח", "מלון", "ענבים", "תפוח", "בננה", "תפוז", "לימון", "מנגו",
      "אפרסק", "שזיף", "דובדבן", "תות", "אננס", "אבוקדו", "עגבניה",
      "תפוח אדמה", "בצל", "שום", "גזר", "סלרי", "ברוקולי", "תרד", "חסה",
      "מלפפון", "פלפל", "קישוא", "פטריה", "תירס", "אפונה", "שעועית",
      "בזיליקום", "פטרוזיליה", "נענע", "ירק", "פרי", "סלט", "כרוב", "ג'ינג'ר",
    ],
  },
  {
    id: "meat", label: "Meat & Fish", icon: "🥩", color: "--cat-meat",
    keywords: [
      // English
      "chicken", "beef", "pork", "lamb", "turkey", "steak", "ground", "bacon",
      "sausage", "ham", "salami", "deli", "salmon", "tuna", "shrimp", "fish",
      "seafood", "crab", "lobster", "tilapia", "fillet", "meatball", "hotdog", "wing",
      // Hebrew — בשר ודגים
      "עוף", "בשר", "כבש", "הודו", "סטייק", "טחון", "נקניק", "שניצל",
      "סלמון", "טונה", "שרימפס", "דג", "קציצה", "כנף", "צלע", "פילה",
    ],
  },
  {
    id: "dairy", label: "Dairy & Eggs", icon: "🧀", color: "--cat-dairy",
    keywords: [
      // English
      "milk", "cheese", "butter", "cream", "yogurt", "egg",
      "sour cream", "half and half",
      "cheddar", "mozzarella", "parmesan", "brie", "feta",
      "cottage", "ricotta", "ghee", "kefir", "whipped",
      // Hebrew — חלב וביצים
      "חלב", "גבינה", "חמאה", "שמנת", "יוגורט", "ביצה", "ביצים", "קוטג",
      "מוצרלה", "פרמזן", "בולגרית", "צהובה",
    ],
  },
  {
    id: "bakery", label: "Bakery", icon: "🥖", color: "--cat-bakery",
    keywords: [
      // English
      "bread", "roll", "bun", "bagel", "muffin", "croissant", "cake", "cookie",
      "pastry", "pita", "tortilla", "wrap", "baguette", "sourdough", "loaf",
      // Hebrew — מאפים
      "לחם", "פיתה", "בגט", "עוגה", "עוגייה", "קרואסון", "מאפה", "כיכר",
      "לחמניה", "חלה",
    ],
  },
  {
    id: "pantry", label: "Pantry", icon: "🥫", color: "--cat-pantry",
    keywords: [
      // English
      "rice", "pasta", "noodle", "oat", "cereal", "flour", "sugar", "salt",
      "oil", "vinegar", "sauce", "ketchup", "mustard", "mayo", "jam", "honey",
      "peanut butter", "syrup", "spice", "seasoning",
      "can", "canned", "soup", "broth", "stock",
      "lentil", "chickpea", "quinoa", "crackers", "granola",
      "nut", "seed", "almond", "walnut", "cashew", "raisin",
      "dried", "powder", "baking", "yeast",
      // Hebrew — מזווה
      "אורז", "פסטה","פתיתים", "קמח", "סוכר", "מלח", "שמן", "חומץ", "רוטב",
      "קטשופ", "חרדל", "מיונז", "ריבה", "דבש", "חומוס", "עדשים",
      "שיבולת שועל", "דגני בוקר", "שקדים", "אגוז", "צימוקים",
      "מרק", "ציר", "שמרים",
    ],
  },
  {
    id: "frozen", label: "Frozen", icon: "❄️", color: "--cat-frozen",
    keywords: [
      // English
      "frozen", "ice cream", "gelato", "sorbet",
      "frozen pizza", "frozen meal", "frozen vegetable", "frozen fruit",
      "waffle", "popsicle",
      // Hebrew — קפוא
      "קפוא", "גלידה", "ארטיק", "וופל", "פיצה קפואה",
    ],
  },
  {
    id: "beverages", label: "Beverages", icon: "🧃", color: "--cat-beverages",
    keywords: [
      // English
      "water", "juice", "soda", "coffee", "tea", "beer", "wine", "kombucha",
      "smoothie", "lemonade", "sparkling", "energy", "sports drink", "alcohol",
      "espresso", "cocoa",
      // Hebrew — משקאות
      "מים", "מיץ", "קפה", "תה", "בירה", "יין", "לימונדה", "סודה",
      "ספרייט", "קולה", "אספרסו",
    ],
  },
  {
    id: "snacks", label: "Snacks & Sweets", icon: "🍬", color: "--cat-snacks",
    keywords: [
      // English
      "chip", "crisp", "pretzel", "popcorn", "chocolate", "candy", "gummy",
      "snack", "bar", "brownie", "donut", "wafer", "marshmallow",
      // Hebrew — חטיפים וממתקים
      "חטיף", "שוקולד", "סוכרייה", "במבה", "ביסלי", "פופקורן",
      "קרקר", "וופר", "מרשמלו", "גומי", "פרצל",
    ],
  },
  {
    id: "personal", label: "Personal Care", icon: "🧴", color: "--cat-personal",
    keywords: [
      // English
      "shampoo", "conditioner", "soap", "lotion", "toothpaste", "toothbrush",
      "floss", "deodorant", "razor", "sunscreen", "makeup", "lipstick",
      "moisturizer", "perfume", "cologne", "vitamin", "medicine", "bandage", "tissue",
      // Hebrew — טיפוח אישי
      "שמפו", "סבון", "קרם", "דאודורנט",
      "משחת שיניים", "מברשת שיניים", "תחבושת",
      "ויטמין", "תרופה", "קרם הגנה", "טיפוח", "מגבת", "טישו",
    ],
  },
  {
    id: "household", label: "Household", icon: "🧹", color: "--cat-household",
    keywords: [
      // English
      "detergent", "bleach", "sponge", "bag", "foil", "wrap", "paper", "towel",
      "napkin", "toilet", "trash", "candle", "battery", "lightbulb", "cleaner",
      "brush", "mop", "broom", "filter",
      // Hebrew — משק בית
      "אבקת כביסה", "נייר טואלט", "ספוג", "שקית", "נייר כסף", "אשפה",
      "נייר", "נרות", "סוללה", "מטאטא", "מגב", "מנקה", "אקונומיקה", "ווים",
    ],
  },
  {
    id: "other", label: "Other", icon: "🛒", color: "--cat-other",
    keywords: [],
  },
];

/** Quick lookup: id → Category */
export const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));

/** Fallback when no keyword matches. */
export const DEFAULT_CATEGORY = CATEGORY_BY_ID["other"];

/**
 * Built once at module load from CATEGORIES.keywords.
 * Maps lowercase keyword → category id.
 */
const KEYWORD_MAP = Object.fromEntries(
  CATEGORIES.flatMap(cat => cat.keywords.map(kw => [kw, cat.id]))
);

/**
 * Infer the best category for a given item name.
 *
 * Tries multi-word keys first (longest match wins),
 * then single-word prefix matching.
 *
 * @param {string} itemText
 * @returns {Category}
 */
export function detectCategory(itemText) {
  const lower = itemText.toLowerCase().trim();
  if (!lower) return DEFAULT_CATEGORY;

  // Sort keys longest-first so multi-word phrases beat single words
  const keys = Object.keys(KEYWORD_MAP).sort((a, b) => b.length - a.length);

  for (const key of keys) {
    if (lower.includes(key)) {
      return CATEGORY_BY_ID[KEYWORD_MAP[key]] ?? DEFAULT_CATEGORY;
    }
  }

  return DEFAULT_CATEGORY;
}
