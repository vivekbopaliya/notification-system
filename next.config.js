/** @type {import('next').NextConfig} */
const nextConfig = {
    server: {
        host: '0.0.0.0',
        port: 3000,
    },
    images: {
        domains: ['lh3.googleusercontent.com']
    },
    pwa: {
        dest: 'public', // Directory where the service worker and manifest will be stored
        register: true, // Whether to register the service worker
        scope: '/', // Scope of the PWA
        // You can add other PWA options here
        // Example:
        // runtimeCaching: [
        //   {
        //     urlPattern: /^https:\/\/api\.example\.com/,
        //     handler: 'StaleWhileRevalidate',
        //     options: {
        //       cacheName: 'api-cache',
        //       cacheableResponse: {
        //         statuses: [0, 200]
        //       }
        //     }
        //   }
        // ]
    },
};

module.exports = nextConfig;
