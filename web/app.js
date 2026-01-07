// mira's library - main app logic

// supabase client
let supabase;

// state
let allBooks = [];
let currentFilter = 'all';
let currentTab = 'library';
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
  // tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  // filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => filterBooks(btn.dataset.filter));
  });

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

function switchTab(tabName) {
  currentTab = tabName;

  // update tab buttons
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

  // update content
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.getElementById(tabName).classList.add('active');

  renderBooks();
}

function filterBooks(filter) {
  currentFilter = filter;

  // update filter buttons
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

  renderBooks();
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
  // full book collection from mira's library
  allBooks = [
    // current favorites
    { id: '1', title: 'how do apples grow', author: 'harriet ziefert', mira_name: 'apple go', status: 'current_favorite', read_count: 50, notes: 'loves the lifecycle', is_recommendation: false },
    { id: '2', title: 'garden time', author: 'felicity brooks', mira_name: 'time', status: 'current_favorite', read_count: 50, notes: null, is_recommendation: false },
    { id: '3', title: 'here we are', author: 'oliver jeffers', mira_name: null, status: 'current_favorite', read_count: 40, notes: 'visual depth, lots to explore', is_recommendation: false },
    { id: '4', title: 'the leaf thief', author: 'alice hemming', mira_name: null, status: 'current_favorite', read_count: 30, notes: 'squirrel character, seasonal theme', is_recommendation: false },
    { id: '5', title: 'tap the magic tree', author: 'christie matheson', mira_name: null, status: 'current_favorite', read_count: 40, notes: 'interactive, loves the changes', is_recommendation: false },

    // currently reading
    { id: '6', title: 'welcome', author: 'mo willems', mira_name: 'welcome', status: 'currently_reading', read_count: 30, notes: 'friendship theme', is_recommendation: false },
    { id: '7', title: 'press here', author: 'hervé tullet', mira_name: null, status: 'currently_reading', read_count: 30, notes: 'interactive dots', is_recommendation: false },
    { id: '8', title: 'the wonderful things you will be', author: 'emily winfield martin', mira_name: null, status: 'currently_reading', read_count: 20, notes: 'gentle, aspirational', is_recommendation: false },
    { id: '9', title: 'a color of his own', author: 'leo lionni', mira_name: null, status: 'currently_reading', read_count: 20, notes: 'chameleon, colors', is_recommendation: false },
    { id: '10', title: '1000 words', author: 'dk', mira_name: null, status: 'currently_reading', read_count: 30, notes: 'vocabulary reference', is_recommendation: false },
    { id: '11', title: '1000 things', author: 'dk', mira_name: null, status: 'currently_reading', read_count: 30, notes: 'vocabulary reference', is_recommendation: false },

    // outgrown favorites
    { id: '12', title: 'the lion inside', author: 'rachel bright', mira_name: 'lion', status: 'outgrown', read_count: 50, notes: 'used to be top favorite, memorized completely', is_recommendation: false },
    { id: '13', title: 'the koala who could', author: 'rachel bright', mira_name: 'kevin', status: 'outgrown', read_count: 50, notes: 'memorized', is_recommendation: false },

    // classics
    { id: '14', title: 'the very hungry caterpillar', author: 'eric carle', mira_name: null, status: 'classic', read_count: 50, notes: 'classic, fully memorized', is_recommendation: false },
    { id: '15', title: 'from head to toe', author: 'eric carle', mira_name: null, status: 'classic', read_count: 40, notes: 'action book', is_recommendation: false },

    // little people big dreams series (outgrown)
    { id: '16', title: 'audrey hepburn', author: 'maria isabel sánchez vegara', mira_name: 'audrey', status: 'outgrown', read_count: 50, notes: 'dancing/acting relatable, visual detail', series: 'little people big dreams', is_recommendation: false },
    { id: '17', title: 'coco chanel', author: 'maria isabel sánchez vegara', mira_name: 'coco', status: 'outgrown', read_count: 50, notes: 'sewing/fashion relatable', series: 'little people big dreams', is_recommendation: false },
    { id: '18', title: 'frida kahlo', author: 'maria isabel sánchez vegara', mira_name: null, status: 'outgrown', read_count: 40, notes: 'painting relatable', series: 'little people big dreams', is_recommendation: false },
    { id: '19', title: 'steve jobs', author: 'maria isabel sánchez vegara', mira_name: null, status: 'other', read_count: 30, notes: 'tech visuals less relatable', series: 'little people big dreams', is_recommendation: false },
    { id: '20', title: 'stephen hawking', author: 'maria isabel sánchez vegara', mira_name: null, status: 'other', read_count: 20, notes: 'space visuals interesting but abstract', series: 'little people big dreams', is_recommendation: false },
    { id: '21', title: 'david attenborough', author: 'maria isabel sánchez vegara', mira_name: null, status: 'other', read_count: 20, notes: 'animals work well', series: 'little people big dreams', is_recommendation: false },
    { id: '22', title: 'jane goodall', author: 'maria isabel sánchez vegara', mira_name: null, status: 'other', read_count: 20, notes: 'animals + nature', series: 'little people big dreams', is_recommendation: false },
    { id: '23', title: 'taylor swift', author: 'maria isabel sánchez vegara', mira_name: null, status: 'other', read_count: 15, notes: 'music/dancing relatable', series: 'little people big dreams', is_recommendation: false },
    { id: '24', title: 'princess diana', author: 'maria isabel sánchez vegara', mira_name: null, status: 'other', read_count: 15, notes: 'less visual density', series: 'little people big dreams', is_recommendation: false },

    // new additions
    { id: '25', title: 'giraffes can\'t dance', author: 'giles andreae', mira_name: null, status: 'currently_reading', read_count: 5, notes: 'just added', is_recommendation: false },
    { id: '26', title: 'the snail and the whale', author: 'julia donaldson', mira_name: null, status: 'currently_reading', read_count: 5, notes: 'just added', is_recommendation: false },
    { id: '27', title: 'slowly slowly slowly said the sloth', author: 'eric carle', mira_name: null, status: 'currently_reading', read_count: 5, notes: 'just added', is_recommendation: false },
    { id: '28', title: 'tomorrow\'s alphabet', author: 'george shannon', mira_name: null, status: 'currently_reading', read_count: 5, notes: 'concept loved', is_recommendation: false },

    // recommendations
    { id: '29', title: 'we\'re going on a bear hunt', author: 'michael rosen', mira_name: null, status: null, read_count: 0, notes: 'rhythmic, predictable', is_recommendation: true, recommendation_status: null },
    { id: '30', title: 'lost and found', author: 'oliver jeffers', mira_name: null, status: null, read_count: 0, notes: 'she likes here we are by same author', is_recommendation: true, recommendation_status: null },
    { id: '31', title: 'the day the crayons quit', author: 'drew daywalt', mira_name: null, status: null, read_count: 0, notes: 'visual storytelling', is_recommendation: true, recommendation_status: null }
  ];

  // fetch covers for all books
  await fetchAllCovers();
  renderBooks();
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
  const libraryGrid = document.getElementById('library-grid');
  const recsGrid = document.getElementById('recommendations-grid');

  // separate owned books from recommendations
  const ownedBooks = allBooks.filter(b => !b.is_recommendation);
  const recommendations = allBooks.filter(b => b.is_recommendation);

  // filter owned books
  let filteredOwned = ownedBooks;
  if (currentFilter !== 'all') {
    if (currentFilter === 'read_50_plus') {
      filteredOwned = ownedBooks.filter(b => b.read_count >= 50);
    } else {
      filteredOwned = ownedBooks.filter(b => b.status === currentFilter);
    }
  }

  // render library
  if (filteredOwned.length === 0) {
    libraryGrid.innerHTML = '<div class="empty-state">no books match this filter</div>';
  } else {
    libraryGrid.innerHTML = filteredOwned.map(book => createBookCard(book)).join('');
  }

  // render recommendations
  if (recommendations.length === 0) {
    recsGrid.innerHTML = '<div class="empty-state">no recommendations yet</div>';
  } else {
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
    'outgrown': 'outgrown',
    'classic': 'classic',
    'other': ''
  };

  const coverHtml = book.cover_url
    ? `<img src="${book.cover_url}" alt="${book.title}" class="book-cover">`
    : `<div class="book-cover placeholder">📚</div>`;

  const miraNameHtml = book.mira_name
    ? `<p class="book-mira-name">"${book.mira_name}"</p>`
    : '';

  const statsHtml = !isRecommendation
    ? `<div class="book-stats">
        ${book.read_count > 0 ? `<span class="stat">${book.read_count}+ reads</span>` : ''}
        ${book.status ? `<span class="stat status-badge ${book.status}">${statusLabel[book.status] || book.status}</span>` : ''}
      </div>`
    : '';

  const recStatusHtml = isRecommendation && book.recommendation_status
    ? `<span class="rec-status ${book.recommendation_status}">${book.recommendation_status}</span>`
    : '';

  return `
    <div class="book-card" data-id="${book.id}">
      ${coverHtml}
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

// utility: search openlibrary for cover
async function searchBookCover(title, author) {
  try {
    const query = encodeURIComponent(`${title} ${author || ''}`);
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=1`);
    const data = await response.json();

    if (data.docs && data.docs[0] && data.docs[0].cover_i) {
      return `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-M.jpg`;
    }
  } catch (err) {
    console.error('cover search failed:', err);
  }
  return null;
}
