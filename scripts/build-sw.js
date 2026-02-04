import { injectManifest } from 'workbox-build';

async function buildSW() {
  await injectManifest({
    swSrc: 'src/sw-base.js',
    swDest: 'dist/sw.js',
    globDirectory: 'dist',
    globPatterns: [
      '**/*.{js,css,html,svg,png,woff2}'
    ]
  });

  console.log('✅ Service Worker generated');
}

buildSW();
