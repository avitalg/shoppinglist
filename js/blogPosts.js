import { SITE } from "./seoPages.js";

/** @typedef {{ q: string, a: string }} BlogFaq */
/** @typedef {{ href: string, label: string }} BlogLink */
/** @typedef {{ headers: string[], rows: string[][] }} BlogTable */
/** @typedef {{ h2: string, id?: string, callout?: boolean, paragraphs?: string[], items?: string[], table?: BlogTable, note?: string, after?: string[], faqs?: BlogFaq[], links?: BlogLink[] }} BlogSection */
/** @typedef {{
 *   title: string,
 *   description: string,
 *   h1: string,
 *   lead: string,
 *   publishedLabel: string,
 *   sections: BlogSection[],
 *   cta: string,
 * }} BlogLocale */

/**
 * @typedef {{
 *   slug: string,
 *   path: string,
 *   date: string,
 *   en: BlogLocale,
 *   he: BlogLocale,
 * }} BlogPost
 */

/** @type {BlogPost[]} */
export const BLOG_POSTS = [
  {
    slug: "grocery-shopping-tips",
    path: "/blog/grocery-shopping-tips",
    date: "2026-10-21",
    en: {
      title: "Grocery Shopping Tips: 15 Smart Ways to Spend Less in 2026",
      description:
        "15 grocery shopping tips that cut your bill without cutting good food: plan smarter, read unit prices, beat store tricks, and waste less. Free checklist.",
      h1: "15 Grocery Shopping Tips to Spend Less and Eat Better",
      lead:
        "Your grocery bill is one of the few big expenses you control every single week. The right grocery shopping tips won't have you clipping coupons for hours or living on rice and beans. They give you a simple system: plan before you go, shop with a few rules in the store, and waste less once you're home.",
      publishedLabel: "Published October 21, 2026",
      sections: [
        {
          h2: "Quick answer",
          id: "quick-answer",
          callout: true,
          paragraphs: [
            "The most effective grocery shopping tips are to plan meals around what you already have, shop with a list and a budget, compare unit prices, choose store brands and seasonal or frozen produce, avoid shopping hungry, and use up leftovers.",
          ],
        },
        {
          h2: "On this page",
          links: [
            { href: "#before", label: "Before you shop" },
            { href: "#budget", label: "Grocery shopping on a budget" },
            { href: "#store", label: "In the store" },
            { href: "#after", label: "After you shop" },
            { href: "#checklist", label: "Grocery shopping tips checklist" },
            { href: "#faq", label: "Frequently asked questions" },
          ],
        },
        {
          h2: "Why it pays to shop smarter in 2026",
          paragraphs: [
            "Grocery prices are still climbing, just unevenly. USDA's Economic Research Service expects food-at-home prices to rise about 2.4% in 2026, but the averages hide big swings by aisle. Eggs are forecast to fall roughly 29%, dairy is nearly flat, and fats and oils are slightly cheaper. Sugar and sweets, fresh vegetables, and seafood are all up close to 6%.",
            "These figures are a U.S. forecast in dollars, reported in October 2026 from USDA ERS. They are not Israeli shelf prices. The takeaway still travels: smart grocery shopping in 2026 is less about cutting everything and more about knowing which aisles moved and adjusting the cart.",
          ],
        },
        {
          h2: "Before you shop: how to save money on groceries",
          id: "before",
          paragraphs: [
            "Most of the savings happen before you leave the house. A meal plan, a list, and a look through the kitchen stop the duplicate jar and the extra trip.",
          ],
        },
        {
          h2: "1. Shop your kitchen first",
          paragraphs: [
            "Before writing a single item down, check the fridge, freezer, and pantry. Build two or three of the week's meals around what needs using up. This is the fastest way to stop buying a third jar of cumin or a duplicate bag of pasta.",
            "Open the fridge first, then the freezer, then the pantry. Note anything that expires in the next few days and give it a job: spinach into a pasta, leftover chicken into a soup, yogurt into breakfast. Those meals come off the list before you add anything new.",
          ],
        },
        {
          h2: "2. How to make a grocery list",
          paragraphs: [
            "Plan dinners for the week, plus easy breakfasts and lunches. Then write the list grouped by store section: produce, dairy, meat, pantry, frozen. A grouped list keeps you moving and makes it harder to wander. Leave one line for a treat so the list feels realistic, not punishing.",
            "Write the list from the meal plan, not from memory while you walk the aisles. If breakfast is oats and lunch is leftovers, those ingredients are already decided. The list is only the gap between that plan and what is already at home.",
          ],
        },
        {
          h2: "3. Grocery shopping on a budget",
          id: "budget",
          paragraphs: [
            "Look at the last four weeks of grocery spending and set a target a little below the average. Writing the number at the top of the list changes how you shop. If you are grocery shopping on a budget for a family, note each trip so you can see where the money goes.",
          ],
        },
        {
          h2: "4. Know your buy prices",
          paragraphs: [
            "Pick 10 to 15 items you buy constantly, such as chicken, coffee, olive oil, and cereal, and note a price you consider a good deal. When one of them hits that price, stock up. When it doesn't, buy only what you need this week.",
          ],
        },
        {
          h2: "5. Check flyers and your store's app",
          paragraphs: [
            "Spend five minutes with the weekly ad and digital coupons before you go. Load offers to your loyalty app, then adjust the meal plan to match what is on sale, not the other way around.",
          ],
        },
        {
          h2: "In the store: beat the traps",
          id: "store",
          paragraphs: [
            "The store is designed to slow you down. A few rules keep the cart close to the list.",
          ],
        },
        {
          h2: "6. Never shop hungry",
          paragraphs: [
            "Hunger makes everything look essential, and rushing makes you grab convenience items at a premium. Eat a snack before you go, and shop when you have about 30 calm minutes.",
          ],
        },
        {
          h2: "7. Unit price comparison",
          paragraphs: [
            "The shelf label shows a price per ounce, pound, liter, or count. Use it every time. Family size and two-for deals are often not the cheapest option per unit. This one habit catches more overspending than any coupon.",
            "Do the comparison in the aisle, not in your head later. A 500 gram box at $4 is 80 cents per 100 grams. A 1 kilogram box at $7 is 70 cents. The bigger box wins only if you will finish it. If half will stale, the smaller box is the cheaper meal.",
          ],
        },
        {
          h2: "8. Choose store brands",
          paragraphs: [
            "Store-brand staples such as flour, sugar, canned tomatoes, spices, frozen vegetables, and cleaning supplies are often made to the same standard as name brands for less money. Try one store brand each trip and keep the ones you like.",
            "Start with items where the brand is mostly the package: canned tomatoes, oats, frozen peas, sugar, and dish soap. If the family likes them, that swap stays. If a name-brand coffee or yogurt is the one everyone actually eats, keep that one and save somewhere else.",
          ],
        },
        {
          h2: "9. Look high and low",
          paragraphs: [
            "The most expensive brands usually sit at eye level. Glance at the top and bottom shelves, where cheaper and store-brand products often live. Be skeptical of end-of-aisle displays too: they are prime placement, not always a discount.",
          ],
        },
        {
          h2: "10. Go frozen, canned, and seasonal for produce",
          paragraphs: [
            "With fresh vegetable prices rising faster than the average this year, frozen and canned produce are smart swaps. They are packed ripe, last for months, and cut food waste. For fresh produce, buy what is in season. In a U.S. fall that means apples, pears, squash, sweet potatoes, and cabbage.",
            "Use frozen vegetables in soups, stews, and fried rice, where texture matters less than in a raw salad. Keep one fresh item you will eat in the next two days, and let the freezer cover the rest of the week. That split is often cheaper than a cart of fresh produce that wilts.",
          ],
        },
        {
          h2: "11. Lean on cheaper proteins",
          paragraphs: [
            "Build some meals around the proteins whose prices are falling or holding steady this year: eggs, dairy, beans, lentils, canned tuna, and chicken thighs. They stretch a budget further than beef or seafood. Two or three meatless dinners a week add up.",
            "A pot of lentils or chickpeas can be the meal, or it can stretch a smaller amount of meat through a sauce. Eggs cover breakfast and a fast dinner. You do not have to drop beef entirely. You only need it off the default.",
          ],
        },
        {
          h2: "12. Buy in bulk only what you'll use",
          paragraphs: [
            "Bulk buying saves money on shelf-stable items you use constantly: rice, oats, dried beans, frozen chicken, toilet paper. It costs money when the extra spoils. Ask whether you will finish it before it goes bad.",
            "A good bulk buy has a low unit price and a place to store it. A bad one is a giant pack of berries or bread because it looked cheaper per unit and then molded. If you cannot name the meals that will use it, leave it.",
          ],
        },
        {
          h2: "13. Skip pre-cut and pre-made when you can",
          paragraphs: [
            "Pre-chopped vegetables, shredded cheese, marinated meats, and salad kits carry a convenience markup. If time matters more than money this week, that is a fair trade. If not, five minutes with a knife saves a few dollars every trip.",
          ],
        },
        {
          h2: "After you shop: waste less",
          id: "after",
          paragraphs: [
            "The bill is not finished at the checkout. Food that gets eaten is the food you actually paid for.",
          ],
        },
        {
          h2: "14. Store food so it lasts",
          paragraphs: [
            "Put new groceries behind older ones so the older items get used first. Freeze bread, meat, and ripe bananas you will not get to in time. Wash and prep produce soon after shopping so it is ready to grab, not forgotten.",
          ],
        },
        {
          h2: "15. Plan a leftovers night and track what you toss",
          paragraphs: [
            "Make one night a week a use-it-up night: fried rice, frittatas, soups, and grain bowls take almost anything. For two weeks, jot down what you throw away. You will see which items to buy less of next time.",
            "The toss list is more useful than a vague promise to waste less. If salad greens show up twice, buy a smaller bag or switch that meal to frozen spinach. If bread shows up, freeze half the loaf the day you shop.",
          ],
        },
        {
          h2: "Your grocery shopping tips checklist",
          id: "checklist",
          items: [
            "Checked the fridge, freezer, and pantry",
            "Planned meals for the week",
            "Wrote a list grouped by store section",
            "Set a budget for this trip",
            "Loaded coupons and checked the weekly ad",
            "Ate before leaving",
            "Compared unit prices in the store",
            "Tried at least one store-brand swap",
            "Put new groceries behind older ones at home",
          ],
        },
        {
          h2: "Frequently asked questions",
          id: "faq",
          faqs: [
            {
              q: "How can I save money on groceries fast?",
              a: "Start with a meal plan built around what you already own, shop with a list and a set budget, and compare unit prices. Those three habits deliver the biggest savings in the first week.",
            },
            {
              q: "How do I make a grocery list that actually works?",
              a: "Write it from the meal plan, not from memory, and group items by store section. Keep a running list so you add a staple the moment it runs low.",
            },
            {
              q: "Is it cheaper to buy frozen vegetables than fresh?",
              a: "Often, yes, especially out of season. Frozen vegetables are nutritionally close to fresh and create less waste because they keep for months.",
            },
            {
              q: "How often should you go grocery shopping?",
              a: "Once a week works best for most households. Fewer trips mean fewer impulse buys, with one short midweek stop for milk or fresh produce if you need it.",
            },
            {
              q: "Are store brands as good as name brands?",
              a: "For many staples they are very close in quality. Test them one item at a time and keep the swaps that pass your taste test.",
            },
            {
              q: "How do I stick to grocery shopping on a budget?",
              a: "Put the week's number at the top of the list, shop from that list, and review what you tossed. Grocery shopping on a budget gets easier once the number is visible before you walk in.",
            },
          ],
        },
        {
          h2: "The bottom line",
          paragraphs: [
            "Smart grocery shopping is a system, not a sacrifice. Plan before you go, follow a few rules in the store, and make sure what you buy gets eaten. Start with three tips this week: shop the kitchen, make a list, and check unit prices. Add the rest as they become habits.",
          ],
          links: [
            { href: "/blog/grocery-list-for-the-week", label: "Weekly grocery list" },
            { href: "/blog/weekly-basics", label: "Pantry staples for the week" },
            { href: "/blog/top-7-groceries-every-week", label: "Seven groceries to buy every week" },
            { href: "/blog/shared-grocery-list-for-families", label: "Free shared grocery list for families" },
          ],
        },
        {
          h2: "Sources",
          paragraphs: [
            "Price figures above are the USDA Economic Research Service 2026 food-at-home forecast, as reported in October 2026.",
          ],
          links: [
            { href: "https://www.ers.usda.gov/data-products/food-price-outlook/", label: "USDA ERS Food Price Outlook" },
          ],
        },
      ],
      cta: "Create a free shared grocery list",
    },
    he: {
      title: "טיפים לקניות בסופר: 15 דרכים לחסוך ב־2026",
      description:
        "15 טיפים לקניות שמקטינים את החשבון בלי לוותר על אוכל טוב: תכנון, מחיר ליחידה, פחות בזבוז, ורשימת בדיקה.",
      h1: "15 טיפים לקניות בסופר: להוציא פחות ולאכול טוב",
      lead:
        "חשבון הסופר הוא אחת ההוצאות הגדולות שאפשר לשלוט בהן כל שבוע. טיפים לקניות בסופר לא דורשים לגזור קופונים שעות או לחיות על אורז. הם נותנים שיטה פשוטה: לתכנן לפני שיוצאים, כמה כללים בחנות, ופחות בזבוז בבית.",
      publishedLabel: "פורסם ב־21 באוקטובר 2026",
      sections: [
        {
          h2: "תשובה קצרה",
          id: "quick-answer",
          callout: true,
          paragraphs: [
            "הטיפים שעובדים: לבנות ארוחות ממה שכבר יש, לקנות עם רשימה ותקציב, להשוות מחיר ליחידה, לבחור מותג של הרשת ותוצרת עונתית או קפואה, לא לקנות רעבים, ולנצל שאריות.",
          ],
        },
        {
          h2: "בעמוד הזה",
          links: [
            { href: "#before", label: "לפני הקנייה" },
            { href: "#budget", label: "קניות בתקציב" },
            { href: "#store", label: "בחנות" },
            { href: "#after", label: "אחרי הקנייה" },
            { href: "#checklist", label: "רשימת בדיקה" },
            { href: "#faq", label: "שאלות נפוצות" },
          ],
        },
        {
          h2: "למה שווה לקנות חכם יותר ב־2026",
          paragraphs: [
            "מחירי המזון עדיין עולים, אבל לא באופן אחיד. שירות המחקר הכלכלי של משרד החקלאות האמריקאי צופה עלייה של כ־2.4% במחירי מזון לבית ב־2026, והממוצע מסתיר פערים בין מחלקות. ביצים צפויות לרדת בכ־29%, מוצרי חלב כמעט יציבים, ושמנים מעט זולים יותר. סוכר וממתקים, ירקות טריים ופירות ים עולים קרוב ל־6%.",
            "אלה תחזיות אמריקאיות בדולרים, כפי שדווחו באוקטובר 2026. אלה לא מחירי מדף בישראל. העיקרון כן רלוונטי: קנייה חכמה היא לא לחתוך הכול, אלא לדעת אילו מחלקות זזו ולהתאים את העגלה.",
          ],
        },
        {
          h2: "לפני הקנייה: איך לחסוך בסופר",
          id: "before",
          paragraphs: [
            "רוב החיסכון קורה לפני שיוצאים מהבית. תכנון ארוחות, רשימה, ומבט במטבח עוצרים את הצנצנת הכפולה ואת הנסיעה המיותרת.",
          ],
        },
        {
          h2: "1. קודם בודקים מה יש בבית",
          paragraphs: [
            "לפני שכותבים פריט אחד, בודקים מקרר, מקפיא ומזווה. בונים שתיים או שלוש ארוחות סביב מה שצריך להיגמר. זו הדרך המהירה להפסיק לקנות צנצנת שלישית של כמון או שקית נוספת של פסטה.",
            "פותחים קודם את המקרר, אחר כך את המקפיא, ולבסוף את המזווה. כל מה שפג תוקף בימים הקרובים מקבל תפקיד: תרד לפסטה, עוף שנשאר למרק, יוגורט לארוחת בוקר. הארוחות האלה יורדות מהרשימה לפני שמוסיפים משהו חדש.",
          ],
        },
        {
          h2: "2. איך בונים רשימת קניות",
          paragraphs: [
            "מתכננים ארוחות ערב לשבוע, ועוד ארוחות בוקר וצהריים פשוטות. אחר כך כותבים את הרשימה לפי מחלקה: ירקות, חלב, בשר, מזווה, קפוא. רשימה מקובצת מונעת שיטוט. משאירים שורה אחת לפינוק כדי שהרשימה תהיה מציאותית.",
            "כותבים את הרשימה מתכנון הארוחות, לא מהזיכרון במעבר. אם ארוחת הבוקר היא שיבולת שועל והצהריים הם שאריות, המצרכים כבר נקבעו. הרשימה היא רק הפער בין התכנון למה שכבר יש בבית.",
          ],
        },
        {
          h2: "3. קניות בסופר לפי תקציב",
          id: "budget",
          paragraphs: [
            "מסתכלים על ארבעת השבועות האחרונים וקובעים יעד קצת מתחת לממוצע. מספר בראש הרשימה משנה את איך שקונים. אם קונים למשפחה לפי תקציב, רושמים כל סיבוב כדי לראות לאן הכסף הולך.",
          ],
        },
        {
          h2: "4. יודעים מה מחיר טוב",
          paragraphs: [
            "בוחרים 10 עד 15 מוצרים שקונים כל הזמן, כמו עוף, קפה, שמן זית ודגני בוקר, ורושמים מחיר שנחשב עסקה. כשאחד מהם מגיע למחיר, ממלאים. כשלא, קונים רק את מה שצריך השבוע.",
          ],
        },
        {
          h2: "5. בודקים מבצעים ואפליקציית הרשת",
          paragraphs: [
            "חמש דקות על המבצע השבועי והקופונים הדיגיטליים לפני שיוצאים. טוענים הטבות לכרטיס המועדון, ומתאימים את תכנון הארוחות למה שבמבצע, לא להפך.",
          ],
        },
        {
          h2: "בחנות: לא ליפול למלכודות",
          id: "store",
          paragraphs: [
            "החנות בנויה להאט אתכם. כמה כללים שומרים את העגלה קרובה לרשימה.",
          ],
        },
        {
          h2: "6. לא קונים רעבים",
          paragraphs: [
            "רעב גורם להכול להיראות הכרחי, וחיפזון גורם לתפוס מוצרי נוחות במחיר גבוה. אוכלים משהו קטן לפני שיוצאים, וקונים כשיש בערך 30 דקות רגועות.",
          ],
        },
        {
          h2: "7. משווים מחיר ליחידה",
          paragraphs: [
            "המדף מציג מחיר ל־100 גרם, לקילו, לליטר או ליחידה. משתמשים בו כל פעם. אריזה משפחתית ומבצע «שניים ב־» הם לא תמיד הזולים ביותר ליחידה. ההרגל הזה תופס יותר בזבוז מכל קופון.",
            "משווים במעבר, לא אחר כך בראש. קופסה של 500 גרם ב־15 ש״ח היא 3 ש״ח ל־100 גרם. קופסה של קילו ב־26 ש״ח היא 2.60 ש״ח. הגדולה זולה יותר רק אם באמת מסיימים אותה. אם חצי יתייבש, הקטנה היא הארוחה הזולה.",
          ],
        },
        {
          h2: "8. בוחרים מותג של הרשת",
          paragraphs: [
            "מוצרי בסיס של הרשת, כמו קמח, סוכר, עגבניות מקופסה, תבלינים, ירקות קפואים וחומרי ניקיון, לרוב עומדים באותו סטנדרט במחיר נמוך יותר. מנסים מוצר אחד בכל סיבוב ומשאירים את מה שטעים.",
            "מתחילים ממוצרים שהמותג הוא בעיקר האריזה: עגבניות מקופסה, שיבולת שועל, אפונה קפואה, סוכר וסבון כלים. אם המשפחה אוהבת, ההחלפה נשארת. אם קפה או יוגורט של מותג מסוים הם מה שכולם באמת אוכלים, משאירים אותם וחוסכים במקום אחר.",
          ],
        },
        {
          h2: "9. מסתכלים למעלה ולמטה",
          paragraphs: [
            "המותגים היקרים בדרך כלל בגובה העיניים. שווה להציץ במדף העליון ובתחתון, שם יושבים לרוב המוצרים הזולים יותר. גם קצוות המעבר הם מיקום בולט, לא תמיד הנחה.",
          ],
        },
        {
          h2: "10. קפוא, שימורים ועונתי לירקות ופירות",
          paragraphs: [
            "כשמחירי הירקות הטריים עולים מהר מהממוצע, קפוא ושימורים הם החלפה חכמה. הם נארזים בשלים, נשמרים חודשים, ומקטינים בזבוז. בטרי, קונים מה שבעונה.",
            "ירקות קפואים נכנסים למרק, לתבשיל ולאורז מטוגן, במקומות שהמרקם פחות חשוב מסלט חי. משאירים פריט טרי אחד שייאכל ביומיים הקרובים, והמקפיא מכסה את שאר השבוע. החלוקה הזו לרוב זולה יותר מעגלה של ירקות טריים שנובלים.",
          ],
        },
        {
          h2: "11. נשענים על חלבונים זולים יותר",
          paragraphs: [
            "בונים חלק מהארוחות סביב חלבונים שמחירם יורד או יציב: ביצים, מוצרי חלב, שעועית, עדשים, טונה וירכיים של עוף. הם מותחים תקציב יותר מבקר או דגים. שתיים או שלוש ארוחות בלי בשר בשבוע מצטברות.",
            "סיר עדשים או חומוס יכול להיות הארוחה, או למתוח כמות קטנה יותר של בשר ברוטב. ביצים מכסות ארוחת בוקר וארוחת ערב מהירה. לא חייבים לוותר על בקר. רק לא צריך שהוא יהיה ברירת המחדל.",
          ],
        },
        {
          h2: "12. קונים בכמות רק מה שבאמת נגמר",
          paragraphs: [
            "קנייה בכמות חוסכת על מוצרים יבשים שמשתמשים בהם כל הזמן: אורז, שיבולת שועל, שעועית יבשה, עוף קפוא, נייר טואלט. היא עולה כסף כשהעודף מתקלקל. שואלים אם נסיים את זה לפני שיתקלקל.",
            "קנייה טובה בכמות היא מחיר נמוך ליחידה ומקום לאחסן. קנייה גרועה היא מגש ענק של פירות יער או לחם כי נראה זול ליחידה ואז התעפש. אם אי אפשר לנקוב בארוחות שישתמשו בזה, משאירים על המדף.",
          ],
        },
        {
          h2: "13. מוותרים על חתוך ומוכן כשאפשר",
          paragraphs: [
            "ירקות חתוכים, גבינה מגוררת, בשר במרינדה וערכות סלט נושאים תוספת נוחות. אם השבוע הזמן חשוב מהכסף, זו עסקה הוגנת. אם לא, חמש דקות עם סכין חוסכות כמה שקלים בכל סיבוב.",
          ],
        },
        {
          h2: "אחרי הקנייה: פחות בזבוז",
          id: "after",
          paragraphs: [
            "החשבון לא נגמר בקופה. אוכל שנאכל הוא האוכל שבאמת שילמתם עליו.",
          ],
        },
        {
          h2: "14. מאחסנים כך שהאוכל יחזיק",
          paragraphs: [
            "שמים קניות חדשות מאחורי הישנות, כדי שהישן ייאכל קודם. מקפיאים לחם, בשר ובננות בשלות שלא יספיקו. שוטפים ומכינים ירקות זמן קצר אחרי הקנייה כדי שיהיו מוכנים, לא נשכחים.",
          ],
        },
        {
          h2: "15. ערב שאריות, ורושמים מה זורקים",
          paragraphs: [
            "קובעים ערב אחד בשבוע לניצול: אורז מטוגן, פריטטה, מרק וקערות דגנים לוקחים כמעט הכול. שבועיים רושמים מה נזרק. מהר רואים ממה לקנות פחות בפעם הבאה.",
            "רשימת מה שנזרק שימושית יותר מהבטחה כללית לבזבז פחות. אם עלי סלט מופיעים פעמיים, קונים שקית קטנה יותר או מחליפים את הארוחה לתרד קפוא. אם לחם מופיע, מקפיאים חצי כיכר ביום הקנייה.",
          ],
        },
        {
          h2: "רשימת הבדיקה לקניות",
          id: "checklist",
          items: [
            "בדקתי מקרר, מקפיא ומזווה",
            "תכננתי ארוחות לשבוע",
            "כתבתי רשימה לפי מחלקות",
            "קבעתי תקציב לסיבוב הזה",
            "טענתי קופונים ובדקתי את המבצע השבועי",
            "אכלתי לפני שיצאתי",
            "השוויתי מחיר ליחידה בחנות",
            "ניסיתי לפחות מוצר אחד של הרשת",
            "שמתי קניות חדשות מאחורי הישנות בבית",
          ],
        },
        {
          h2: "שאלות נפוצות",
          id: "faq",
          faqs: [
            {
              q: "איך חוסכים בסופר מהר?",
              a: "מתחילים בתכנון ארוחות ממה שכבר יש, קונים עם רשימה ותקציב, ומשווים מחיר ליחידה. שלושת ההרגלים האלה נותנים את החיסכון הגדול בשבוע הראשון.",
            },
            {
              q: "איך בונים רשימת קניות שבאמת עובדת?",
              a: "כותבים אותה מתכנון הארוחות, לא מהזיכרון, ומקבצים לפי מחלקה. שומרים רשימה רצה ומוסיפים מוצר בסיס ברגע שהוא נגמר.",
            },
            {
              q: "ירקות קפואים זולים יותר מטריים?",
              a: "לעיתים קרובות כן, במיוחד מחוץ לעונה. ירקות קפואים קרובים בערך תזונתי לטריים ויוצרים פחות בזבוז כי הם נשמרים חודשים.",
            },
            {
              q: "כל כמה זמן כדאי לעשות קניות?",
              a: "פעם בשבוע מתאים לרוב הבתים. פחות סיבובים אומרים פחות קניות דחף, עם עצירה קצרה באמצע השבוע לחלב או לירק טרי אם צריך.",
            },
            {
              q: "מותג של הרשת טוב כמו מותג מוכר?",
              a: "בהרבה מוצרי בסיס האיכות קרובה. בודקים פריט־פריט ומשאירים את מה שעובר את מבחן הטעם.",
            },
            {
              q: "איך נשארים בתקציב קניות?",
              a: "שמים את המספר השבועי בראש הרשימה, קונים לפי הרשימה, ובודקים מה נזרק. קניות לפי תקציב נהיות קלות יותר כשהמספר גלוי לפני שנכנסים לחנות.",
            },
          ],
        },
        {
          h2: "בשורה התחתונה",
          paragraphs: [
            "קניות חכמות הן שיטה, לא ויתור. מתכננים לפני שיוצאים, שומרים על כמה כללים בחנות, ודואגים שמה שקניתם ייאכל. השבוע מתחילים בשלושה: לבדוק מה יש בבית, לכתוב רשימה, ולהשוות מחיר ליחידה. את השאר מוסיפים כשהם הופכים להרגל.",
          ],
          links: [
            { href: "/blog/grocery-list-for-the-week", label: "רשימת קניות לשבוע" },
            { href: "/blog/weekly-basics", label: "מצרכי מזווה לשבוע" },
            { href: "/blog/top-7-groceries-every-week", label: "שבעה מצרכים לקנות כל שבוע" },
            { href: "/blog/shared-grocery-list-for-families", label: "רשימת קניות משותפת חינם למשפחה" },
          ],
        },
        {
          h2: "מקורות",
          paragraphs: [
            "נתוני המחיר למעלה הם תחזית משרד החקלאות האמריקאי למזון לבית ב־2026, כפי שדווחה באוקטובר 2026.",
          ],
          links: [
            { href: "https://www.ers.usda.gov/data-products/food-price-outlook/", label: "תחזית מחירי המזון של USDA ERS" },
          ],
        },
      ],
      cta: "צרו רשימת קניות משותפת בחינם",
    },
  },
  {
    slug: "shared-grocery-list-for-families",
    path: "/blog/shared-grocery-list-for-families",
    date: "2026-10-18",
    en: {
      title: "Free Shared Grocery List for Families | GroceryPair",
      description:
        "Stop double-buying groceries. Share one free grocery list with your whole family, synced in real time. Set it up in 2 minutes.",
      h1: "Stop Buying 3 Jars of Mayo: The Free Way Families Share One Grocery List",
      lead:
        "You open the fridge and there they are: three jars of mayonnaise. One from you, one from your partner, and one from the teenager who thought you were out. Meanwhile, nobody bought eggs. Sound familiar? When everyone shops from memory, a note, or a group chat, a shared grocery list is the simple fix.",
      publishedLabel: "Published October 18, 2026",
      sections: [
        {
          h2: "The hidden cost of not sharing a grocery list",
          paragraphs: [
            "A few duplicate jars may seem harmless, but uncoordinated shopping adds up fast. None of this happens because your family doesn't care. It happens because the information lives in five different heads instead of one shared place.",
          ],
          items: [
            "Wasted money: buying items you already have, week after week.",
            "Wasted food: extra milk, bread, and produce go bad before anyone uses them.",
            "Extra trips: one forgotten ingredient means a second drive, or takeout instead of dinner.",
            "Everyday friction: \"I told you we needed coffee\" is not a fun conversation at 7 a.m.",
          ],
        },
        {
          h2: "4 ways families share a grocery list (and which one actually works)",
          paragraphs: [
            "Most families have tried at least one of these. Here's how they stack up.",
          ],
          table: {
            headers: ["Method", "Real-time updates", "Everyone can edit", "Works in the store", "Cost"],
            rows: [
              ["Paper list on the fridge", "No", "Only at home", "Only if you remember to take it", "Free"],
              ["Family group chat", "Sort of", "Yes, but it gets buried", "Hard to scroll through", "Free"],
              ["Phone notes app", "No, or clunky sharing", "Usually one owner", "Yes", "Free"],
              ["GroceryPair", "Yes, instantly", "Yes", "Yes, check off as you shop", "Free"],
            ],
          },
          after: [
            "The paper list is classic, but it stays on the fridge while you're standing in aisle 7.",
            "The group chat feels convenient until \"get bananas\" is buried under 30 memes and a photo of the dog.",
            "A notes app works for one person. Sharing it between family members is often slow or confusing.",
            "A shared grocery list solves all three: one list, updated live, in everyone's pocket. When your partner adds eggs at home, you see them at the store. When you check off mayo, nobody else buys a second jar.",
          ],
        },
        {
          h2: "How to set up a free shared grocery list in 2 minutes",
          paragraphs: [
            "You don't need another subscription. GroceryPair is a free shared shopping list in the browser. Here's how a family gets on one list.",
          ],
          items: [
            "Create a room. Open GroceryPair, name the space something everyone recognizes, and you get a short room code. No account.",
            "Invite your family. Send the code, or share it on WhatsApp. They join with the code. Nothing to register.",
            "Add a list. Tap + List and name it Home Groceries. Everyone adds items as they run out.",
            "Shop together, even when apart. Whoever is at the store sees the latest list and checks items off as they go.",
            "Watch it update live. Anyone at home can add a forgotten item while you're still in the aisle.",
          ],
          after: [
            "That's it. No credit card, no premium plan. GroceryPair is free.",
          ],
        },
        {
          h2: "6 tips to make your shared grocery list actually stick",
          paragraphs: [
            "An app only helps if the family uses it. These habits make a family grocery list app automatic.",
          ],
          items: [
            "Make one simple rule. If you finish it, add it.",
            "Pick a list captain. One person does a quick look before the big shop.",
            "Group items by store section. Produce, dairy, and pantry together means a faster trip.",
            "Keep separate lists for separate stores. One for the supermarket, one for the pharmacy.",
            "Let the kids join in. Older kids can add snack requests once, instead of asking twelve times.",
            "Check the list before you leave. Ten seconds saves a second trip.",
          ],
        },
        {
          h2: "Frequently asked questions",
          faqs: [
            {
              q: "Is GroceryPair really free?",
              a: "Yes. GroceryPair is free to use, with no subscription and no ads in the list.",
            },
            {
              q: "Can my whole family see updates in real time?",
              a: "Yes. When anyone adds or checks off an item, the change shows up for everyone in the room.",
            },
            {
              q: "Does everyone need to create an account?",
              a: "No. Family members join with the room code. There is nothing to register.",
            },
            {
              q: "Can I use a shared grocery list with my partner or roommates too?",
              a: "Yes. The same room works for couples, roommates, and anyone who shops for the same home. It is a grocery list app for couples as well as families.",
            },
            {
              q: "Can I have more than one shared list?",
              a: "Yes. A room can hold separate lists for groceries, household supplies, and different stores.",
            },
            {
              q: "What's the best way to share a grocery list with family?",
              a: "Use one free shared grocery list that everyone can edit. It stays on your phone at the store, and it updates while you shop. That is the simplest way to share a grocery list.",
            },
          ],
        },
        {
          h2: "One list. One jar of mayo. Zero stress.",
          paragraphs: [
            "Your family doesn't need more reminders, sticky notes, or group-chat chaos. You need one place where everyone sees what's needed and what's already been bought.",
            "With GroceryPair, the shared grocery list is free, instant, and in your pocket. Set it up tonight, and the next fridge check might have the right number of mayo jars.",
          ],
          links: [
            { href: "/", label: "Create your free shared grocery list" },
            { href: "/blog/share-grocery-list-with-partner", label: "How to share a grocery list with your partner" },
          ],
        },
      ],
      cta: "Create your free shared grocery list",
    },
    he: {
      title: "רשימת קניות משותפת חינם למשפחות | GroceryPair",
      description:
        "מפסיקים לקנות כפול. רשימת קניות אחת חינם לכל המשפחה, מסונכרנת בזמן אמת. ההקמה לוקחת שתי דקות.",
      h1: "תפסיקו לקנות 3 צנצנות מיונז: הדרך החינמית לרשימת קניות אחת",
      lead:
        "פותחים את המקרר ושם הן: שלוש צנצנות מיונז. אחת שלך, אחת של בן או בת הזוג, ואחת של המתבגר שחשב שנגמר. וביצים? אף אחד לא קנה. מוכר? כשכל אחד קונה לפי זיכרון, פתק או קבוצת וואטסאפ, רשימת קניות משותפת היא הפתרון הפשוט.",
      publishedLabel: "פורסם ב־18 באוקטובר 2026",
      sections: [
        {
          h2: "המחיר הנסתר של קניות בלי רשימה משותפת",
          paragraphs: [
            "כמה צנצנות כפולות נראות שוליות, אבל קניות לא מתואמות מצטברות מהר. זה לא קורה כי למשפחה לא אכפת. זה קורה כי המידע יושב בחמישה ראשים במקום במקום אחד משותף.",
          ],
          items: [
            "כסף מבוזבז: קונים שוב מה שכבר יש, שבוע אחרי שבוע.",
            "אוכל מבוזבז: חלב, לחם וירקות נוספים מתקלקלים לפני שמישהו משתמש בהם.",
            "נסיעות מיותרות: מצרך אחד שנשכח אומר עוד נסיעה לסופר, או טייק אווי במקום ארוחת ערב.",
            "חיכוך יומיומי: «אמרתי לך שצריך קפה» זו לא שיחה נעימה בשבע בבוקר.",
          ],
        },
        {
          h2: "4 דרכים לשתף רשימת קניות (ואיזו באמת עובדת)",
          paragraphs: [
            "רוב המשפחות ניסו לפחות אחת מהן. כך הן עומדות זו מול זו.",
          ],
          table: {
            headers: ["שיטה", "עדכון בזמן אמת", "כולם יכולים לערוך", "עובד בסופר", "עלות"],
            rows: [
              ["פתק על המקרר", "לא", "רק בבית", "רק אם זוכרים לקחת אותו", "חינם"],
              ["קבוצה משפחתית", "בערך", "כן, אבל זה נקבר", "קשה לגלול", "חינם"],
              ["פתקים בטלפון", "לא, או שיתוף מסורבל", "בדרך כלל בעלים אחד", "כן", "חינם"],
              ["GroceryPair", "כן, מיידית", "כן", "כן, מסמנים תוך כדי קנייה", "חינם"],
            ],
          },
          after: [
            "הפתק על המקרר קלאסי, אבל הוא נשאר על המקרר בזמן שאתם במעבר 7.",
            "הקבוצה נוחה עד ש«תביא בננות» נקבר מתחת ל־30 ממים ותמונה של הכלב.",
            "אפליקציית פתקים עובדת לאדם אחד. שיתוף בין בני המשפחה לרוב איטי או מבלבל.",
            "רשימת קניות משותפת פותרת את שלושתן: רשימה אחת, מתעדכנת בשידור חי, בכיס של כולם. כשבן או בת הזוג מוסיפים ביצים בבית, רואים אותן בסופר. כשמסמנים מיונז, אף אחד לא קונה צנצנת שנייה.",
          ],
        },
        {
          h2: "איך מקימים רשימת קניות משותפת חינם בשתי דקות",
          paragraphs: [
            "לא צריך עוד מנוי. GroceryPair היא רשימת קניות משותפת חינמית בדפדפן. כך משפחה עולה על רשימה אחת.",
          ],
          items: [
            "יוצרים חדר. פותחים את GroceryPair, נותנים שם שכולם מזהים, ומקבלים קוד חדר קצר. בלי חשבון.",
            "מזמינים את המשפחה. שולחים את הקוד, או משתפים בוואטסאפ. מצטרפים עם הקוד. אין מה להירשם.",
            "מוסיפים רשימה. לוחצים על «רשימה +» וקוראים לה מצרכים לבית. כל אחד מוסיף פריטים כשהם נגמרים.",
            "קונים ביחד, גם כשלא ביחד. מי שבסופר רואה את הרשימה העדכנית ומסמן פריטים תוך כדי.",
            "רואים את העדכון בשידור חי. מי שנשאר בבית יכול להוסיף מצרך שנשכח בזמן שאתם עדיין במעבר.",
          ],
          after: [
            "זהו. בלי כרטיס אשראי ובלי מסלול פרימיום. GroceryPair חינמית.",
          ],
        },
        {
          h2: "6 הרגלים כדי שהרשימה המשותפת באמת תישאר",
          paragraphs: [
            "אפליקציה עוזרת רק אם המשפחה משתמשת בה. ההרגלים האלה הופכים אותה לאוטומטית.",
          ],
          items: [
            "כלל אחד פשוט. אם גמרתם, מוסיפים לרשימה.",
            "בוחרים אחראי לרשימה. אדם אחד עושה מבט קצר לפני הקנייה הגדולה.",
            "מקבצים לפי מחלקה. ירקות, חלב ומזווה ביחד מקצרים את הסיבוב.",
            "רשימה נפרדת לכל חנות. אחת לסופר, אחת לבית המרקחת.",
            "נותנים גם לילדים להצטרף. ילדים גדולים מוסיפים חטיפים פעם אחת, במקום לבקש שתים־עשרה.",
            "בודקים את הרשימה לפני שיוצאים. עשר שניות חוסכות נסיעה שנייה.",
          ],
        },
        {
          h2: "שאלות נפוצות",
          faqs: [
            {
              q: "GroceryPair באמת חינמית?",
              a: "כן. GroceryPair חינמית לשימוש, בלי מנוי ובלי פרסומות ברשימה.",
            },
            {
              q: "כל המשפחה רואה עדכונים בזמן אמת?",
              a: "כן. כשמישהו מוסיף פריט או מסמן אותו, השינוי מופיע אצל כולם בחדר.",
            },
            {
              q: "כולם צריכים ליצור חשבון?",
              a: "לא. בני המשפחה מצטרפים עם קוד החדר. אין הרשמה.",
            },
            {
              q: "אפשר להשתמש ברשימה משותפת גם עם בן או בת זוג או עם שותפים לדירה?",
              a: "כן. אותו חדר מתאים לזוגות, לשותפים ולכל מי שקונה לאותו בית.",
            },
            {
              q: "אפשר יותר מרשימה משותפת אחת?",
              a: "כן. בחדר אפשר להחזיק רשימות נפרדות למכולת, למוצרי בית ולחנויות שונות.",
            },
            {
              q: "מה הדרך הכי טובה לשתף רשימת קניות עם המשפחה?",
              a: "רשימת קניות משותפת אחת שכולם יכולים לערוך. היא בטלפון בסופר, והיא מתעדכנת תוך כדי קנייה.",
            },
          ],
        },
        {
          h2: "רשימה אחת. צנצנת מיונז אחת. בלי לחץ.",
          paragraphs: [
            "המשפחה לא צריכה עוד תזכורות, פתקים או כאוס בקבוצה. צריך מקום אחד שבו כולם רואים מה חסר ומה כבר נקנה.",
            "ב־GroceryPair רשימת הקניות המשותפת חינמית, מיידית, ובכיס. מקימים אותה הערב, ובבדיקה הבאה של המקרר אולי יהיה בדיוק המספר הנכון של צנצנות מיונז.",
          ],
          links: [
            { href: "/", label: "צרו רשימת קניות משותפת בחינם" },
            { href: "/blog/share-grocery-list-with-partner", label: "איך לשתף רשימת קניות עם בן או בת הזוג" },
          ],
        },
      ],
      cta: "צרו רשימת קניות משותפת בחינם",
    },
  },
  {
    slug: "top-7-groceries-every-week",
    path: "/blog/top-7-groceries-every-week",
    date: "2026-10-16",
    en: {
      title: "The Top 7 Groceries You Need to Buy Every Week | GroceryPair",
      description:
        "Seven weekly staples — eggs, vegetables, fruit, dairy, lean protein, whole grains, and beans — that cover most meals and cut both spending and decision fatigue.",
      h1: "The Top 7 Groceries You Need to Buy Every Week",
      lead:
        "A short, fixed list of seven staples covers most of a week's meals and cuts both spending and decision fatigue. Build every shop around these, then add whatever recipes or cravings the week calls for.",
      publishedLabel: "Published October 16, 2026",
      sections: [
        {
          h2: "Why these seven",
          paragraphs: [
            "The seven below were chosen for three reasons: they're nutritious, they're flexible across breakfast, lunch and dinner, and they're cheap enough to buy every week without thinking twice. Most also keep well, so less ends up in the bin.",
          ],
        },
        {
          h2: "1. Eggs",
          paragraphs: [
            "Eggs are the most versatile protein in the kitchen: scrambled for breakfast, hard-boiled for lunch, a fried egg on rice or a quick frittata for dinner. A dozen keeps for weeks in the fridge and costs less per gram of protein than almost any meat.",
          ],
        },
        {
          h2: "2. Fresh vegetables",
          paragraphs: [
            "Cover three bases: leafy greens (spinach, kale or salad leaves), a few everyday vegetables you actually cook (tomatoes, peppers, carrots, broccoli), and onions and garlic, which start almost every savoury dish. Eat the greens early in the week; carrots, cabbage, onions and garlic last much longer.",
          ],
        },
        {
          h2: "3. Seasonal fruit",
          paragraphs: [
            "Bananas, apples, citrus or whatever is in season give you easy snacks and breakfast toppings. Buy a mix of ripe and under-ripe fruit so it doesn't all need eating on the same day.",
          ],
        },
        {
          h2: "4. Dairy or a dairy alternative",
          paragraphs: [
            "Milk, plain yogurt or a fortified plant milk covers breakfast, coffee and cooking. Plain yogurt doubles as a snack, a sauce base and a substitute for sour cream. Add one cheese you like for sandwiches and pasta.",
          ],
        },
        {
          h2: "5. A lean protein",
          paragraphs: [
            "Chicken, fish, tofu or lean mince anchor two or three dinners. Buy what you'll cook in the next few days and freeze the rest in meal-sized portions the day you shop.",
          ],
        },
        {
          h2: "6. Whole grains",
          paragraphs: [
            "Bread, oats, rice or pasta are the base of quick, filling meals. Choose whole-grain versions for more fibre. Oats in particular are cheap, keep for months and make breakfast in five minutes.",
          ],
        },
        {
          h2: "7. Beans and legumes",
          paragraphs: [
            "Canned or dried chickpeas, lentils and beans are cheap protein and fibre that last on the shelf. Use them in salads, stews, soups, hummus or as a meat stretcher in chilli and sauces.",
          ],
        },
        {
          h2: "Shelf life",
          note: "Shelf lives are approximate and depend on storage.",
          table: {
            headers: ["#", "Staple", "Typical shelf life", "Best for"],
            rows: [
              ["1", "Eggs", "3–5 weeks (fridge)", "Any meal"],
              ["2", "Fresh vegetables", "3 days (greens) to 8 weeks (onions)", "Cooking base, salads, sides"],
              ["3", "Seasonal fruit", "3–10 days", "Snacks, breakfast"],
              ["4", "Dairy or alternative", "1–2 weeks (fridge)", "Breakfast, sauces"],
              ["5", "Lean protein", "1–2 days fresh, 3+ months frozen", "Dinners"],
              ["6", "Whole grains", "Days (bread) to months (oats, rice)", "Meal base"],
              ["7", "Beans and legumes", "1–2 years (canned, dried)", "Stews, salads"],
            ],
          },
        },
        {
          h2: "Making the list work",
          items: [
            "Check before you shop. A two-minute look in the fridge stops you rebuying what you already have.",
            "Plan three or four dinners, not seven. Leftovers and a pantry meal fill the gaps.",
            "Use the freezer. Frozen vegetables, fruit and fish are as nutritious as fresh and never go off mid-week.",
            "Eat the perishables first. Greens and fish early in the week; root vegetables, eggs and beans later.",
            "Store smart. Keep onions and potatoes apart, wrap greens in a paper towel, and keep bananas away from other fruit.",
            "Buy store brands for staples. Oats, rice, beans and canned tomatoes rarely differ in quality.",
          ],
        },
        {
          h2: "The bottom line",
          paragraphs: [
            "With these seven in the kitchen, you can always make breakfast, pack a lunch and cook a decent dinner without a special trip. Treat the list as a base, swap items to suit your diet and budget, and add the extras each week's recipes need.",
          ],
        },
      ],
      cta: "Create a free shared grocery list",
    },
    he: {
      title: "שבעת המצרכים שכדאי לקנות כל שבוע | GroceryPair",
      description:
        "שבעה מצרכי בסיס שבועיים — ביצים, ירקות, פירות, חלב, חלבון רזה, דגנים מלאים וקטניות — שמכסים את רוב הארוחות ומקצרים גם הוצאה וגם התלבטות.",
      h1: "שבעת המצרכים שכדאי לקנות כל שבוע",
      lead:
        "רשימה קצרה וקבועה של שבעה מצרכי בסיס מכסה את רוב הארוחות בשבוע, ומקצרת גם את ההוצאה וגם את ההתלבטות. בנו כל קנייה סביב אלה, ואז הוסיפו את מה שמופיע במתכונים או שמתחשק לכם השבוע.",
      publishedLabel: "פורסם ב־16 באוקטובר 2026",
      sections: [
        {
          h2: "למה דווקא השבעה האלה",
          paragraphs: [
            "השבעה למטה נבחרו משלוש סיבות: הם מזינים, הם גמישים לארוחת בוקר, צהריים וערב, והם זולים מספיק כדי לקנות אותם כל שבוע בלי לחשוב פעמיים. רובם גם נשמרים היטב, כך שפחות נזרק לפח.",
          ],
        },
        {
          h2: "1. ביצים",
          paragraphs: [
            "ביצים הן החלבון הכי גמיש במטבח: מקושקשות לארוחת בוקר, קשות לארוחת צהריים, ביצה מטוגנת על אורז או פריטטה מהירה לארוחת ערב. תריסר נשמר שבועות במקרר ועולה פחות לכל גרם חלבון כמעט מכל בשר.",
          ],
        },
        {
          h2: "2. ירקות טריים",
          paragraphs: [
            "כסו שלושה בסיסים: עלים ירוקים (תרד, קייל או עלי סלט), כמה ירקות יומיומיים שבאמת מבשלים (עגבניות, פלפלים, גזר, ברוקולי), ובצל ושום, שמתחילים כמעט כל מנה מלוחה. אכלו את העלים בתחילת השבוע; גזר, כרוב, בצל ושום מחזיקים הרבה יותר.",
          ],
        },
        {
          h2: "3. פרי עונתי",
          paragraphs: [
            "בננות, תפוחים, הדרים או מה שיש בעונה נותנים נשנוש קל ותוספת לארוחת בוקר. קנו תערובת של פרי בשל ופרי שעוד לא הבשיל, כדי שלא הכול יצטרך להיאכל באותו יום.",
          ],
        },
        {
          h2: "4. מוצרי חלב או תחליף",
          paragraphs: [
            "חלב, יוגורט טבעי או משקה צמחי מועשר מכסים ארוחת בוקר, קפה ובישול. יוגורט טבעי משמש גם כנשנוש, כבסיס לרוטב וכתחליף לשמנת חמוצה. הוסיפו גבינה אחת שאוהבים לכריכים ולפסטה.",
          ],
        },
        {
          h2: "5. חלבון רזה",
          paragraphs: [
            "עוף, דג, טופו או בשר טחון רזה מעגנים שתיים או שלוש ארוחות ערב. קנו את מה שתבשלו בימים הקרובים, והקפיאו את השאר במנות ביום הקנייה.",
          ],
        },
        {
          h2: "6. דגנים מלאים",
          paragraphs: [
            "לחם, שיבולת שועל, אורז או פסטה הם הבסיס לארוחות מהירות ומשביעות. בחרו גרסאות מדגן מלא לעוד סיבים. שיבולת שועל במיוחד זולה, נשמרת חודשים, ומכינה ארוחת בוקר בחמש דקות.",
          ],
        },
        {
          h2: "7. קטניות",
          paragraphs: [
            "חומוס, עדשים ושעועית — מקופסה או יבשים — הם חלבון וסיבים זולים שנשמרים על המדף. השתמשו בהם בסלטים, תבשילים, מרקים, כממרח, או כדי למתוח בשר בצ׳ילי וברטבים.",
          ],
        },
        {
          h2: "חיי מדף",
          note: "חיי המדף משוערים ותלויים באחסון.",
          table: {
            headers: ["#", "מצרך", "חיי מדף אופייניים", "הכי מתאים ל"],
            rows: [
              ["1", "ביצים", "3–5 שבועות (מקרר)", "כל ארוחה"],
              ["2", "ירקות טריים", "3 ימים (עלים) עד 8 שבועות (בצל)", "בסיס לבישול, סלטים, תוספות"],
              ["3", "פרי עונתי", "3–10 ימים", "נשנושים, ארוחת בוקר"],
              ["4", "חלב או תחליף", "1–2 שבועות (מקרר)", "ארוחת בוקר, רטבים"],
              ["5", "חלבון רזה", "1–2 ימים טרי, 3+ חודשים קפוא", "ארוחות ערב"],
              ["6", "דגנים מלאים", "ימים (לחם) עד חודשים (שיבולת שועל, אורז)", "בסיס לארוחה"],
              ["7", "קטניות", "1–2 שנים (קופסה, יבש)", "תבשילים, סלטים"],
            ],
          },
        },
        {
          h2: "איך לגרום לרשימה לעבוד",
          items: [
            "בדקו לפני הקנייה. מבט של שתי דקות במקרר מונע לקנות שוב מה שכבר יש.",
            "תכננו שלוש או ארבע ארוחות ערב, לא שבע. שאריות וארוחה מהמזווה סוגרות את הפערים.",
            "השתמשו במקפיא. ירקות, פירות ודגים קפואים מזינים כמו טריים ולא מתקלקלים באמצע השבוע.",
            "אכלו קודם את מה שמתקלקל. עלים ודגים בתחילת השבוע; ירקות שורש, ביצים וקטניות אחר כך.",
            "אחסנו נכון. שמרו בצל ותפוחי אדמה בנפרד, עטפו עלים במגבת נייר, והרחיקו בננות מפירות אחרים.",
            "קנו מותג של הרשת למצרכי בסיס. שיבולת שועל, אורז, שעועית ועגבניות מקופסה כמעט לא נבדלים באיכות.",
          ],
        },
        {
          h2: "בשורה התחתונה",
          paragraphs: [
            "עם השבעה האלה במטבח תמיד אפשר להכין ארוחת בוקר, לארוז צהריים ולבשל ארוחת ערב סבירה בלי יציאה מיוחדת. התייחסו לרשימה כבסיס, החליפו פריטים לפי התזונה והתקציב, והוסיפו את התוספות שכל שבוע דורש.",
          ],
        },
      ],
      cta: "צרו רשימת קניות משותפת בחינם",
    },
  },
  {
    slug: "weekly-basics",
    path: "/blog/weekly-basics",
    date: "2026-10-11",
    en: {
      title: "Weekly basics | GroceryPair",
      description:
        "A short weekly grocery list with five concrete items for each GroceryPair aisle: produce, meat, dairy, bakery, pantry, frozen, drinks, snacks, personal care, and household.",
      h1: "Weekly basics",
      lead:
        "A weekly basics list is a small set of concrete groceries for each aisle, not a menu for the whole month. These are the categories GroceryPair uses in the app. Copy the ones you are actually out of.",
      publishedLabel: "Published October 11, 2026",
      sections: [
        {
          h2: "What to put on a weekly basics list",
          paragraphs: [
            "Each aisle below has five specific items. Skip anything still in the fridge or cupboard. Other is the catch-all in the app for names that do not match an aisle, so it has no staple list of its own.",
          ],
        },
        {
          h2: "🥦 Produce",
          paragraphs: [
            "Buy the fresh items you will eat this week. These five show up in most carts.",
          ],
          items: ["Bananas", "Tomatoes", "Cucumbers", "Carrots", "Onions"],
        },
        {
          h2: "🥩 Meat & Fish",
          paragraphs: [
            "Pick the proteins you will cook. You do not need all five if the week only has a few meals at home.",
          ],
          items: ["Chicken breast", "Ground beef", "Salmon", "Tuna", "Turkey"],
        },
        {
          h2: "🧀 Dairy & Eggs",
          paragraphs: [
            "These go fast at breakfast and in cooking. Check the fridge before you add them.",
          ],
          items: ["Milk", "Eggs", "Yogurt", "Cheddar cheese", "Butter"],
        },
        {
          h2: "🥖 Bakery",
          paragraphs: [
            "Bread and wraps are the weekly bakery staples. Leave off anything still in the bag.",
          ],
          items: ["Sliced bread", "Pita", "Bagels", "Tortillas", "Hamburger buns"],
        },
        {
          h2: "🥫 Pantry",
          paragraphs: [
            "Pantry goods last longer than produce. Add one only when the package is nearly empty.",
          ],
          items: ["Rice", "Pasta", "Olive oil", "Chickpeas", "Oats"],
        },
        {
          h2: "❄️ Frozen",
          paragraphs: [
            "Frozen food covers a backup meal and a few things that keep after the fresh produce is gone.",
          ],
          items: ["Frozen peas", "Frozen berries", "Ice cream", "Frozen pizza", "Waffles"],
        },
        {
          h2: "🧃 Beverages",
          paragraphs: [
            "Drinks are easy to overbuy. Start with what you finish every week.",
          ],
          items: ["Water", "Coffee", "Black tea", "Lemonade", "Sparkling water"],
        },
        {
          h2: "🍬 Snacks & Sweets",
          paragraphs: [
            "Keep this aisle short. Five favorites are enough for the week.",
          ],
          items: ["Chips", "Popcorn", "Dark chocolate", "Pretzels", "Gummy candy"],
        },
        {
          h2: "🧴 Personal Care",
          paragraphs: [
            "Personal care is not a weekly food shop. Replace a bottle when it is actually low.",
          ],
          items: ["Shampoo", "Toothpaste", "Bar soap", "Deodorant", "Sunscreen"],
        },
        {
          h2: "🧹 Household",
          paragraphs: [
            "Cleaning and paper goods belong on the list when you are down to the last roll or bottle.",
          ],
          items: ["Toilet paper", "Paper towels", "Laundry detergent", "Trash bags", "Sponges"],
        },
      ],
      cta: "Create a free shared grocery list",
    },
    he: {
      title: "הבסיס השבועי | GroceryPair",
      description:
        "רשימת קניות שבועית קצרה עם חמישה פריטים קונקרטיים לכל מדור ב־GroceryPair: ירקות, בשר, חלב, מאפייה, מזווה, קפוא, משקאות, חטיפים, טיפוח ובית.",
      h1: "הבסיס השבועי",
      lead:
        "רשימת בסיס שבועית היא סט קטן של מצרכים קונקרטיים לכל מדור, לא תפריט לחודש שלם. אלה הקטגוריות ש־GroceryPair משתמשת בהן באפליקציה. העתיקו רק את מה שבאמת נגמר.",
      publishedLabel: "פורסם ב־11 באוקטובר 2026",
      sections: [
        {
          h2: "מה לשים ברשימת בסיס שבועית",
          paragraphs: [
            "בכל מדור למטה יש חמישה פריטים ספציפיים. דלגו על מה שעדיין יש במקרר או בארון. «אחר» באפליקציה הוא מדור לשמות שלא מתאימים למדור, ולכן אין לו רשימת בסיס משלו.",
          ],
        },
        {
          h2: "🥦 ירקות ופירות",
          paragraphs: [
            "קנו את הטרי שתאכלו השבוע. חמשת אלה מופיעים ברוב העגלות.",
          ],
          items: ["בננות", "עגבניות", "מלפפונים", "גזר", "בצל"],
        },
        {
          h2: "🥩 בשר ודגים",
          paragraphs: [
            "בחרו את החלבונים שתבשלו. לא חייבים את כל החמישה אם השבוע יש רק כמה ארוחות בבית.",
          ],
          items: ["חזה עוף", "בשר טחון", "סלמון", "טונה", "הודו"],
        },
        {
          h2: "🧀 חלב וביצים",
          paragraphs: [
            "אלה נגמרים מהר בארוחת בוקר ובבישול. בדקו את המקרר לפני שמוסיפים אותם.",
          ],
          items: ["חלב", "ביצים", "יוגורט", "גבינה צהובה", "חמאה"],
        },
        {
          h2: "🥖 מאפייה",
          paragraphs: [
            "לחם ודברים לעטיפה הם הבסיס השבועי במאפייה. הורידו מהרשימה מה שעדיין בשקית.",
          ],
          items: ["לחם פרוס", "פיתה", "בייגל", "טורטיות", "לחמניות המבורגר"],
        },
        {
          h2: "🥫 מזווה",
          paragraphs: [
            "מצרכי מזווה מחזיקים יותר מירקות. הוסיפו פריט רק כשהאריזה כמעט ריקה.",
          ],
          items: ["אורז", "פסטה", "שמן זית", "חומוס", "שיבולת שועל"],
        },
        {
          h2: "❄️ קפוא",
          paragraphs: [
            "הקפוא מכסה ארוחת גיבוי וכמה דברים שנשארים אחרי שהתוצרת הטרייה נגמרת.",
          ],
          items: ["אפונה קפואה", "פירות יער קפואים", "גלידה", "פיצה קפואה", "וופלים"],
        },
        {
          h2: "🧃 משקאות",
          paragraphs: [
            "משקאות קל לקנות יותר מדי. התחילו במה שנגמר אצלכם כל שבוע.",
          ],
          items: ["מים", "קפה", "תה שחור", "לימונדה", "מים מוגזים"],
        },
        {
          h2: "🍬 חטיפים",
          paragraphs: [
            "השאירו את המדור הזה קצר. חמישה מועדפים מספיקים לשבוע.",
          ],
          items: ["צ'יפס", "פופקורן", "שוקולד מריר", "פרצל", "סוכריות גומי"],
        },
        {
          h2: "🧴 טיפוח",
          paragraphs: [
            "טיפוח הוא לא קניית אוכל שבועית. מחליפים בקבוק רק כשהוא באמת עומד להיגמר.",
          ],
          items: ["שמפו", "משחת שיניים", "סבון", "דאודורנט", "קרם הגנה"],
        },
        {
          h2: "🧹 ניקיון ובית",
          paragraphs: [
            "ניקיון ומוצרי נייר עולים לרשימה כשנשארים הגליל או הבקבוק האחרונים.",
          ],
          items: ["נייר טואלט", "נייר סופג", "אבקת כביסה", "שקיות אשפה", "ספוגים"],
        },
      ],
      cta: "צרו רשימת קניות משותפת בחינם",
    },
  },
  {
    slug: "grocery-list-for-the-week",
    path: "/blog/grocery-list-for-the-week",
    date: "2026-09-26",
    en: {
      title: "Grocery List for the Week: Simple Essentials You Actually Need | GroceryPair",
      description:
        "A practical grocery list for the week: produce, dairy, eggs, bread, a few proteins, and pantry basics. Buy only what you are running low on or plan to use.",
      h1: "Grocery List for the Week: Simple Essentials You Actually Need",
      lead:
        "A practical weekly grocery list usually includes fresh produce, milk and dairy, eggs, bread, a few protein sources, and basic foods for the meals you plan to make. You don't need to buy every item every week. Check your fridge and pantry first, then add only what you are actually running low on or plan to use.",
      publishedLabel: "Published September 26, 2026",
      sections: [
        {
          h2: "Grocery list for the week",
          paragraphs: [
            "A good weekly grocery list should make shopping easier, not give you a list of 50 things you may never use.",
            "The exact items depend on your household and eating habits, but most weekly grocery trips can be built around a few basic categories.",
          ],
        },
        {
          h2: "1. Fruits and vegetables",
          paragraphs: [
            "Fresh produce is one of the main things worth checking every week because it gets used quickly.",
            "Choose a few fruits and vegetables that your household actually eats. You don't need all of these every week. If you still have onions or potatoes at home, simply leave them off your list.",
          ],
          items: [
            "Bananas or apples",
            "Seasonal fruit",
            "Tomatoes",
            "Cucumbers",
            "Carrots",
            "Lettuce or salad greens",
            "Onions",
            "Potatoes",
          ],
        },
        {
          h2: "2. Milk, dairy, and eggs",
          paragraphs: [
            "These are common everyday staples for breakfast, cooking, and snacks.",
            "How much you need will depend on your household. If you normally go through a carton of milk and a dozen eggs each week, those can become recurring items on your list.",
          ],
          items: [
            "Milk or a milk alternative",
            "Eggs",
            "Yogurt",
            "Cheese",
            "Butter, if you use it",
          ],
        },
        {
          h2: "3. Bread and basic carbohydrates",
          paragraphs: [
            "For sandwiches, breakfasts, and quick meals, keep the staples you regularly use.",
            "Not everything here needs to be purchased every week. Rice, pasta, and oats can usually stay in your pantry for several weeks, so check your supplies before adding them.",
          ],
          items: [
            "Bread",
            "Rice",
            "Pasta",
            "Oats or cereal",
            "Tortillas, if you use them",
          ],
        },
        {
          h2: "4. Protein for the week",
          paragraphs: [
            "Instead of buying every type of protein, think about the meals you expect to prepare during the week.",
            "You might only need two or three options for the week. Buying according to your planned meals can also help reduce food waste.",
          ],
          items: [
            "Chicken",
            "Fish",
            "Ground meat",
            "Tofu",
            "Beans or lentils",
            "Canned tuna",
          ],
        },
        {
          h2: "5. Pantry staples",
          paragraphs: [
            "These are useful to keep at home, but they don't necessarily belong on your grocery list every week.",
            "These are better treated as “check before shopping” items rather than automatic weekly purchases.",
          ],
          items: [
            "Olive oil or cooking oil",
            "Salt and pepper",
            "Spices",
            "Canned tomatoes",
            "Beans or chickpeas",
            "Peanut butter or other spreads",
          ],
        },
        {
          h2: "6. Snacks",
          paragraphs: [
            "Add the snacks your household actually eats rather than filling the cart with a long list of possibilities.",
            "If you still have enough snacks at home, there is no reason to buy more just because it's grocery day.",
          ],
          items: [
            "Fruit",
            "Nuts",
            "Crackers",
            "Hummus",
            "Yogurt",
            "One or two favorite snacks",
          ],
        },
        {
          h2: "A simple weekly grocery checklist",
          paragraphs: [
            "Before heading to the store, run through this short checklist.",
          ],
          items: [
            "Fresh fruit",
            "Fresh vegetables",
            "Milk or milk alternative",
            "Eggs",
            "Yogurt and cheese",
            "Bread",
            "Protein for planned meals",
            "Rice, pasta, or other staples if running low",
            "Pantry items that need replacing",
            "Snacks",
          ],
        },
        {
          h2: "What you don't need to buy every week",
          paragraphs: [
            "One of the easiest ways to make grocery shopping more efficient is to separate weekly essentials from occasional purchases.",
            "You probably don't need to buy these every week. Leave them off the list until you are actually running low.",
          ],
          items: [
            "Rice, pasta, and oats you still have",
            "Cooking oil, salt, pepper, and spices",
            "Canned tomatoes, beans, and chickpeas",
            "Peanut butter and other spreads",
            "Extra snacks when the cupboard is already stocked",
          ],
        },
      ],
      cta: "Create a free shared grocery list",
    },
    he: {
      title: "רשימת קניות לשבוע: המצרכים הפשוטים שבאמת צריך | GroceryPair",
      description:
        "רשימת קניות מעשית לשבוע: ירקות ופירות, חלב, ביצים, לחם, כמה חלבונים ובסיס למזווה. קונים רק מה שאוזל או מה שמתכננים להשתמש בו.",
      h1: "רשימת קניות לשבוע: המצרכים הפשוטים שבאמת צריך",
      lead:
        "רשימת קניות שבועית מעשית כוללת בדרך כלל ירקות ופירות טריים, חלב ומוצרי חלב, ביצים, לחם, כמה מקורות חלבון, ומזונות בסיסיים לארוחות שמתכננים להכין. לא צריך לקנות כל פריט כל שבוע. קודם בודקים מה יש במקרר ובמזווה, ואז מוסיפים רק מה שבאמת אוזל או מה שמתכוונים להשתמש בו.",
      publishedLabel: "פורסם ב־26 בספטמבר 2026",
      sections: [
        {
          h2: "רשימת קניות לשבוע",
          paragraphs: [
            "רשימת קניות שבועית טובה אמורה להקל על הקניות, לא לתת רשימה של 50 דברים שאולי לא תשתמשו בהם.",
            "הפריטים המדויקים תלויים בבית ובהרגלי האכילה, אבל רוב הסיבובים השבועיים נבנים סביב כמה קטגוריות בסיסיות.",
          ],
        },
        {
          h2: "1. פירות וירקות",
          paragraphs: [
            "תוצרת טרייה היא אחד הדברים שכדאי לבדוק כל שבוע, כי היא נגמרת מהר.",
            "בחרו כמה פירות וירקות שהבית באמת אוכל. לא צריך את כולם כל שבוע. אם עדיין יש בצל או תפוחי אדמה בבית, פשוט הורידו אותם מהרשימה.",
          ],
          items: [
            "בננות או תפוחים",
            "פרי עונתי",
            "עגבניות",
            "מלפפונים",
            "גזר",
            "חסה או עלי סלט",
            "בצל",
            "תפוחי אדמה",
          ],
        },
        {
          h2: "2. חלב, מוצרי חלב וביצים",
          paragraphs: [
            "אלה מצרכי יומיום נפוצים לארוחת בוקר, לבישול ולנשנושים.",
            "הכמות תלויה בבית. אם בדרך כלל נגמרים קרטון חלב ותריסר ביצים בשבוע, הם יכולים להפוך לפריטים קבועים ברשימה.",
          ],
          items: [
            "חלב או תחליף חלב",
            "ביצים",
            "יוגורט",
            "גבינה",
            "חמאה, אם משתמשים בה",
          ],
        },
        {
          h2: "3. לחם ופחמימות בסיסיות",
          paragraphs: [
            "לכריכים, לארוחות בוקר ולארוחות מהירות, שמרו את המצרכים שאתם באמת משתמשים בהם.",
            "לא הכל כאן צריך קנייה כל שבוע. אורז, פסטה ושיבולת שועל בדרך כלל נשמרים במזווה כמה שבועות, אז בדקו מה יש לפני שמוסיפים אותם.",
          ],
          items: [
            "לחם",
            "אורז",
            "פסטה",
            "שיבולת שועל או דגני בוקר",
            "טורטיות, אם משתמשים בהן",
          ],
        },
        {
          h2: "4. חלבון לשבוע",
          paragraphs: [
            "במקום לקנות כל סוג חלבון, חשבו על הארוחות שאתם מצפים להכין במהלך השבוע.",
            "אולי מספיקים שניים או שלושה סוגי חלבון לשבוע. קנייה לפי ארוחות מתוכננות גם עוזרת להפחית בזבוז אוכל.",
          ],
          items: [
            "עוף",
            "דג",
            "בשר טחון",
            "טופו",
            "שעועית או עדשים",
            "טונה בקופסה",
          ],
        },
        {
          h2: "5. מצרכי מזווה",
          paragraphs: [
            "כדאי שיהיו בבית, אבל הם לא חייבים להופיע ברשימת הקניות כל שבוע.",
            "עדיף להתייחס אליהם כפריטים שבודקים לפני הקניות, לא כקניות אוטומטיות כל שבוע.",
          ],
          items: [
            "שמן זית או שמן לבישול",
            "מלח ופלפל",
            "תבלינים",
            "עגבניות מקופסה",
            "שעועית או חומוס",
            "חמאת בוטנים או ממרחים אחרים",
          ],
        },
        {
          h2: "6. נשנושים",
          paragraphs: [
            "הוסיפו את הנשנושים שהבית באמת אוכל, במקום למלא את העגלה ברשימה ארוכה של אפשרויות.",
            "אם עדיין יש מספיק נשנושים בבית, אין סיבה לקנות עוד רק כי זה יום קניות.",
          ],
          items: [
            "פרי",
            "אגוזים",
            "קרקרים",
            "חומוס",
            "יוגורט",
            "חטיף או שניים שאוהבים",
          ],
        },
        {
          h2: "רשימת בדיקה שבועית קצרה",
          paragraphs: [
            "לפני היציאה לסופר, עברו על הרשימה הקצרה הזו.",
          ],
          items: [
            "פירות טריים",
            "ירקות טריים",
            "חלב או תחליף חלב",
            "ביצים",
            "יוגורט וגבינה",
            "לחם",
            "חלבון לארוחות מתוכננות",
            "אורז, פסטה או מצרכים אחרים אם אוזלים",
            "מצרכי מזווה שצריך להחליף",
            "נשנושים",
          ],
        },
        {
          h2: "מה לא צריך לקנות כל שבוע",
          paragraphs: [
            "אחת הדרכים הקלות לייעל קניות היא להפריד בין מצרכים שבועיים לבין קניות מדי פעם.",
            "כנראה שלא צריך לקנות את אלה כל שבוע. הורידו אותם מהרשימה עד שהם באמת אוזלים.",
          ],
          items: [
            "אורז, פסטה ושיבולת שועל שעדיין יש",
            "שמן, מלח, פלפל ותבלינים",
            "עגבניות מקופסה, שעועית וחומוס",
            "חמאת בוטנים וממרחים אחרים",
            "נשנושים נוספים כשהארון כבר מלא",
          ],
        },
      ],
      cta: "צרו רשימת קניות משותפת בחינם",
    },
  },
  {
    slug: "weekly-grocery-list",
    path: "/blog/weekly-grocery-list",
    date: "2026-09-16",
    en: {
      title: "The Ultimate Weekly Grocery List: What to Buy Every Week | GroceryPair",
      description:
        "A practical weekly grocery list and grocery checklist organized by aisle — fruits, protein, dairy, pantry, cleaning, and more. Use it as your weekly shopping list or printable grocery list template.",
      h1: "The Ultimate Weekly Grocery List: What to Buy Every Week",
      lead:
        "A solid weekly grocery list turns “what do we need?” into a quick aisle-by-aisle grocery checklist. Use this weekly shopping list as a reusable baseline — then add, skip, or tweak items for your household. It’s also a handy printable grocery list template if you still like paper at the store.",
      publishedLabel: "Published September 16, 2026",
      sections: [
        {
          h2: "How to use this grocery shopping list",
          paragraphs: [
            "Treat this as a weekly shopping list starter, not a rigid menu. Before you leave, walk the fridge and pantry once: check off what you already have, circle what’s running low, and add anything for planned meals.",
            "Shop by category so the store trip matches how most grocery aisles are laid out. If you print this grocery checklist, leave a blank line under each section for last-minute adds. If you keep it on your phone, a shared list is even easier — more on that at the end.",
          ],
        },
        {
          h2: "🥬 Fruits & vegetables",
          paragraphs: [
            "Aim for a mix of ready-to-eat fruit, salad greens, and a few sturdy vegetables that last the week. Adjust quantities to your household size.",
          ],
          items: [
            "Bananas",
            "Apples or pears",
            "Berries or grapes",
            "Lemons or limes",
            "Salad greens / lettuce",
            "Spinach or kale",
            "Tomatoes",
            "Cucumbers",
            "Carrots",
            "Onions",
            "Garlic",
            "Bell peppers",
            "Broccoli or cauliflower",
            "Potatoes or sweet potatoes",
            "Avocados",
            "Fresh herbs (parsley, cilantro, or basil)",
          ],
        },
        {
          h2: "🥩 Meat & protein",
          paragraphs: [
            "Plan two to four proteins for the week and freeze extras if you won’t cook them soon. Include plant-based options if that’s how you eat.",
          ],
          items: [
            "Chicken (breasts, thighs, or a whole bird)",
            "Ground beef or turkey",
            "Fish or shrimp",
            "Eggs",
            "Tofu or tempeh",
            "Beans or lentils (canned or dry)",
            "Deli meat or leftovers for lunches",
            "Nuts or nut butter",
          ],
        },
        {
          h2: "🥛 Dairy",
          paragraphs: [
            "Dairy (and dairy alternatives) disappears fast in most households — milk, yogurt, and cheese are the usual weekly staples.",
          ],
          items: [
            "Milk or plant milk",
            "Yogurt or Greek yogurt",
            "Butter or margarine",
            "Cheese (block, sliced, or shredded)",
            "Cream cheese or cottage cheese",
            "Sour cream or crème fraîche",
          ],
        },
        {
          h2: "🍞 Bread & grains",
          paragraphs: [
            "Keep at least one everyday carb and one backup for busy nights — toast, wraps, rice, or pasta usually cover most weeks.",
          ],
          items: [
            "Bread or sandwich rolls",
            "Tortillas or wraps",
            "Rice",
            "Pasta",
            "Oats or breakfast cereal",
            "Quinoa or couscous",
            "Crackers",
          ],
        },
        {
          h2: "🧊 Frozen",
          paragraphs: [
            "Frozen items stretch a weekly grocery list when fresh produce runs out midweek or you need a no-prep dinner.",
          ],
          items: [
            "Frozen vegetables (peas, mixed veg, spinach)",
            "Frozen fruit for smoothies",
            "Frozen pizza or ready meals",
            "Ice cream or frozen dessert",
            "Frozen fish or chicken",
            "French fries or hash browns",
          ],
        },
        {
          h2: "🧂 Pantry",
          paragraphs: [
            "Pantry staples don’t need buying every week — scan the list and restock only what’s low. This section of a grocery shopping list prevents mid-recipe surprises.",
          ],
          items: [
            "Olive oil or cooking oil",
            "Salt and black pepper",
            "Garlic powder / spices you use often",
            "Soy sauce or hot sauce",
            "Vinegar or salad dressing",
            "Canned tomatoes",
            "Canned tuna or salmon",
            "Stock or broth",
            "Pasta sauce",
            "Flour or baking mix",
            "Sugar or honey",
            "Coffee or tea",
            "Snacks (chips, granola bars, popcorn)",
          ],
        },
        {
          h2: "🧼 Cleaning",
          paragraphs: [
            "Household cleaning runs out on its own schedule. Add these to your weekly grocery checklist when bottles look light — not only when you’re already out.",
          ],
          items: [
            "Dish soap",
            "Dishwasher detergent",
            "All-purpose cleaner",
            "Laundry detergent",
            "Paper towels",
            "Trash bags",
            "Sponges or cleaning cloths",
            "Toilet paper",
          ],
        },
        {
          h2: "🧴 Personal care",
          paragraphs: [
            "Personal care is easy to forget until you’re out. Keep a short weekly shopping list reminder so toothpaste and soap don’t become emergency runs.",
          ],
          items: [
            "Toothpaste",
            "Toothbrushes / floss",
            "Shampoo or conditioner",
            "Body wash or bar soap",
            "Deodorant",
            "Hand soap",
            "Facial cleanser or moisturizer",
            "Razors or shaving cream",
            "Feminine care products",
          ],
        },
        {
          h2: "Turn this checklist into a shared grocery list",
          paragraphs: [
            "Shopping with someone else? Turn this checklist into a shared grocery list and let everyone add or check off items in real time.",
            "A paper printable grocery list works for one shopper. When a partner, roommate, or family member also adds milk from home — or marks eggs done in the dairy aisle — a shared list stays accurate for everyone. That’s where GroceryPair fits: one free room, a short invite code, and a live weekly shopping list on every phone.",
            "Copy the categories you need, skip what you don’t, and keep refining your ultimate weekly grocery list until it matches how your household actually eats.",
          ],
        },
      ],
      cta: "Create a free shared grocery list",
    },
    he: {
      title: "רשימת הקניות השבועית המושלמת: מה לקנות כל שבוע | GroceryPair",
      description:
        "רשימת קניות שבועית מעשית ורשימת בדיקה לפי מחלקות — פירות, חלבון, חלב, מזווה, ניקיון ועוד. השתמשו בה כרשימת קניות שבועית או כתבנית להדפסה.",
      h1: "רשימת הקניות השבועית המושלמת: מה לקנות כל שבוע",
      lead:
        "רשימת קניות שבועית טובה הופכת את «מה חסר?» לבדיקה מהירה לפי מחלקות. השתמשו ברשימה הזו כבסיס קבוע — הוסיפו, דלגו או התאימו לפי הבית שלכם. היא גם תבנית נוחה להדפסה אם עדיין אוהבים נייר בסופר.",
      publishedLabel: "פורסם ב־16 בספטמבר 2026",
      sections: [
        {
          h2: "איך להשתמש ברשימת הקניות הזו",
          paragraphs: [
            "התייחסו לזה כנקודת פתיחה לרשימת קניות שבועית, לא כתפריט נוקשה. לפני היציאה עברו פעם אחת על המקרר והמזווה: סמנו מה כבר יש, סמנו מה אוזל, והוסיפו פריטים לארוחות מתוכננות.",
            "קנו לפי קטגוריה כדי שהסיבוב יתאים לאופן שבו רוב הסופרים מסודרים. אם מדפיסים את הרשימה, השאירו שורה ריקה בכל סעיף להוספות של הרגע האחרון. אם משאירים בטלפון — רשימה משותפת עוד יותר נוחה; על כך בסוף.",
          ],
        },
        {
          h2: "🥬 פירות וירקות",
          paragraphs: [
            "שלבו פרי מוכן לאכילה, ירקות לסלט וכמה ירקות עמידים שמחזיקים שבוע. התאימו כמויות לגודל הבית.",
          ],
          items: [
            "בננות",
            "תפוחים או אגסים",
            "פירות יער או ענבים",
            "לימונים או ליים",
            "עלי סלט / חסה",
            "תרד או כרוב עלים",
            "עגבניות",
            "מלפפונים",
            "גזר",
            "בצל",
            "שום",
            "פלפלים",
            "ברוקולי או כרובית",
            "תפוחי אדמה או בטטה",
            "אבוקדו",
            "עשבי תיבול טריים (פטרוזיליה, כוסברה או בזיליקום)",
          ],
        },
        {
          h2: "🥩 בשר וחלבון",
          paragraphs: [
            "תכננו שניים עד ארבעה חלבונים לשבוע והקפיאו עודפים אם לא תבשלו בקרוב. כללו גם אפשרויות מהצומח אם ככה אתם אוכלים.",
          ],
          items: [
            "עוף (חזה, ירכיים או עוף שלם)",
            "בשר טחון או הודו טחון",
            "דג או חסילונים",
            "ביצים",
            "טופו או טמפה",
            "שעועית או עדשים (בקופסה או יבשים)",
            "בשר מעדנייה או שאריות לארוחות צהריים",
            "אגוזים או חמאת אגוזים",
          ],
        },
        {
          h2: "🥛 מוצרי חלב",
          paragraphs: [
            "מוצרי חלב (ותחליפים) נגמרים מהר ברוב הבתים — חלב, יוגורט וגבינה הם בדרך כלל הבסיס השבועי.",
          ],
          items: [
            "חלב או תחליף חלב",
            "יוגורט או יוגורט יווני",
            "חמאה או מרגרינה",
            "גבינה (בלוק, פרוסה או מגורדת)",
            "גבינת שמנת או קוטג׳",
            "שמנת חמוצה או קרם פרש",
          ],
        },
        {
          h2: "🍞 לחם ודגנים",
          paragraphs: [
            "שמרו לפחות פחמימה יומיומית אחת וגיבוי לערבים עמוסים — לחם, טורטייה, אורז או פסטה מכסים את רוב השבועות.",
          ],
          items: [
            "לחם או לחמניות",
            "טורטיות או ראפים",
            "אורז",
            "פסטה",
            "שיבולת שועל או דגני בוקר",
            "קינואה או קוסקוס",
            "קרקרים",
          ],
        },
        {
          h2: "🧊 קפואים",
          paragraphs: [
            "קפואים מאריכים רשימת קניות שבועית כשהירקות הטריים נגמרים באמצע השבוע או שצריך ארוחה בלי הכנה.",
          ],
          items: [
            "ירקות קפואים (אפונה, תערובת, תרד)",
            "פירות קפואים לשייקים",
            "פיצה קפואה או ארוחות מוכנות",
            "גלידה או קינוח קפוא",
            "דג או עוף קפוא",
            "צ׳יפס או תפוחי אדמה מוכנים",
          ],
        },
        {
          h2: "🧂 מזווה",
          paragraphs: [
            "מצרכי מזווה לא חייבים קנייה כל שבוע — עברו על הרשימה והשלימו רק מה שאוזל. הסעיף הזה ברשימת הקניות מונע הפתעות באמצע המתכון.",
          ],
          items: [
            "שמן זית או שמן לבישול",
            "מלח ופלפל שחור",
            "אבקת שום / תבלינים שבשימוש תדיר",
            "רוטב סויה או חריף",
            "חומץ או רוטב לסלט",
            "עגבניות מקופסה",
            "טונה או סלמון בקופסה",
            "ציר או מרק",
            "רוטב לפסטה",
            "קמח או תערובת לאפייה",
            "סוכר או דבש",
            "קפה או תה",
            "חטיפים (צ׳יפס, חטיפי דגנים, פופקורן)",
          ],
        },
        {
          h2: "🧼 ניקיון",
          paragraphs: [
            "מוצרי ניקיון נגמרים בלוח זמנים משלהם. הוסיפו אותם לרשימת הבדיקה השבועית כשהבקבוקים נראים קלים — לא רק כשכבר נגמרו.",
          ],
          items: [
            "סבון כלים",
            "אבקה / טבליות למדיח",
            "חומר ניקוי כללי",
            "אבקת כביסה",
            "מגבות נייר",
            "שקיות אשפה",
            "ספוגים או מטליות",
            "נייר טואלט",
          ],
        },
        {
          h2: "🧴 טיפוח אישי",
          paragraphs: [
            "טיפוח אישי קל לשכוח עד שנגמר. שמרו תזכורת קצרה ברשימת הקניות השבועית כדי שמשחת שיניים וסבון לא יהפכו לריצה דחופה.",
          ],
          items: [
            "משחת שיניים",
            "מברשות שיניים / חוט דנטלי",
            "שמפו או מרכך",
            "סבון גוף או סבון מוצק",
            "דאודורנט",
            "סבון ידיים",
            "ניקוי פנים או לחות",
            "סכיני גילוח או קצף גילוח",
            "מוצרים להיגיינה נשית",
          ],
        },
        {
          h2: "הפכו את הרשימה לרשימת קניות משותפת",
          paragraphs: [
            "קונים עם מישהו נוסף? הפכו את רשימת הבדיקה הזו לרשימת קניות משותפת ותנו לכולם להוסיף או לסמן פריטים בזמן אמת.",
            "רשימה מודפסת עובדת לקונה אחד. כשבן/בת זוג, שותף לדירה או בן משפחה גם מוסיפים חלב מהבית — או מסמנים ביצים במחלקת החלב — רשימה משותפת נשארת מדויקת לכולם. כאן GroceryPair נכנסת לתמונה: חדר חינמי אחד, קוד הזמנה קצר, ורשימת קניות שבועית חיה בכל טלפון.",
            "העתיקו את הקטגוריות שצריך, דלגו על מה שלא, והמשיכו לדייק את רשימת הקניות השבועית עד שתתאים לאיך שהבית שלכם באמת אוכל.",
          ],
        },
      ],
      cta: "צרו רשימת קניות משותפת בחינם",
    },
  },
  {
    slug: "share-grocery-list-with-partner",
    path: "/blog/share-grocery-list-with-partner",
    date: "2026-09-16",
    en: {
      title: "How to Share a Grocery List With Your Partner in Real Time | GroceryPair",
      description:
        "Stop texting grocery lists back and forth. Learn how a real-time shared grocery list helps couples shop together, divide the aisle, and stay in sync at the store.",
      h1: "How to Share a Grocery List With Your Partner in Real Time",
      lead:
        "If you and your partner still send grocery lists over text or Notes, you already know the pattern: duplicate milk, missing eggs, and a mid-aisle “did we need butter?” call. A shared grocery list that updates in real time keeps one list for both of you — whether you shop together or split the trip.",
      publishedLabel: "Published September 16, 2026",
      sections: [
        {
          h2: "Why texting grocery lists back and forth doesn't work",
          paragraphs: [
            "Messaging apps are great for conversation, not for a living shopping list. One person types a list in WhatsApp. The other forwards a half-finished note. Someone checks off “bread” in their head but never tells you. By the time you’re at checkout, you’re guessing.",
            "Screenshots go stale the moment either of you remembers yogurt. Separate threads bury the list under dinner plans and memes. For couples, that friction adds up every week — especially when both of you add items from home and work.",
            "A grocery list for couples works better when it’s one shared shopping list both of you can open, edit, and check off — not a chain of messages you have to reconstruct in the parking lot.",
          ],
        },
        {
          h2: "How real-time shared grocery lists work",
          paragraphs: [
            "A real time grocery list is a single list that syncs instantly for everyone who shares it. When your partner adds bananas at home, you see bananas on your phone at the store. When you check off bananas in the produce aisle, the item is marked done for both of you.",
            "With GroceryPair, you create a free room, share a short code (or a WhatsApp invite), and both join the same space. There’s no account signup — just a shared grocery list you can open on any phone or computer. Add items, assign notes like “2% milk,” and organize by category so the store trip follows a natural path.",
            "That’s the core idea of a shared shopping list: one source of truth, updated live, so you’re not managing versions of the same list in three different apps.",
          ],
        },
        {
          h2: "How couples can divide grocery shopping",
          paragraphs: [
            "Some weeks you shop together. Other weeks one person runs into the store while the other finishes dinner prep. A shared grocery list for couples supports both styles.",
            "Split by aisle: one person handles produce and dairy while the other does pantry and household. Because the list updates in real time, you can each check items off without texting “got the chicken.”",
            "Split by errand: leave the full list open. Whoever is nearer the store picks up what’s left. Notes on items (“ripe avocados,” “store brand ok”) remove the back-and-forth that usually eats into the trip.",
            "You can also keep more than one list in the same room — weekly groceries, party supplies, pharmacy — so the shared shopping list stays clear instead of becoming one endless dump.",
          ],
        },
        {
          h2: "What happens when one person adds something while the other is shopping",
          paragraphs: [
            "This is where a real-time shared grocery list earns its keep. You’re already in the dairy aisle when your partner remembers cream cheese. They add it from the couch. It appears on your phone before you leave that section — no call, no screenshot, no “I’ll grab it next time.”",
            "The same works in reverse. If you can’t find an item, you can leave a note or remove it so your partner isn’t still expecting it when you get home. Check-offs sync both ways, so neither of you buys a second jar of peanut butter.",
            "Even offline, you can keep using the list; changes sync when you’re back online. For most store trips with a signal, updates land right away.",
          ],
        },
        {
          h2: "Shared grocery list vs. notes app vs. messaging app",
          paragraphs: [
            "Notes apps are fine for a solo list, but they rarely feel built for two people editing at once. You get conflicting copies, unclear check-offs, and little structure for categories or store flow.",
            "Messaging apps turn the list into chat history. Items get buried, edits are awkward, and there’s no clean way for both of you to mark what’s already in the cart.",
            "A dedicated shared grocery list — especially a grocery list app for couples that syncs in real time — is designed for that exact job: add, note, categorize, check off, and stay aligned while one or both of you are shopping. GroceryPair is free, works in the browser on iPhone and Android, and starts with a room code instead of another password to remember.",
          ],
        },
      ],
      cta: "Create a free shared grocery list",
    },
    he: {
      title: "איך לשתף רשימת קניות עם בן/בת הזוג בזמן אמת | GroceryPair",
      description:
        "די מלשלוח רשימות קניות בהודעות. כך רשימת קניות משותפת בזמן אמת עוזרת לזוגות לקנות ביחד, לחלק משימות ולהישאר מסונכרנים בסופר.",
      h1: "איך לשתף רשימת קניות עם בן/בת הזוג בזמן אמת",
      lead:
        "אם עדיין שולחים רשימות בוואטסאפ או בפתקים, אתם מכירים את התבנית: חלב כפול, ביצים ששכחו, ושיחת «צריך חמאה?» באמצע הסופר. רשימת קניות משותפת שמתעדכנת בזמן אמת משאירה רשימה אחת לשניכם — בין אם קונים ביחד או מחלקים את הסיבוב.",
      publishedLabel: "פורסם ב־16 בספטמבר 2026",
      sections: [
        {
          h2: "למה שליחת רשימות בהודעות לא עובדת",
          paragraphs: [
            "אפליקציות מסרים מעולות לשיחה — פחות לרשימת קניות חיה. אחד כותב בוואטסאפ, השני מעביר פתק חצי־גמור, מישהו «זוכר» שלקח לחם ולא מעדכן. בקופה כבר מנחשים.",
            "צילומי מסך מתיישנים ברגע שמישהו נזכר ביוגורט. שרשורים נפרדים קוברים את הרשימה מתחת לתכנון ארוחת ערב. לזוגות החיכוך הזה חוזר כל שבוע — במיוחד כששניהם מוסיפים פריטים מהבית ומהעבודה.",
            "רשימת קניות לזוגות עובדת טוב יותר כשיש רשימה משותפת אחת ששניכם יכולים לפתוח, לערוך ולסמן — לא שרשרת הודעות שצריך לשחזר בחניה.",
          ],
        },
        {
          h2: "איך עובדות רשימות קניות משותפות בזמן אמת",
          paragraphs: [
            "רשימת קניות בזמן אמת היא רשימה אחת שמסתנכרנת מיידית לכולם שמשתפים אותה. כשבני הזוג מוסיפים בננות בבית, אתם רואים אותן בטלפון בסופר. כשמסמנים בננות במחלקת הירקות — הסימון מופיע אצל שניכם.",
            "ב־GroceryPair יוצרים חדר חינמי, משתפים קוד קצר (או הזמנה בוואטסאפ), ושניכם נכנסים לאותו חלל. בלי הרשמה — רק רשימת קניות משותפת בכל טלפון או מחשב. מוסיפים פריטים, הערות כמו «חלב 2%», ומארגנים לפי קטגוריה כדי שהסיבוב בסופר יהיה מסודר.",
            "זו ליבת הרעיון של רשימת קניות משותפת: מקור אמת אחד, מעודכן בשידור חי, בלי לנהל גרסאות ב שלוש אפליקציות שונות.",
          ],
        },
        {
          h2: "איך זוגות יכולים לחלק את הקניות",
          paragraphs: [
            "יש שבועות שקונים ביחד, ויש שבועות שאחד נכנס לסופר והשני מסיים בבית. רשימת קניות משותפת לזוגות תומכת בשני הסגנונות.",
            "חלוקה לפי מחלקות: אחד ירקות וחלב, השני מזווה ובית. כי הרשימה מתעדכנת בזמן אמת, אפשר לסמן בלי לשלוח «לקחתי עוף».",
            "חלוקה לפי סיבוב: משאירים את הרשימה פתוחה. מי שקרוב לסופר משלים מה שנשאר. הערות על פריטים («אבוקדו בשל», «מותג ביתי בסדר») חוסכות את ההודעות שמאריכות את הקניות.",
            "אפשר גם כמה רשימות באותו חדר — קניות שבועיות, מסיבה, בית מרקחת — כדי שהרשימה המשותפת תישאר ברורה ולא הופכת לערימה אחת אינסופית.",
          ],
        },
        {
          h2: "מה קורה כשאחד מוסיף משהו בזמן שהשני בסופר",
          paragraphs: [
            "כאן רשימת קניות משותפת בזמן אמת באמת משתלמת. אתם במחלקת החלב, ובן/בת הזוג נזכרים בגבינת שמנת מהספה. הפריט מופיע אצלכם לפני שיוצאים מהמחלקה — בלי שיחה, בלי צילום מסך, בלי «בפעם הבאה».",
            "גם ההפך עובד. אם פריט לא נמצא, אפשר להוסיף הערה או להסיר אותו כדי שלא יחכו לו בבית. סימונים מסתנכרנים לשני הכיוונים, כדי שאף אחד לא יקנה צנצנת נוספת של חמאת בוטנים.",
            "גם בלי אינטרנט אפשר להמשיך להשתמש ברשימה; השינויים מסתנכרנים כשהחיבור חוזר. ברוב הסיבובים עם קליטה — העדכונים מגיעים מיד.",
          ],
        },
        {
          h2: "רשימת קניות משותפת מול פתקים מול הודעות",
          paragraphs: [
            "אפליקציות פתקים טובות לרשימה אישית, אבל פחות נוחות כששניים עורכים במקביל. מתקבלות עותקים מתנגשים, סימונים לא ברורים, ומעט מבנה לקטגוריות או למסלול בסופר.",
            "אפליקציות מסרים הופכות את הרשימה להיסטוריית צ׳אט. פריטים נקברים, עריכות מסורבלות, ואין דרך נקייה ששניכם תסמנו מה כבר בעגלה.",
            "רשימת קניות משותפת ייעודית — במיוחד אפליקציה לזוגות שמסתנכרנת בזמן אמת — בנויה בדיוק לזה: להוסיף, להעיר, לסווג, לסמן ולהישאר מתואמים כשאחד או שניכם בסופר. GroceryPair חינמית, עובדת בדפדפן באייפון ובאנדרואיד, ומתחילה עם קוד חדר במקום עוד סיסמה לזכור.",
          ],
        },
      ],
      cta: "צרו רשימת קניות משותפת בחינם",
    },
  },
];

export const BLOG_SEO = {
  path: "/blog",
  en: {
    title: "GroceryPair Blog – Shared Grocery Lists & Couples Shopping Tips",
    description:
      "Guides on shared grocery lists, real-time shopping with your partner, and how couples can stay in sync at the store.",
    h1: "Blog",
    lead: "Practical guides on shared shopping lists, real-time sync, and shopping together as a couple.",
  },
  he: {
    title: "בלוג GroceryPair – רשימות קניות משותפות וטיפים לזוגות",
    description:
      "מדריכים על רשימות קניות משותפות, קניות בזמן אמת עם בן/בת הזוג, ואיך להישאר מסונכרנים בסופר.",
    h1: "בלוג",
    lead: "מדריכים מעשיים על רשימות קניות משותפות, סנכרון בזמן אמת, וקניות משותפות כזוג.",
  },
};

export function getBlogPost(slug) {
  return BLOG_POSTS.find(post => post.slug === slug) ?? null;
}

export function blogIndexJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: BLOG_SEO.en.h1,
    url: `${SITE}${BLOG_SEO.path}`,
    description: BLOG_SEO.en.description,
    inLanguage: ["en", "he"],
    blogPost: BLOG_POSTS.map(post => ({
      "@type": "BlogPosting",
      headline: post.en.h1,
      url: `${SITE}${post.path}`,
      datePublished: post.date,
      description: post.en.description,
    })),
    isPartOf: {
      "@type": "WebApplication",
      name: "GroceryPair",
      url: `${SITE}/`,
    },
  };
}

export function blogPostJsonLd(post) {
  const en = post.en;
  const article = {
    "@type": "BlogPosting",
    headline: en.h1,
    description: en.description,
    datePublished: post.date,
    dateModified: post.date,
    url: `${SITE}${post.path}`,
    inLanguage: ["en", "he"],
    author: {
      "@type": "Organization",
      name: "GroceryPair",
      url: `${SITE}/`,
    },
    publisher: {
      "@type": "Organization",
      name: "GroceryPair",
      url: `${SITE}/`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE}${post.path}`,
    },
    isPartOf: {
      "@type": "Blog",
      name: "GroceryPair Blog",
      url: `${SITE}${BLOG_SEO.path}`,
    },
  };
  const faqs = en.sections.flatMap(section => section.faqs ?? []);
  if (!faqs.length) {
    return { "@context": "https://schema.org", ...article };
  }
  return {
    "@context": "https://schema.org",
    "@graph": [
      article,
      {
        "@type": "FAQPage",
        url: `${SITE}${post.path}`,
        mainEntity: faqs.map(faq => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };
}
