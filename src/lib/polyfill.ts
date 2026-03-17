/**
 * SSR Polyfill for localStorage to prevent build errors in Next.js
 */
if (typeof window === 'undefined') {
    (global as any).localStorage = {
        length: 0,
        getItem: () => null,
        setItem: () => { },
        removeItem: () => { },
        clear: () => { },
        key: () => null,
    };
}
export { };
