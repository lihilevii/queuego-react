# QueueGo

אפליקציית React לדיווח ובדיקת זמני המתנה בתורים במקומות ציבוריים - משרדי ממשלה, מרפאות, דואר ועוד.

**Live Demo:** [queuego-react-app.vercel.app](https://queuego-react-app.vercel.app)  
**GitHub:** [github.com/lihilevii/queuego-react-app](https://github.com/lihilevii/queuego-react-app)

---

## הבעיה

אנשים מגיעים למשרדי ממשלה, מרפאות ודואר בלי לדעת כמה עמוס שם. QueueGo פותרת את זה עם דיווחים בזמן אמת - משתמשים מדווחים, כולם נהנים.

## קהל יעד

- **אזרחים** שרוצים לתכנן את הביקור לפני שיוצאים מהבית
- **מבקרים קבועים** שרוצים לדעת מתי המקום שלהם פחות עמוס

---

## פיצ'רים

- **בית** - חיפוש וסינון מקומות, זמני המתנה חיים עם עדכון realtime
- **דיווח** - שליחת רמת עומס (נמוך / בינוני / גבוה) עם הערות
- **מועדפים** - שמירת מקומות עם לחצן לב
- **פרופיל** - היסטוריית דיווחים וסטטיסטיקות
- **אימות** - הרשמה/כניסה עם אימייל + Google OAuth

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite |
| Routing | React Router v7 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (Email + Google OAuth) |
| Real-time | Supabase Realtime (WebSockets) |
| Email | EmailJS |
| Deployment | Vercel |

---

## שירותים חיצוניים

| שירות | מטרה | שימוש באפליקציה |
|---|---|---|
| Supabase Auth | אימות משתמשים | הרשמה/כניסה עם אימייל וסיסמה + Google OAuth |
| Supabase Realtime | עדכונים חיים | כשמשתמש מדווח על תור, כל המשתמשים רואים את זה מיד בלי רענון |
| EmailJS | התראות מייל | שליחת מייל אישור מעוצב למשתמש אחרי כל דיווח |

---

## מסד הנתונים (ERD)

שלוש טבלאות ב-Supabase:

**`places`** - מקומות שירות ציבוריים  
**`queue_reports`** - דיווחי עומס שהוגשו על ידי משתמשים (FK ל-places ול-auth.users)  
**`favorites`** - מקומות שמורים של משתמשים (FK ל-places ול-auth.users, unique per pair)

קשרים:
- `queue_reports.place_id` → `places.id`
- `queue_reports.user_id` → `auth.users.id`
- `favorites.place_id` → `places.id`
- `favorites.user_id` → `auth.users.id`

> ראה `/supabase/schema.sql` לכל ה-SQL כולל RLS policies ו-seed data.

---

## הרצה מקומית

### 1. Clone והתקנה

```bash
git clone https://github.com/lihilevii/queuego-react-app.git
cd queuego-react-app
npm install
```

### 2. משתני סביבה

צור קובץ `.env.local` בתיקיית הפרויקט:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

VITE_EMAILJS_SERVICE_ID=your-service-id
VITE_EMAILJS_TEMPLATE_ID=your-template-id
VITE_EMAILJS_PUBLIC_KEY=your-public-key
```

### 3. הגדרת Supabase

1. צור project ב-[supabase.com](https://supabase.com)
2. SQL Editor - הרץ את `/supabase/schema.sql`
3. Authentication → Providers - הפעל Google OAuth
4. Realtime - הרץ: `alter publication supabase_realtime add table queue_reports;`

### 4. הגדרת EmailJS

1. צור חשבון ב-[emailjs.com](https://emailjs.com)
2. הוסף Email Service וצור Template עם המשתנים: `{{to_email}}`, `{{to_name}}`, `{{place_name}}`, `{{queue_level}}`, `{{notes}}`
3. העתק Service ID, Template ID ו-Public Key ל-`.env.local`

### 5. הרצה

```bash
npm run dev
```

---

## Deployment

האפליקציה deployed ל-Vercel עם CI/CD אוטומטי מ-GitHub.  
כל push ל-`main` מפעיל deploy חדש אוטומטית.
