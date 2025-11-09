# 🎨 Dark/Light Theme System Documentation

## 📋 Overview

Hệ thống theme đã được implement với **Dark Mode** và **Light Mode** hoàn chỉnh cho toàn bộ form system.

---

## 🏗️ Architecture

### **1. ThemeProvider (Context API)**

**File:** `src/contexts/ThemeContext.tsx`

```typescript
// Features:
✅ Quản lý theme state toàn cục
✅ Lưu preference vào localStorage
✅ Auto-detect system preference
✅ Apply theme class vào document.documentElement
✅ Export useTheme hook
```

**Usage:**

```tsx
import { useTheme } from "@/contexts/ThemeContext";

const { theme, toggleTheme, setTheme } = useTheme();
```

---

### **2. ThemeToggle Component**

**File:** `src/components/atoms/ThemeToggle.tsx`

**Features:**

- ☀️ Sun icon cho light mode
- 🌙 Moon icon cho dark mode
- ✨ Smooth transition animations
- ♿ Accessibility (aria-label, sr-only text)

**Usage:**

```tsx
import { ThemeToggle } from "@/components/atoms/ThemeToggle";

<ThemeToggle />;
```

---

### **3. CSS Variables System**

**File:** `src/index.css`

#### **Light Theme Colors:**

```css
:root {
  --background: 0 0% 100%; /* White background */
  --foreground: 222.2 84% 4.9%; /* Dark text */
  --primary: 221.2 83.2% 53.3%; /* Blue primary */
  --border: 214.3 31.8% 91.4%; /* Light gray borders */
  --input: 214.3 31.8% 91.4%; /* Light gray input bg */
  /* ... more colors */
}
```

#### **Dark Theme Colors:**

```css
.dark {
  --background: 222.2 84% 4.9%; /* Dark background */
  --foreground: 210 40% 98%; /* Light text */
  --primary: 217.2 91.2% 59.8%; /* Lighter blue */
  --border: 217.2 32.6% 17.5%; /* Dark borders */
  --input: 217.2 32.6% 17.5%; /* Dark input bg */
  /* ... more colors */
}
```

---

## 🎨 Updated Components

### **All Form Input Components Support Dark Mode:**

#### ✅ **1. SingleStringInput (Text/Email)**

```tsx
// Light: White bg, gray borders
// Dark: Gray-800 bg, gray-700 borders
const lightStyles = `border-gray-300 bg-white text-gray-900`;
const darkStyles = `dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100`;
```

#### ✅ **2. MultiStringInput (Textarea)**

```tsx
// Same styling as SingleStringInput + min-height
const darkStyles = `dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100`;
```

#### ✅ **3. NumberInput**

```tsx
// Number input với dark mode support
const darkStyles = `dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100`;
```

#### ✅ **4. CheckboxInput**

```tsx
// Checkbox với dark background
const darkStyles = `dark:border-gray-600 dark:bg-gray-800`;
```

#### ✅ **5. SwitchInput**

```tsx
// Switch với conditional background colors
const lightStyles = `bg-gray-200 data-[state=checked]:bg-blue-600`;
const darkStyles = `dark:bg-gray-700 dark:data-[state=checked]:bg-blue-500`;
```

#### ✅ **6. ColorInput**

```tsx
// Color picker với dark borders
const darkStyles = `dark:border-gray-600 dark:bg-gray-800`;
```

#### ✅ **7. RadioInput**

```tsx
// Radio buttons với dark styling
const darkStyles = `dark:border-gray-600 dark:bg-gray-800`;
```

#### ✅ **8. SingleSelectInput**

```tsx
// Select dropdown + SelectContent dark mode
const darkStyles = `dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100`;
<SelectContent className="dark:bg-gray-800 dark:border-gray-700">
  <SelectItem className="dark:text-gray-100 dark:hover:bg-gray-700">
```

#### ✅ **9. MultiSelectInput**

```tsx
// Multi-select với dark mode
const darkStyles = `dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100`;
```

---

## 🎯 Common Styling Pattern

All components follow this pattern:

```tsx
// 1. Base styles
const defaultStyles = `w-full px-3 py-2 border rounded-md transition-colors`;

// 2. Light mode
const lightStyles = `border-gray-300 bg-white text-gray-900`;

// 3. Dark mode
const darkStyles = `dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100`;

// 4. Focus states
const focusStyles = `focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900`;

// 5. Hover states
const hoverStyles = `hover:border-gray-400 dark:hover:border-gray-600`;

// 6. Error states
const errorStyles = error ? `border-red-500 dark:border-red-400` : "";

// 7. Combine with cn()
<Input
  className={cn(
    defaultStyles,
    lightStyles,
    darkStyles,
    focusStyles,
    hoverStyles,
    errorStyles,
    field.props?.className // Allow custom override
  )}
/>;
```

---

## 📦 Installation Steps

### **1. Wrap App with ThemeProvider**

**File:** `src/App.tsx`

```tsx
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <PageRoutes currentPath={window.location.pathname} />
    </ThemeProvider>
  );
}
```

### **2. Add ThemeToggle to Layout/Navbar**

```tsx
import { ThemeToggle } from "@/components/atoms/ThemeToggle";

<header>
  <ThemeToggle />
</header>;
```

### **3. Update Page Backgrounds**

```tsx
<div className="bg-gray-100 dark:bg-gray-900 transition-colors">
  <h1 className="text-gray-800 dark:text-gray-100">Title</h1>
  <p className="text-gray-600 dark:text-gray-400">Description</p>
</div>
```

---

## 🎨 Color Palette

### **Gray Scale:**

- **Light Mode:**
  - bg: `gray-100` (backgrounds)
  - text: `gray-800` (headings), `gray-600` (body)
  - border: `gray-300`
- **Dark Mode:**
  - bg: `gray-900` (page), `gray-800` (cards/inputs)
  - text: `gray-100` (headings), `gray-400` (body)
  - border: `gray-700`, `gray-600`

### **Primary (Blue):**

- **Light:** `blue-500`, `blue-600`
- **Dark:** `blue-400`, `blue-500`

### **Error (Red):**

- **Light:** `red-500`
- **Dark:** `red-400`

### **Focus Rings:**

- **Light:** `ring-blue-100`
- **Dark:** `ring-blue-900`

---

## ✨ Features

### ✅ **Auto-detect System Preference**

```typescript
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  return "dark";
}
```

### ✅ **Persistent Theme (localStorage)**

```typescript
localStorage.setItem("theme", theme);
```

### ✅ **Smooth Transitions**

```css
transition: background-color 0.3s ease, color 0.3s ease;
```

### ✅ **Accessibility**

- ARIA labels
- Screen reader text
- Keyboard navigation support

---

## 🚀 Usage Examples

### **Example 1: Page with Dark Mode**

```tsx
export const MyPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h1 className="text-gray-900 dark:text-gray-100">Title</h1>
        <p className="text-gray-600 dark:text-gray-400">Content</p>
      </div>
    </div>
  );
};
```

### **Example 2: Custom Component with Theme**

```tsx
import { useTheme } from "@/contexts/ThemeContext";

export const MyComponent = () => {
  const { theme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      {theme === "dark" && <MoonIcon />}
      {theme === "light" && <SunIcon />}
    </div>
  );
};
```

### **Example 3: Form with Dark Mode**

```tsx
<DynamicForm
  id="my-form"
  schema={mySchema}
  config={myConfig}
  className="dark:bg-gray-800"
  onSubmit={(data) => console.log(data)}
/>
```

---

## 🐛 Troubleshooting

### **Theme không apply:**

1. ✅ Check ThemeProvider wrap App
2. ✅ Check `dark` class trên `<html>` element
3. ✅ Clear localStorage: `localStorage.removeItem('theme')`

### **Colors không đúng:**

1. ✅ Check Tailwind config có darkMode: 'class'
2. ✅ Check CSS variables trong index.css
3. ✅ Verify `dark:` prefix trong classNames

### **Transition không smooth:**

1. ✅ Add `transition-colors` class
2. ✅ Add `duration-300` hoặc `duration-200`

---

## 📝 Best Practices

1. ✅ **Always use semantic colors:**

   ```tsx
   // ❌ Bad
   className = "bg-gray-800";

   // ✅ Good
   className = "bg-white dark:bg-gray-800";
   ```

2. ✅ **Use transition for smooth theme changes:**

   ```tsx
   className = "transition-colors duration-300";
   ```

3. ✅ **Test both themes:**

   - Open DevTools → Toggle dark/light
   - Check contrast ratios for accessibility

4. ✅ **Allow custom overrides:**
   ```tsx
   className={cn(baseStyles, darkStyles, props.className)}
   ```

---

## 🎯 Summary

✅ **Complete dark/light theme system**
✅ **All 9 form inputs support dark mode**
✅ **Persistent theme with localStorage**
✅ **Auto-detect system preference**
✅ **Smooth transitions**
✅ **Accessible theme toggle**
✅ **CSS variables for easy customization**

---

## 🔗 Related Files

- `src/contexts/ThemeContext.tsx` - Theme provider & hook
- `src/components/atoms/ThemeToggle.tsx` - Toggle button
- `src/index.css` - CSS variables & dark mode styles
- `src/components/atoms/FormInput/*.tsx` - All input components
- `src/components/templates/404.tsx` - Example usage

---

**Enjoy your new dark mode! 🌙✨**
