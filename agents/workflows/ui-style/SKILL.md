---
name: ui-style
description: >
  UI styling, CSS modules, and theming guidelines.
  Trigger: When modifying styles, adding new components, or working with themes.
license: MIT
metadata:
  scope: [ui, styles]
  auto_invoke: "Modifying CSS or creating UI components"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

# UI Styling Standards

This project uses standard CSS Modules (`.module.css`) for component-scoped styling.

## Key Architectural Principles

1.  **CSS Modules**:
    - Every component should have its own `ComponentName.module.css`.
    - Import styles as `import styles from './ComponentName.module.css'`.
    - Apply classes using `className={styles.container}`.
2.  **Theming (Light/Dark Mode)**:
    - The project supports dark theme via CSS variables.
    - Define core color variables in `index.css` under `:root` (light mode) and either `[data-theme='dark']` or `@media (prefers-color-scheme: dark)` (dark mode).
    - Hardcoded colors (e.g., `background-color: #ffffff`) are strictly forbidden. Always use semantic CSS variables (e.g., `background-color: var(--bg-primary)`).
3.  **Responsive Design**:
    - Use mobile-first media queries (`@media (min-width: 768px)`).
    - Favor CSS Grid and Flexbox for layouts.

## Aesthetics

- **Premium Feel**: Use subtle transitions, rounded corners (`border-radius`), and soft box-shadows to define hierarchy.
- **Interactivity**: Add hover and active states (using subtle opacity or scale changes) to all interactive elements to make the UI feel alive.
