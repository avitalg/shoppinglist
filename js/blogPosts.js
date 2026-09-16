import { SITE } from "./seoPages.js";

/** @typedef {{ h2: string, paragraphs?: string[], items?: string[] }} BlogSection */
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
  return {
    "@context": "https://schema.org",
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
}
