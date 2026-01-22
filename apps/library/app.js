// mira's library - main app logic

// supabase client
let supabase;

// state
let allBooks = [];
let selectedBook = null;

// initialize
document.addEventListener('DOMContentLoaded', async () => {
  setupEventListeners();
  await initSupabase();
  loadBooks();
});

async function initSupabase() {
  // check if supabase credentials are configured
  if (SUPABASE_URL === 'YOUR_SUPABASE_URL') {
    console.warn('supabase not configured - using demo mode');
    await loadDemoData();
    return;
  }

  // initialize supabase client
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

function setupEventListeners() {
  // modals
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => closeModals());
  });

  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModals();
    });
  });

  // add book
  document.getElementById('add-book-btn').addEventListener('click', () => {
    document.getElementById('add-modal').classList.add('active');
  });

  document.getElementById('add-book-form').addEventListener('submit', handleAddBook);

  // save notes
  document.getElementById('save-notes-btn').addEventListener('click', saveBookNotes);

  // yay/nay buttons
  document.getElementById('yay-btn').addEventListener('click', () => setRecommendationStatus('yay'));
  document.getElementById('nay-btn').addEventListener('click', () => setRecommendationStatus('nay'));
}

async function loadBooks() {
  if (!supabase) return; // demo mode

  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    allBooks = data || [];
    renderBooks();
  } catch (err) {
    console.error('error loading books:', err);
  }
}

async function loadDemoData() {
  showLoading(true);

  // full book collection from mira's library (jan 2026)
  allBooks = [
    // current favorites (4)
    { id: '1', title: 'how do apples grow', author: 'jill mcdonald', mira_name: 'apple go', status: 'current_favorite', read_count: 50, notes: 'reads the title letter by letter, calls it by name, loves the lifecycle', is_recommendation: false },
    { id: '2', title: 'garden time', author: 'jill mcdonald', mira_name: 'time', status: 'current_favorite', read_count: 50, notes: 'read a lot, calls it by its name', is_recommendation: false },
    { id: '3', title: 'what little girls are made of', author: 'jeanne willis & isabelle follath', mira_name: null, status: 'current_favorite', read_count: 10, notes: 'recently bought, spends time on every page from cover to colored diamonds with shapes, beautiful illustrations and rhymes', is_recommendation: false },
    { id: '4', title: 'the leaf thief', author: 'alice hemming', mira_name: null, status: 'current_favorite', read_count: 30, notes: 'squirrel character, seasonal theme', is_recommendation: false },

    // currently reading (10)
    { id: '5', title: 'richard scarry\'s biggest word book ever', author: 'richard scarry', mira_name: null, status: 'currently_reading', read_count: 10, notes: 'recently bought, loves it, visits at least once a day, always finds something new', is_recommendation: false },
    { id: '6', title: 'jane goodall', author: 'maria isabel sánchez vegara', mira_name: null, status: 'currently_reading', read_count: 20, notes: 'still going, remembers the chimpanzee names jane gave them - fifi, gigi, dave', series: 'little people big dreams', is_recommendation: false },
    { id: '7', title: 'mother teresa', author: 'maria isabel sánchez vegara', mira_name: null, status: 'currently_reading', read_count: 30, notes: 'still reads, keeps going back, something about mother teresa she loves, likes the cover with baby', series: 'little people big dreams', is_recommendation: false },
    { id: '8', title: 'red shoes', author: 'karen english', mira_name: null, status: 'currently_reading', read_count: 15, notes: 'picks it up cause she\'s obsessed with shoes (especially mumma\'s red shoes), loves the feeling of receiving a box of shoes', is_recommendation: false },
    { id: '9', title: 'what\'s right, what\'s wrong', author: 'webber books', mira_name: null, status: 'currently_reading', read_count: 20, notes: 'key learning: a question can have multiple wrong answers before arriving at a right answer', is_recommendation: false },
    { id: '10', title: 'wonderful seasons', author: 'emily winfield martin', mira_name: null, status: 'currently_reading', read_count: 15, notes: 'read a few times, still goes back', is_recommendation: false },
    { id: '11', title: 'busy christmas', author: 'campbell', mira_name: null, status: 'currently_reading', read_count: 10, notes: 'picked up during christmas when house was lit up', is_recommendation: false },
    { id: '12', title: 'tap the magic tree', author: 'christie matheson', mira_name: null, status: 'currently_reading', read_count: 20, notes: 'interactive, currently reading but hasn\'t become a favorite', is_recommendation: false },
    { id: '13', title: 'press here', author: 'hervé tullet', mira_name: null, status: 'currently_reading', read_count: 15, notes: 'interactive dots, sometimes wants to create her own interactions but next page is pre-fixed which confuses her', is_recommendation: false },
    { id: '14', title: 'how many?', author: 'christopher danielson', mira_name: null, status: 'currently_reading', read_count: 5, notes: 'recently bought, barely read yet but will come handy in months to come', is_recommendation: false },

    // all-time classics (9)
    { id: '15', title: 'here we are', author: 'oliver jeffers', mira_name: null, status: 'all_time_classic', read_count: 40, notes: 'still going strong, feels comfortable with it, visual depth, lots to explore, we just read it today', is_recommendation: false },
    { id: '16', title: 'audrey hepburn', author: 'maria isabel sánchez vegara', mira_name: 'audrey', status: 'all_time_classic', read_count: 50, notes: 'favorite page: first page where she\'s dancing in the house, also the strawberries/flowers page "dance like no one\'s watching", audrey comes back during play especially hide & seek', series: 'little people big dreams', is_recommendation: false },
    { id: '17', title: 'coco chanel', author: 'maria isabel sánchez vegara', mira_name: 'coco', status: 'all_time_classic', read_count: 50, notes: 'favorite page: when coco goes to sleep and dreams about patterns, chuckles at "the nuns thought gabrielle was very strange", knows coco does sewing, comes back during hide & seek', series: 'little people big dreams', is_recommendation: false },
    { id: '18', title: 'david attenborough', author: 'maria isabel sánchez vegara', mira_name: null, status: 'all_time_classic', read_count: 50, notes: 'loves reading names of animals/plants named after david, when david cleans the water, when young david cycles to sit with animals and show fossils', series: 'little people big dreams', is_recommendation: false },
    { id: '19', title: 'where is the green sheep', author: 'mem fox', mira_name: null, status: 'all_time_classic', read_count: 50, notes: 'knows almost every kind of sheep and what it\'s doing, favorite: second-last page with multiple sheep activities, learned cheers + cutting/sharing cake + parachuting from this', is_recommendation: false },
    { id: '20', title: 'the lion inside', author: 'rachel bright', mira_name: 'lion', status: 'all_time_classic', read_count: 50, notes: 'used to be top favorite, memorized completely, pre-says words, remembers lines especially last line/word of stanzas', is_recommendation: false },
    { id: '21', title: 'the koala who could', author: 'rachel bright', mira_name: 'kevin', status: 'all_time_classic', read_count: 50, notes: 'memorized, knows other characters (wombat, woodpecker), enacts when koala is about to fall', is_recommendation: false },
    { id: '22', title: 'steve jobs', author: 'maria isabel sánchez vegara', mira_name: null, status: 'all_time_classic', read_count: 30, notes: 'her first from the series, knows steve, woz, steve\'s mumma/baba, spends play time on calligraphy letters page, learned \'rainbow\' from this book', series: 'little people big dreams', is_recommendation: false },
    { id: '23', title: 'spot and friends', author: 'eric hill', mira_name: null, status: 'all_time_classic', read_count: 50, notes: 'recent favorite, knows spot and names of all friends including what they\'re doing on each page, knows whose plate is which and what they\'re eating at snacks time', is_recommendation: false },

    // read 50+ times (16)
    { id: '24', title: 'michelle obama', author: 'maria isabel sánchez vegara', mira_name: null, status: 'read_50_plus', read_count: 50, notes: 'loved the colorful illustrations/characters, learned about \'waving the hand\' from obamas during presidency tours, now unreadable (most pages torn)', series: 'little people big dreams', is_recommendation: false },
    { id: '25', title: 'frida kahlo', author: 'maria isabel sánchez vegara', mira_name: null, status: 'read_50_plus', read_count: 40, notes: 'knows frida does painting and drew pictures of her foot, looks at her own feet every time, feels sad on the accident page, comes back during hide & seek', series: 'little people big dreams', is_recommendation: false },
    { id: '26', title: 'stephen hawking', author: 'maria isabel sánchez vegara', mira_name: null, status: 'read_50_plus', read_count: 40, notes: 'especially the first half - when stephen looks at stars, falls going to school, sees a doctor, visuals don\'t keep her in later half', series: 'little people big dreams', is_recommendation: false },
    { id: '27', title: 'princess diana', author: 'maria isabel sánchez vegara', mira_name: null, status: 'read_50_plus', read_count: 50, notes: 'loved her tiara, people with cameras everywhere, the way she waves hi to people, occasionally returns', series: 'little people big dreams', is_recommendation: false },
    { id: '28', title: 'taylor swift', author: 'maria isabel sánchez vegara', mira_name: null, status: 'read_50_plus', read_count: 50, notes: 'learned she sings (developing interest in music), goes deep into smaller frames on pages with cats and friends', series: 'little people big dreams', is_recommendation: false },
    { id: '29', title: 'one thousand things', author: 'anna kovecses', mira_name: null, status: 'read_50_plus', read_count: 50, notes: 'once a big big favorite (6 months ago), wouldn\'t want to read anything else, now barely reads (outgrown), second most torn book', is_recommendation: false },
    { id: '30', title: 'the wonderful things you\'ll be', author: 'emily winfield martin', mira_name: null, status: 'read_50_plus', read_count: 50, notes: 'read a lot, returns once in a while', is_recommendation: false },
    { id: '31', title: 'you and the universe', author: 'stephen & lucy hawking', mira_name: null, status: 'read_50_plus', read_count: 40, notes: 'was a favorite once, tore some pages, still going strong on some pages', is_recommendation: false },
    { id: '32', title: 'what can you see? on the farm', author: 'maria perera', mira_name: null, status: 'read_50_plus', read_count: 50, notes: 'every page, every detail, character/animal, # of birds/animals on page, once a favorite, now occasionally', is_recommendation: false },
    { id: '33', title: 'what can you see? at night', author: 'maria perera', mira_name: null, status: 'read_50_plus', read_count: 50, notes: 'with attention to detail, once a favorite, now occasionally', is_recommendation: false },
    { id: '34', title: 'the very hungry caterpillar', author: 'eric carle', mira_name: null, status: 'read_50_plus', read_count: 50, notes: 'classic, talked about/referred to a lot, once a favorite (outgrown), once in a while now', is_recommendation: false },
    { id: '35', title: 'from head to toe', author: 'eric carle', mira_name: null, status: 'read_50_plus', read_count: 50, notes: 'action book, acted with each animal so many times she doesn\'t revisit a lot (outgrown)', is_recommendation: false },
    { id: '36', title: 'welcome', author: 'axel scheffler', mira_name: 'welcome', status: 'read_50_plus', read_count: 50, notes: 'learned a lot: big/small, stompy & noisy v shy & quiet, different games (including chess), clothes', is_recommendation: false },
    { id: '37', title: 'farm sounds', author: 'usborne sound books', mira_name: null, status: 'read_50_plus', read_count: 50, notes: 'first book ever bought for her (before she was born), once a favorite, once in a while now', is_recommendation: false },
    { id: '38', title: 'zoo sounds', author: 'usborne sound books', mira_name: null, status: 'read_50_plus', read_count: 50, notes: 'favorite once, once in a while', is_recommendation: false },
    { id: '39', title: 'words (chicka chicka boom boom)', author: null, mira_name: null, status: 'read_50_plus', read_count: 30, notes: 'still brings it to read, doesn\'t go through til end, but has fun with "you go me oh oh oh oh" page', is_recommendation: false },

    // not been a fan of (9)
    { id: '40', title: 'the whale who wanted more', author: 'rachel bright', mira_name: null, status: 'not_a_fan', read_count: 0, notes: 'never read it fully, last tried a couple months back, visuals don\'t help much', is_recommendation: false },
    { id: '41', title: 'amelia earhart', author: 'maria isabel sánchez vegara', mira_name: null, status: 'not_a_fan', read_count: 5, notes: 'read a bit, illustrations don\'t have much for her to engage, read for the airplanes and nice calming visuals', series: 'little people big dreams', is_recommendation: false },
    { id: '42', title: 'maya angelou', author: 'maria isabel sánchez vegara', mira_name: null, status: 'not_a_fan', read_count: 2, notes: 'barely read, hasn\'t gotten past a page or two, haven\'t figured out why', series: 'little people big dreams', is_recommendation: false },
    { id: '43', title: 'mahatma gandhi', author: 'maria isabel sánchez vegara', mira_name: null, status: 'not_a_fan', read_count: 5, notes: 'read a few times, visuals after first two pages (when mohandas is a child) don\'t say much, more in the story than visuals', series: 'little people big dreams', is_recommendation: false },
    { id: '44', title: 'zaha hadid', author: 'maria isabel sánchez vegara', mira_name: null, status: 'not_a_fan', read_count: 2, notes: 'doesn\'t go past first two pages, even when there\'s much going on visually', series: 'little people big dreams', is_recommendation: false },
    { id: '45', title: 'freddie mercury', author: 'maria isabel sánchez vegara', mira_name: null, status: 'not_a_fan', read_count: 5, notes: 'read a few times, one of the more engaging ones from the collection', series: 'little people big dreams', is_recommendation: false },
    { id: '52', title: 'muhammad ali', author: 'maria isabel sánchez vegara', mira_name: null, status: 'not_a_fan', read_count: 2, notes: 'read once or twice', series: 'little people big dreams', is_recommendation: false },
    { id: '53', title: 'david hockney', author: 'maria isabel sánchez vegara', mira_name: null, status: 'not_a_fan', read_count: 5, notes: 'read a few times, likes the colorful art', series: 'little people big dreams', is_recommendation: false },
    { id: '54', title: 'charles dickens', author: 'maria isabel sánchez vegara', mira_name: null, status: 'not_a_fan', read_count: 0, notes: 'never read', series: 'little people big dreams', is_recommendation: false },
    { id: '55', title: 'neil armstrong', author: 'maria isabel sánchez vegara', mira_name: null, status: 'not_a_fan', read_count: 0, notes: 'not yet read', series: 'little people big dreams', is_recommendation: false },
    { id: '46', title: 'the heart and the bottle', author: 'oliver jeffers', mira_name: null, status: 'not_a_fan', read_count: 2, notes: 'read a couple times, stopped cause the dad dies - too young to understand death (especially of a father she\'s so attached to)', is_recommendation: false },
    { id: '47', title: 'a colour of his own', author: 'leo lionni', mira_name: null, status: 'not_a_fan', read_count: 5, notes: 'read a few times, played with colour wheel on cover more, just a chameleon in different colors, picks up here & there', is_recommendation: false },
    { id: '48', title: 'my little book of (krishna, lakshmi, ganesh, durga, shiva, hanuman)', author: 'puffin books', mira_name: null, status: 'not_a_fan', read_count: 5, notes: 'picks up every now and then but doesn\'t read, just likes covers/characters, reads only lakshmi (and sometimes krishna), not til the end', is_recommendation: false }
  ];

  // fetch covers for all books
  await fetchAllCovers();
  renderBooks();
  showLoading(false);
}

// show/hide loading overlay
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

// fetch covers from openlibrary for all books without covers
async function fetchAllCovers() {
  const booksNeedingCovers = allBooks.filter(b => !b.cover_url);

  // fetch in batches to avoid overwhelming the api
  for (const book of booksNeedingCovers) {
    const cover = await searchBookCover(book.title, book.author);
    if (cover) {
      book.cover_url = cover;
    }
  }
}

function renderBooks() {
  // category mappings
  const categories = [
    { id: 'current-favorites', status: 'current_favorite' },
    { id: 'currently-reading', status: 'currently_reading' },
    { id: 'all-time-classics', status: 'all_time_classic' },
    { id: 'read-50-plus', status: 'read_50_plus' },
    { id: 'not-a-fan', status: 'not_a_fan' }
  ];

  // separate owned books from recommendations
  const ownedBooks = allBooks.filter(b => !b.is_recommendation);
  const recommendations = allBooks.filter(b => b.is_recommendation);

  // render each category
  categories.forEach(cat => {
    const grid = document.getElementById(`grid-${cat.id}`);
    const section = document.getElementById(`section-${cat.id}`);
    const booksInCategory = ownedBooks.filter(b => b.status === cat.status);

    if (booksInCategory.length === 0) {
      section.style.display = 'none';
    } else {
      section.style.display = 'block';
      grid.innerHTML = booksInCategory.map(book => createBookCard(book)).join('');
    }
  });

  // render recommendations
  const recsGrid = document.getElementById('grid-recommendations');
  const recsSection = document.getElementById('section-recommendations');
  if (recommendations.length === 0) {
    recsSection.style.display = 'none';
  } else {
    recsSection.style.display = 'block';
    recsGrid.innerHTML = recommendations.map(book => createBookCard(book, true)).join('');
  }

  // add click handlers
  document.querySelectorAll('.book-card').forEach(card => {
    card.addEventListener('click', () => openBookModal(card.dataset.id));
  });
}

function createBookCard(book, isRecommendation = false) {
  const statusLabel = {
    'current_favorite': 'favorite',
    'currently_reading': 'reading',
    'all_time_classic': 'classic',
    'read_50_plus': '50+ reads',
    'not_a_fan': 'not a fan'
  };

  const coverHtml = book.cover_url
    ? `<img src="${book.cover_url}" alt="${book.title}" class="book-cover loading" loading="lazy" onload="this.classList.remove('loading'); this.classList.add('loaded')">`
    : `<div class="book-cover placeholder">📚</div>`;

  const miraNameHtml = book.mira_name
    ? `<p class="book-mira-name">"${book.mira_name}"</p>`
    : '';

  const seriesHtml = book.series
    ? `<span class="series-badge">${book.series === 'little people big dreams' ? 'lpbd' : book.series}</span>`
    : '';

  const statsHtml = !isRecommendation && book.read_count > 0
    ? `<div class="book-stats"><span class="stat">${book.read_count}+ reads</span></div>`
    : '';

  const recStatusHtml = isRecommendation && book.recommendation_status
    ? `<span class="rec-status ${book.recommendation_status}">${book.recommendation_status}</span>`
    : '';

  return `
    <div class="book-card" data-id="${book.id}">
      ${coverHtml}
      ${seriesHtml}
      <h3 class="book-title">${book.title}</h3>
      ${book.author ? `<p class="book-author">${book.author}</p>` : ''}
      ${miraNameHtml}
      ${statsHtml}
      ${recStatusHtml}
    </div>
  `;
}

function openBookModal(bookId) {
  selectedBook = allBooks.find(b => b.id === bookId);
  if (!selectedBook) return;

  const modal = document.getElementById('book-modal');

  // populate modal
  document.getElementById('modal-cover-img').src = selectedBook.cover_url || '';
  document.getElementById('modal-cover-img').style.display = selectedBook.cover_url ? 'block' : 'none';
  document.getElementById('modal-title').textContent = selectedBook.title;
  document.getElementById('modal-author').textContent = selectedBook.author || '';
  document.getElementById('modal-mira-name').textContent = selectedBook.mira_name
    ? `mira calls it: "${selectedBook.mira_name}"`
    : '';

  // stats
  document.getElementById('modal-read-count').textContent = selectedBook.read_count > 0
    ? `${selectedBook.read_count}+ reads`
    : '';
  document.getElementById('modal-status').textContent = selectedBook.status || '';
  document.getElementById('modal-status').className = `stat status-badge ${selectedBook.status || ''}`;

  // notes
  document.getElementById('modal-notes').value = selectedBook.notes || '';

  // recommendation section
  const recSection = document.getElementById('modal-rec-section');
  if (selectedBook.is_recommendation) {
    recSection.style.display = 'block';
    document.getElementById('modal-rec-notes').value = selectedBook.recommendation_notes || '';

    // update button states
    document.getElementById('yay-btn').classList.toggle('active', selectedBook.recommendation_status === 'yay');
    document.getElementById('nay-btn').classList.toggle('active', selectedBook.recommendation_status === 'nay');
  } else {
    recSection.style.display = 'none';
  }

  modal.classList.add('active');
}

function closeModals() {
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
  selectedBook = null;
}

async function saveBookNotes() {
  if (!selectedBook) return;

  const notes = document.getElementById('modal-notes').value;
  selectedBook.notes = notes;

  if (supabase) {
    try {
      const { error } = await supabase
        .from('books')
        .update({ notes })
        .eq('id', selectedBook.id);

      if (error) throw error;
    } catch (err) {
      console.error('error saving notes:', err);
    }
  }

  renderBooks();
}

async function setRecommendationStatus(status) {
  if (!selectedBook || !selectedBook.is_recommendation) return;

  selectedBook.recommendation_status = status;
  selectedBook.recommendation_notes = document.getElementById('modal-rec-notes').value;

  // update button states
  document.getElementById('yay-btn').classList.toggle('active', status === 'yay');
  document.getElementById('nay-btn').classList.toggle('active', status === 'nay');

  if (supabase) {
    try {
      const { error } = await supabase
        .from('books')
        .update({
          recommendation_status: status,
          recommendation_notes: selectedBook.recommendation_notes
        })
        .eq('id', selectedBook.id);

      if (error) throw error;
    } catch (err) {
      console.error('error updating recommendation:', err);
    }
  }

  renderBooks();
}

async function handleAddBook(e) {
  e.preventDefault();

  const title = document.getElementById('add-title').value.trim();
  const author = document.getElementById('add-author').value.trim() || null;
  const isbn = document.getElementById('add-isbn').value.trim() || null;
  const miraName = document.getElementById('add-mira-name').value.trim() || null;
  const status = document.getElementById('add-status').value;
  const readCount = parseInt(document.getElementById('add-read-count').value) || 0;
  const notes = document.getElementById('add-notes').value.trim() || null;
  const isRecommendation = document.getElementById('add-is-recommendation').checked;

  // get cover from openlibrary if isbn provided
  let coverUrl = null;
  if (isbn) {
    coverUrl = `${OPENLIBRARY_COVERS_URL}/isbn/${isbn}-M.jpg`;
  }

  const newBook = {
    id: Date.now().toString(), // temp id for demo
    title,
    author,
    isbn,
    cover_url: coverUrl,
    mira_name: miraName,
    status: isRecommendation ? null : status,
    read_count: readCount,
    notes,
    is_recommendation: isRecommendation,
    recommendation_status: null,
    recommendation_notes: null
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('books')
        .insert([{
          title,
          author,
          isbn,
          cover_url: coverUrl,
          mira_name: miraName,
          status: isRecommendation ? null : status,
          read_count: readCount,
          notes,
          is_recommendation: isRecommendation
        }])
        .select()
        .single();

      if (error) throw error;

      allBooks.unshift(data);
    } catch (err) {
      console.error('error adding book:', err);
      return;
    }
  } else {
    allBooks.unshift(newBook);
  }

  // reset form and close modal
  e.target.reset();
  closeModals();
  renderBooks();
}

// local covers - all 51 book covers stored in covers/ folder
const LOCAL_COVERS = {
  // current favorites
  'how do apples grow': 'covers/how-do-apples-grow.jpg',
  'garden time': 'covers/garden-time.jpg',
  'what little girls are made of': 'covers/what-little-girls-are-made-of.jpg',
  'the leaf thief': 'covers/the-leaf-thief.jpg',

  // currently reading
  'richard scarry\'s biggest word book ever': 'covers/biggest-word-book-ever.jpg',
  'jane goodall': 'covers/jane-goodall-lpbd.jpg',
  'mother teresa': 'covers/mother-teresa-lpbd.jpg',
  'red shoes': 'covers/red-shoes.jpg',
  'what\'s right, what\'s wrong': 'covers/whats-right-whats-wrong.jpg',
  'wonderful seasons': 'covers/wonderful-seasons.jpg',
  'busy christmas': 'covers/busy-christmas.jpg',
  'tap the magic tree': 'covers/tap-the-magic-tree.jpg',
  'press here': 'covers/press-here.jpg',
  'how many?': 'covers/how-many-counting-book.jpg',

  // all-time classics
  'here we are': 'covers/here-we-are.jpg',
  'audrey hepburn': 'covers/audrey-hepburn-lpbd.jpg',
  'coco chanel': 'covers/coco-chanel-lpbd.jpg',
  'david attenborough': 'covers/david-attenborough-lpbd.jpg',
  'where is the green sheep': 'covers/where-is-the-green-sheep.jpg',
  'the lion inside': 'covers/the-lion-inside.jpg',
  'the koala who could': 'covers/the-koala-who-could.jpg',
  'steve jobs': 'covers/steve-jobs-lpbd.jpg',
  'spot and friends': 'covers/spot-and-friends.jpg',

  // read 50+ times
  'michelle obama': 'covers/michelle-obama-lpbd.jpg',
  'frida kahlo': 'covers/frida-kahlo-lpbd.jpg',
  'stephen hawking': 'covers/stephen-hawking-lpbd.jpg',
  'princess diana': 'covers/princess-diana-lpbd.jpg',
  'taylor swift': 'covers/taylor-swift-lpbd.jpg',
  'one thousand things': 'covers/one-thousand-things.jpg',
  'the wonderful things you\'ll be': 'covers/the-wonderful-things-youll-be.jpg',
  'you and the universe': 'covers/you-and-the-universe.jpg',
  'what can you see? on the farm': 'covers/what-can-you-see-on-the-farm.jpg',
  'what can you see? at night': 'covers/what-can-you-see-at-night.jpg',
  'the very hungry caterpillar': 'covers/the-very-hungry-caterpillar.jpg',
  'from head to toe': 'covers/from-head-to-toe.jpg',
  'welcome': 'covers/welcome.jpg',
  'farm sounds': 'covers/farm-sounds.jpg',
  'zoo sounds': 'covers/zoo-sounds.jpg',
  'words (chicka chicka boom boom)': 'covers/chicka-chicka-boom-boom.jpg',

  // not been a fan of
  'the whale who wanted more': 'covers/the-whale-who-wanted-more.jpg',
  'amelia earhart': 'covers/amelia-earhart-lpbd.jpg',
  'maya angelou': 'covers/maya-angelou-lpbd.jpg',
  'mahatma gandhi': 'covers/mahatma-gandhi-lpbd.jpg',
  'zaha hadid': 'covers/zaha-hadid-lpbd.jpg',
  'freddie mercury': 'covers/freddie-mercury-lpbd.jpg',
  'muhammad ali': 'covers/muhammad-ali-lpbd.jpg',
  'david hockney': 'covers/david-hockney-lpbd.jpg',
  'charles dickens': 'covers/charles-dickens-lpbd.jpg',
  'neil armstrong': 'covers/neil-armstrong-lpbd.jpg',
  'the heart and the bottle': 'covers/the-heart-and-the-bottle.jpg',
  'a colour of his own': 'covers/a-colour-of-his-own.jpg',
  'my little book of (krishna, lakshmi, ganesh, durga, shiva, hanuman)': 'covers/my-little-book-of-krishna.jpg'
};

// utility: search google books api for cover (primary)
async function searchGoogleBooks(title, author) {
  try {
    const query = encodeURIComponent(`${title} ${author || ''}`);
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`);
    const data = await response.json();

    if (data.items && data.items[0]?.volumeInfo?.imageLinks) {
      // prefer larger images, fallback to thumbnail
      const links = data.items[0].volumeInfo.imageLinks;
      let coverUrl = links.medium || links.small || links.thumbnail;
      // google returns http, upgrade to https and remove edge=curl for cleaner image
      if (coverUrl) {
        coverUrl = coverUrl.replace('http://', 'https://').replace('&edge=curl', '');
      }
      return coverUrl;
    }
  } catch (err) {
    console.error('google books search failed:', err);
  }
  return null;
}

// utility: search openlibrary for cover (fallback)
async function searchOpenLibrary(title, author) {
  try {
    const query = encodeURIComponent(`${title} ${author || ''}`);
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=1`);
    const data = await response.json();

    if (data.docs && data.docs[0] && data.docs[0].cover_i) {
      return `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg`; // use -L for larger
    }
  } catch (err) {
    console.error('openlibrary search failed:', err);
  }
  return null;
}

// utility: search for book cover - uses local covers first, then apis as fallback
async function searchBookCover(title, author) {
  const titleLower = title.toLowerCase();

  // 1. check local covers first (fast, no network)
  if (LOCAL_COVERS[titleLower]) {
    return LOCAL_COVERS[titleLower];
  }

  // 2. try google books api as fallback for new books
  const googleCover = await searchGoogleBooks(title, author);
  if (googleCover) return googleCover;

  // 3. fallback to openlibrary
  const openLibraryCover = await searchOpenLibrary(title, author);
  if (openLibraryCover) return openLibraryCover;

  // 4. no cover found
  return null;
}
