import { defineCollection, z } from 'astro:content';

// Tırnaksız YAML tarihleri (ör. `date: 2026-07-23`) js-yaml tarafından Date nesnesine
// çevrilir; bunu her zaman "YYYY-MM-DD" biçiminde bir metne normalize eder.
const isoDate = z.union([z.string(), z.date()]).transform((value: string | Date) =>
  value instanceof Date ? value.toISOString().slice(0, 10) : value
);

// Sveltia CMS'te boş bırakılan alanlar "" veya null olarak yazılabiliyor; Zod'un
// .optional()/.default() mekanizması sadece `undefined`'ı tanır. Bu yüzden her
// opsiyonel alanda önce "" ve null değerlerini undefined'a indirgiyoruz, böylece
// admin panelinden boş kaydedilen bir alan build'i kırmıyor.
const emptyToUndefined = (v: unknown) => (v === '' || v === null ? undefined : v);

const optionalString = () => z.preprocess(emptyToUndefined, z.string().optional());
const optionalUrl = () => z.preprocess(emptyToUndefined, z.string().url().optional());
const optionalDate = () => z.preprocess(emptyToUndefined, isoDate.optional());
const stringArrayWithDefault = () =>
  z.preprocess(emptyToUndefined, z.array(z.string()).optional().default([]));
const booleanWithDefault = (fallback: boolean) =>
  z.preprocess(emptyToUndefined, z.boolean().optional().default(fallback));

const changelogEntry = z.object({
  version: z.string(),
  date: isoDate,
  note: z.string()
});

const commonSchema = {
  title: z.string(),
  summary: z.string(),
  tags: stringArrayWithDefault(),
  draft: booleanWithDefault(false),
  category: optionalString(),
  updated: optionalDate(),
  version: optionalString(),
  changelog: z.preprocess(emptyToUndefined, z.array(changelogEntry).optional().default([])),
  pdf: optionalString(),
  // Faz 7: YouTube/Vimeo video bağlantısı (harici embed, dosya yükleme değil)
  video: optionalUrl(),
  // Faz 4 (i18n): içerik dili ve TR/EN çevirisini eşleştirmek için ortak anahtar
  lang: z.enum(['tr', 'en']).default('tr'),
  translationKey: optionalString()
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
    tools: stringArrayWithDefault(),
    domain: z.string(),
    standards: stringArrayWithDefault(),
    github: optionalUrl(),
    images: stringArrayWithDefault(),
    featured: booleanWithDefault(false)
  })
});

const notesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    ...commonSchema,
    subject: z.string(),
    source: optionalString(),
    date: z.coerce.string()
  })
});

const aboutCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().default('Hakkımda'),
    lang: z.enum(['tr', 'en']).default('tr'),
    translationKey: optionalString()
  })
});

export const collections = {
  research: researchCollection,
  projects: projectsCollection,
  notes: notesCollection,
  about: aboutCollection
};
