// // test-app/src/App.jsx
// import { ThemeProvider, ThemeToggle, useTheme } from '@bhavi/react-theme-toggle';

// function App() {
//   return (
//     <ThemeProvider>
//       <div className="min-h-screen p-8">
//         <Header />
//         <Content />
//       </div>
//     </ThemeProvider>
//   );
// }

// function Header() {
//   return (
//     <nav className="flex justify-between items-center mb-8 p-4 bg-blue-500 rounded">
//       <h1 className="text-2xl font-bold dark-text">Theme Toggle Demo</h1>
      
//       {/* Default Button */}
//       <ThemeToggle />
      
//       {/* Custom Button Example */}
//       {/* <CustomButton /> */}
//     </nav>
//   );
// }

// function Content() {
//   return (
//     <div className="space-y-6">
//       <div className="dark-bg dark-border border-2 p-6 rounded-lg">
//         <h2 className="dark-text text-xl font-bold mb-2">Dark Card</h2>
//         <p className="dark-text">This card has dark background and white text in dark mode.</p>
//       </div>
      
//       <div className="bg-white border-2 p-6 rounded-lg">
//         <h2 className="text-xl font-bold mb-2">Normal Card</h2>
//         <p>This card stays the same in both modes.</p>
//       </div>
      
//       <input 
//         type="text" 
//         placeholder="Dark input example"
//         className="dark-input border-2 p-3 rounded w-full"
//       />
//     </div>
//   );
// }

// // Custom button example
// function CustomButton() {
//   const { theme, toggleTheme } = useTheme();
  
//   return (
//     <button 
//       onClick={toggleTheme}
//       className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 
//                  rounded-full text-white font-bold hover:scale-110 
//                  transition-transform"
//     >
//       {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
//     </button>
//   );
// }

// export default App;