---
name: vite
description: >
  Vite build tool patterns and configuration guidelines.
  Trigger: When modifying vite.config.ts, environment variables, or build settings.
license: MIT
metadata:
  scope: [root, config]
  auto_invoke: "Working with Vite configuration"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

# Vite Configuration Standards

This project uses Vite as the build tool and development server (`vite-plugin-react`).

## Key Architectural Principles

1.  **Environment Variables**:
    - Variables must be prefixed with `VITE_` to be exposed to the client-side code (e.g., `VITE_FIREBASE_API_KEY`).
    - Use `import.meta.env` to access variables, not `process.env`.
    - Never commit `.env.local` files containing secrets.
2.  **Asset Handling**:
    - Import static assets (images, fonts) directly in JS/TS files to let Vite hash them for cache busting.
    - Place assets that must retain their exact names and paths in the `/public` directory.
3.  **TypeScript Integration**:
    - Vite builds only perform transpilation. Type checking is handled by `tsc -b` during the build script.

## Plugin Ecosystem

- `@vitejs/plugin-react`: Enables Fast Refresh and JSX transformation without manual `React` imports.
- `vite-plugin-pwa`: Generates the service worker and manifest for the PWA.

## Performance

- Monitor the build output sizes. When adding large dependencies, consider dynamic imports (`import()`) to split the vendor chunks, especially for libraries that aren't needed on the critical path to first pain (like chart libraries or heavy internationalization chunks).
