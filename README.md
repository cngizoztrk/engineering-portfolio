# Kişisel Mühendislik Portföyü

Bu proje, makine mühendisliği öğrencisinin teknik araştırmalarını, proje örneklerini ve öğrenme notlarını yayınlamak için Astro + Content Collections ile kurulan statik bir portföy sitesidir.

## Özellikler

- Astro Content Collections ile üç içerik alanı: `research/`, `projects/`, `notes/`
- Markdown tabanlı içerik yönetimi
- KaTeX ile matematik denklemleri
- Pagefind tabanlı site içi arama
- Etiket sayfaları (`/tags/...`)
- SEO temelleri: meta etiketleri, OG image, robots ve sitemap
- Cloudflare Pages için CI/CD iş akışı

## Geliştirme

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Yeni içerik ekleme

1. `src/content/research/`, `src/content/projects/` veya `src/content/notes/` klasörüne yeni `.md` dosyası ekleyin.
2. Frontmatter alanlarını doldurun.
3. Uygulamayı yeniden başlatın veya build alın.

## Deploy

- GitHub üzerinde `main` branch'e push sonrası `.github/workflows/cloudflare-pages.yml` otomatik olarak build + dağıtım çalıştırır.
- `CLOUDFLARE_API_TOKEN` ve `CLOUDFLARE_ACCOUNT_ID` repository secrets olarak tanımlanmalıdır.
