// download-missing.js
// tries google books api for covers not found on open library

const fs = require('fs');
const path = require('path');
const https = require('https');

const COVERS_DIR = path.join(__dirname, '..', 'covers');

// books that failed open library search - with better search terms
const MISSING_BOOKS = [
  { title: 'the leaf thief', author: 'alice hemming', slug: 'the-leaf-thief' },
  { title: 'mother teresa', author: 'little people big dreams', slug: 'mother-teresa-lpbd' },
  { title: 'whats right whats wrong webber', author: '', slug: 'whats-right-whats-wrong' },
  { title: 'david attenborough', author: 'little people big dreams', slug: 'david-attenborough-lpbd' },
  { title: 'spot lift flap', author: 'eric hill', slug: 'spot-and-friends' },
  { title: 'michelle obama', author: 'little people big dreams', slug: 'michelle-obama-lpbd' },
  { title: 'stephen hawking', author: 'little people big dreams', slug: 'stephen-hawking-lpbd' },
  { title: 'princess diana', author: 'little people big dreams', slug: 'princess-diana-lpbd' },
  { title: 'wonderful things youll be', author: 'emily winfield martin', slug: 'the-wonderful-things-youll-be' },
  { title: 'what can you see farm', author: 'maria perera', slug: 'what-can-you-see-on-the-farm' },
  { title: 'what can you see night', author: 'maria perera', slug: 'what-can-you-see-at-night' },
  { title: 'welcome refugees', author: 'axel scheffler', slug: 'welcome' },
  { title: 'farm sounds usborne', author: '', slug: 'farm-sounds' },
  { title: 'maya angelou', author: 'little people big dreams', slug: 'maya-angelou-lpbd' },
  { title: 'mahatma gandhi', author: 'little people big dreams', slug: 'mahatma-gandhi-lpbd' },
  { title: 'zaha hadid', author: 'little people big dreams', slug: 'zaha-hadid-lpbd' },
  { title: 'little people big dreams boys box', author: '', slug: 'lpbd-collection' },
  { title: 'my little book krishna puffin', author: '', slug: 'my-little-book-of-krishna' }
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: { 'User-Agent': 'MiraLibrary/1.0' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : require('http');
    const file = fs.createWriteStream(filepath);

    protocol.get(url, {
      headers: { 'User-Agent': 'MiraLibrary/1.0' }
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(filepath);
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function searchGoogleBooks(title, author) {
  const query = encodeURIComponent(`${title} ${author}`.trim());
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`;

  const data = await fetchJson(url);

  if (data.items && data.items[0]?.volumeInfo?.imageLinks) {
    const links = data.items[0].volumeInfo.imageLinks;
    // prefer larger images
    let coverUrl = links.medium || links.small || links.thumbnail;
    if (coverUrl) {
      // upgrade to https and request larger size
      coverUrl = coverUrl.replace('http://', 'https://').replace('&edge=curl', '').replace('zoom=1', 'zoom=2');
    }
    return coverUrl;
  }
  return null;
}

async function main() {
  console.log(`trying google books for ${MISSING_BOOKS.length} missing covers...\n`);

  let success = 0;
  let failed = 0;
  const stillMissing = [];

  for (const book of MISSING_BOOKS) {
    const filepath = path.join(COVERS_DIR, `${book.slug}.jpg`);

    // skip if already exists
    if (fs.existsSync(filepath)) {
      console.log(`⊘ ${book.slug} - already exists`);
      continue;
    }

    try {
      const coverUrl = await searchGoogleBooks(book.title, book.author);

      if (!coverUrl) {
        throw new Error('no cover found');
      }

      await downloadImage(coverUrl, filepath);
      console.log(`✓ ${book.slug}`);
      success++;
    } catch (err) {
      console.log(`✗ ${book.slug} - ${err.message}`);
      stillMissing.push(book);
      failed++;
    }

    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\ndone: ${success} downloaded, ${failed} still missing`);

  if (stillMissing.length > 0) {
    console.log('\nstill missing (will need placeholder or manual download):');
    stillMissing.forEach(b => console.log(`  - ${b.title} → covers/${b.slug}.jpg`));
  }
}

main().catch(console.error);
