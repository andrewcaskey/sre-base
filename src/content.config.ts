import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Blog posts live as markdown files in src/content/blog/.
// Each post's frontmatter is validated against this schema at build time.
const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
