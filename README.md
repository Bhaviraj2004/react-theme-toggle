# 🌓 @bhavi/react-theme-toggle

Zero-config dark mode toggle for React apps. Simple, lightweight, and fully customizable.

## ✨ Features

- ✅ **Zero Config** - Works out of the box
- ✅ **Lightweight** - Less than 5KB
- ✅ **Flexible** - Use default button or create your own
- ✅ **Persistent** - Saves theme in localStorage
- ✅ **TypeScript** - Full type support
- ✅ **CSS Classes** - Simple utility classes for dark mode

---

## 📦 Installation
```bash
npm install @bhavi/react-theme-toggle
```

---

## 🚀 Quick Start

### Method 1: Default Button (Easiest)
```jsx
import { ThemeProvider, ThemeToggle } from '@bhavi/react-theme-toggle';

function App() {
  return (
    <ThemeProvider>
      <nav>
        <ThemeToggle />
      </nav>
      
      <main>
        <h1 className="dark-text">Hello World</h1>
        <div className="dark-bg dark-text p-4">
          This will be black with white text in dark mode
        </div>
      </main>
    </ThemeProvider>
  );
}
```

### Method 2: Custom Button (Advanced)
```jsx
import { ThemeProvider, useTheme } from '@bhavi/react-theme-toggle';

function App() {
  return (
    <ThemeProvider>
      <CustomToggle />
      <Content />
    </ThemeProvider>
  );
}

function CustomToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className="px-4 py-2 bg-purple-500 rounded text-white"
    >
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
```

---

## 🎨 Available CSS Classes

Use these classes to control dark mode styling:

| Class | Effect |
|-------|--------|
| `.dark-text` | White text in dark mode |
| `.dark-bg` | Black background in dark mode |
| `.dark-border` | Dark border in dark mode |
| `.dark-card` | Dark card background |
| `.dark-input` | Dark input styling |
| `.dark-link` | Blue link color in dark mode |

---

## 📖 API Reference

### `<ThemeProvider>`
Wrap your app with this component.
```jsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

### `<ThemeToggle />`
Default toggle button component.
```jsx
<ThemeToggle />
```

### `useTheme()`
Hook to access theme state and toggle function.
```tsx
const { theme, toggleTheme } = useTheme();

// theme: 'light' | 'dark'
// toggleTheme: () => void
```

---

## 💡 Examples

### Example 1: Navbar with Toggle
```jsx
function Navbar() {
  return (
    <nav className="p-4 bg-blue-500">
      <div className="flex justify-between items-center">
        <h1 className="dark-text text-2xl">My App</h1>
        <ThemeToggle />
      </div>
    </nav>
  );
}
```

### Example 2: Card Component
```jsx
function Card() {
  return (
    <div className="dark-bg dark-border border-2 p-6 rounded-lg">
      <h2 className="dark-text text-xl font-bold">Card Title</h2>
      <p className="dark-text">Card content goes here</p>
    </div>
  );
}
```

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a PR.

---

## 📄 License

MIT © Bhavi

---

## 🔗 Links

- [GitHub](https://github.com/yourusername/react-theme-toggle)
- [npm](https://www.npmjs.com/package/@bhavi/react-theme-toggle)