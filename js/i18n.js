import { createContext, useContext } from "react";
import { FAQ_ITEMS, PAGE_SEO } from "./seoPages.js";

export const TRANSLATIONS = {
  en: {
    // ── JoinScreen ──────────────────────────────────────────────────────────
    tagline:            "Shop together in real time. Share one list, everyone sees every change.",
    welcomeBack:        "Welcome back!",
    rejoin:             "Rejoin",
    differentRoom:      "Sign in to a different room",
    joinRoom:           "Join an existing room",
    roomCodePlaceholder:"Room code",
    joinBtn:            "Join",
    orDivider:          "or",
    createRoom:         "Create a new room",
    spaceNamePlaceholder:"Family space name (e.g. The Glazers)",
    spaceNameHint:      "The name of your family shopping space",
    yourRoomCode:       "Your room code:",
    shareWithFamily:    " — share this with your family",
    createBtn:          "Create space",
    // errors
    roomNoLongerExists: "This room no longer exists.",
    connectFailed:      "Failed to connect. Check your internet connection.",
    invalidCode:        "Enter a valid room code",
    roomNotFound:       "Room not found. Double-check the code.",
    enterSpaceName:     "Enter a family space name",
    codeGenFailed:      "Could not generate a unique room code. Please try again.",
    createRoomFailed:   "Failed to create room. Please try again.",

    // ── ListsView ───────────────────────────────────────────────────────────
    newListPlaceholder: "New list name…",
    addListBtn:         "+ List",
    loadingLists:       "Loading lists…",
    activeLists:        "Active lists",
    item:               "item",
    items:              "items",
    noLists:            "No lists yet. Create one above!",
    lostConnection:     "Lost connection. Please refresh.",
    createListFailed:   "Failed to create list. Please try again.",
    deleteList:         "Delete list",
    deleteListFailed:   "Failed to delete list.",
    deleteListTitle:    "Delete this list?",
    deleteListMessage:  (name) => `“${name}” and all its items will be permanently deleted.`,
    deleteListConfirm:  "Delete",
    cancel:             "Cancel",
    inviteFamily:       "Invite family via WhatsApp",
    shareViaWhatsApp:   "Send room via WhatsApp",
    leaveRoom:          "Leave room",
    listHistory:        "List History",
    // share room
    shareRoomText:      (spaceName, roomId) =>
      `You're invited to join "${spaceName}" on GroceryPair! 🛒\n\nRoom code: ${roomId}\nOpen the app: https://www.grocerypair.com/\n\nWe can share shopping lists in real time!`,
    shareRoomTitle:     (spaceName) => `Join ${spaceName} on GroceryPair`,

    // ── ListDetail ──────────────────────────────────────────────────────────
    tapToRename:        "Tap to rename",
    shareList:          "Share list",
    archiveList:        "Archive list",
    clearChecked:       "Clear ✓",
    clearCheckedTitle:  "Clear checked items?",
    clearCheckedMessage:(n) => n === 1
      ? "Remove 1 checked item from this list?"
      : `Remove ${n} checked items from this list?`,
    clearCheckedConfirm:"Clear",
    listeningPlaceholder:"Listening…",
    addItemPlaceholder: "Add item…",
    notePlaceholder:    "Note (e.g. 2% fat)",
    assignPlaceholder:  "Assign to…",
    hideDetails:        "Hide details",
    addDetails:         "Add note / assign",
    categoryLabel:      "Category:",
    leftCount:          (n) => `${n} left`,
    doneLabel:          "✓ done",
    emptyList:          "List is empty. Add your first item below!",
    alreadyInList:      (text) => `⚠️ "${text}" is already in this list`,
    uncheckItem:        "Uncheck item",
    checkItem:          "Check item",
    deleteItem:         "Delete item",
    switchLang:         "Switch recording language",
    stopRecording:      "Stop recording",
    speakToAdd:         "Speak items to add them",
    // errors
    micError:           (msg) => `Microphone error: ${msg}`,
    listDeleted:        "This list was deleted.",
    listLostConnection: "Lost connection. Please refresh.",
    addItemFailed:      "Failed to add item. Please try again.",
    updateItemFailed:   "Failed to update item.",
    deleteItemFailed:   "Failed to delete item.",
    clearCheckedFailed: "Failed to clear checked items.",
    archiveFailed:      "Failed to archive list.",
    renameFailed:       "Failed to rename list.",
    // share list
    shareListAlreadyGot:(n) => `✓ Already got (${n}):`,
    shareListFooter:    "Shared via GroceryPair 🛒",

    // ── HistoryView ─────────────────────────────────────────────────────────
    listHistoryTitle:   "List History",
    loadingHistory:     "Loading history…",
    noArchivedLists:    "No archived lists yet.",
    itemsCount:         (n) => `${n} items`,

    // ── App ─────────────────────────────────────────────────────────────────
    offlineBanner:      "You're offline — changes will sync when you reconnect",
    back:               "Back",
    backToLists:        "Back to lists",
    footerNav:          "Site pages",
    aboutNav:           "About",
    faqNav:             "FAQ",

    // ── About ───────────────────────────────────────────────────────────────
    aboutTitle:         "About",
    aboutDocTitle:      PAGE_SEO.about.en.title,
    aboutDocDesc:       PAGE_SEO.about.en.description,
    aboutLead:          "GroceryPair is a free shared shopping list for families and roommates. One list, everyone sees every change — at the store or at home.",
    aboutHowTitle:      "How it works",
    aboutStep1:         "Create a family room. You get a short code — no sign-up, no email.",
    aboutStep2:         "Share the code (or a WhatsApp invite) so everyone joins the same room.",
    aboutStep3:         "Add items, check them off, and the list updates for everyone instantly.",
    aboutFeaturesTitle: "What you can do",
    aboutFeature1:      "🛒 Shared lists that sync in real time",
    aboutFeature2:      "🎙 Voice input — speak items to add them",
    aboutFeature3:      "🥦 Auto categories like Produce, Dairy, and Bakery",
    aboutFeature4:      "📴 Works offline and syncs when you’re back online",
    aboutFeature5:      "עב Hebrew and English, including right-to-left layout",
    aboutPrivacyTitle:  "Privacy",
    aboutPrivacy:       "There is no account. Access is the room code: anyone who has it can see and edit that room’s lists. Don’t share the code outside your household.",
    aboutCta:           "Start a list",

    // ── FAQ ─────────────────────────────────────────────────────────────────
    faqTitle:           "FAQ",
    faqDocTitle:        PAGE_SEO.faq.en.title,
    faqDocDesc:         PAGE_SEO.faq.en.description,
    faqLead:            "Quick answers about rooms, sharing, and using the list.",
    faqItems:           FAQ_ITEMS.en,
  },

  he: {
    // ── JoinScreen ──────────────────────────────────────────────────────────
    tagline:            "קנו ביחד בזמן אמת. רשימה אחת משותפת — כולם רואים כל שינוי מיידית.",
    welcomeBack:        "!ברוך שובך",
    rejoin:             "חזור ל",
    differentRoom:      "התחבר לחדר אחר",
    joinRoom:           "הצטרף לחדר קיים",
    roomCodePlaceholder:"קוד חדר",
    joinBtn:            "הצטרף",
    orDivider:          "או",
    createRoom:         "צור חדר חדש",
    spaceNamePlaceholder:"שם המשפחה (למשל: משפחת גלזר)",
    spaceNameHint:      "שם חלל הקניות המשפחתי",
    yourRoomCode:       "קוד החדר שלך:",
    shareWithFamily:    " — שתפו עם המשפחה",
    createBtn:          "צור חדר",
    // errors
    roomNoLongerExists: "החדר הזה כבר לא קיים.",
    connectFailed:      "החיבור נכשל. בדקו את חיבור האינטרנט.",
    invalidCode:        "הכניסו קוד חדר תקין",
    roomNotFound:       "החדר לא נמצא. בדקו שוב את הקוד.",
    enterSpaceName:     "הכניסו שם לחדר",
    codeGenFailed:      "לא הצלחנו ליצור קוד חדר ייחודי. נסו שוב.",
    createRoomFailed:   "יצירת החדר נכשלה. נסו שוב.",

    // ── ListsView ───────────────────────────────────────────────────────────
    newListPlaceholder: "שם הרשימה החדשה…",
    addListBtn:         "רשימה +",
    loadingLists:       "טוען רשימות…",
    activeLists:        "רשימות פעילות",
    item:               "פריט",
    items:              "פריטים",
    noLists:            "אין רשימות עדיין. צרו אחת למעלה!",
    lostConnection:     "איבדנו חיבור. רעננו את הדף.",
    createListFailed:   "יצירת הרשימה נכשלה. נסו שוב.",
    deleteList:         "מחק רשימה",
    deleteListFailed:   "מחיקת הרשימה נכשלה.",
    deleteListTitle:    "למחוק את הרשימה?",
    deleteListMessage:  (name) => `הרשימה “${name}” וכל הפריטים שלה יימחקו לצמיתות.`,
    deleteListConfirm:  "מחק",
    cancel:             "ביטול",
    inviteFamily:       "הזמן את המשפחה בוואטסאפ",
    shareViaWhatsApp:   "שלח חדר בוואטסאפ",
    leaveRoom:          "צא מהחדר",
    listHistory:        "ארכיון",
    // share room
    shareRoomText:      (spaceName, roomId) =>
      `הוזמנתם להצטרף ל"${spaceName}" ב-GroceryPair! 🛒\n\nקוד חדר: ${roomId}\nפתחו את האפליקציה: https://www.grocerypair.com/\n\nנוכל לשתף רשימות קניות בזמן אמת!`,
    shareRoomTitle:     (spaceName) => `הצטרף ל${spaceName} ב-GroceryPair`,

    // ── ListDetail ──────────────────────────────────────────────────────────
    tapToRename:        "לחץ לשינוי שם",
    shareList:          "שתף רשימה",
    archiveList:        "העבר לארכיון",
    clearChecked:       "נקה ✓",
    clearCheckedTitle:  "לנקות פריטים מסומנים?",
    clearCheckedMessage:(n) => n === 1
      ? "להסיר פריט מסומן אחד מהרשימה?"
      : `להסיר ${n} פריטים מסומנים מהרשימה?`,
    clearCheckedConfirm:"נקה",
    listeningPlaceholder:"מאזין…",
    addItemPlaceholder: "הוסף פריט…",
    notePlaceholder:    "הערה (למשל: 3% שומן)",
    assignPlaceholder:  "הקצה ל...",
    hideDetails:        "הסתר פרטים",
    addDetails:         "הוסף הערה / הקצה",
    categoryLabel:      "קטגוריה:",
    leftCount:          (n) => `נותרו ${n}`,
    doneLabel:          "✓ סיימנו",
    emptyList:          "הרשימה ריקה. הוסיפו פריט ראשון למטה!",
    alreadyInList:      (text) => `⚠️ "${text}" כבר קיים ברשימה`,
    uncheckItem:        "בטל סימון",
    checkItem:          "סמן כנקנה",
    deleteItem:         "מחק פריט",
    switchLang:         "החלף שפת הקלטה",
    stopRecording:      "עצור הקלטה",
    speakToAdd:         "הקלט פריטים להוספה",
    // errors
    micError:           (msg) => `שגיאת מיקרופון: ${msg}`,
    listDeleted:        "הרשימה הזו נמחקה.",
    listLostConnection: "איבדנו חיבור. רעננו את הדף.",
    addItemFailed:      "הוספת הפריט נכשלה. נסו שוב.",
    updateItemFailed:   "עדכון הפריט נכשל.",
    deleteItemFailed:   "מחיקת הפריט נכשלה.",
    clearCheckedFailed: "ניקוי הפריטים המסומנים נכשל.",
    archiveFailed:      "העברת הרשימה לארכיון נכשלה.",
    renameFailed:       "שינוי שם הרשימה נכשל.",
    // share list
    shareListAlreadyGot:(n) => `✓ כבר יש לנו (${n}):`,
    shareListFooter:    "שותף דרך GroceryPair 🛒",

    // ── HistoryView ─────────────────────────────────────────────────────────
    listHistoryTitle:   "ארכיון רשימות",
    loadingHistory:     "טוען היסטוריה…",
    noArchivedLists:    "אין רשימות בארכיון עדיין.",
    itemsCount:         (n) => `${n} פריטים`,

    // ── App ─────────────────────────────────────────────────────────────────
    offlineBanner:      "אין חיבור לאינטרנט — השינויים יסונכרנו כשהחיבור יחזור",
    back:               "חזרה",
    backToLists:        "חזרה לרשימות",
    footerNav:          "דפי האתר",
    aboutNav:           "אודות",
    faqNav:             "שאלות נפוצות",

    // ── About ───────────────────────────────────────────────────────────────
    aboutTitle:         "אודות",
    aboutDocTitle:      PAGE_SEO.about.he.title,
    aboutDocDesc:       PAGE_SEO.about.he.description,
    aboutLead:          "GroceryPair היא רשימת קניות משותפת חינמית למשפחות ולשותפים לדירה. רשימה אחת — כולם רואים כל שינוי, בסופר או בבית.",
    aboutHowTitle:      "איך זה עובד",
    aboutStep1:         "יוצרים חדר משפחתי. מקבלים קוד קצר — בלי הרשמה ובלי אימייל.",
    aboutStep2:         "משתפים את הקוד (או הזמנה בוואטסאפ) כדי שכולם ייכנסו לאותו חדר.",
    aboutStep3:         "מוסיפים פריטים, מסמנים מה נקנה, והרשימה מתעדכנת אצל כולם מיידית.",
    aboutFeaturesTitle: "מה אפשר לעשות",
    aboutFeature1:      "🛒 רשימות משותפות שמסתנכרנות בזמן אמת",
    aboutFeature2:      "🎙 קלט קולי — מקליטים פריטים להוספה",
    aboutFeature3:      "🥦 קטגוריות אוטומטיות כמו ירקות, חלב ומאפייה",
    aboutFeature4:      "📴 עובד בלי אינטרנט ומסתנכרן כשהחיבור חוזר",
    aboutFeature5:      "EN עברית ואנגלית, כולל תצוגה מימין לשמאל",
    aboutPrivacyTitle:  "פרטיות",
    aboutPrivacy:       "אין חשבון משתמש. הגישה היא קוד החדר: כל מי שיש לו את הקוד יכול לראות ולערוך את הרשימות. אל תשתפו את הקוד מחוץ לבית.",
    aboutCta:           "התחילו רשימה",

    // ── FAQ ─────────────────────────────────────────────────────────────────
    faqTitle:           "שאלות נפוצות",
    faqDocTitle:        PAGE_SEO.faq.he.title,
    faqDocDesc:         PAGE_SEO.faq.he.description,
    faqLead:            "תשובות קצרות על חדרים, שיתוף ושימוש ברשימה.",
    faqItems:           FAQ_ITEMS.he,
  },
};

export const LanguageContext = createContext("he");

/**
 * Returns a translation function `t(key, ...args)` for the current language.
 * For string values: t("key")
 * For function values: t("key", arg1, arg2, ...)
 * Falls back to English if the key is missing in the active language.
 */
export function useT() {
  const lang = useContext(LanguageContext);
  return (key, ...args) => {
    const val = TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
    return typeof val === "function" ? val(...args) : val;
  };
}
