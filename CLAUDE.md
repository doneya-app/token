# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Token Universe Explorer is an educational single-page application that explores the concept of "token" across different technical contexts (API/security, AI/LLM, blockchain, linguistics, and programming). The site features interactive tools including a JWT decoder and an AI token counter.

**Live URL**: https://token.kristoffer.dev
**Repository**: https://github.com/doneya-app/token

## Development Commands

```bash
# Start development server (runs on http://[::]:8080)
npm run dev

# Build for production
npm run build

# Build for development environment
npm run build:dev

# Preview production build locally (MUST use this to test builds, not file://)
npm run preview

# Lint code
npm run lint
```

## Architecture

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router v6 with BrowserRouter
- **State Management**: React Query (@tanstack/react-query)
- **Theme**: next-themes for dark/light mode

### Project Structure
```
src/
├── components/
│   ├── ui/              # shadcn/ui components (DO NOT EDIT DIRECTLY)
│   ├── ContextCard.tsx  # Displays different token context cards
│   ├── JWTDecoder.tsx   # Interactive JWT token decoder
│   ├── TokenCounter.tsx # OpenAI GPT-4 token counter
│   └── ThemeToggle.tsx  # Dark/light mode toggle
├── pages/
│   ├── Index.tsx        # Main landing page
│   └── NotFound.tsx     # 404 page
├── hooks/               # Custom React hooks
├── lib/
│   └── utils.ts         # Utility functions (cn for class merging)
└── main.tsx            # App entry point
```

### Key Components

**JWTDecoder** (`src/components/JWTDecoder.tsx`):
- Decodes JWT tokens using `jwt-decode` library
- Syntax highlighting with `react-syntax-highlighter` (oneDark/oneLight themes)
- Theme-aware code display

**TokenCounter** (`src/components/TokenCounter.tsx`):
- Counts OpenAI-style tokens using `js-tiktoken` library
- Encodes with GPT-4 tokenizer
- Real-time token counting with useEffect
- Displays first 20 token IDs

**ContextCard** (`src/components/ContextCard.tsx`):
- Reusable card component for displaying token contexts
- Takes icon (Lucide), emoji, title, description, example, and learnMoreUrl

### Routing
- Single route app: `/` (Index page)
- Catch-all `*` route goes to NotFound page
- Uses BrowserRouter (requires special GitHub Pages configuration)

### GitHub Pages Deployment

**CRITICAL**: This app is deployed to GitHub Pages and requires special SPA routing configuration:

1. **`public/404.html`**: Redirects 404s back to index.html with path encoded in query string
2. **`index.html`**: Contains redirect-handling script that decodes the path from query string

This configuration is ESSENTIAL for React Router to work on GitHub Pages. The pattern is from [spa-github-pages](https://github.com/rafgraph/spa-github-pages).

**Deployment Process**:
- GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys on push to main
- Build artifacts go to `dist/` folder
- `public/` folder contents are copied to `dist/` during build (including `.nojekyll` and `404.html`)

### Styling

- Uses Tailwind CSS with HSL-based CSS variables for theming
- Theme colors defined in `src/index.css` with `:root` and `.dark` selectors
- Custom classes: `gradient-card` for cards with gradient borders
- shadcn/ui components configured in `components.json` with path aliases (`@/components`, `@/lib`, etc.)

### Path Aliases
The following import aliases are configured (see `vite.config.ts` and `tsconfig.json`):
- `@/components` → `src/components`
- `@/lib` → `src/lib`
- `@/hooks` → `src/hooks`
- `@/pages` → `src/pages`

Always use these aliases for imports instead of relative paths.

## Important Technical Details

### Testing Production Builds
**Never** open `dist/index.html` directly in a browser (file:// protocol won't work with absolute paths).

Always use: `npm run preview` or `npx serve dist`

### Theme Implementation
- Uses `next-themes` for theme management
- Theme persists to localStorage
- Components can access theme via `useTheme()` hook
- Tailwind uses `darkMode: ["class"]` strategy

### Interactive Tools
Both JWTDecoder and TokenCounter are client-side only:
- No API calls or backend dependencies
- All processing happens in the browser
- Libraries: `jwt-decode` for JWT parsing, `js-tiktoken` for token counting

### Adding New shadcn/ui Components
If you need to add a new shadcn/ui component that doesn't exist yet:
```bash
npx shadcn@latest add [component-name]
```

The configuration in `components.json` will automatically place components in the correct location.
