// download-covers.js
// downloads all book covers from open library to local covers/ folder

const fs = require('fs');
const path = require('path');
const https = require('https');

const COVERS_DIR = path.join(__dirname, '..', 'covers');

// all books with title + author for better search
const BOOKS = [
  // current favorites
  { title: 'how do apples grow', author: 'betsy maestro' },
  { title: 'garden time', author: 'jill mcdonald' },
  { title: 'what little girls are made of', author: 'jeanne willis' },
  { title: 'the leaf thief', author: 'alice hemming' },

  // currently reading
  { title: 'biggest word book ever', author: 'richard scarry' },
  { title: 'jane goodall little people big dreams', author: 'maria isabel sanchez vegara' },
  { title: 'mother teresa little people big dreams', author: 'maria isabel sanchez vegara' },
  { title: 'red shoes', author: 'karen english' },
  { title: 'whats right whats wrong', author: 'webber' },
  { title: 'wonderful seasons', author: 'emily winfield martin' },
  { title: 'busy christmas', author: 'campbell' },
  { title: 'tap the magic tree', author: 'christie matheson' },
  { title: 'press here', author: 'herve tullet' },
  { title: 'how many counting book', author: 'christopher danielson' },

  // all-time classics
  { title: 'here we are', author: 'oliver jeffers' },
  { title: 'audrey hepburn little people big dreams', author: 'maria isabel sanchez vegara' },
  { title: 'coco chanel little people big dreams', author: 'maria isabel sanchez vegara' },
  { title: 'david attenborough little people big dreams', author: 'maria isabel sanchez vegara' },
  { title: 'where is the green sheep', author: 'mem fox' },
  { title: 'the lion inside', author: 'rachel bright' },
  { title: 'the koala who could', author: 'rachel bright' },
  { title: 'steve jobs little people big dreams', author: 'maria isabel sanchez vegara' },
  { title: 'spot and friends', author: 'eric hill' },

  // read 50+ times
  { title: 'michelle obama little people big dreams', author: 'maria isabel sanchez vegara' },
  { title: 'frida kahlo little people big dreams', author: 'maria isabel sanchez vegara' },
  { title: 'stephen hawking little people big dreams', author: 'maria isabel sanchez vegara' },
  { title: 'princess diana little people big dreams', author: 'maria isabel sanchez vegara' },
  { title: 'taylor swift little people big dreams', author: 'maria isabel sanchez vegara' },
  { title: 'one thousand things', author: 'anna kovecses' },
  { title: 'the wonderful things youll be', author: 'emily winfield martin' },
  { title: 'you and the universe', author: 'stephen hawking' },
  { title: 'what can you see on the farm', author: 'maria perera' },
  { title: 'what can you see at night', author: 'maria perera' },
  { title: 'the very hungry caterpillar', author: 'eric carle' },
  { title: 'from head to toe', author: 'eric carle' },
  { title: 'welcome', author: 'axel scheffler' },
  { title: 'farm sounds', author: 'usborne' },
  { title: 'zoo sounds', author: 'usborne' },
  { title: 'chicka chicka boom boom', author: 'bill martin' },

  // not been a fan of
  { title: 'the whale who wanted more', author: 'rachel bright' },
  { title: 'amelia earhart little people big dreams', author: 'maria isabel sanchez vegara' },
  { title: 'maya angelou little people big dreams', author: 'maria isabel sanchez vegara' },
  { title: 'mahatma gandhi little people big dreams', author: 'maria isabel sanchez vegara' },
  { title: 'zaha hadid little people big dreams', author: 'maria isabel sanchez vegara' },
  { title: 'little people big dreams collection', author: 'maria isabel sanchez vegara' },
  { title: 'the heart and the bottle', author: 'oliver jeffers' },
  { title: 'a colour of his own', author: 'leo lionni' },
  { title: 'my little book of krishna', author: 'puffin' },

  // recommendations
  { title: 'were going on a bear hunt', author: 'michael rosen' },
  { title: 'lost and found', author: 'oliver jeffers' },
  { title: 'the day the crayons quit', author: 'drew daywalt' }
];

// slugify title for filename
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/little people big dreams/g, 'lpbd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// fetch json from url
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

// download image from url to filepath
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : require('http');
    const file = fs.createWriteStream(filepath);

    protocol.get(url, {
      headers: { 'User-Agent': 'MiraLibrary/1.0' }
    }, (response) => {
      // handle redirects
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

// search open library for book cover
async function searchOpenLibrary(title, author) {
  const query = encodeURIComponent(`${title} ${author}`);
  const url = `https://openlibrary.org/search.json?q=${query}&limit=1`;

  const data = await fetchJson(url);

  if (data.docs && data.docs[0] && data.docs[0].cover_i) {
    // use -L for large cover
    return `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg`;
  }
  return null;
}

// main
async function main() {
  console.log(`searching open library for ${BOOKS.length} covers...\n`);

  // ensure directory exists
  if (!fs.existsSync(COVERS_DIR)) {
    fs.mkdirSync(COVERS_DIR, { recursive: true });
  }

  let success = 0;
  let failed = 0;
  const failedBooks = [];

  for (const book of BOOKS) {
    const slug = slugify(book.title);
    const filepath = path.join(COVERS_DIR, `${slug}.jpg`);

    try {
      // search for cover url
      const coverUrl = await searchOpenLibrary(book.title, book.author);

      if (!coverUrl) {
        throw new Error('no cover found');
      }

      // download cover
      await downloadImage(coverUrl, filepath);
      console.log(`✓ ${slug}`);
      success++;
    } catch (err) {
      console.log(`✗ ${slug} - ${err.message}`);
      failedBooks.push({ title: book.title, author: book.author, slug });
      failed++;
    }

    // rate limit: 100 requests/5min for open library
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\ndone: ${success} downloaded, ${failed} failed`);

  if (failedBooks.length > 0) {
    console.log('\nfailed books (need manual covers):');
    failedBooks.forEach(b => console.log(`  - ${b.title} (${b.slug})`));
  }

  // generate mapping for app.js
  console.log('\n--- LOCAL_COVERS mapping for app.js ---\n');
  console.log('const LOCAL_COVERS = {');
  for (const book of BOOKS) {
    const slug = slugify(book.title);
    // create key that matches how titles appear in allBooks
    const titleKey = book.title.toLowerCase()
      .replace(/little people big dreams/g, '')
      .replace(/counting book/g, '')
      .trim();
    console.log(`  '${titleKey}': 'covers/${slug}.jpg',`);
  }
  console.log('};');
}

main().catch(console.error);
