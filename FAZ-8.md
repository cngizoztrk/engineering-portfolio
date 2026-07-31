# Faz 8 — Kritik Düzeltmeler ve Çalışan Admin Arayüzü

> **NASIL KULLANILIR**
>
> 1. Bu dosyayı proje köküne kopyala: `C:\Users\cngiz\OneDrive\Desktop\web\FAZ-8.md`
> 2. VS Code'da **CLAUDE CODE** sekmesi → **New Session**
> 3. Yaz: `FAZ-8.md dosyasını oku ve uygula. Sırayla, bölüm bölüm ilerle. Her bölüm sonunda ne yaptığını ve doğrulama sonucunu bana göster.`

---

## Bağlam

`C:\Users\cngiz\OneDrive\Desktop\web` — çalışan Astro sitesi. i18n (TR/EN), Pagefind arama, kategori filtreleme, temel SEO ve TR ana sayfa hazır. Site canlıya alındı ve şu anda `https://mcengizozturk.pages.dev` adresinde yayında.

**Kesinleşmiş bilgiler:**
- Canlı adres: `https://mcengizozturk.pages.dev`
- GitHub kullanıcı adı: `cngizoztrk`
- GitHub reposu: `cngizoztrk/engineering-portfolio`
- Production branch: `main`
- Cloudflare Pages'e bağlı — `main` branch'e her push otomatik build ve deploy tetikliyor
- Site sahibi: **M. Cengiz Öztürk**, makine mühendisliği öğrencisi (odak: katı mekanik, FEA, asansör/yürüyen merdiven mühendisliği — EN 81-20/50, ASME A17.1)

Faz 7'de Sveltia CMS için dosyalar oluşturuldu ama gerçek anlamda çalışan bir admin arayüzü **kurulmadı** — bu fazda tamamlanacak.

**Mevcut çalışan yapıya dokunma. Sadece aşağıdaki dört sorunu çöz.**

---

## Bölüm 1 — CV dil sorunu

**Durum:** Ana sayfa İngilizce iken CV bağlantısı görünüyor, Türkçe iken görünmüyor.

Yapılacaklar:

1. Türkçe ana sayfa şablonunu (`src/pages/index.astro`) ve İngilizce şablonu (`src/pages/en/index.astro`) karşılaştır — CV bağlantısı iki dosyada da aynı koşulla ve aynı yerde olsun.
2. CV dosyası `public/cv/cv-tr.pdf` olarak diskte var (bunu doğrula, `ls` veya `dir` ile göster).
3. Türkçe sayfada CV bağlantısı da CV önizleme + indirme davranışı ile görünsün. Yeni sekme + tarayıcı PDF görüntüleyicisi + ayrıca "İndir" bağlantısı (Faz 6/7'de `PdfLink.astro` bileşeni oluşturulmuştu — onu kullan; yoksa oluştur).
4. Bittiğinde: Türkçe ana sayfada CV bağlantısının görünür halinin ekran görüntüsünü al, bana göster.

---

## Bölüm 2 — Proje detay 404 hatası

**Durum:** `mcengizozturk.pages.dev/en/projects/kapi-analizi` (veya benzer bir proje detay URL'i) tıklandığında **404: Not found** dönüyor. Yalnız ana sayfadaki "Featured content" kartı çalışıyor gibi, listeden tıklanan bağlantı çalışmıyor. Hem yerelde hem canlıda aynı sorun.

Yapılacaklar:

1. Önce **teşhis et:**
   - `src/content/projects/` altındaki gerçek dosyaların tam adları neler? Listele (`kapi-analizi.md`, `kapi-analizi.en.md` vb.)
   - `src/pages/projects/[slug].astro` ve `src/pages/en/projects/[slug].astro` dosyalarındaki `getStaticPaths` fonksiyonları slug'ı nasıl üretiyor?
   - Liste sayfası (`src/pages/projects/index.astro` ve `en/projects/index.astro`) her proje kartındaki bağlantıyı hangi URL'e işaret ediyor?
   - Build çıktısında `dist/` klasöründe hangi proje HTML dosyaları üretiliyor?
2. Uyuşmazlığı bul — büyük ihtimalle şunlardan biri:
   - Slug'da `.en` eki kalıntı olarak URL'e sızıyor (görsel: URL `kapi-analizien` şeklinde — `-en` gibi bir eksik ayırma var)
   - EN sayfalarındaki `getStaticPaths` sadece `.en.md` dosyalarını değil, TR olanları da eşleştiriyor veya tam tersi
   - Kart bağlantısı `entry.slug` yerine `entry.id` gibi yanlış bir alan kullanıyor
3. Kök nedeni **açıkla**, sonra düzelt. Yamayla değil, mantığı doğru kurarak — hem TR hem EN için hem `[slug].astro` hem liste sayfası tutarlı çalışsın.
4. Yeni içerik eklendiğinde de kırılmamasını sağla (Sveltia CMS eklenecek yeni dosyalar için de aynı slug mantığı geçerli olmalı).
5. Bittiğinde:
   - Türkçe bir proje detay sayfası açılıyor — ekran görüntüsü
   - İngilizce bir proje detay sayfası açılıyor — ekran görüntüsü
   - Değişen dosyaların listesi ve her birinde ne değiştiğinin açıklaması

---

## Bölüm 3 — Ana sayfada bulduğun küçük hatalar

Sayfayı ekran görüntüleri üzerinden gözden geçir. Şunlara bak:
- Kırık bağlantı, eksik metin, TODO/yer tutucu kalıntısı
- Türkçe TDK yazım kuralları ihlali, İngilizce dil bilgisi hatası
- Tutarsız büyük harf kullanımı, çift boşluk, yarım cümle
- Mobilde bozuk görünen bir öge var mı

Bulduklarını **liste halinde bana göster**, sonra düzelt. Düzeltemediklerini de belirt (örneğin renk paleti tercihi gibi öznel şeyler bekleyecek).

---

## Bölüm 4 — Sveltia CMS admin arayüzü (asıl iş bu bölümde)

**Durum:** Faz 7'de `public/admin/index.html` ve `config.yml` oluşturulmuş görünüyor ama gerçek anlamda çalışmıyor. Bu bölümde işlevsel hale getirilecek.

### 4.1 — Mevcut durumu göster
1. `public/admin/index.html` içeriğini göster
2. `public/admin/config.yml` içeriğini göster
3. Çalışmama sebebini teşhis et

### 4.2 — `config.yml`'yi baştan doğru kur

Şu değerleri kullan (kullanıcıya sormana gerek yok, hepsi kesinleşti):

**Backend:**
- `name: github`
- `repo: cngizoztrk/engineering-portfolio`
- `branch: main`
- `auth_type: pkce` (GitHub'ın Personal Access Token akışı için — Cloudflare Workers OAuth kurulumu gerektirmez, kullanıcı kolayca token'la giriş yapar)
- `app_id: ` boş bırak, kullanıcı isterse ileride kendi OAuth app'ini bağlar

**Medya:**
- `media_folder: "public/images/uploads"`
- `public_folder: "/images/uploads"`

**Site URL:**
- `site_url: https://mcengizozturk.pages.dev`
- `display_url: https://mcengizozturk.pages.dev`

**i18n:**
- `i18n: locales: [tr, en]`, default `tr`
- File-per-locale yapısı (TR `.md`, EN `.en.md`)

**Collections — üç koleksiyon:** research, projects, notes.

Her koleksiyonun alanları **`src/content/config.ts`'teki Zod şemasıyla BİREBİR eşleşecek.** Şu adımları izle:

1. Önce `src/content/config.ts`'i oku ve her koleksiyonun (research, projects, notes) tüm alanlarını listele
2. Her Zod alanını Sveltia CMS field tipine dönüştür:
   - `z.string()` → `widget: string`
   - `z.array(z.string())` → `widget: list`
   - `z.enum([...])` → `widget: select, options: [...]`
   - `z.boolean()` → `widget: boolean`
   - `z.coerce.string()` (tarih) → `widget: datetime`
   - Body (Markdown içeriği) → `widget: markdown` (`name: body` ile)
3. Alan etiketlerini Türkçe yaz (`label: Başlık`, `label: Etiketler`, `label: Kategori`, `label: Kullanılan araçlar`, `label: PDF`, `label: Öne çıkar`, `label: Taslak`)
4. Her koleksiyon için `folder: src/content/<name>`, `create: true`, `slug: "{{slug}}"`, `extension: md`
5. Görsel/video için: `projects` koleksiyonuna opsiyonel `gallery` alanı ekle (`widget: list` of `image` widget) ve opsiyonel `video_url` alanı (YouTube/Vimeo linki için `widget: string` — regex validation ile)

### 4.3 — `admin/index.html`'yi doğru kur

- `<meta name="robots" content="noindex">` olsun
- Sveltia CMS'in en güncel CDN sürümü yüklensin: `https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js` (`context7-auto-research` ile güncel sürümü ve script tag'ini doğrula, tahmin etme)
- Türkçe UI için gerekli config varsa ekle

### 4.4 — Kullanıcı için giriş kılavuzu yaz

Proje kökünde `ADMIN-KULLANIM.md` oluştur ve içine şunu yaz — kullanıcı hiç kod bilmiyor, her şey adım adım olacak:

1. GitHub Personal Access Token nasıl alınır (Fine-grained token, `engineering-portfolio` reposuna Contents=RW, Pull requests=RW, Metadata=RO — sınırlı yetki, sadece bu repoya yazabilir, 1 yıl geçerli, ücretsiz)
2. `https://mcengizozturk.pages.dev/admin` adresine nasıl gidilir
3. Giriş ekranında token nasıl yapıştırılır
4. İlk projeyi nasıl eklerim: Sol menü → Projeler → New Project → alanları doldur → Publish
5. Fotoğraf/video nasıl eklerim
6. Bir yazıyı taslak olarak nasıl kaydederim, sonra nasıl yayınlarım
7. Bir yazının başlığını nasıl değiştiririm
8. Publish'e bastıktan sonra ne olur (GitHub'a otomatik push → Cloudflare otomatik build → 1-2 dakika sonra site canlı)

### 4.5 — Doğrulama

`npm run build` çalıştır. Build'de `dist/admin/index.html` ve `dist/admin/config.yml` üretildiğini doğrula.

**ÖNEMLİ:** Admin paneli **yerelde `localhost:4321/admin`'de sadece kısmen** çalışır — GitHub bağlantısı için sitenin gerçek bir HTTPS adresinde olması gerekir. Bu Sveltia CMS'in bir kısıtı, senin bir hatan değil. Kullanıcıya bunu açıkça yaz: "Panel gerçek anlamda `https://mcengizozturk.pages.dev/admin` adresinde çalışacak, yerelde sadece arayüz açılır ama içerik yazılamaz."

---

## Bölüm 5 — Genel doğrulama ve rapor

Her bölüm bittikten sonra kısa bir rapor ver. En sonda toplu özet:

1. Değişen tüm dosyaların listesi
2. `npm run build` çıktısı (sayfa sayısı, hata var mı)
3. `playwright-skill` ile şu sayfaların ekran görüntüsü:
   - Türkçe ana sayfa (CV bağlantısı görünür durumda)
   - İngilizce ana sayfa
   - Türkçe projeler listesi
   - Bir proje detay sayfası (404 çözüldü mü)
   - `/admin` sayfası (giriş ekranı görünüyor mu)
4. Kullanıcının elle yapması gereken adımlar — sıralı, net, teknik bilgi varsaymadan yazılmış:
   - Değişiklikleri canlıya alma: `git add . && git commit -m "Faz 8" && git push` — sonra Cloudflare otomatik build eder
   - Personal Access Token alma (adım adım GitHub arayüzü)
   - `https://mcengizozturk.pages.dev/admin`'e giriş
5. Yapamadığın veya yarım kalan her şeyi açıkça belirt. Yapmadığın bir şeyi yaptım deme.

---

## Kurallar

- Uydurma veri üretme, lorem ipsum yok
- Yeni npm paketi ekleme (Sveltia CMS CDN'den yükleniyor)
- Sveltia CMS API'sinden emin değilsen `context7-auto-research` ile güncel dokümana bak, tahmin etme (özellikle 2026 sürümüyle uyumlu config sözdizimi için)
- `context7-auto-research` yerine gerekirse `https://github.com/sveltia/sveltia-cms` ve `https://ergaster.org/til/sveltia-cms-astro/` gibi kaynaklara da bakabilirsin
- Büyük mimari değişiklik yapmadan önce sor
- Türkçe cevap ver
