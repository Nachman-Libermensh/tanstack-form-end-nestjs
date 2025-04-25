# TanStack Form with NestJS Backend

## Research Purpose | מטרת המחקר

This project was developed as part of a research initiative to formulate a strategy for rapid form creation in modern web applications. By exploring the integration between TanStack Form and NestJS, we aim to establish best practices and patterns that significantly reduce development time for complex forms.

פרויקט זה פותח כחלק ממחקר לגיבוש אסטרטגיה ליצירת טפסים במהירות ביישומי אינטרנט מודרניים. באמצעות בחינת האינטגרציה בין TanStack Form ו-NestJS, אנו שואפים לבסס שיטות עבודה מומלצות ודפוסים שמפחיתים משמעותית את זמן הפיתוח של טפסים מורכבים.

## Overview | סקירה כללית

A modern full-stack application that combines TanStack Form for frontend form management with NestJS as a robust backend framework. This project demonstrates a complete form handling solution with validation, submission, and data processing.

<!-- 583222702 -->

Key benefits of this approach:

- Rapid form development with less boilerplate
- Type-safety throughout the entire stack
- Consistent validation between frontend and backend
- Reusable components and patterns

אפליקציית פול-סטאק מודרנית המשלבת את TanStack Form לניהול טפסים בצד הלקוח יחד עם NestJS כמסגרת עבודה חזקה בצד השרת. הפרויקט מדגים פתרון מלא לטיפול בטפסים הכולל ולידציה, שליחה ועיבוד נתונים.

יתרונות מרכזיים בגישה זו:

- פיתוח מהיר של טפסים עם פחות קוד תבנית
- בטיחות טיפוסים לאורך כל המערכת
- ולידציה עקבית בין צד לקוח לצד שרת
- רכיבים ודפוסים ניתנים לשימוש חוזר

## Technologies | טכנולוגיות

### Frontend

- **React** - UI library
- **TanStack Form** - Form state management
- **TypeScript** - Type safety
- **TailwindCSS** - Styling (optional)

### Backend

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type safety
- **Validation Pipe** - Input validation
- **TypeORM/Mongoose** - Database integration

## Features | תכונות

- Type-safe form handling
- Server-side validation
- Real-time form feedback
- Efficient data processing
- REST API endpoints
- Full TypeScript integration

## Getting Started | התחלה

### Prerequisites | דרישות מקדימות

- Node.js (v14+)
- npm or yarn
- Git

### Installation | התקנה

```bash
# Clone the repository
git clone https://github.com/yourusername/tanstack-form-end-nestjs.git

# Navigate to project directory
cd tanstack-form-end-nestjs

# Install dependencies
npm install

# Start development servers
npm run dev
```

## Project Structure | מבנה הפרויקט

```
tanstack-form-end-nestjs/
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── forms/         # TanStack Form implementations
│   │   └── api/           # API integration
│   └── ...
│
├── server/                # NestJS backend
│   ├── src/
│   │   ├── modules/       # Feature modules
│   │   ├── dto/           # Data Transfer Objects
│   │   └── validation/    # Validation schemas
│   └── ...
│
└── README.md              # This file
```

## Usage | שימוש

1. Define your form schema using TanStack Form
2. Create corresponding DTOs in NestJS
3. Implement form submission and validation
4. Process form data in NestJS controllers
5. Return responses to update UI state

## Architecture | ארכיטקטורה

This project is built with **Next.js** on the client side and **NestJS** on the server side, with shared types and schemas stored in a common directory.

הפרויקט בנוי באמצעות **Next.js** בצד הלקוח ו-**NestJS** בצד השרת, כאשר הטיפוסים והסכימות המשותפים מאוחסנים בתיקייה משותפת.

### Shared Directory | תיקייה משותפת

The `shared` directory contains all common types, interfaces, and schemas used by both frontend and backend:

```
tanstack-form-end-nestjs/
├── shared/
│   ├── types/         # Common TypeScript interfaces
│   ├── schemas/       # Validation schemas
│   ├── constants/     # Shared constants
│   └── utils/         # Shared utility functions
```

To use the shared directory:

1. Navigate to the shared directory and build it:

```bash
cd shared
npm run build
```

2. Link the shared package:

```bash
npm link
```

3. Link to the shared package from both client and server:

```bash
# In client directory
cd ../client
npm link @project/shared

# In server directory
cd ../server
npm link @project/shared
```

תיקיית `shared` מכילה את כל הטיפוסים, הממשקים והסכימות המשותפים המשמשים הן את צד הלקוח והן את צד השרת. כדי להשתמש בתיקייה המשותפת, יש לבצע build בתיקייה ולקשר אותה באמצעות npm link כמתואר למעלה.

## Multilingual Support | תמיכה ברב-לשוניות

The application supports multiple languages. Language files are stored in the `messages` directory in the root folder. To add a new language, create a new JSON file in this directory.

האפליקציה תומכת במספר שxxx. קבצי השפה מאוחסנים בתיקיית `messages` בתיקיית השורש. להוספת שפה חדשה, יש ליצור קובץ JSON חדש בתיקייה זו.

```
messages/
├── en.json      # English translations
├── he.json      # Hebrew translations
└── fr.json      # French translations (example)
```

## Component Libraries | ספריות קומפוננטות

The form components support switching between different UI libraries:

- **RizzUI** - Modern, customizable component library
- **shadcn/ui** - High-quality, accessible components built with Radix UI and Tailwind CSS

To switch between libraries, use the provided configuration options in the form components.

קומפוננטות הטפסים מאפשרות מעבר בין ספריות ממשק משתמש שונות:

- **RizzUI** - ספריית קומפוננטות מודרנית וניתנת להתאמה אישית
- **shadcn/ui** - קומפוננטות איכותיות ונגישות שנבנו עם Radix UI ו-Tailwind CSS

למעבר בין הספריות, יש להשתמש באפשרויות התצורה המסופקות בקומפוננטות הטפסים.

## Upcoming Features | תכונות עתידיות

### Form Generator | מחולל טפסים

The project will include a form generator that allows creating forms using drag-and-drop and simple configurations. This will significantly speed up form development.

הפרויקט יכלול בהמשך מחולל טפסים המאפשר יצירת טפסים באמצעות גרירה ושחרור והגדרות פשוטות. זה יאיץ משמעותית את פיתוח הטפסים.

### Form Examples | דוגמאות טפסים

A wide range of form examples will be included to demonstrate various use cases and implementation patterns.

מגוון רחב של דוגמאות טפסים ייכלל בפרויקט כדי להדגים מקרי שימוש שונים ודפוסי מימוש.

## API Documentation | תיעוד API

The API documentation is available at `/api/docs` when the server is running.

תיעוד ה-API זמין בכתובת `/api/docs` כאשר השרת פועל.

## Contributing | תרומה לפרויקט

Contributions are welcome! Please feel free to submit a Pull Request.

תרומות יתקבלו בברכה! אל תהססו להגיש בקשת משיכה.

## License | רישיון

This project is licensed under the MIT License - see the LICENSE file for details.

פרויקט זה מורשה תחת רישיון MIT - ראו את קובץ הרישיון לפרטים נוספים.
