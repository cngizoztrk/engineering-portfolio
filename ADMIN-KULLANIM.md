# İçerik Yönetim Paneli — Kullanım Kılavuzu

Bu kılavuz, hiç kod yazmadan siteye yeni proje, araştırma ve not eklemeniz için hazırlandı. Panel; **GitHub Personal Access Token** ile giriş yapılan, [Sveltia CMS](https://github.com/sveltia/sveltia-cms) tabanlı bir arayüzdür.

> **ÖNEMLİ:** Panel gerçek anlamda yalnızca **`https://mcengizozturk.pages.dev/admin`** adresinde çalışır. Yerelde (`localhost:4321/admin`) sadece arayüz açılır, GitHub'a bağlanamaz ve içerik kaydedilemez. Bu, Sveltia CMS'in bir kısıtı — bir hata değil.

---

## 1. GitHub Personal Access Token (PAT) alma

Panelin GitHub reponuza yazabilmesi için, yalnızca bu repoya sınırlı, 1 yıl geçerli, ücretsiz bir "Fine-grained" erişim anahtarı (token) oluşturmanız gerekiyor. Bu anahtarı yalnızca siz göreceksiniz — kimseyle paylaşmayın.

1. GitHub'a giriş yapın, sağ üstteki profil fotoğrafınıza tıklayın → **Settings**.
2. Sol menüde en altta **Developer settings** seçeneğine tıklayın.
3. **Personal access tokens** → **Fine-grained tokens** → **Generate new token** butonuna tıklayın.
4. Formu şu şekilde doldurun:
   - **Token name:** `engineering-portfolio-admin` (istediğiniz bir isim)
   - **Expiration:** 1 yıl (365 gün) seçin — süre dolunca yeni token oluşturup panelde yenilersiniz.
   - **Repository access:** **Only select repositories** seçin, açılan listeden **`cngizoztrk/engineering-portfolio`** reposunu seçin.
5. **Permissions** (Repository permissions) bölümünde şu üçünü ayarlayın, diğerlerine dokunmayın:
   - **Contents** → **Read and write**
   - **Pull requests** → **Read and write**
   - **Metadata** → **Read-only** (bu zaten otomatik gelir)
6. En altta **Generate token** butonuna tıklayın.
7. GitHub size `github_pat_...` ile başlayan uzun bir metin gösterecek. **Bu ekrandan ayrılırsanız bir daha göremezsiniz** — hemen kopyalayıp güvenli bir yere (örneğin şifre yöneticinize) kaydedin.

Bu token yalnızca `engineering-portfolio` reposuna yazabilir, başka hiçbir hesabınıza veya repoya erişemez.

---

## 2. Panele giriş

1. Tarayıcıda şu adrese gidin: **https://mcengizozturk.pages.dev/admin**
2. Karşınıza bir giriş ekranı gelecek. **"Sign In with GitHub"** butonuna DEĞİL, **"Sign In Using Access Token"** (Token ile giriş yap) butonuna tıklayın — "Sign In with GitHub" bu proje için çalışmaz (404 hatası verir), çünkü OAuth uygulaması kurulu değil.
3. Açılan kutuya, 1. adımda kopyaladığınız `github_pat_...` token'ı yapıştırın ve onaylayın.
4. Panel açılır; sol tarafta **Araştırmalar**, **Projeler**, **Notlar** ve **Hakkımda** koleksiyonlarını görürsünüz.

Token tarayıcınızda saklanır; aynı bilgisayar/tarayıcıda tekrar girişte token'ı yeniden yapıştırmanız gerekebilir.

---

## 3. İlk projeyi ekleme

1. Sol menüden **Projeler**'e tıklayın.
2. Sağ üstteki **New Project** (veya **+ Yeni**) butonuna tıklayın.
3. Açılan formda alanları doldurun:
   - **Dosya adı (slug):** Küçük harf, rakam ve tire kullanın (örn. `koprulu-mekanizma-analizi`). **Kaydettikten sonra değiştirmeyin** — link bu isme bağlanır.
   - **Başlık, Özet, Alan (domain):** bunlar zorunlu, boş bırakamazsınız (bkz. aşağıdaki "Hangi alanlar zorunlu?" bölümü).
   - **Kategori, Araçlar, Standartlar, Etiketler, GitHub bağlantısı, Teknik rapor (PDF), Galeri görselleri, Video, Sürüm, Değişiklik geçmişi:** hepsi opsiyonel, doldurmasanız da Publish çalışır.
   - **Dil:** Bu formu **Türkçe** içerik olarak dolduruyorsanız `tr` seçili kalsın.
   - **İçerik:** Ana metni (Markdown) buraya yazın — bu alan zorunludur.
4. Sağ üstte **Publish** (Yayınla) butonuna tıklayın.

### Hangi alanlar zorunlu?

Her koleksiyonda **Başlık, Özet, Tarih ve İçerik (body)** her zaman zorunludur. Buna ek olarak, koleksiyona özel bir zorunlu alan daha vardır — bu alanlar site kodunun (`src/content/config.ts`) gerçek gereksinimidir, boş bırakılırsa site derlemesi hata verir:

- **Projeler:** yukarıdakilere ek olarak **Alan (domain)** de zorunludur.
- **Araştırmalar:** yukarıdakilere ek olarak **Konu (topic)** de zorunludur.
- **Notlar:** yukarıdakilere ek olarak **Konu başlığı (subject)** de zorunludur.

**Bunların dışındaki tüm alanlar opsiyoneldir** — istediğinizi boş bırakabilirsiniz. Video, PDF, galeri, değişiklik geçmişi gibi alanları hiç kullanmıyorsanız dokunmadan boş geçebilirsiniz, Publish bunları engellemez.

### Aynı projenin İngilizce çevirisini eklemek

Formun üstünde bir dil sekmesi (TR / EN) göreceksiniz. **EN** sekmesine geçip aynı alanları İngilizce doldurun ve **Dil** alanında mutlaka `en` seçin. Aynı anda kaydedip yayınlayabilirsiniz — TR ve EN içerik otomatik olarak birbirine bağlanır (aynı proje, iki dilde).

---

## 4. Fotoğraf / video ekleme

- **Fotoğraf (galeri):** Proje formunda **Galeri görselleri** alanının yanındaki **+** ile bilgisayarınızdan görsel yükleyin. Birden fazla görsel ekleyebilirsiniz.
- **Video:** **Video** alanına bir YouTube veya Vimeo bağlantısını (örn. `https://www.youtube.com/watch?v=...`) yapıştırmanız yeterli — site otomatik olarak videoyu sayfaya yerleştirir.

---

## 5. Taslak olarak kaydetme ve sonra yayınlama

- Formu doldurduktan sonra hemen **Publish** yerine sağ üstteki **Save** (Kaydet) butonunu kullanırsanız içerik **taslak** olarak kalır ve siteye yayınlanmaz.
- Ayrıca formdaki **Taslak (yayınlanmaz)** kutucuğunu işaretlerseniz, siz onu kapatana kadar (yani kutucuğu tekrar boşaltana kadar) içerik canlı sitede **hiç görünmez** — Publish'e bassanız bile.
- Yazıyı yayınlamaya hazır olduğunuzda **Taslak** kutucuğunun işaretini kaldırın ve **Publish**'e tıklayın.

---

## 6. Bir yazıda küçük bir düzeltme yapma (kısmi düzenleme)

Bir kaydı sadece **kısmen** düzenlemek serbesttir — örneğin başlıkta bir kelimeyi veya metindeki bir virgülü düzeltmek için diğer hiçbir alana dokunmanıza gerek yoktur:

1. Sol menüden ilgili koleksiyona (Projeler / Araştırmalar / Notlar) girin.
2. Listeden düzenlemek istediğiniz kaydı açın.
3. Sadece değiştirmek istediğiniz alanı güncelleyin (örn. **Başlık** veya **İçerik** içindeki bir kelime). Diğer alanlara — dolu olsun boş olsun — dokunmayın.
4. Sağ üstte **Publish**'e tıklayın (değişiklik doğrudan yayınlanır).

> Not: **Dosya adı (slug)** alanını değiştirmeyin — bu, o sayfanın linkini değiştirir ve eski linke giden herkes 404 hatası alır.

---

## 7. Publish'e bastıktan sonra ne olur?

1. Sveltia CMS, değişikliği doğrudan GitHub'daki **`cngizoztrk/engineering-portfolio`** reposunun **`main`** dalına gönderir (commit + push).
2. Bu push, Cloudflare Pages'in otomatik build sürecini tetikler.
3. Cloudflare siteyi yeniden derler ve yayınlar — bu genelde **1-2 dakika** sürer.
4. Süre dolunca **https://mcengizozturk.pages.dev** adresinde değişikliği görürsünüz. Sayfayı yenilemeniz (Ctrl+F5 / sert yenileme) gerekebilir.

Cloudflare Pages panelinden ("Workers & Pages" → projeniz → **Deployments** sekmesi) build'in durumunu (devam ediyor / başarılı / hatalı) takip edebilirsiniz.

---

## Sorun giderme

- **Giriş ekranı açılmıyor / boş kalıyor:** `https://mcengizozturk.pages.dev/admin` adresine gittiğinizden emin olun (yereldeki `localhost` adresi çalışmaz).
- **Token kabul edilmiyor:** Token'ın süresinin dolmadığından ve doğru repoya (`cngizoztrk/engineering-portfolio`) Contents=Read/write yetkisiyle oluşturulduğundan emin olun.
- **Publish sonrası site güncellenmiyor:** Cloudflare Pages panelinde ilgili deployment'ın "Success" (başarılı) durumda olduğunu kontrol edin; build hata verdiyse deployment logunu inceleyin.
