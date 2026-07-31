import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n';

type PublishableCollection = 'research' | 'projects' | 'notes';

export async function getPublished<C extends PublishableCollection>(
  collection: C,
  locale: Locale = 'tr'
): Promise<CollectionEntry<C>[]> {
  const all = await getCollection(collection, (entry) => import.meta.env.DEV || !entry.data.draft);
  return all.filter((entry) => (entry.data.lang ?? 'tr') === locale);
}

// Dosya adı `slug.en.md` biçimindeyse üretilen slug `slug.en` olur; TR karşılığıyla
// eşleştirmek ve temiz bir URL üretmek için bu sonek temizlenir.
function baseSlug(slug: string): string {
  return slug.replace(/\.en$/, '');
}

export interface LocalizedEntry<C extends PublishableCollection> {
  slug: string;
  tr: CollectionEntry<C>;
  en?: CollectionEntry<C>;
}

// TR içeriğini temel alıp varsa eşleşen EN çevirisini eşler; her TR sayfası için
// bir /en/ route üretilebilsin diye çeviri olmayan girişler de listeye dahil edilir.
export async function getLocalizedEntries<C extends PublishableCollection>(
  collection: C
): Promise<LocalizedEntry<C>[]> {
  const trItems = await getPublished(collection, 'tr');
  const enItems = await getPublished(collection, 'en');

  return trItems.map((trItem) => {
    const key = trItem.data.translationKey ?? trItem.slug;
    const enItem = enItems.find((item) => (item.data.translationKey ?? baseSlug(item.slug)) === key);
    return { slug: trItem.slug, tr: trItem, en: enItem };
  });
}
