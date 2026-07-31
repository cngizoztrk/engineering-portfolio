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

// Astro'nun varsayılan slug üretici (github-slugger) dosya kimliğindeki noktaları
// siler: `slug.en.md` dosyasının `entry.slug` değeri `slug.en` değil `slugen` olur.
// Bu yüzden sonek temizliğini `entry.slug` üzerinde değil, noktaların korunduğu
// `entry.id` (ör. `slug.en.md`) üzerinde yapıp temiz bir taban slug üretiyoruz.
export function canonicalSlug(entry: CollectionEntry<PublishableCollection>): string {
  return entry.id.replace(/\.md$/, '').replace(/\.en$/, '');
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
    const key = trItem.data.translationKey ?? canonicalSlug(trItem);
    const enItem = enItems.find((item) => (item.data.translationKey ?? canonicalSlug(item)) === key);
    return { slug: trItem.slug, tr: trItem, en: enItem };
  });
}
