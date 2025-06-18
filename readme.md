# TanStack Form Builder & Playground

## Research Purpose | מטרת המחקר

This project was developed as part of a research initiative to create a comprehensive form builder solution for modern web applications. By focusing on TanStack Form capabilities and providing rapid form creation tools, we aim to establish best practices and patterns that significantly reduce development time for complex forms across different frameworks.

פרויקט זה פותח כחלק ממחקר ליצירת פתרון מקיף לבנאי טפסים עבור יישומי אינטרנט מודרניים. על ידי התמקדות ביכולות TanStack Form ומתן כלים ליצירת טפסים במהירות, אנו שואפים לבסס שיטות עבודה מומלצות ודפוסים שמפחיתים משמעותית את זמן הפיתוח של טפסים מורכבים בין מסגרות עבודה שונות.

## Overview | סקירה כללית

A powerful form builder and playground built specifically for TanStack Form. This project provides a complete solution for creating, customizing, and managing forms with advanced features like drag-and-drop form creation, real-time validation, and multi-framework compatibility. As an added benefit, it can generate DTOs compatible with various backend frameworks including NestJS.

בנאי טפסים חזק ומשטח נסיונות שנבנה במיוחד עבור TanStack Form. הפרויקט מספק פתרון מלא ליצירה, התאמה וניהול של טפסים עם תכונות מתקדמות כמו יצירת טפסים בגרירה ושחרור, ולידציה בזמן אמת ותאימות למסגרות עבודה מרובות. כיתרון נוסף, הוא יכול לייצר DTOs תואמים למסגרות שרת שונות כולל NestJS.

### Key Benefits | יתרונות מרכזיים

**English:**

- Visual form builder with drag-and-drop interface
- Advanced TanStack Form features and patterns
- Type-safety throughout form creation and usage
- Multi-framework DTO generation (NestJS, Express, Fastify)
- Reusable form components and templates
- Live preview and testing capabilities

**עברית:**

- בנאי טפסים ויזואלי עם ממשק גרירה ושחרור
- תכונות ודפוסים מתקדמים של TanStack Form
- בטיחות טיפוסים לאורך יצירה ושימוש בטפסים
- יצירת DTO עבור מסגרות עבודה מרובות (NestJS, Express, Fastify)
- רכיבי טפסים ותבניות ניתנים לשימוש חוזר
- יכולות תצוגה מקדימה ובדיקה בזמן אמת

## Technologies | טכנולוגיות

### Core Technologies | טכנולוגיות ליבה

- **Next.js 15** - React framework with App Router
- **TanStack Form** - Advanced form state management
- **TypeScript** - Type safety and enhanced developer experience
- **Tailwind CSS** - Utility-first CSS framework

### Form Builder Features | תכונות בנאי הטפסים

- **React DnD Kit** - Modern drag and drop functionality
- **Monaco Editor** - VSCode-like code editing capabilities
- **Zod/Yup/Joi** - Comprehensive schema validation support
- **TanStack Query** - Powerful data fetching and caching

### Optional Backend Integration | אינטגרציה אופציונלית עם צד השרת

- **DTO Generators** - Support for NestJS, Express, Fastify
- **Validation Schema Export** - Multi-format schema export
- **API Documentation** - Auto-generated API endpoints

## Features | תכונות

### Form Builder Core | ליבת בנאי הטפסים

- Visual drag-and-drop form builder
- Real-time form preview and validation
- Advanced field types and configurations
- Custom validation rules and logic
- Form templates and preset collections
- Export/Import form definitions

### TanStack Form Integration | אינטגרציה עם TanStack Form

- Advanced field arrays and nested form structures
- Conditional field rendering and dynamic forms
- Cross-field validation and dependencies
- Optimized re-rendering performance
- Form state persistence and recovery
- Multi-step form wizard implementation

### Developer Experience | חוויית מפתח

- TypeScript code generation and type safety
- Live code preview and hot reloading
- Integrated form testing playground
- Multiple component library support
- Customizable themes and styling
- Comprehensive documentation and examples

### Optional Backend Features | תכונות אופציונליות לצד השרת

- DTO generation for multiple backend frameworks
- Validation schema export in various formats
- API endpoint generation suggestions
- Database schema hints and recommendations

## Getting Started | התחלה

### Prerequisites | דרישות מקדימות

- **Node.js** v18+ (recommended v20+)
- **npm**, **yarn**, or **pnpm** package manager
- Modern web browser with ES2020+ support

### Installation | התקנה

```bash
# Clone the repository
git clone https://github.com/yourusername/tanstack-form-playground.git

# Navigate to project directory
cd tanstack-form-playground

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Quick Start | התחלה מהירה

1. Open your browser to `http://localhost:3000`
2. Navigate to the Form Builder section
3. Start building forms with drag-and-drop
4. Preview and test your forms in real-time
5. Export your form configurations or generated code

## Project Structure | מבנה הפרויקט

```
tanstack-form-playground/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/             # Reusable React components
│   │   ├── ui/                # Base UI components (shadcn/ui)
│   │   ├── forms/             # Form-specific components
│   │   ├── builder/           # Form builder components
│   │   ├── preview/           # Form preview components
│   │   └── code-file-explorer/ # Code viewer components
│   ├── lib/                   # Utility functions and configurations
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript type definitions
│   └── generators/            # Code and DTO generators
├── public/                    # Static assets
├── docs/                      # Documentation files
├── examples/                  # Form examples and templates
└── README.md                  # This file
```

## Usage | שימוש

### Basic Form Creation

1. Open the form builder interface
2. Drag and drop fields from the component palette
3. Configure field properties and validation
4. Preview your form in real-time
5. Export form definition or generate code

### Advanced Features

1. Create multi-step forms with conditional logic
2. Set up complex validation rules
3. Design reusable form templates
4. Test forms in the integrated playground
5. Generate backend DTOs when needed

## Architecture | ארכיטקטורה

This project is built as a comprehensive TanStack Form development environment with modular architecture supporting various use cases and integrations.

הפרויקט בנוי כסביבת פיתוח מקיפה עבור TanStack Form עם ארכיטקטורה מודולרית התומכת במקרי שימוש ואינטגרציות שונות.

### Form Builder Engine | מנוע בנאי הטפסים

The core form builder provides:

- Drag-and-drop interface for form creation
- Real-time form preview and validation
- Advanced field configuration options
- Template system for reusable forms

מנוע בנאי הטפסים המרכזי מספק:

- ממשק גרירה ושחרור ליצירת טפסים
- תצוגה מקדימה ואימות בזמן אמת
- אפשרויות תצורה מתקדמות לשדות
- מערכת תבניות לטפסים ניתנים לשימוש חוזר

### Code Generation | יצירת קוד

Multiple output formats supported:

- Pure TanStack Form components
- TypeScript interfaces and types
- Validation schemas (Zod, Yup, Joi)
- Optional backend DTOs

פורמטי פלט מרובים נתמכים:

- קומפוננטות TanStack Form טהורות
- ממשקים וטיפוסים של TypeScript
- סכימות ולידציה (Zod, Yup, Joi)
- DTOs אופציונליים לצד השרת

## Component Libraries | ספריות קומפוננטות

The form builder supports multiple UI component libraries:

- **RizzUI** - Modern, customizable component library
- **shadcn/ui** - High-quality, accessible components
- **Material-UI** - Google's Material Design components
- **Ant Design** - Enterprise-class UI design language
- **Chakra UI** - Modular and accessible component library

בנאי הטפסים תומך במספר ספריות קומפוננטות:

- **RizzUI** - ספריית קומפוננטות מודרנית וניתנת להתאמה
- **shadcn/ui** - קומפוננטות איכותיות ונגישות
- **Material-UI** - קומפוננטות עיצוב חומרי של גוגל
- **Ant Design** - שפת עיצוב ממדרגת ארגונית
- **Chakra UI** - ספריית קומפוננטות מודולרית ונגישה

## Form Examples | דוגמאות טפסים

The playground includes comprehensive examples:

- Contact forms and user registration
- Multi-step wizards and surveys
- Dynamic forms with conditional fields
- Data tables with inline editing
- File upload and media forms
- E-commerce checkout flows
- Complex business forms

המשטח כולל דוגמאות מקיפות:

- טפסי יצירת קשר ורישום משתמשים
- אשפי צעדים מרובים וסקרים
- טפסים דינמיים עם שדות מותנים
- טבלאות נתונים עם עריכה מוטבעת
- טפסי העלאת קבצים ומדיה
- זרימות קנייה של מסחר אלקטרוני
- טפסים עסקיים מורכבים

## API Documentation | תיעוד API

Comprehensive documentation available:

- Form Builder API reference
- TanStack Form integration guides
- Component customization examples
- Backend integration patterns

תיעוד מקיף זמין:

- מדריך API של בנאי הטפסים
- מדריכי אינטגרציה עם TanStack Form
- דוגמאות התאמה אישית של קומפוננטות
- דפוסי אינטגרציה עם צד השרת

## Contributing | תרומה לפרויקט

We welcome contributions! Areas where you can help:

- New form field components
- Additional UI library integrations
- Form templates and examples
- Documentation improvements
- Bug fixes and performance optimizations

אנו מברכים על תרומות! תחומים שבהם תוכלו לעזור:

- קומפוננטות שדות טפסים חדשות
- אינטגרציות ספריות ממשק נוסxxx
- תבניות ודוגמאות טפסים
- שיפורי תיעוד
- תיקוני באגים ואופטימיזציות ביצועים

## License | רישיון

This project is licensed under the MIT License - see the LICENSE file for details.

פרויקט זה מורשה תחת רישיון MIT - ראו את קובץ הרישיון לפרטים נוספים.
