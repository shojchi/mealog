---
name: accessibility
description: >
  Accessibility (a11y) standards and inclusive design practices.
  Trigger: When creating interactive elements, forms, or custom UI widgets.
license: MIT
metadata:
  scope: [ui]
  auto_invoke: "Creating interactive interfaces"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

# Accessibility (A11y) Standards

We build for everyone. Every component must be accessible by default.

## Key Architectural Principles

1.  **Semantic HTML**:
    - Always use the correct HTML tag (`<button>` for actions, `<a>` for navigation, `<nav>`, `<main>`, `<article>`, etc.).
    - Never use a `<div>` or `<span>` with an `onClick` handler unless it also has a `role="button"`, `tabIndex={0}`, and handles keyboard events like `Enter` and `Space`.
2.  **Form Accessibility**:
    - Every `<input>`, `<select>`, and `<textarea>` must have an associated `<label>`.
    - Use ARIA attributes (`aria-invalid`, `aria-describedby`) to link input fields with error messages.
3.  **Keyboard Navigation**:
    - The entire application must be usable with only a keyboard.
    - Ensure focus rings are clearly visible (do not use `outline: none` unless replacing it with an accessible alternative like `box-shadow`).
    - Modals and Overlays must trap focus inside them while open, and return focus to the triggering element when closed.
4.  **Color Contrast**:
    - Ensure text and interactive elements have a sufficient contrast ratio against their background, in both light and dark themes.
