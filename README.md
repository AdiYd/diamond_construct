# Vite React Website Template

A modern, responsive website template built with Vite, React, TypeScript, Tailwind CSS, and Radix UI. This template provides a solid foundation for building professional websites with best practices in mind.

## Features

- ⚡️ **Vite** - Lightning fast build tool
- ⚛️ **React** - A JavaScript library for building user interfaces
- 🔷 **TypeScript** - Type safety and better developer experience
- 🎨 **Tailwind CSS** - A utility-first CSS framework
- 🎯 **Radix UI** - Unstyled, accessible components for building high‑quality design systems
- 🌓 **Dark Mode** - Built-in dark mode support
- 🌐 **Internationalization** - Support for multiple languages (English and Hebrew)
- 📱 **Responsive Design** - Mobile-first approach with a responsive layout
- 🧭 **React Router** - Client-side routing
- 🎯 **ESLint & Prettier** - Code formatting and linting

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vite-starter.git
cd vite-starter
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:5173`

## Project Structure

```
vite-starter/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/
│   ├── context/
│   │   ├── ThemeContext.tsx
│   │   └── LanguageContext.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   └── Blog.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── content/
│   │   └── legal/
│   ├── utils/
│   └── App.tsx
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Customization

### Branding
- Replace `[Brand Name]` in components with your brand name
- Add your logo in the `public` directory
- Update color scheme in `tailwind.config.js`

### Content
- Update placeholder content in pages
- Modify legal documents in `src/content/legal`
- Add new pages as needed

### Styling
- Customize theme variables in `src/styles/globals.css`
- Modify Tailwind configuration in `tailwind.config.js`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
