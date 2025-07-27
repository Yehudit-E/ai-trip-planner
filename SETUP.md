# הוראות הפעלה מהירות

## הגדרת API Key

1. קבל API Key מ-OpenAI:
   - כנס ל-https://platform.openai.com/api-keys
   - צור API Key חדש
   
2. הגדר את המשתנה:
   - פתח את הקובץ `.env`
   - החלף את `your_api_key_here` עם ה-API Key שלך
   - דוגמה: `VITE_OPENAI_API_KEY=sk-...`

## הפעלת האפליקציה

1. התקנת תלויות:
   ```bash
   npm install
   ```

2. הפעלת שרת הפיתוח:
   ```bash
   npm run dev
   ```

3. פתח את הדפדפן ב: http://localhost:5173

## בניית הפרויקט לייצור

```bash
npm run build
```

## תכונות

- ✨ תכנון טיולים מבוסס AI
- 🎨 עיצוב מתקדם עם אנימציות
- 📱 תמיכה מלאה בעברית ו-RTL
- 🌐 אינטגרציה עם OpenAI GPT

## בעיות נפוצות

### האפליקציה לא מתחילה
- ודא שהתקנת את כל התלויות עם `npm install`
- בדוק שיש לך גרסת Node.js 16 או גבוהה יותר

### GPT לא עובד
- ודא שהגדרת את ה-API Key ב`.env`
- בדוק שה-API Key תקף ויש לך זיכוי ב-OpenAI
- האפליקציה תעבוד גם ללא API Key עם נתונים דמה
