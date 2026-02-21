---
name: pwa
description: >
  Progressive Web App (PWA) development patterns and best practices.
  Trigger: When modifying Vite PWA configuration, service workers, manifest, or offline functionality.
license: MIT
metadata:
  scope: [root, config]
  auto_invoke: "Working with PWA configuration"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

# Progressive Web App (PWA) Standards

This project is a React Progressive Web App built with Vite and `vite-plugin-pwa`.

## Key Architectural Principles

1.  **Offline-First Data (Dexie)**: All application logic must assume the network might be offline. Data is stored locally in IndexedDB using Dexie before syncing.
2.  **Service Worker Management**:
    - The Service Worker is automatically injected using `vite-plugin-pwa` in `generateSW` mode.
    - Precaching of static assets is handled automatically during the build process.
3.  **App Manifest**: `manifest.webmanifest` contains the necessary metadata. When modifying icons or theme colors, update both the manifest and the HTML `<head>`.

## Development Best Practices

### Handling Updates

When publishing a new version, the service worker might need to update. Use the `virtual:pwa-register` hooks to prompt the user to refresh the page when a new version is available:

```tsx
import { useRegisterSW } from "virtual:pwa-register/react";

function UpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) return null;

  return (
    <div className="update-toast">
      <p>New content available, click on reload button to update.</p>
      <button onClick={() => updateServiceWorker(true)}>Reload</button>
      <button onClick={() => setNeedRefresh(false)}>Close</button>
    </div>
  );
}
```

### Checking for Network Connectivity

Do not rely solely on `navigator.onLine`. Always implement robust error handling for fetch requests, gracefully degrading to local IndexedDB/Dexie storage if a request fails, before displaying an offline indicator to the user.
