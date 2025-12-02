# InsightHub Dashboard

A modern React dashboard application built with Vite.

## What is Vite?

Vite is a modern frontend build tool that provides:
- **Lightning-fast development server** with Hot Module Replacement (HMR)
- **Optimized builds** using Rollup for production
- **Native ES modules** support in development
- **Fast cold start** - no bundling required in dev mode
- **Rich plugin ecosystem** with first-class framework support

## Why Use Vite?

1. **Speed**: Instant server start and lightning-fast HMR regardless of app size
2. **Modern**: Built on native ES modules, leveraging modern browser capabilities
3. **Simple**: Minimal configuration with sensible defaults
4. **Optimized**: Pre-configured for production with code splitting and tree-shaking
5. **Developer Experience**: Better error messages and faster feedback loop

## Project Structure

```
insighthub-dashboard/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── styles/         # CSS files
│   ├── assets/         # Static assets (images, fonts, etc.)
│   ├── utils/          # Utility functions
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API services and external integrations
│   ├── App.jsx         # Main App component
│   └── main.jsx        # Application entry point
├── public/             # Public static assets
├── index.html          # HTML entry point
├── vite.config.js      # Vite configuration
└── package.json        # Project dependencies
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Technologies

- **React 18.3.1** - UI library
- **Vite 5.4.1** - Build tool and dev server
- **ESLint** - Code linting

## Features

- ✅ Modern React setup with Vite
- ✅ Organized folder structure
- ✅ Hot Module Replacement (HMR)
- ✅ ESLint configuration
- ✅ Production-ready build setup
