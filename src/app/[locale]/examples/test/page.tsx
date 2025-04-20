"use client";

import { TreeViewElement } from "@/components/ui/extension/tree-view-api";
import { CodeFileExplorer } from "@/components/code-file-explorer";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function CodeExplorerDemo() {
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");
  const { setTheme } = useTheme();

  // מבנה קבצים מורחב
  const elements: TreeViewElement[] = [
    {
      id: "root",
      isSelectable: true,
      name: "my-react-app",
      children: [
        { id: "package", isSelectable: true, name: "package.json" },
        { id: "readme", isSelectable: true, name: "README.md" },
        { id: "tsconfig", isSelectable: true, name: "tsconfig.json" },
        {
          id: "src",
          isSelectable: true,
          name: "src",
          children: [
            { id: "index", isSelectable: true, name: "index.tsx" },
            { id: "app", isSelectable: true, name: "App.tsx" },
            {
              id: "components",
              isSelectable: true,
              name: "components",
              children: [
                { id: "button", isSelectable: true, name: "Button.tsx" },
                { id: "card", isSelectable: true, name: "Card.tsx" },
                { id: "input", isSelectable: true, name: "Input.tsx" },
                {
                  id: "layout",
                  isSelectable: true,
                  name: "layout",
                  children: [
                    { id: "header", isSelectable: true, name: "Header.tsx" },
                    { id: "footer", isSelectable: true, name: "Footer.tsx" },
                    { id: "sidebar", isSelectable: true, name: "Sidebar.tsx" },
                    {
                      id: "layout-css",
                      isSelectable: true,
                      name: "layout.module.css",
                    },
                  ],
                },
              ],
            },
            {
              id: "hooks",
              isSelectable: true,
              name: "hooks",
              children: [
                { id: "use-auth", isSelectable: true, name: "useAuth.ts" },
                { id: "use-theme", isSelectable: true, name: "useTheme.ts" },
                { id: "use-form", isSelectable: true, name: "useForm.ts" },
              ],
            },
            {
              id: "pages",
              isSelectable: true,
              name: "pages",
              children: [
                { id: "home", isSelectable: true, name: "Home.tsx" },
                { id: "about", isSelectable: true, name: "About.tsx" },
                { id: "dashboard", isSelectable: true, name: "Dashboard.tsx" },
                {
                  id: "auth",
                  isSelectable: true,
                  name: "auth",
                  children: [
                    { id: "login", isSelectable: true, name: "Login.tsx" },
                    {
                      id: "register",
                      isSelectable: true,
                      name: "Register.tsx",
                    },
                    {
                      id: "auth-utils",
                      isSelectable: true,
                      name: "auth-utils.js",
                    },
                  ],
                },
              ],
            },
            {
              id: "utils",
              isSelectable: true,
              name: "utils",
              children: [
                { id: "api", isSelectable: true, name: "api.ts" },
                { id: "helpers", isSelectable: true, name: "helpers.js" },
                { id: "constants", isSelectable: true, name: "constants.ts" },
              ],
            },
            {
              id: "styles",
              isSelectable: true,
              name: "styles",
              children: [
                { id: "global", isSelectable: true, name: "global.css" },
                { id: "theme", isSelectable: true, name: "theme.scss" },
                {
                  id: "variables",
                  isSelectable: true,
                  name: "_variables.scss",
                },
              ],
            },
          ],
        },
        {
          id: "public",
          isSelectable: true,
          name: "public",
          children: [
            { id: "favicon", isSelectable: true, name: "favicon.ico" },
            { id: "index-html", isSelectable: true, name: "index.html" },
          ],
        },
      ],
    },
  ];

  // מפת תוכן הקבצים
  const files = {
    package: {
      filename: "package.json",
      language: "json",
      code: `{
  "name": "my-react-app",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.4.2",
    "typescript": "^4.8.4",
    "@tanstack/react-query": "^4.13.0",
    "axios": "^1.1.3",
    "tailwindcss": "^3.2.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  }
}`,
      highlightLines: [5, 6, 7],
    },
    readme: {
      filename: "README.md",
      language: "markdown",
      code: `# My React App

This is a sample React application with TypeScript and TailwindCSS.

## Getting Started

\`\`\`bash
npm install
npm start
\`\`\`

## Features

- TypeScript support
- Component library
- Custom hooks
- Responsive design
`,
      highlightLines: [3],
    },
    tsconfig: {
      filename: "tsconfig.json",
      language: "json",
      code: `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "src"
  },
  "include": ["src"]
}`,
      highlightLines: [17, 18],
    },
    index: {
      filename: "index.tsx",
      language: "tsx",
      code: `import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);`,
      highlightLines: [5, 6, 15, 16, 17, 18, 19],
    },
    app: {
      filename: "App.tsx",
      language: "tsx",
      code: `import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';
import { useAuth } from './hooks/useAuth';
import './styles/global.css';

const App: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <Header />
      <div className="content">
        {user && <Sidebar />}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;`,
      highlightLines: [15, 21, 26, 27, 28, 29, 30, 31],
    },
    button: {
      filename: "Button.tsx",
      language: "tsx",
      code: `import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  type = 'button',
}) => {
  const baseClasses = 'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={\`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]} \${disabled ? 'opacity-50 cursor-not-allowed' : ''} \${className}\`}
    >
      {children}
    </button>
  );
};

export default Button;`,
      highlightLines: [3, 4, 15, 16, 17, 18, 19, 20, 21, 22],
    },
    login: {
      filename: "Login.tsx",
      language: "tsx",
      code: `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { login } from './auth-utils';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Card from '../../components/Card';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      const user = await login(email, password);
      setUser(user);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <Card className="w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
        
        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:text-blue-800">
            Register here
          </a>
        </p>
      </Card>
    </div>
  );
};

export default Login;`,
      highlightLines: [11, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
    },
    "use-auth": {
      filename: "useAuth.ts",
      language: "ts",
      code: `import { useState, useEffect, createContext, useContext } from 'react';

type User = {
  id: string;
  email: string;
  name: string;
} | null;

type AuthContextType = {
  user: User;
  isLoading: boolean;
  setUser: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage or session for existing auth
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Failed to parse stored user data');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    setUser: (newUser: User) => {
      if (newUser) {
        localStorage.setItem('user', JSON.stringify(newUser));
      }
      setUser(newUser);
    },
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};`,
      highlightLines: [
        3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
      ],
    },
    theme: {
      filename: "theme.scss",
      language: "scss",
      code: `@import './variables';

// Theme configuration for light and dark mode
.light-theme {
  --background-primary: #{$color-white};
  --background-secondary: #{$color-light-100};
  --text-primary: #{$color-dark-900};
  --text-secondary: #{$color-dark-600};
  --accent-color: #{$color-blue-600};
  --accent-hover: #{$color-blue-700};
  --border-color: #{$color-light-300};
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.dark-theme {
  --background-primary: #{$color-dark-900};
  --background-secondary: #{$color-dark-800};
  --text-primary: #{$color-light-100};
  --text-secondary: #{$color-light-300};
  --accent-color: #{$color-blue-500};
  --accent-hover: #{$color-blue-400};
  --border-color: #{$color-dark-700};
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

// Apply theme to components
body {
  background-color: var(--background-primary);
  color: var(--text-primary);
  transition: background-color 0.3s, color 0.3s;
}

.card {
  background-color: var(--background-primary);
  border: 1px solid var(--border-color);
  border-radius: $border-radius;
  box-shadow: var(--shadow-sm);
  
  &:hover {
    box-shadow: var(--shadow-md);
  }
}

button {
  background-color: var(--accent-color);
  color: $color-white;
  
  &:hover {
    background-color: var(--accent-hover);
  }
  
  &.secondary {
    background-color: var(--background-secondary);
    color: var(--text-primary);
    
    &:hover {
      opacity: 0.9;
    }
  }
}`,
      highlightLines: [4, 5, 6, 7, 8, 9, 10, 16, 17, 18, 19, 20, 21, 22],
    },
    variables: {
      filename: "_variables.scss",
      language: "scss",
      code: `// Colors
$color-white: #ffffff;
$color-black: #000000;

// Light palette
$color-light-100: #f9fafb;
$color-light-200: #f3f4f6;
$color-light-300: #e5e7eb;
$color-light-400: #d1d5db;

// Dark palette
$color-dark-600: #4b5563;
$color-dark-700: #374151;
$color-dark-800: #1f2937;
$color-dark-900: #111827;

// Blue palette
$color-blue-400: #60a5fa;
$color-blue-500: #3b82f6;
$color-blue-600: #2563eb;
$color-blue-700: #1d4ed8;

// Red palette
$color-red-500: #ef4444;
$color-red-600: #dc2626;

// Green palette
$color-green-500: #10b981;
$color-green-600: #059669;

// Spacing
$spacing-1: 0.25rem; // 4px
$spacing-2: 0.5rem;  // 8px
$spacing-3: 0.75rem; // 12px
$spacing-4: 1rem;    // 16px
$spacing-6: 1.5rem;  // 24px
$spacing-8: 2rem;    // 32px
$spacing-12: 3rem;   // 48px

// Typography
$font-size-xs: 0.75rem;   // 12px
$font-size-sm: 0.875rem;  // 14px
$font-size-base: 1rem;    // 16px
$font-size-lg: 1.125rem;  // 18px
$font-size-xl: 1.25rem;   // 20px
$font-size-2xl: 1.5rem;   // 24px
$font-size-3xl: 1.875rem; // 30px

// Border radius
$border-radius: 0.375rem;
$border-radius-sm: 0.25rem;
$border-radius-lg: 0.5rem;
$border-radius-full: 9999px;

// Breakpoints
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;`,
      highlightLines: [2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 18],
    },
    "auth-utils": {
      filename: "auth-utils.js",
      language: "javascript",
      code: `// Mock authentication utilities for demonstration

// Simulated API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock user database
const users = [
  {
    id: "1",
    email: "user@example.com",
    name: "Demo User",
    password: "password123", // In a real app, this would be hashed
  },
];

// Mock login function
export async function login(email, password) {
  // Simulate API request delay
  await delay(800);
  
  const user = users.find((u) => u.email === email);
  
  if (!user) {
    throw new Error("User not found");
  }
  
  if (user.password !== password) {
    throw new Error("Invalid password");
  }
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// Mock register function
export async function register(email, name, password) {
  // Simulate API request delay
  await delay(800);
  
  // Check if user already exists
  if (users.some((u) => u.email === email)) {
    throw new Error("Email already in use");
  }
  
  // Create new user
  const newUser = {
    id: String(users.length + 1),
    email,
    name,
    password,
  };
  
  users.push(newUser);
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

// Mock logout function - in real app this would make an API call
export async function logout() {
  await delay(300);
  return true;
}`,
      highlightLines: [
        6, 7, 8, 9, 10, 11, 12, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
        27, 28, 29,
      ],
    },
    global: {
      filename: "global.css",
      language: "css",
      code: `/* Global styles for the application */

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

#root {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  display: flex;
  flex: 1;
}

main {
  flex: 1;
  padding: 1rem;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }
}

a {
  color: inherit;
  text-decoration: none;
}

button, 
input, 
textarea {
  font-family: inherit;
}`,
      highlightLines: [
        3, 4, 5, 7, 8, 9, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
        42, 43,
      ],
    },
    "layout-css": {
      filename: "layout.module.css",
      language: "css",
      code: `.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 10;
}

.logo {
  font-weight: bold;
  font-size: 1.5rem;
  color: #2563eb;
}

.navigation {
  display: flex;
  gap: 1.5rem;
}

.navigationLink {
  color: #4b5563;
  transition: color 0.2s;
}

.navigationLink:hover {
  color: #2563eb;
}

.activeLink {
  color: #2563eb;
  font-weight: 500;
}

.footer {
  padding: 2rem;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  text-align: center;
  color: #6b7280;
}

.sidebar {
  width: 250px;
  background-color: #f9fafb;
  padding: 1.5rem 1rem;
  border-right: 1px solid #e5e7eb;
  height: 100%;
}

.sidebarNav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sidebarLink {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  color: #4b5563;
  transition: all 0.2s;
}

.sidebarLink:hover {
  background-color: #e5e7eb;
}

.sidebarLinkActive {
  background-color: #dbeafe;
  color: #1d4ed8;
  font-weight: 500;
}

@media (max-width: 768px) {
  .header {
    padding: 1rem;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
  }
}`,
      highlightLines: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 34, 35, 36, 37, 38, 39, 40, 41,
      ],
    },
  };

  return (
    <div className="space-y-6 py-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">מדגים Code File Explorer</h1>

        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <h3 className="text-sm font-medium mb-2">כיוון תצוגה</h3>
            <Select
              defaultValue={direction}
              onValueChange={(value) => setDirection(value as "ltr" | "rtl")}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="בחר כיוון" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ltr">שמאל לימין (LTR)</SelectItem>
                <SelectItem value="rtl">ימין לשמאל (RTL)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">ערכת נושא</h3>
            <div className="flex gap-2">
              <Button
                onClick={() => setTheme("light")}
                size="sm"
                variant="outline"
              >
                בהיר
              </Button>
              <Button
                onClick={() => setTheme("dark")}
                size="sm"
                variant="outline"
              >
                כהה
              </Button>
              <Button
                onClick={() => setTheme("system")}
                size="sm"
                variant="outline"
              >
                מערכת
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          {/* הוספת כל האפשרויות לרכיב */}
          <CodeFileExplorer
            elements={elements}
            files={files}
            initialFileId="app"
            height={600}
            direction={direction}
          />
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>
            רכיב זה מציג עץ קבצים ומאפשר ניווט בקוד מקור דרך ממשק נוח וידידותי
            למשתמש.
          </p>
          <p className="mt-1">
            תומך במגוון שפות תכנות, הדגשת קוד, הדגשת שורות ספציפיות, ותמיכה
            בכיווניות RTL/LTR.
          </p>
        </div>
      </div>
    </div>
  );
}
