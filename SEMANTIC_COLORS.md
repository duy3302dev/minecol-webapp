# 🎨 Semantic Color System - Black & White Theme

## 📋 Overview

Hệ thống màu semantic được thiết kế với **tông đen/trắng chủ đạo**, có các màu phụ cho focus states, hover effects, và interactive elements.

---

## 🌈 Color Palette

### **Light Theme**

#### **Base Colors**

```css
--background: #FFFFFF    /* Pure white - Main background */
--foreground: #171717    /* Almost black - Main text */
```

#### **Surface Colors**

```css
--card: #FCFCFC         /* Off-white - Card backgrounds */
--card-foreground: #171717

--popover: #FFFFFF      /* Pure white - Dropdown/modal backgrounds */
--popover-foreground: #171717
```

#### **Primary Actions**

```css
--primary: #171717      /* Almost black - Primary buttons, links */
--primary-foreground: #FAFAFA  /* Off-white text on primary */
```

#### **Secondary Actions**

```css
--secondary: #F0F0F0    /* Light gray - Secondary buttons */
--secondary-foreground: #171717
```

#### **Interactive States**

```css
--accent: #EBEBEB       /* Light slate - Hover states, highlights */
--accent-foreground: #171717

--input: #FAFAFA        /* Very light gray - Input backgrounds */
--border: #E0E0E0       /* Medium light - Borders */
--ring: #333333         /* Dark gray - Focus rings */
```

#### **Muted/Disabled**

```css
--muted: #F7F7F7        /* Very light gray - Disabled backgrounds */
--muted-foreground: #737373  /* Medium gray - Disabled text */
```

#### **Semantic Colors**

```css
--destructive: #EF4444  /* Red - Errors, delete actions */
--success: #22C55E      /* Green - Success messages */
--warning: #F59E0B      /* Amber - Warnings */
--info: #0EA5E9         /* Blue - Info messages */
```

---

### **Dark Theme**

#### **Base Colors**

```css
--background: #080808   /* Near black - Main background */
--foreground: #FAFAFA   /* Off-white - Main text */
```

#### **Surface Colors**

```css
--card: #141414         /* Very dark gray - Card backgrounds */
--card-foreground: #FAFAFA

--popover: #141414      /* Very dark gray - Dropdown/modal backgrounds */
--popover-foreground: #FAFAFA
```

#### **Primary Actions**

```css
--primary: #FAFAFA      /* Off-white - Primary buttons, links */
--primary-foreground: #171717  /* Almost black text on primary */
```

#### **Secondary Actions**

```css
--secondary: #2E2E2E    /* Dark charcoal - Secondary buttons */
--secondary-foreground: #FAFAFA
```

#### **Interactive States**

```css
--accent: #383838       /* Medium dark gray - Hover states, highlights */
--accent-foreground: #FAFAFA

--input: #1F1F1F        /* Dark gray - Input backgrounds */
--border: #3D3D3D       /* Medium dark - Borders */
--ring: #CCCCCC         /* Light gray - Focus rings */
```

#### **Muted/Disabled**

```css
--muted: #1F1F1F        /* Very dark gray - Disabled backgrounds */
--muted-foreground: #A3A3A3  /* Light gray - Disabled text */
```

#### **Semantic Colors**

```css
--destructive: #DC2626  /* Softer red - Errors */
--success: #16A34A      /* Softer green - Success */
--warning: #F59E0B      /* Amber - Warnings */
--info: #0EA5E9         /* Blue - Info */
```

---

## 🎯 Usage Guide

### **When to Use Each Color**

#### **`background` & `foreground`**

- Main page background and text
- Use for body, containers, paragraphs

#### **`card` & `card-foreground`**

- Card components, panels, sections
- Slightly different from main background for depth

#### **`primary`**

- Main CTAs (Call-to-Action buttons)
- Important links and actions
- Active navigation items

#### **`secondary`**

- Less important actions
- Cancel buttons, back buttons
- Alternative options

#### **`accent`**

- Hover states on buttons/links
- Selected items in lists
- Highlighted sections
- Interactive element backgrounds

#### **`input`**

- Text input backgrounds
- Textarea backgrounds
- Select dropdown backgrounds

#### **`border`**

- All border colors
- Dividers, separators
- Card outlines

#### **`ring`**

- Focus indicator (outline)
- Shows keyboard navigation focus
- Accessibility feature

#### **`muted`**

- Disabled states
- Placeholder backgrounds
- Less important content areas

#### **`destructive`**

- Delete buttons
- Error messages
- Validation errors
- Danger zones

#### **`success`**

- Success messages
- Completed states
- Positive confirmations

#### **`warning`**

- Warning messages
- Caution states
- Non-critical alerts

#### **`info`**

- Informational messages
- Help tooltips
- Neutral notifications

---

## 💻 Code Examples

### **Basic Usage**

```tsx
// Background and text
<div className="bg-background text-foreground">Content</div>

// Card with border
<div className="bg-card text-card-foreground border border-border">
  Card content
</div>

// Primary button
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Click me
</button>

// Input with focus state
<input className="
  bg-input text-foreground
  border border-border
  focus:ring-2 focus:ring-ring/20
  focus:border-ring
  hover:border-ring/50
  hover:bg-accent/30
" />
```

### **Interactive States**

```tsx
// Button with all states
<button className="
  bg-primary text-primary-foreground
  hover:bg-accent hover:text-accent-foreground
  focus:ring-2 focus:ring-ring/20
  disabled:bg-muted disabled:text-muted-foreground
  transition-all duration-200
">
  Interactive Button
</button>

// Input with enhanced focus
<input className="
  bg-input text-foreground
  border border-border
  hover:border-ring/50 hover:bg-accent/30
  focus:border-ring focus:bg-background
  focus:ring-3 focus:ring-ring/15
  placeholder:text-muted-foreground
  transition-all duration-200
" />
```

### **Semantic Colors**

```tsx
// Error message
<div className="bg-destructive text-destructive-foreground p-4 rounded">
  Error: Something went wrong!
</div>

// Success message
<div className="bg-success text-success-foreground p-4 rounded">
  Success! Your changes have been saved.
</div>

// Warning
<div className="bg-warning text-warning-foreground p-4 rounded">
  Warning: Please review your input.
</div>

// Info
<div className="bg-info text-info-foreground p-4 rounded">
  Info: This feature is in beta.
</div>
```

---

## 🎨 Visual Hierarchy

### **Light Theme Visual Stack**

```
Background: #FFFFFF (White)
  └─ Card: #FCFCFC (Off-white) +1 shade
      └─ Input: #FAFAFA (Very light gray) +2 shades
          └─ Accent/Hover: #EBEBEB (Light slate) +3 shades
              └─ Border: #E0E0E0 (Medium light) +4 shades
```

### **Dark Theme Visual Stack**

```
Background: #080808 (Near black)
  └─ Card: #141414 (Very dark gray) +1 shade lighter
      └─ Input: #1F1F1F (Dark gray) +2 shades lighter
          └─ Accent/Hover: #383838 (Medium dark) +3 shades lighter
              └─ Border: #3D3D3D (Medium dark border) +4 shades lighter
```

---

## 🔧 Implementation Details

### **Global Input Styles**

All inputs automatically get enhanced focus states:

```css
/* Hover state */
input:hover {
  border-color: hsl(var(--ring) / 0.5);
  background-color: hsl(var(--accent) / 0.3);
}

/* Focus state */
input:focus {
  border-color: hsl(var(--ring));
  background-color: hsl(var(--background));
  box-shadow: 0 0 0 3px hsl(var(--ring) / 0.15);
}

/* Disabled state */
input:disabled {
  opacity: 0.5;
  background-color: hsl(var(--muted));
}
```

### **Transitions**

All interactive elements use smooth transitions:

```css
transition: all 0.2s ease-in-out;
```

---

## 📱 Accessibility

### **Focus Indicators**

- All focusable elements have visible focus rings
- Focus ring uses `--ring` color with 15% opacity shadow
- 3px offset for better visibility

### **Color Contrast**

- **Light theme:** Black text (#171717) on white (#FFFFFF) - WCAG AAA
- **Dark theme:** White text (#FAFAFA) on black (#080808) - WCAG AAA
- All semantic colors meet WCAG AA minimum

### **Hover States**

- Subtle background color change
- Border color change
- Clear visual feedback for all interactive elements

---

## 🎯 Best Practices

### **DO ✅**

- Use semantic tokens (`bg-primary`, `text-foreground`) instead of hardcoded colors
- Always add dark mode variants: `dark:bg-card`, `dark:text-foreground`
- Use `hover:` and `focus:` states for interactive elements
- Add transitions for smooth state changes

### **DON'T ❌**

- Don't use hardcoded colors like `bg-blue-500`, `text-red-400`
- Don't forget dark mode variants
- Don't skip focus states (accessibility)
- Don't mix semantic and hardcoded colors

---

## 🔄 Migration Guide

### **Old Style → New Style**

```tsx
// ❌ OLD: Hardcoded colors
<input className="bg-gray-100 border-gray-300 focus:ring-blue-500" />

// ✅ NEW: Semantic tokens
<input className="bg-input border-border focus:ring-ring/20" />

// ❌ OLD: No hover state
<button className="bg-blue-500 text-white">Click</button>

// ✅ NEW: With hover and focus
<button className="
  bg-primary text-primary-foreground
  hover:bg-accent hover:text-accent-foreground
  focus:ring-2 focus:ring-ring/20
  transition-all
">
  Click
</button>
```

---

## 📚 Related Files

- **Theme definition:** `src/index.css`
- **Theme provider:** `src/contexts/ThemeContext.tsx`
- **Theme toggle:** `src/components/atoms/ThemeToggle.tsx`
- **AI instructions:** `.github/copilot-instructions.md`

---

**Last Updated:** 2025-10-31  
**Version:** 2.0 - Enhanced Semantic Colors with Interactive States
