import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const TYPE_CONFIG = {
  research: { folder: 'research', requiredField: 'topic' },
  project: { folder: 'projects', requiredField: 'domain' },
  note: { folder: 'notes', requiredField: 'subject' }
};

function slugify(input) {
  const trMap = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', İ: 'i', Ç: 'c', Ğ: 'g', Ö: 'o', Ş: 's', Ü: 'u' };
  return input
    .split('')
    .map((char) => trMap[char] ?? char)
    .join('')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function buildFrontmatter(type, { title, category }) {
  const date = todayISO();
  const base = [
    `title: ${JSON.stringify(title)}`,
    `summary: "TODO: özet ekle"`,
    `tags: []`,
    `draft: true`,
    `category: ${JSON.stringify(category)}`
  ];

  if (type === 'research') {
    base.push(`status: ongoing`, `sourceCount: 0`, `topic: ${JSON.stringify(category)}`, `date: ${date}`);
  } else if (type === 'project') {
    base.push(`tools: []`, `domain: ${JSON.stringify(category)}`, `standards: []`, `featured: false`);
  } else if (type === 'note') {
    base.push(`subject: ${JSON.stringify(category)}`, `date: ${date}`);
  }

  return `---\n${base.join('\n')}\n---\n`;
}

function buildBody(type) {
  if (type === 'project') {
    return `\n## 1. Mühendislik problemi tanımı\n\nTODO\n\n## 2. Fiziksel anlayış / kavramsal model\n\nTODO\n\n## 3. Analitik hesaplama ve mühendislik varsayımları\n\nTODO\n\n## 4. CAD modeli\n\nTODO\n\n## 5. Sayısal model ve sınır koşulları\n\nTODO\n\n## 6. FEA / analiz sonuçları\n\nTODO\n\n## 7. Mesh bağımsızlığı / yakınsama çalışması\n\nTODO\n\n## 8. Analitik-teorik-literatür sonuçlarıyla doğrulama\n\nTODO\n\n## 9. Tasarım karşılaştırması / parametrik çalışma / optimizasyon\n\nTODO\n\n## 10. Mühendislik yorumu ve sonuç\n\nTODO\n\n## 11. Teknik rapor (PDF) ve GitHub bağlantısı\n\nTODO\n`;
  }
  if (type === 'research') {
    return `\n## Amaç\n\nTODO\n\n## Teknik içerik\n\nTODO\n\n## Kaynakça\n\n1. TODO\n`;
  }
  return `\nTODO: not içeriğini yaz.\n`;
}

async function main() {
  const rl = createInterface({ input: stdin, output: stdout });

  try {
    let type = (await rl.question('İçerik tipi (research/project/note): ')).trim().toLowerCase();
    while (!TYPE_CONFIG[type]) {
      type = (await rl.question('Geçersiz tip. research, project veya note yaz: ')).trim().toLowerCase();
    }

    let title = (await rl.question('Başlık: ')).trim();
    while (!title) {
      title = (await rl.question('Başlık boş olamaz, tekrar yaz: ')).trim();
    }

    const category = (await rl.question('Kategori: ')).trim() || 'TODO';

    const slug = slugify(title);
    const { folder } = TYPE_CONFIG[type];
    const targetDir = path.join(rootDir, 'src', 'content', folder);
    const targetFile = path.join(targetDir, `${slug}.md`);

    if (existsSync(targetFile)) {
      console.error(`\nHata: ${path.relative(rootDir, targetFile)} zaten var. Farklı bir başlık dene.`);
      process.exitCode = 1;
      return;
    }

    mkdirSync(targetDir, { recursive: true });
    const content = buildFrontmatter(type, { title, category, slug }) + buildBody(type);
    writeFileSync(targetFile, content, 'utf8');

    console.log(`\nOluşturuldu: ${path.relative(rootDir, targetFile)}`);
    console.log('draft: true olarak işaretlendi — yayınlamaya hazır olunca false yap.');
  } finally {
    rl.close();
  }
}

main();
