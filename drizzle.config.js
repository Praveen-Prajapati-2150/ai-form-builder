import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  //   schema: './configs/schema.js',
  schema: './app/configs/schema.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://ai-form-builder_owner:cvq9dUl6NZQt@ep-solitary-cell-a1h44wmc.ap-southeast-1.aws.neon.tech/ai-form-builder?sslmode=require',
  },
});
