import { TravelFormData } from '../App';

export interface GeneratedTravelPlan {
  destination: string;
  duration: string;
  budget: number;
  itinerary: Array<{
    day: number;
    title: string;
    activities: string[];
    estimatedCost: number;
    timeOfDay: string;
  }>;
  recommendations: string[];
  weatherInfo: string;
  budgetBreakdown: {
    accommodation: number;
    food: number;
    activities: number;
    transportation: number;
    miscellaneous: number;
  };
  localTips: string[];
  emergencyInfo: string[];
}

class OpenAIService {
  private apiKey: string;
  private baseURL = 'https://api.openai.com/v1/chat/completions';

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
    if (!this.apiKey) {
      console.warn('OpenAI API key not found. Using mock data.');
    }
  }

  async generateTravelPlan(formData: TravelFormData): Promise<GeneratedTravelPlan> {
    if (!this.apiKey) {
      return this.generateMockPlan(formData);
    }

    try {
      const prompt = this.createPrompt(formData);
      
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `אתה מתכנן טיולים מומחה עם ניסיון רב. תמיד תכתב תשובות בעברית. 
              צור תוכנית טיול מפורטת וריאליסטית שתתאים בדיוק להעדפות המשתמש. 
              תכלול פרטים מעשיים, עלויות מדויקות, וטיפים מקומיים חשובים.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('No content received from OpenAI');
      }

      return this.parseTravelPlan(content, formData);
      
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      return this.generateMockPlan(formData);
    }
  }

  private createPrompt(formData: TravelFormData): string {
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return `
תכנן לי טיול מפורט עם הפרטים הבאים:

**פרטי הטיול:**
- יעד: ${formData.destination}
- תאריכים: ${formData.startDate} עד ${formData.endDate} (${duration} ימים)
- מספר נוסעים: ${formData.travelers}
- תקציב כולל: ${formData.budget} ש"ח
- סגנון טיול: ${formData.travelStyle}
- תחומי עניין: ${formData.interests.join(', ')}

**בקשות:**
1. צור תוכנית יום ביום מפורטת עם פעילויות קונקרטיות
2. חשב עלויות משוערות לכל יום
3. תן המלצות מעשיות וטיפים מקומיים
4. כלול מידע על מזג האויר הצפוי
5. פרט את חלוקת התקציב
6. הוסף מידע חירום חשוב

תקח בחשבון את סגנון הטיול (${formData.travelStyle}) ואת תחומי העניין הנבחרים.
תוודא שהתוכנית מתאימה למספר הנוסעים ולתקציב.

אנא החזר את התשובה בפורמט JSON עם המבנה הבא:
{
  "itinerary": [
    {
      "day": 1,
      "title": "כותרת היום",
      "activities": ["פעילות 1", "פעילות 2"],
      "estimatedCost": 500,
      "timeOfDay": "בוקר/צהריים/ערב"
    }
  ],
  "recommendations": ["המלצה 1", "המלצה 2"],
  "weatherInfo": "מידע מזג אוויר",
  "budgetBreakdown": {
    "accommodation": 2000,
    "food": 1500,
    "activities": 1000,
    "transportation": 800,
    "miscellaneous": 700
  },
  "localTips": ["טיפ 1", "טיפ 2"],
  "emergencyInfo": ["מידע חירום 1", "מידע חירום 2"]
}
`;
  }

  private parseTravelPlan(content: string, formData: TravelFormData): GeneratedTravelPlan {
    try {
      // נסה לחלץ JSON מהתשובה
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedData = JSON.parse(jsonMatch[0]);
        
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);
        const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        
        return {
          destination: formData.destination,
          duration: `${duration} ימים`,
          budget: formData.budget,
          itinerary: parsedData.itinerary || [],
          recommendations: parsedData.recommendations || [],
          weatherInfo: parsedData.weatherInfo || 'מידע מזג אוויר לא זמין',
          budgetBreakdown: parsedData.budgetBreakdown || {
            accommodation: Math.floor(formData.budget * 0.4),
            food: Math.floor(formData.budget * 0.3),
            activities: Math.floor(formData.budget * 0.2),
            transportation: Math.floor(formData.budget * 0.08),
            miscellaneous: Math.floor(formData.budget * 0.02)
          },
          localTips: parsedData.localTips || [],
          emergencyInfo: parsedData.emergencyInfo || []
        };
      }
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
    }
    
    // במקרה של שגיאה, החזר תוכנית mock
    return this.generateMockPlan(formData);
  }

  private generateMockPlan(formData: TravelFormData): GeneratedTravelPlan {
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const mockItinerary = [];
    for (let day = 1; day <= Math.min(duration, 7); day++) {
      mockItinerary.push({
        day,
        title: `יום ${day} - חקירה ב${formData.destination}`,
        activities: [
          'ביקור באטרקציה מרכזית',
          'סיור ברובע ההיסטורי',
          'ארוחה במסעדה מקומית מומלצת',
          'קניות בשוק המקומי'
        ],
        estimatedCost: Math.floor(formData.budget / duration * 0.8),
        timeOfDay: day % 3 === 1 ? 'בוקר' : day % 3 === 2 ? 'צהריים' : 'ערב'
      });
    }

    return {
      destination: formData.destination,
      duration: `${duration} ימים`,
      budget: formData.budget,
      itinerary: mockItinerary,
      recommendations: [
        'הזמינו מקומות מראש בעונת השיא',
        'קחו ביטוח נסיעות מקיף',
        'למדו מילים בסיסיות בשפה המקומית',
        'בדקו מזג האויר לפני הנסיעה',
        'שמרו על עותקים דיגיטליים של המסמכים החשובים'
      ],
      weatherInfo: 'מזג אוויר נעים וחם, מומלץ להביא בגדי קיץ וכובע',
      budgetBreakdown: {
        accommodation: Math.floor(formData.budget * 0.4),
        food: Math.floor(formData.budget * 0.25),
        activities: Math.floor(formData.budget * 0.2),
        transportation: Math.floor(formData.budget * 0.1),
        miscellaneous: Math.floor(formData.budget * 0.05)
      },
      localTips: [
        'השתמשו בתחבורה ציבורית לחיסכון',
        'אכלו במקומות שבהם אוכלים המקומיים',
        'למדו על המנהגים המקומיים',
        'הכינו רשימת ביטויים בשפה המקומית'
      ],
      emergencyInfo: [
        'מספר חירום מקומי: 112',
        'כתובת השגרירות הישראלית במקום',
        'מספר הטלפון של חברת הביטוח',
        'מקום הקרוב ביותר לקבלת עזרה רפואית'
      ]
    };
  }
}

export const openAIService = new OpenAIService();
