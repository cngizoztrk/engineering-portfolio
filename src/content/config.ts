import { defineCollection, z } from 'astro:content';

// Tırnaksız YAML tarihleri (ör. `date: 2026-07-23`) js-yaml tarafından Date nesnesine
// çevrilir; bunu her zaman "YYYY-MM-DD" biçiminde bir metne normalize eder.
const isoDate = z.union([z.string(), z.date()]).transform((value: string | Date) =>
  value instanceof Date ? value.toISOString().slice(0, 10) : value
);

const changelogEntry = z.object({
  version: z.string(),
  date: isoDate,
  note: z.string()
});

const commonSchema = {
  title: z.string(),
  summary: z.string(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  category: z.string().optional(),
  updated: isoDate.optional(),
  version: z.string().optional(),
  changelog: z.array(changelogEntry).optional(),
  pdf: z.string().optional(),
  // Faz 7: YouTube/Vimeo video bağlantısı (harici embed, dosya yükleme değil)
  video: z.string().url().optional(),
  // Faz 4 (i18n): içerik dili ve TR/EN çevirisini eşleştirmek için ortak anahtar
  lang: z.enum(['tr', 'en']).default('tr'),
  translationKey: z.string().optional()
};

const researchCollection = defineCollection({
  type: 'content',
  schema: z.object({
    ...commonSchema,
    status: z.enum(['ongoing', 'completed']).default('ongoing'),
    sourceCount: z.number().int().default(0),
    topic: z.string(),
    date: isoDate
  })
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    ...commonSchema,
    tools: z.array(z.string()).default([]),
    domain: z.string(),
    standards: z.array(z.string()).default([]),
    github: z.string().url().optional(),
    images: z.array(z.string()).optional(),
    featured: z.boolean().default(false)
  })
});

const notesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    ...commonSchema,
    subject: z.string(),
    source: z.string().optional(),
    date: z.coerce.string()
  })
});

const aboutCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().default('Hakkımda'),
    lang: z.enum(['tr', 'en']).default('tr'),
    translationKey: z.string().optional()
  })
});

export const collections = {
  research: researchCollection,
  projects: projectsCollection,
  notes: notesCollection,
  about: aboutCollection
};
