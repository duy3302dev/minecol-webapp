# Minecol WebApp - AI Coding Agent Instructions

## 🎯 Project Overview

React 19 + TypeScript + Vite webapp with **advanced dynamic form system** powered by React Hook Form, Zod validation, and a custom global form registry. Features professional black/white theming with Tailwind CSS v4.

**Tech Stack:** React 19, TypeScript, Vite, React Hook Form 7, Zod 4, Zustand 5, Tailwind CSS v4, Radix UI, Lucide icons

---

## 🏗️ Core Architecture

### **1. Dynamic Form System (The Heart of This Codebase)**

This project uses a **registry-based form architecture** that enables:

- ✅ Global form state management outside React tree
- ✅ Cross-component form access via `useFormStore(formId)`
- ✅ Type-safe field factories with Zod validation
- ✅ Zero prop drilling for nested forms

**Key Files:**

- `src/lib/form/formRegistry.ts` - Singleton registry with Observer pattern
- `src/hooks/useFormStore.ts` - Zustand-powered reactive hook
- `src/components/organisms/DynamicForm.tsx` - Main form container
- `src/components/molecules/FieldFactory.tsx` - Type-to-component mapper
- `src/types/form.ts` - Field type definitions

**How It Works:**

```typescript
// 1. Define form config + schema
const myFormConfig: FormConfig = [
  { name: "email", type: "email", label: "Email" },
];
const myFormSchema = z.object({ email: z.string().email() });

// 2. Render with unique ID
<DynamicForm id={FormID.MY_FORM} config={myFormConfig} schema={myFormSchema} />;

// 3. Access anywhere via hook
const { values, setValue, submit } = useFormStore(FormID.MY_FORM);
```

**Critical Rules:**

- **ALWAYS** pass values (not events) to `controller.onChange()` in input components

  ```tsx
  // ✅ CORRECT
  const handleChange = (e) => {
    const value = e.target.value;
    controller.onChange(value); // Pass extracted value
  };

  // ❌ WRONG - causes form submission to fail
  controller.onChange(e); // Never pass raw event
  ```

- **ALWAYS** initialize all field values in `DynamicForm` to prevent uncontrolled warnings
- Form IDs are centralized in `src/lib/form/formIdManagerment.ts` - add new IDs there
- Field types are defined in `FieldTypeEnum` - use these constants, never hardcoded strings

### **2. Theming System (Black/White Professional Design)**

**Tailwind CSS v4** with CSS-first configuration (no `tailwind.config.js`). Theme colors defined via CSS custom properties.

**Key Files:**

- `src/index.css` - Theme variables with `@theme` and `@variant` directives
- `src/contexts/ThemeContext.tsx` - React Context with localStorage persistence
- `src/components/atoms/ThemeToggle.tsx` - Theme switcher component

**Color Philosophy:**

- **Light Mode:** Pure white background (#FFFFFF), almost black text (#171717)
- **Dark Mode:** True black background (#000000), off-white text (#FAFAFA)
- **Semantic Colors:** `primary`, `secondary`, `accent`, `destructive`, `success`, `warning`, `info`

**Usage Pattern:**

```tsx
// Use semantic color utilities (registered via @theme in index.css)
<div className="bg-primary text-primary-foreground">
<Button className="bg-accent text-accent-foreground dark:bg-accent dark:text-accent-foreground">

// Components automatically support dark mode via dark: prefix
className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
```

**Theme Toggle:** Access via `useTheme()` hook - theme persists to `localStorage` and applies to `document.documentElement.classList`

### **3. Component Structure (Atomic Design)**

**Hierarchy:** `atoms/ → molecules/ → organisms/ → templates/ → pages/`

**Atoms** (`src/components/atoms/`):

- Form inputs in `FormInput/` folder: `SingleStringInput`, `NumberInput`, `RadioInput`, etc.
- Each input component receives `FieldRendererProps` type
- All inputs must handle: `controller.onChange(value)`, dark mode classes, error display

**Molecules** (`src/components/molecules/`):

- `FieldFactory.tsx` - Maps field types to input components via switch statement

**Organisms** (`src/components/organisms/`):

- `DynamicForm.tsx` - Wraps fields with `FormProvider`, registers to `formRegistry`

**UI Components** (`src/components/ui/`):

- Radix UI primitives wrapped with CVA variants (from shadcn/ui pattern)
- **ALWAYS** use these instead of raw HTML (e.g., use `<Button>` not `<button>`)

---

## 💻 Developer Workflows

### **Running the App**

```powershell
# Development (Vite dev server on :5173)
bun dev

# Production build
bun build

# Type checking only
tsc -b

# Linting
bun lint
```

### **Adding a New Form**

1. Add form ID to `src/lib/form/formIdManagerment.ts`:

   ```typescript
   export const FormID = {
     SEARCH: "SEARCH",
     MY_FORM: "MY_FORM", // Add here
   } as const;
   ```

2. Create schema in `src/schemas/`:

   ```typescript
   export const myFormSchema = z.object({
     name: z.string().min(1),
     age: z.number().min(0),
   });

   export const myFormConfig: FormConfig = [
     { name: "name", type: "text", label: "Name" },
     { name: "age", type: "number", label: "Age" },
   ];
   ```

3. Render in component:
   ```tsx
   <DynamicForm
     id={FormID.MY_FORM}
     schema={myFormSchema}
     config={myFormConfig}
     onSubmit={(data) => console.log(data)}
   />
   ```

### **Adding a New Input Type**

1. Add to `FieldTypeEnum` in `src/types/form.ts`
2. Create component in `src/components/atoms/FormInput/`
3. Add case in `FieldFactory.tsx` switch statement
4. Export from `src/components/atoms/FormInput/index.ts`

**Template for New Input Component:**

```tsx
export const MyInput = memo((props: FieldRendererProps) => {
  const { field, controller, method, error } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // Extract value first
    controller.onChange(value); // CRITICAL: Pass value, not event
    field.onChange?.(value, method); // Custom callback
  };

  return (
    <div>
      {field.label && <Label>{field.label}</Label>}
      <Input
        {...controller}
        onChange={handleChange}
        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
});
```

### **Debugging Form Issues**

- Check `formRegistry.get(formId)` in console to inspect form methods
- Use `useFormStore(formId).values` to see live form state
- Look for "Uncontrolled to controlled" warnings → add `defaultValue` in config
- Form not submitting? → Check `controller.onChange()` receives values, not events

---

## 🎨 Styling Conventions

### **Tailwind CSS v4 Rules**

- **NO** `tailwind.config.js` file - configuration done in CSS via `@theme` directive
- **USE** semantic color utilities: `bg-primary`, `text-foreground`, `border-border`
- **ALWAYS** add dark mode variants: `dark:bg-gray-800`, `dark:text-white`
- **PREFER** Tailwind utilities over custom CSS

### **Dark Mode Pattern**

```tsx
// Standard pattern for light/dark support
className="
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-gray-100
  border-gray-300 dark:border-gray-700
  hover:bg-gray-100 dark:hover:bg-gray-800
"
```

### **Color Variables (HSL Format)**

Colors use `hsl(var(--variable))` format:

```css
/* Define in index.css */
:root { --primary: 0 0% 9%; }
.dark { --primary: 0 0% 98%; }

/* Use in Tailwind */
className="bg-primary text-primary-foreground"
```

---

## 🚨 Critical Do's and Don'ts

### **✅ DO**

- Pass **values** to `controller.onChange()`, never events
- Use `FormID` enum for form identifiers
- Initialize all form fields with default values
- Add dark mode classes to all new components
- Use semantic color utilities (`bg-primary` not `bg-blue-500`)
- Wrap forms with `<FormProvider>` from React Hook Form
- Type everything with TypeScript (no `any` unless absolutely necessary)

### **❌ DON'T**

- Don't pass events to `controller.onChange(e)` - extract value first
- Don't create forms without registering ID in `formIdManagerment.ts`
- Don't use hardcoded colors - use CSS variables or semantic tokens
- Don't modify `formRegistry.ts` without understanding Observer pattern
- Don't skip `extends FieldValues` constraint on generic form types
- Don't use raw HTML elements - use UI components from `src/components/ui/`

---

## 📝 Code Style (From .cursor/rules)

**Naming:**

- Variables/Functions: `camelCase`
- Components/Types: `PascalCase`
- Files: `kebab-case.tsx` (except `index.ts`)
- Constants: `UPPER_SNAKE_CASE`

**TypeScript:**

- Explicit return types for functions
- No `any` (use `unknown` if type truly unknown)
- Interface for object shapes, Type for unions/intersections

**React Patterns:**

- Functional components with hooks
- `memo()` for expensive renders
- Destructure props: `const { field, controller } = props;`
- Optional chaining: `obj?.prop ?? defaultValue`

**Comments:**

- Explain "why", not "what"
- Comment complex form logic and registry interactions
- Document field type mappings in FieldFactory

---

## 🔗 Integration Points

**State Management:**

- Zustand store at `src/store/form.store.ts` - single `tick` counter for reactivity
- Form state lives in `formRegistry` (outside React), Zustand triggers re-renders

**Validation:**

- Zod schemas defined in `src/schemas/`
- Applied via `zodResolver` in `useForm()` hook
- Error messages from Zod automatically mapped to field errors

**Routing:**

- React Router v6 in `src/route.tsx`
- Layout wrapper: `src/components/templates/layout.tsx`

**Icons:**

- Lucide React for UI icons: `import { Sun, Moon } from 'lucide-react'`
- React Icons for specific brands: `import { FiChrome } from 'react-icons/fi'`

---

## 📚 Key Concepts to Understand

1. **Form Registry Pattern:** Singleton storing all form instances, enabling cross-component access without Context
2. **Observer Pattern:** Registry emits changes → Zustand tick increments → Components re-render
3. **Field Factory:** Dynamically renders input components based on `type` string from config
4. **Controller Pattern:** React Hook Form's `Controller` wraps uncontrolled inputs to make them controlled
5. **CSS Variables + Tailwind v4:** Theme tokens defined in CSS, exposed as Tailwind utilities via `@theme`

---

## 🐛 Common Pitfalls

1. **Form Won't Submit** → Check if input `onChange` passes value instead of event to `controller.onChange()`
2. **Uncontrolled Warning** → Ensure all fields have `defaultValue` in config or `initialValues` in DynamicForm
3. **Theme Doesn't Apply** → Verify `@theme` directive in `index.css` and that classes start with semantic names
4. **Type Error on FormRegistry** → Add `extends FieldValues` to generic type parameters
5. **Form State Not Reactive** → Ensure form is registered via `formRegistry.register()` in DynamicForm's useEffect

---

**Last Updated:** 2025-10-31  
**Version:** 1.0  
**Maintained By:** @duy3302dev
