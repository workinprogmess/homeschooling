// mira's library - main app logic

// state
let allBooks = [];
let selectedItem = null;
let selectedItemType = null; // 'book', 'rec-book', 'rec-activity'
let bookRecommendations = null;
let activityRecommendations = null;
let feedback = {};

// activity icons by category
const ACTIVITY_ICONS = {
  'sensory & pattern play': '🎨',
  'extended pretend play': '🎭',
  'nature & observation': '🌿'
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
  loadFeedback();
  setupEventListeners();
  await loadDemoData();
  await loadRecommendations();
});

function setupEventListeners() {
  // bottom nav
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  // modal close
  document.querySelector('#detail-modal .modal-close').addEventListener('click', closeModal);
  document.getElementById('detail-modal').addEventListener('click', (e) => {
    if (e.target.id === 'detail-modal') closeModal();
  });

  // modal feedback buttons
  document.getElementById('modal-yay-btn').addEventListener('click', () => setModalFeedback('yay'));
  document.getElementById('modal-nay-btn').addEventListener('click', () => setModalFeedback('nay'));
  document.getElementById('save-feedback-btn').addEventListener('click', saveModalFeedbackNotes);

  // export buttons
  document.getElementById('export-books-btn').addEventListener('click', () => exportFeedback('books'));
  document.getElementById('export-activities-btn').addEventListener('click', () => exportFeedback('activities'));
}

// ============================================
// TAB SWITCHING
// ============================================

const SUBTITLES = {
  library: 'books she loves, books she\'s exploring, books we\'re thinking about',
  books: 'ai-recommended books picked just for mira',
  activities: 'screen-free activities built around how she learns'
};

function switchTab(tabName) {
  // update views
  document.querySelectorAll('.tab-view').forEach(v => v.classList.remove('active'));
  document.getElementById(`tab-${tabName}`).classList.add('active');

  // update nav
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`.nav-tab[data-tab="${tabName}"]`).classList.add('active');

  // update subtitle
  document.getElementById('header-subtitle').textContent = SUBTITLES[tabName] || '';

  // scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// LIBRARY DATA (demo mode)
// ============================================

async function loadDemoData() {
  showLoading(true);

  allBooks = [
    // current favorites (4)
    { id: '1', title: 'how do apples grow', author: 'jill mcdonald', mira_name: 'apple go', status: 'current_favorite', read_count: 50, notes: 'reads the title letter by letter, calls it by name, loves the lifecycle', cover_url: 'covers/how-do-apples-grow.jpg' },
    { id: '2', title: 'garden time', author: 'jill mcdonald', mira_name: 'time', status: 'current_favorite', read_count: 50, notes: 'read a lot, calls it by its name', cover_url: 'covers/garden-time.jpg' },
    { id: '3', title: 'what little girls are made of', author: 'jeanne willis & isabelle follath', mira_name: null, status: 'current_favorite', read_count: 10, notes: 'recently bought, spends time on every page from cover to colored diamonds with shapes, beautiful illustrations and rhymes', cover_url: 'covers/what-little-girls-are-made-of.jpg' },
    { id: '4', title: 'the leaf thief', author: 'alice hemming', mira_name: null, status: 'current_favorite', read_count: 30, notes: 'squirrel character, seasonal theme', cover_url: 'covers/the-leaf-thief.jpg' },

    // currently reading (10)
    { id: '5', title: 'richard scarry\'s biggest word book ever', author: 'richard scarry', mira_name: null, status: 'currently_reading', read_count: 10, notes: 'recently bought, loves it, visits at least once a day, always finds something new', cover_url: 'covers/biggest-word-book-ever.jpg' },
    { id: '6', title: 'jane goodall', author: 'maria isabel sánchez vegara', mira_name: null, status: 'currently_reading', read_count: 20, notes: 'still going, remembers the chimpanzee names jane gave them - fifi, gigi, dave', series: 'little people big dreams', cover_url: 'covers/jane-goodall-lpbd.jpg' },
    { id: '7', title: 'mother teresa', author: 'maria isabel sánchez vegara', mira_name: null, status: 'currently_reading', read_count: 30, notes: 'still reads, keeps going back, something about mother teresa she loves, likes the cover with baby', series: 'little people big dreams', cover_url: 'covers/mother-teresa-lpbd.jpg' },
    { id: '8', title: 'red shoes', author: 'karen english', mira_name: null, status: 'currently_reading', read_count: 15, notes: 'picks it up cause she\'s obsessed with shoes (especially mumma\'s red shoes), loves the feeling of receiving a box of shoes', cover_url: 'covers/red-shoes.jpg' },
    { id: '9', title: 'what\'s right, what\'s wrong', author: 'webber books', mira_name: null, status: 'currently_reading', read_count: 20, notes: 'key learning: a question can have multiple wrong answers before arriving at a right answer', cover_url: 'covers/whats-right-whats-wrong.jpg' },
    { id: '10', title: 'wonderful seasons', author: 'emily winfield martin', mira_name: null, status: 'currently_reading', read_count: 15, notes: 'read a few times, still goes back', cover_url: 'covers/wonderful-seasons.jpg' },
    { id: '11', title: 'busy christmas', author: 'campbell', mira_name: null, status: 'currently_reading', read_count: 10, notes: 'picked up during christmas when house was lit up', cover_url: 'covers/busy-christmas.jpg' },
    { id: '12', title: 'tap the magic tree', author: 'christie matheson', mira_name: null, status: 'currently_reading', read_count: 20, notes: 'interactive, currently reading but hasn\'t become a favorite', cover_url: 'covers/tap-the-magic-tree.jpg' },
    { id: '13', title: 'press here', author: 'hervé tullet', mira_name: null, status: 'currently_reading', read_count: 15, notes: 'interactive dots, sometimes wants to create her own interactions but next page is pre-fixed which confuses her', cover_url: 'covers/press-here.jpg' },
    { id: '14', title: 'how many?', author: 'christopher danielson', mira_name: null, status: 'currently_reading', read_count: 5, notes: 'recently bought, barely read yet but will come handy in months to come', cover_url: 'covers/how-many-counting-book.jpg' },

    // all-time classics (9)
    { id: '15', title: 'here we are', author: 'oliver jeffers', mira_name: null, status: 'all_time_classic', read_count: 40, notes: 'still going strong, feels comfortable with it, visual depth, lots to explore, we just read it today', cover_url: 'covers/here-we-are.jpg' },
    { id: '16', title: 'audrey hepburn', author: 'maria isabel sánchez vegara', mira_name: 'audrey', status: 'all_time_classic', read_count: 50, notes: 'favorite page: first page where she\'s dancing in the house, also the strawberries/flowers page "dance like no one\'s watching", audrey comes back during play especially hide & seek', series: 'little people big dreams', cover_url: 'covers/audrey-hepburn-lpbd.jpg' },
    { id: '17', title: 'coco chanel', author: 'maria isabel sánchez vegara', mira_name: 'coco', status: 'all_time_classic', read_count: 50, notes: 'favorite page: when coco goes to sleep and dreams about patterns, chuckles at "the nuns thought gabrielle was very strange", knows coco does sewing, comes back during hide & seek', series: 'little people big dreams', cover_url: 'covers/coco-chanel-lpbd.jpg' },
    { id: '18', title: 'david attenborough', author: 'maria isabel sánchez vegara', mira_name: null, status: 'all_time_classic', read_count: 50, notes: 'loves reading names of animals/plants named after david, when david cleans the water, when young david cycles to sit with animals and show fossils', series: 'little people big dreams', cover_url: 'covers/david-attenborough-lpbd.jpg' },
    { id: '19', title: 'where is the green sheep', author: 'mem fox', mira_name: null, status: 'all_time_classic', read_count: 50, notes: 'knows almost every kind of sheep and what it\'s doing, favorite: second-last page with multiple sheep activities, learned cheers + cutting/sharing cake + parachuting from this', cover_url: 'covers/where-is-the-green-sheep.jpg' },
    { id: '20', title: 'the lion inside', author: 'rachel bright', mira_name: 'lion', status: 'all_time_classic', read_count: 50, notes: 'used to be top favorite, memorized completely, pre-says words, remembers lines especially last line/word of stanzas', cover_url: 'covers/the-lion-inside.jpg' },
    { id: '21', title: 'the koala who could', author: 'rachel bright', mira_name: 'kevin', status: 'all_time_classic', read_count: 50, notes: 'memorized, knows other characters (wombat, woodpecker), enacts when koala is about to fall', cover_url: 'covers/the-koala-who-could.jpg' },
    { id: '22', title: 'steve jobs', author: 'maria isabel sánchez vegara', mira_name: null, status: 'all_time_classic', read_count: 30, notes: 'her first from the series, knows steve, woz, steve\'s mumma/baba, spends play time on calligraphy letters page, learned \'rainbow\' from this book', series: 'little people big dreams', cover_url: 'covers/steve-jobs-lpbd.jpg' },
    { id: '23', title: 'spot and friends', author: 'eric hill', mira_name: null, status: 'all_time_classic', read_count: 50, notes: 'recent favorite, knows spot and names of all friends including what they\'re doing on each page, knows whose plate is which and what they\'re eating at snacks time', cover_url: 'covers/spot-and-friends.jpg' },

    // read 50+ times (16)
    { id: '24', title: 'michelle obama', author: 'maria isabel sánchez vegara', mira_name: null, status: 'read_50_plus', read_count: 50, notes: 'loved the colorful illustrations/characters, learned about \'waving the hand\' from obamas during presidency tours, now unreadable (most pages torn)', series: 'little people big dreams', cover_url: 'covers/michelle-obama-lpbd.jpg' },
    { id: '25', title: 'frida kahlo', author: 'maria isabel sánchez vegara', mira_name: null, status: 'read_50_plus', read_count: 40, notes: 'knows frida does painting and drew pictures of her foot, looks at her own feet every time, feels sad on the accident page, comes back during hide & seek', series: 'little people big dreams', cover_url: 'covers/frida-kahlo-lpbd.jpg' },
    { id: '26', title: 'stephen hawking', author: 'maria isabel sánchez vegara', mira_name: null, status: 'read_50_plus', read_count: 40, notes: 'especially the first half - when stephen looks at stars, falls going to school, sees a doctor, visuals don\'t keep her in later half', series: 'little people big dreams', cover_url: 'covers/stephen-hawking-lpbd.jpg' },
    { id: '27', title: 'princess diana', author: 'maria isabel sánchez vegara', mira_name: null, status: 'read_50_plus', read_count: 50, notes: 'loved her tiara, people with cameras everywhere, the way she waves hi to people, occasionally returns', series: 'little people big dreams', cover_url: 'covers/princess-diana-lpbd.jpg' },
    { id: '28', title: 'taylor swift', author: 'maria isabel sánchez vegara', mira_name: null, status: 'read_50_plus', read_count: 50, notes: 'learned she sings (developing interest in music), goes deep into smaller frames on pages with cats and friends', series: 'little people big dreams', cover_url: 'covers/taylor-swift-lpbd.jpg' },
    { id: '29', title: 'one thousand things', author: 'anna kovecses', mira_name: null, status: 'read_50_plus', read_count: 50, notes: 'once a big big favorite (6 months ago), wouldn\'t want to read anything else, now barely reads (outgrown), second most torn book', cover_url: 'covers/one-thousand-things.jpg' },
    { id: '30', title: 'the wonderful things you\'ll be', author: 'emily winfield martin', mira_name: null, status: 'read_50_plus', read_count: 50, notes: 'read a lot, returns once in a while', cover_url: 'covers/the-wonderful-things-youll-be.jpg' },
    { id: '31', title: 'you and the universe', author: 'stephen & lucy hawking', mira_name: null, status: 'read_50_plus', read_count: 40, notes: 'was a favorite once, tore some pages, still going strong on some pages', cover_url: 'covers/you-and-the-universe.jpg' },
    { id: '32', title: 'what can you see? on the farm', author: 'maria perera', mira_name: null, status: 'read_50_plus', read_count: 50, notes: 'every page, every detail, character/animal, # of birds/animals on page, once a favorite, now occasionally', cover_url: 'covers/what-can-you-see-on-the-farm.jpg' },
    { id: '33', title: 'what can you see? at night', author: 'maria perera', mira_name: null, status: 'read_50_plus', read_count: 50, notes: 'with attention to detail, once a favorite, now occasionally', cover_url: 'covers/what-can-you-see-at-night.jpg' },
    { id: '34', title: 'the very hungry caterpillar', author: 'eric carle', mira_name: null, status: 'read_50_plus', read_count: 50, notes: 'classic, talked about/referred to a lot, once a favorite (outgrown), once in a while now', cover_url: 'covers/the-very-hungry-caterpillar.jpg' },
    { id: '35', title: 'from head to toe', author: 'eric carle', mira_name: null, status: 'read_50_plus', read_count: 50, notes: 'action book, acted with each animal so many times she doesn\'t revisit a lot (outgrown)', cover_url: 'covers/from-head-to-toe.jpg' },
    { id: '36', title: 'welcome', author: 'axel scheffler', mira_name: 'welcome', status: 'read_50_plus', read_count: 50, notes: 'learned a lot: big/small, stompy & noisy v shy & quiet, different games (including chess), clothes', cover_url: 'covers/welcome.jpg' },
    { id: '37', title: 'farm sounds', author: 'usborne sound books', mira_name: null, status: 'read_50_plus', read_count: 50, notes: 'first book ever bought for her (before she was born), once a favorite, once in a while now', cover_url: 'covers/farm-sounds.jpg' },
    { id: '38', title: 'zoo sounds', author: 'usborne sound books', mira_name: null, status: 'read_50_plus', read_count: 50, notes: 'favorite once, once in a while', cover_url: 'covers/zoo-sounds.jpg' },
    { id: '39', title: 'words (chicka chicka boom boom)', author: null, mira_name: null, status: 'read_50_plus', read_count: 30, notes: 'still brings it to read, doesn\'t go through til end, but has fun with "you go me oh oh oh oh" page', cover_url: 'covers/chicka-chicka-boom-boom.jpg' },

    // not been a fan of (13)
    { id: '40', title: 'the whale who wanted more', author: 'rachel bright', mira_name: null, status: 'not_a_fan', read_count: 0, notes: 'never read it fully, last tried a couple months back, visuals don\'t help much', cover_url: 'covers/the-whale-who-wanted-more.jpg' },
    { id: '41', title: 'amelia earhart', author: 'maria isabel sánchez vegara', mira_name: null, status: 'not_a_fan', read_count: 5, notes: 'read a bit, illustrations don\'t have much for her to engage, read for the airplanes and nice calming visuals', series: 'little people big dreams', cover_url: 'covers/amelia-earhart-lpbd.jpg' },
    { id: '42', title: 'maya angelou', author: 'maria isabel sánchez vegara', mira_name: null, status: 'not_a_fan', read_count: 2, notes: 'barely read, hasn\'t gotten past a page or two, haven\'t figured out why', series: 'little people big dreams', cover_url: 'covers/maya-angelou-lpbd.jpg' },
    { id: '43', title: 'mahatma gandhi', author: 'maria isabel sánchez vegara', mira_name: null, status: 'not_a_fan', read_count: 5, notes: 'read a few times, visuals after first two pages (when mohandas is a child) don\'t say much, more in the story than visuals', series: 'little people big dreams', cover_url: 'covers/mahatma-gandhi-lpbd.jpg' },
    { id: '44', title: 'zaha hadid', author: 'maria isabel sánchez vegara', mira_name: null, status: 'not_a_fan', read_count: 2, notes: 'doesn\'t go past first two pages, even when there\'s much going on visually', series: 'little people big dreams', cover_url: 'covers/zaha-hadid-lpbd.jpg' },
    { id: '45', title: 'freddie mercury', author: 'maria isabel sánchez vegara', mira_name: null, status: 'not_a_fan', read_count: 5, notes: 'read a few times, one of the more engaging ones from the collection', series: 'little people big dreams', cover_url: 'covers/freddie-mercury-lpbd.jpg' },
    { id: '52', title: 'muhammad ali', author: 'maria isabel sánchez vegara', mira_name: null, status: 'not_a_fan', read_count: 2, notes: 'read once or twice', series: 'little people big dreams', cover_url: 'covers/muhammad-ali-lpbd.jpg' },
    { id: '53', title: 'david hockney', author: 'maria isabel sánchez vegara', mira_name: null, status: 'not_a_fan', read_count: 5, notes: 'read a few times, likes the colorful art', series: 'little people big dreams', cover_url: 'covers/david-hockney-lpbd.jpg' },
    { id: '54', title: 'charles dickens', author: 'maria isabel sánchez vegara', mira_name: null, status: 'not_a_fan', read_count: 0, notes: 'never read', series: 'little people big dreams', cover_url: 'covers/charles-dickens-lpbd.jpg' },
    { id: '55', title: 'neil armstrong', author: 'maria isabel sánchez vegara', mira_name: null, status: 'not_a_fan', read_count: 0, notes: 'not yet read', series: 'little people big dreams', cover_url: 'covers/neil-armstrong-lpbd.jpg' },
    { id: '46', title: 'the heart and the bottle', author: 'oliver jeffers', mira_name: null, status: 'not_a_fan', read_count: 2, notes: 'read a couple times, stopped cause the dad dies - too young to understand death (especially of a father she\'s so attached to)', cover_url: 'covers/the-heart-and-the-bottle.jpg' },
    { id: '47', title: 'a colour of his own', author: 'leo lionni', mira_name: null, status: 'not_a_fan', read_count: 5, notes: 'read a few times, played with colour wheel on cover more, just a chameleon in different colors, picks up here & there', cover_url: 'covers/a-colour-of-his-own.jpg' },
    { id: '48', title: 'my little book of (krishna, lakshmi, ganesh, durga, shiva, hanuman)', author: 'puffin books', mira_name: null, status: 'not_a_fan', read_count: 5, notes: 'picks up every now and then but doesn\'t read, just likes covers/characters, reads only lakshmi (and sometimes krishna), not til the end', cover_url: 'covers/my-little-book-of-krishna.jpg' }
  ];

  renderBooks();
  showLoading(false);
}

// ============================================
// LIBRARY RENDERING
// ============================================

function renderBooks() {
  const categories = [
    { id: 'current-favorites', status: 'current_favorite' },
    { id: 'currently-reading', status: 'currently_reading' },
    { id: 'all-time-classics', status: 'all_time_classic' },
    { id: 'read-50-plus', status: 'read_50_plus' },
    { id: 'not-a-fan', status: 'not_a_fan' }
  ];

  categories.forEach(cat => {
    const grid = document.getElementById(`grid-${cat.id}`);
    const section = document.getElementById(`section-${cat.id}`);
    const booksInCategory = allBooks.filter(b => b.status === cat.status);

    if (booksInCategory.length === 0) {
      section.style.display = 'none';
    } else {
      section.style.display = 'block';
      grid.innerHTML = booksInCategory.map(book => createBookCard(book)).join('');
    }
  });

  // click handlers + colors
  document.querySelectorAll('.book-card').forEach(card => {
    card.addEventListener('click', () => openBookModal(card.dataset.id));
    const coverImg = card.querySelector('img.book-cover');
    if (coverImg) applyBookCardColors(card, coverImg);
  });
}

function createBookCard(book) {
  const COVER_VERSION = 'v4';
  const coverSrc = book.cover_url?.startsWith('covers/')
    ? `${book.cover_url}?${COVER_VERSION}`
    : book.cover_url;
  const coverHtml = book.cover_url
    ? `<img src="${coverSrc}" alt="${book.title}" class="book-cover loading" loading="lazy" onload="this.classList.remove('loading'); this.classList.add('loaded')" crossorigin="anonymous">`
    : `<div class="book-cover placeholder">📚</div>`;

  const miraNameHtml = book.mira_name
    ? `<p class="book-mira-name">${book.mira_name}</p>`
    : '';

  const seriesHtml = book.series
    ? `<span class="series-badge">${book.series === 'little people big dreams' ? 'lpbd' : book.series}</span>`
    : '';

  const readCountHtml = book.read_count > 0
    ? `<span class="stat">${book.read_count}+ reads</span>`
    : '';

  const hasMeta = seriesHtml || readCountHtml;
  const metaHtml = hasMeta
    ? `<div class="book-meta">${seriesHtml}${readCountHtml}</div>`
    : '';

  return `
    <div class="book-card" data-id="${book.id}">
      ${coverHtml}
      <div class="book-info">
        <h3 class="book-title">${book.title}</h3>
        ${book.author ? `<p class="book-author">${book.author}</p>` : ''}
        ${miraNameHtml}
        ${metaHtml}
      </div>
    </div>
  `;
}

// ============================================
// RECOMMENDATIONS
// ============================================

async function loadRecommendations() {
  try {
    const [booksRes, activitiesRes] = await Promise.all([
      fetch('data/book-recommendations.json'),
      fetch('data/activity-recommendations.json')
    ]);

    if (booksRes.ok) {
      bookRecommendations = await booksRes.json();
      renderRecommendations('books');
    }

    if (activitiesRes.ok) {
      activityRecommendations = await activitiesRes.json();
      renderRecommendations('activities');
    }
  } catch (err) {
    console.warn('could not load recommendations:', err);
  }
}

function renderRecommendations(type) {
  const data = type === 'books' ? bookRecommendations : activityRecommendations;
  const container = document.getElementById(`recommended-${type}-content`);
  const exportSection = document.getElementById(`export-${type}-section`);

  if (!data || !data.batches || data.batches.length === 0) {
    container.innerHTML = '<p class="empty-state">no recommendations yet</p>';
    return;
  }

  let html = '';

  data.batches.forEach(batch => {
    html += `<div class="batch-section">`;
    html += `<div class="batch-reasoning"><p>${batch.overall_reasoning}</p></div>`;

    batch.categories.forEach(category => {
      html += `<div class="category-group">`;
      html += `<h3 class="category-group-header">${category.name}</h3>`;
      html += `<div class="category-group-reasoning"><p>${category.reasoning}</p></div>`;
      html += `<div class="rec-stack">`;

      category.items.forEach(item => {
        if (type === 'books') {
          html += createRecBookCard(item);
        } else {
          html += createRecActivityCard(item, category.name);
        }
      });

      html += `</div></div>`;
    });

    html += `</div>`;
  });

  container.innerHTML = html;
  exportSection.style.display = 'block';

  // attach event listeners
  container.querySelectorAll('.rec-card').forEach(card => {
    const id = card.dataset.id;
    const cardType = card.dataset.type;

    // card click → modal
    card.addEventListener('click', (e) => {
      // don't open modal if clicking a button or link
      if (e.target.closest('.feedback-btn') || e.target.closest('.rec-external-link')) return;
      openRecModal(id, cardType, type);
    });

    // feedback buttons
    card.querySelectorAll('.feedback-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const status = btn.dataset.status;
        toggleCardFeedback(id, status, card);
      });
    });
  });

  // fetch covers for book recommendations
  if (type === 'books') {
    fetchRecBookCovers();
  }
}

function createRecBookCard(item) {
  const fb = feedback[item.id];
  const yayActive = fb?.status === 'yay' ? 'active' : '';
  const nayActive = fb?.status === 'nay' ? 'active' : '';

  const coverHtml = item.cover_url
    ? `<img src="${item.cover_url}" alt="${item.title}" class="rec-cover loading" loading="lazy" onload="this.classList.remove('loading'); this.classList.add('loaded')" crossorigin="anonymous" data-rec-id="${item.id}">`
    : `<div class="rec-cover-placeholder" data-rec-id="${item.id}">📖</div>`;

  const linkHtml = item.amazon_url
    ? `<a href="${item.amazon_url}" target="_blank" rel="noopener" class="rec-external-link" onclick="event.stopPropagation()">amazon ↗</a>`
    : '';

  return `
    <div class="rec-card" data-id="${item.id}" data-type="book">
      ${coverHtml}
      <div class="rec-info">
        <h3 class="rec-title">${item.title}</h3>
        ${item.author ? `<p class="rec-author">${item.author}</p>` : ''}
        <p class="rec-why">${truncate(item.why, 120)}</p>
        <div class="rec-actions">
          <button class="feedback-btn yay ${yayActive}" data-status="yay" title="yay - want it!">👍</button>
          <button class="feedback-btn nay ${nayActive}" data-status="nay" title="nay - not for us">👎</button>
          ${linkHtml}
        </div>
      </div>
    </div>
  `;
}

function createRecActivityCard(item, categoryName) {
  const fb = feedback[item.id];
  const yayActive = fb?.status === 'yay' ? 'active' : '';
  const nayActive = fb?.status === 'nay' ? 'active' : '';
  const icon = ACTIVITY_ICONS[categoryName] || '✨';

  const materialsHtml = item.materials && item.materials.length > 0
    ? `<p class="rec-materials"><span class="rec-materials-label">needs: </span>${item.materials.join(', ')}</p>`
    : '';

  const linkHtml = item.video_url
    ? `<a href="${item.video_url}" target="_blank" rel="noopener" class="rec-external-link" onclick="event.stopPropagation()">watch ↗</a>`
    : '';

  return `
    <div class="rec-card" data-id="${item.id}" data-type="activity">
      <div class="rec-activity-icon">${icon}</div>
      <div class="rec-info">
        <h3 class="rec-title">${item.title}</h3>
        <p class="rec-description">${item.description}</p>
        ${materialsHtml}
        <p class="rec-why">${truncate(item.why, 120)}</p>
        <div class="rec-actions">
          <button class="feedback-btn yay ${yayActive}" data-status="yay" title="yay - want to try!">👍</button>
          <button class="feedback-btn nay ${nayActive}" data-status="nay" title="nay - not for us">👎</button>
          ${linkHtml}
        </div>
      </div>
    </div>
  `;
}

// ============================================
// COVER FETCHING FOR REC BOOKS
// ============================================

async function fetchRecBookCovers() {
  if (!bookRecommendations) return;

  for (const batch of bookRecommendations.batches) {
    for (const category of batch.categories) {
      for (const item of category.items) {
        if (!item.cover_url) {
          const cover = await searchBookCover(item.title, item.author);
          if (cover) {
            item.cover_url = cover;
            // update the placeholder in DOM
            const placeholder = document.querySelector(`[data-rec-id="${item.id}"]`);
            if (placeholder) {
              const img = document.createElement('img');
              img.src = cover;
              img.alt = item.title;
              img.className = 'rec-cover loading';
              img.loading = 'lazy';
              img.crossOrigin = 'anonymous';
              img.dataset.recId = item.id;
              img.onload = function() {
                this.classList.remove('loading');
                this.classList.add('loaded');
                // apply card colors
                const card = this.closest('.rec-card');
                if (card) applyBookCardColors(card, this);
              };
              placeholder.replaceWith(img);
            }
          }
        }
      }
    }
  }
}

// ============================================
// MODAL
// ============================================

function openBookModal(bookId) {
  selectedItem = allBooks.find(b => b.id === bookId);
  selectedItemType = 'book';
  if (!selectedItem) return;

  const modal = document.getElementById('detail-modal');
  const modalContent = modal.querySelector('.modal-content');

  // colors from card
  const card = document.querySelector(`.book-card[data-id="${bookId}"]`);
  if (card?.dataset.bgColor) {
    modalContent.style.backgroundColor = card.dataset.bgColor;
    modalContent.style.color = card.dataset.textColor;
  } else {
    modalContent.style.backgroundColor = '';
    modalContent.style.color = '';
  }

  // populate
  const coverImg = document.getElementById('modal-cover-img');
  coverImg.src = selectedItem.cover_url || '';
  document.getElementById('modal-cover-wrap').style.display = selectedItem.cover_url ? 'block' : 'none';
  document.getElementById('modal-title').textContent = selectedItem.title;
  document.getElementById('modal-author').textContent = selectedItem.author || '';
  document.getElementById('modal-mira-name').textContent = selectedItem.mira_name
    ? `mira calls it: "${selectedItem.mira_name}"`
    : '';

  document.getElementById('modal-read-count').textContent = selectedItem.read_count > 0
    ? `${selectedItem.read_count}+ reads`
    : '';
  const statusEl = document.getElementById('modal-status');
  statusEl.textContent = selectedItem.status?.replace(/_/g, ' ') || '';
  statusEl.className = `stat status-badge ${selectedItem.status || ''}`;

  document.getElementById('modal-notes-display').textContent = selectedItem.notes || '';
  document.getElementById('modal-notes-display').style.display = selectedItem.notes ? 'block' : 'none';

  // hide rec details for library books
  document.getElementById('modal-rec-details').style.display = 'none';

  // show stats for library books
  document.querySelector('.modal-stats').style.display = 'flex';

  modal.classList.add('active');
}

function openRecModal(itemId, itemType, tabType) {
  // find the item in recommendation data
  const data = tabType === 'books' ? bookRecommendations : activityRecommendations;
  if (!data) return;

  let item = null;
  for (const batch of data.batches) {
    for (const category of batch.categories) {
      item = category.items.find(i => i.id === itemId);
      if (item) break;
    }
    if (item) break;
  }
  if (!item) return;

  selectedItem = item;
  selectedItemType = tabType === 'books' ? 'rec-book' : 'rec-activity';

  const modal = document.getElementById('detail-modal');
  const modalContent = modal.querySelector('.modal-content');

  // colors from card
  const card = document.querySelector(`.rec-card[data-id="${itemId}"]`);
  if (card?.dataset.bgColor) {
    modalContent.style.backgroundColor = card.dataset.bgColor;
    modalContent.style.color = card.dataset.textColor;
  } else {
    modalContent.style.backgroundColor = '';
    modalContent.style.color = '';
  }

  // cover
  const coverImg = document.getElementById('modal-cover-img');
  if (item.cover_url && selectedItemType === 'rec-book') {
    coverImg.src = item.cover_url;
    document.getElementById('modal-cover-wrap').style.display = 'block';
  } else {
    document.getElementById('modal-cover-wrap').style.display = 'none';
  }

  // basic info
  document.getElementById('modal-title').textContent = item.title;
  document.getElementById('modal-author').textContent = item.author || '';
  document.getElementById('modal-mira-name').textContent = item.description || '';

  // hide library-specific stats
  document.getElementById('modal-read-count').textContent = '';
  document.getElementById('modal-status').textContent = '';
  document.querySelector('.modal-stats').style.display = 'none';
  document.getElementById('modal-notes-display').style.display = 'none';

  // show rec details
  const recDetails = document.getElementById('modal-rec-details');
  recDetails.style.display = 'block';
  document.getElementById('modal-why').textContent = item.why;

  // materials (activities only)
  const materialsEl = document.getElementById('modal-materials');
  if (item.materials && item.materials.length > 0) {
    materialsEl.style.display = 'block';
    document.getElementById('modal-materials-list').textContent = item.materials.join(', ');
  } else {
    materialsEl.style.display = 'none';
  }

  // external link
  const linkRow = document.getElementById('modal-link-row');
  const linkEl = document.getElementById('modal-external-link');
  const url = item.amazon_url || item.video_url;
  if (url) {
    linkRow.style.display = 'block';
    linkEl.href = url;
    linkEl.textContent = item.amazon_url ? 'view on amazon ↗' : 'watch video ↗';
  } else {
    linkRow.style.display = 'none';
  }

  // feedback state
  const fb = feedback[itemId];
  document.getElementById('modal-yay-btn').classList.toggle('active', fb?.status === 'yay');
  document.getElementById('modal-nay-btn').classList.toggle('active', fb?.status === 'nay');
  document.getElementById('modal-feedback-notes').value = fb?.notes || '';

  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('detail-modal').classList.remove('active');
  selectedItem = null;
  selectedItemType = null;
}

// ============================================
// FEEDBACK (localStorage)
// ============================================

const FEEDBACK_KEY = 'mira-feedback';

function loadFeedback() {
  try {
    const stored = localStorage.getItem(FEEDBACK_KEY);
    if (stored) feedback = JSON.parse(stored);
  } catch (e) {
    feedback = {};
  }
}

function saveFeedbackToStorage() {
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedback));
}

function toggleCardFeedback(itemId, status, cardElement) {
  if (!feedback[itemId]) {
    feedback[itemId] = { status: null, notes: '', updated_at: null };
  }

  // toggle: if same status, clear it
  if (feedback[itemId].status === status) {
    feedback[itemId].status = null;
  } else {
    feedback[itemId].status = status;
  }
  feedback[itemId].updated_at = new Date().toISOString();
  saveFeedbackToStorage();

  // update card UI
  const yayBtn = cardElement.querySelector('.feedback-btn.yay');
  const nayBtn = cardElement.querySelector('.feedback-btn.nay');
  yayBtn.classList.toggle('active', feedback[itemId].status === 'yay');
  nayBtn.classList.toggle('active', feedback[itemId].status === 'nay');
}

function setModalFeedback(status) {
  if (!selectedItem) return;
  const itemId = selectedItem.id;

  if (!feedback[itemId]) {
    feedback[itemId] = { status: null, notes: '', updated_at: null };
  }

  // toggle
  if (feedback[itemId].status === status) {
    feedback[itemId].status = null;
  } else {
    feedback[itemId].status = status;
  }
  feedback[itemId].updated_at = new Date().toISOString();
  saveFeedbackToStorage();

  // update modal buttons
  document.getElementById('modal-yay-btn').classList.toggle('active', feedback[itemId].status === 'yay');
  document.getElementById('modal-nay-btn').classList.toggle('active', feedback[itemId].status === 'nay');

  // update card buttons too
  const card = document.querySelector(`.rec-card[data-id="${itemId}"]`);
  if (card) {
    card.querySelector('.feedback-btn.yay')?.classList.toggle('active', feedback[itemId].status === 'yay');
    card.querySelector('.feedback-btn.nay')?.classList.toggle('active', feedback[itemId].status === 'nay');
  }
}

function saveModalFeedbackNotes() {
  if (!selectedItem) return;
  const itemId = selectedItem.id;
  const notes = document.getElementById('modal-feedback-notes').value;

  if (!feedback[itemId]) {
    feedback[itemId] = { status: null, notes: '', updated_at: null };
  }

  feedback[itemId].notes = notes;
  feedback[itemId].updated_at = new Date().toISOString();
  saveFeedbackToStorage();

  // brief visual confirmation
  const btn = document.getElementById('save-feedback-btn');
  const original = btn.textContent;
  btn.textContent = 'saved!';
  setTimeout(() => { btn.textContent = original; }, 1200);
}

// ============================================
// EXPORT FEEDBACK
// ============================================

function exportFeedback(type) {
  const prefix = type === 'books' ? 'rec-book' : 'rec-act';
  const relevantFeedback = {};

  Object.entries(feedback).forEach(([id, fb]) => {
    if (id.startsWith(prefix)) {
      // find the item title for readability
      const data = type === 'books' ? bookRecommendations : activityRecommendations;
      let title = id;
      if (data) {
        for (const batch of data.batches) {
          for (const category of batch.categories) {
            const item = category.items.find(i => i.id === id);
            if (item) { title = item.title; break; }
          }
        }
      }
      relevantFeedback[title] = {
        status: fb.status,
        notes: fb.notes || '',
        updated_at: fb.updated_at
      };
    }
  });

  const exportData = {
    type: type,
    exported_at: new Date().toISOString(),
    feedback: relevantFeedback
  };

  const json = JSON.stringify(exportData, null, 2);

  // copy to clipboard
  navigator.clipboard.writeText(json).then(() => {
    const btn = document.getElementById(`export-${type}-btn`);
    const original = btn.textContent;
    btn.textContent = 'copied to clipboard!';
    setTimeout(() => { btn.textContent = original; }, 2000);
  }).catch(() => {
    // fallback: download as file
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mira-${type}-feedback.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
}

// ============================================
// UTILITIES
// ============================================

function truncate(text, maxLength) {
  if (!text || text.length <= maxLength) return text || '';
  return text.substring(0, maxLength).trim() + '...';
}

function showLoading(show) {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    if (show) {
      overlay.classList.remove('hidden');
    } else {
      overlay.classList.add('hidden');
    }
  }
}

// ============================================
// COVER SEARCH APIs
// ============================================

async function searchGoogleBooks(title, author) {
  try {
    const query = encodeURIComponent(`${title} ${author || ''}`);
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`);
    const data = await response.json();

    if (data.items && data.items[0]?.volumeInfo?.imageLinks) {
      const links = data.items[0].volumeInfo.imageLinks;
      let coverUrl = links.medium || links.small || links.thumbnail;
      if (coverUrl) {
        coverUrl = coverUrl.replace('http://', 'https://').replace('&edge=curl', '');
      }
      return coverUrl;
    }
  } catch (err) {
    console.warn('google books search failed:', err);
  }
  return null;
}

async function searchOpenLibrary(title, author) {
  try {
    const query = encodeURIComponent(`${title} ${author || ''}`);
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=1`);
    const data = await response.json();

    if (data.docs && data.docs[0] && data.docs[0].cover_i) {
      return `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg`;
    }
  } catch (err) {
    console.warn('openlibrary search failed:', err);
  }
  return null;
}

async function searchBookCover(title, author) {
  // try google books first
  const googleCover = await searchGoogleBooks(title, author);
  if (googleCover) return googleCover;

  // fallback to openlibrary
  const openLibraryCover = await searchOpenLibrary(title, author);
  if (openLibraryCover) return openLibraryCover;

  return null;
}

// ============================================
// COLOR EXTRACTION SYSTEM
// ============================================

const colorThief = new ColorThief();

function extractColorFromImage(img) {
  try {
    if (img.complete && img.naturalHeight !== 0) {
      return colorThief.getColor(img);
    }
  } catch (err) {
    console.warn('color extraction failed:', err);
  }
  return [180, 180, 180];
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [h * 360, s * 100, l * 100];
}

function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function toPastel(r, g, b) {
  let [h, s, l] = rgbToHsl(r, g, b);
  s = Math.min(s, 30);
  s = Math.max(s, 15);
  l = 88;
  return hslToRgb(h, s, l);
}

function getTextColor(r, g, b) {
  let [h] = rgbToHsl(r, g, b);

  const textPairings = [
    { hueRange: [0, 30], textHue: 15, textSat: 45, textLight: 30 },
    { hueRange: [30, 60], textHue: 25, textSat: 50, textLight: 28 },
    { hueRange: [60, 90], textHue: 80, textSat: 40, textLight: 25 },
    { hueRange: [90, 150], textHue: 140, textSat: 35, textLight: 25 },
    { hueRange: [150, 200], textHue: 180, textSat: 40, textLight: 25 },
    { hueRange: [200, 250], textHue: 220, textSat: 45, textLight: 28 },
    { hueRange: [250, 290], textHue: 270, textSat: 40, textLight: 30 },
    { hueRange: [290, 330], textHue: 320, textSat: 35, textLight: 30 },
    { hueRange: [330, 360], textHue: 350, textSat: 40, textLight: 30 },
  ];

  for (const pairing of textPairings) {
    if (h >= pairing.hueRange[0] && h < pairing.hueRange[1]) {
      return hslToRgb(pairing.textHue, pairing.textSat, pairing.textLight);
    }
  }
  return hslToRgb(25, 40, 25);
}

function rgbToCss(rgb) {
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function applyBookCardColors(cardElement, imgElement) {
  if (!imgElement.complete) {
    imgElement.addEventListener('load', () => {
      applyBookCardColors(cardElement, imgElement);
    });
    return;
  }

  const dominantColor = extractColorFromImage(imgElement);
  const pastelBg = toPastel(...dominantColor);
  const textColor = getTextColor(...pastelBg);

  cardElement.style.backgroundColor = rgbToCss(pastelBg);
  cardElement.style.color = rgbToCss(textColor);
  cardElement.dataset.bgColor = rgbToCss(pastelBg);
  cardElement.dataset.textColor = rgbToCss(textColor);
}
