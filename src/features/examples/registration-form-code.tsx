import { CodeBlock } from "@/components/ui/code-block";

export function RegistrationFormCode() {
  const code = `"use client";

import { Button } from "@/components/ui/button";
import { useAppForm } from "@/components/shadcn-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";

// טווח גילאים תקין
const MIN_AGE = 16;
const MAX_AGE = 120;

// חוזק סיסמה עם רגקס
const passwordStrengthRegex = {
  // לפחות אות אחת גדולה, אות אחת קטנה, ספרה אחת ותו מיוחד אחד
  strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/,
  // לפחות אות אחת גדולה, אות אחת קטנה וספרה אחת
  medium: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$/,
  // לפחות 8 תווים
  weak: /.{8,}$/
};

export default function RegistrationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // סכמה לוולידציה
  const schema = z.object({
    fullName: z.string().min(2, "שם מלא הוא שדה חובה"),
    email: z.string().email("כתובת מייל לא חוקית"),
    age: z.coerce.number()
      .min(MIN_AGE, \`גיל מינימלי הוא \${MIN_AGE}\`)
      .max(MAX_AGE, \`גיל מקסימלי הוא \${MAX_AGE}\`)
      .optional(),
    password: z.string()
      .min(8, "סיסמה חייבת להיות לפחות 8 תווים")
      .refine(
        (password) => passwordStrengthRegex.medium.test(password),
        "הסיסמה חייבת לכלול אותיות גדולות וקטנות ומספרים"
      ),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, "יש לאשר את תנאי השימוש"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "הסיסמאות אינן תואמות",
    path: ["confirmPassword"],
  });
  
  // הגדרת הטופס
  const form = useAppForm({
    defaultValues: {
      fullName: "",
      email: "",
      age: undefined,
      password: "",
      confirmPassword: "",
      terms: false,
    },
    onSubmit: ({ value }) => {
      console.log("Form submitted:", value);
      
      setTimeout(() => {
        toast.success("הרשמה בוצעה בהצלחה!", {
          description: "נשלח מייל אימות לכתובת שהזנת",
        });
        setIsSubmitted(true);
      }, 1000);
    },
    validators: {
      onSubmit: schema,
      onChange: schema,
    },
  });

  if (isSubmitted) {
    return (
      <Alert className="bg-primary/10 border-primary/20">
        <CheckCircle2 className="h-4 w-4 text-primary" />
        <AlertDescription>
          ההרשמה הושלמה בהצלחה! בדוק את תיבת המייל שלך להמשך התהליך.
        </AlertDescription>
      </Alert>
    );
  }

  // לוגיקה לבדיקת חוזק סיסמה
  const getPasswordStrength = (password) => {
    if (!password || password.length < 8) {
      return { strength: 'weak', color: 'bg-destructive' };
    }
    
    if (passwordStrengthRegex.strong.test(password)) {
      return { strength: 'strong', color: 'bg-green-500' };
    }
    
    if (passwordStrengthRegex.medium.test(password)) {
      return { strength: 'medium', color: 'bg-yellow-500' };
    }
    
    return { strength: 'weak', color: 'bg-destructive' };
  };

  const password = form.getFieldState("password").value || "";
  const passwordStrength = getPasswordStrength(password);

  return (
    <form.FormLayout onSubmit={form.handleSubmit}>
      {/* שם מלא */}
      <form.AppField name="fullName">
        {(field) => (
          <field.TextField 
            label="שם מלא"
            placeholder="הכנס את שמך המלא"
            required
          />
        )}
      </form.AppField>
      
      {/* דוא"ל */}
      <form.AppField name="email">
        {(field) => (
          <field.TextField 
            label="דוא״ל"
            placeholder="הכנס את כתובת המייל שלך"
            type="email"
            required
          />
        )}
      </form.AppField>
      
      {/* גיל */}
      <form.AppField name="age">
        {(field) => (
          <field.TextField 
            label="גיל"
            placeholder="הכנס את גילך"
            type="number"
            helperText={\`גיל חייב להיות בין \${MIN_AGE} ל-\${MAX_AGE}\`}
          />
        )}
      </form.AppField>
      
      {/* סיסמה */}
      <form.AppField name="password">
        {(field) => (
          <div>
            <field.PasswordInput 
              label="סיסמה"
              placeholder="בחר סיסמה חזקה"
              required
            />
            
            {/* מחוון חוזק סיסמה */}
            {password.length > 0 && (
              <div className="mt-2">
                <div className="text-xs mb-1">
                  חוזק סיסמה: <span className="font-semibold">
                    {passwordStrength.strength === 'weak' ? 'חלשה' : 
                     passwordStrength.strength === 'medium' ? 'בינונית' : 'חזקה'}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={\`h-full \${passwordStrength.color} transition-all duration-300\`}
                    style={{ width: password.length < 8 ? '33%' : passwordStrength.strength === 'medium' ? '66%' : '100%' }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        )}
      </form.AppField>
      
      {/* אימות סיסמה */}
      <form.AppField name="confirmPassword">
        {(field) => (
          <field.PasswordInput 
            label="אימות סיסמה"
            placeholder="הקלד שוב את הסיסמה"
            required
          />
        )}
      </form.AppField>
      
      {/* תנאי שימוש */}
      <form.AppField name="terms">
        {(field) => (
          <field.CheckboxField
            label="אני מאשר את תנאי השימוש"
            description="אני מסכים לתנאי השימוש ומדיניות הפרטיות"
          />
        )}
      </form.AppField>
      
      {/* כפתור שליחה */}
      <form.SubmitButton>הירשם</form.SubmitButton>
    </form.FormLayout>
  );
}`;

  return <CodeBlock filename="RegistrationForm.tsx" code={code} language="tsx" />;
}