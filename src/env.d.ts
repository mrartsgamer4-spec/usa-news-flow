/// <reference types="@cloudflare/workers-types" />

interface Env {
    DB: D1Database;
    MEDIA_BUCKET: R2Bucket;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
        }
    }
}

export { };
declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}