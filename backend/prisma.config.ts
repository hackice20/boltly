import { defineConfig } from '@prisma/config';

export default defineConfig({
    start: {
        // This URL is used for migrations and introspection
        url: process.env.DATABASE_URL
    },
});
