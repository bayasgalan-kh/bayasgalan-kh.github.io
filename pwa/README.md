
## Progressive Web App

Complete these tasks to add PWA support to the build:

1. Create icons.

    Add these image variants to the icons/ directory:

        android-chrome-192x192.png
        android-chrome-512x512.png
        apple-touch-icon.png
        favicon.ico
        favicon.svg

    Make sure your images conform to the minimum safe area across user agents; a handy tool for verifying that is https://maskable.app/editor

1. Verify strings in PWA manifests: update `manifest.json` with your project particulars.

1. Verify PWA declaration and asset paths: `src/layout.twig`

1. Verify the default Workbox service worker generation and output piping: `gulpfile.babel.js/tasks/service-worker.js`

1. Verify the service worker registration: `src/main.js`

1. Build; in DevTools verify `Application` params, `Storage > IndexedDB` and `Cache > Cache Storage` population.
