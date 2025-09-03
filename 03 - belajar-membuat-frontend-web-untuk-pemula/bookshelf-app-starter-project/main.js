const STORAGE_NAME = 'BOOK_LIST';
const FORM_CREATE_ID = 'bookForm';

class Book {
  constructor(id, title, author, year, isComplete) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.isComplete = isComplete;
  }
}

class AppService {
  constructor(storageName) {
    this.STORAGE_NAME = storageName;
  }

  getRawStorageData() {
    const storageData = localStorage.getItem(this.STORAGE_NAME);
    return storageData;
  }

  getParsedStorageData() {
    const storageData = this.getRawStorageData();
    return JSON.parse(storageData);
  }

  initializeData() {
    const storageData = this.getRawStorageData();

    if (!storageData) {
      localStorage.setItem(STORAGE_NAME, '[]');
    }
  }

  generateUniqueId() {
    return `${Math.random().toString(36).slice(2, 9)}`;
  }

  updateStorage(data) {
    localStorage.setItem(this.STORAGE_NAME, JSON.stringify(data));
  }

  getAllBooks() {
    return this.getParsedStorageData();
  }

  getBookById(bookId) {
    const storageData = this.getParsedStorageData();
    const book = storageData.find((b) => b.id === bookId);

    return book;
  }

  createBook(title, author, year, isComplete) {
    const storageData = this.getParsedStorageData();
    const bookId = this.generateUniqueId();
    const newBook = new Book(bookId, title, author, year, isComplete);

    const newBookAdded = storageData.concat(newBook);
    this.updateStorage(newBookAdded);
  }

  updateStatusBookById(bookId) {
    const storageData = this.getParsedStorageData();
    const indexBook = storageData.findIndex((book) => book.id === bookId);
    const book = storageData[indexBook];
    const isComplete = book.isComplete ? false : true;

    book.isComplete = isComplete;
    storageData[indexBook] = book;

    this.updateStorage(storageData);
  }

  deleteBookById(bookId) {
    const storageData = this.getParsedStorageData();
    const userConfirmed = confirm('Apakah kamu yakin ingin menghapus buku ini?');

    if (userConfirmed) {
      const deletedBookStorage = storageData.filter((book) => book.id !== bookId);
      this.updateStorage(deletedBookStorage);
    }
  }

  renderBooks() {
    const incompleteBookList = document.getElementById('incompleteBookList');
    const completeBookList = document.getElementById('completeBookList');

    incompleteBookList.innerHTML = '';
    completeBookList.innerHTML = '';

    const storageData = this.getParsedStorageData();
    const incompleteBooks = [];
    const completeBooks = [];

    storageData.forEach((book) => {
      if (book.isComplete) {
        completeBooks.push(book);
      } else {
        incompleteBooks.push(book);
      }
    });

    incompleteBooks.forEach((book) => {
      const bookItem = document.createElement('div');

      bookItem.setAttribute('data-bookid', book.id);
      bookItem.setAttribute('data-testid', 'bookItem');
      bookItem.classList.add('book_item');

      bookItem.innerHTML = `
        <h3 data-testid="bookItemTitle">${book.title}</h3>
        <p data-testid="bookItemAuthor">${book.author}</p>
        <p data-testid="bookItemYear">${book.year}</p>
        <div class="book_item_actions">
          <button 
            data-testid="bookItemIsCompleteButton" 
            class="btn_actions"
          >
            Selesai Dibaca
          </button>
          <button 
            data-testid="bookItemDeleteButton" 
            class="btn_actions"
          >
            Hapus Buku
          </button>
          <button 
            data-testid="bookItemEditButton" 
            class="btn_actions"
          >
            Edit Buku
          </button>
        </div>
      `;

      incompleteBookList.append(bookItem);
    });

    completeBooks.forEach((book) => {
      const bookItem = document.createElement('div');

      bookItem.setAttribute('data-bookid', book.id);
      bookItem.setAttribute('data-testid', 'bookItem');
      bookItem.classList.add('book_item');

      bookItem.innerHTML = `
        <h3 data-testid="bookItemTitle">${book.title}</h3>
        <p data-testid="bookItemAuthor">${book.author}</p>
        <p data-testid="bookItemYear">${book.year}</p>
        <div class="book_item_actions">
          <button 
            data-testid="bookItemIsCompleteButton" 
            class="btn_actions"
            onclick="() => console.log(12)"
          >
            Belum Selesai
          </button>
          <button 
            data-testid="bookItemDeleteButton" 
            class="btn_actions"
          >
            Hapus Buku
          </button>
          <button 
            data-testid="bookItemEditButton" 
            class="btn_actions"
          >
            Edit Buku
          </button>
        </div>
      `;

      completeBookList.append(bookItem);
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const appService = new AppService(STORAGE_NAME);
  appService.initializeData();
  appService.renderBooks();

  // Book Form Elements
  const formCreate = document.getElementById('bookForm');
  const inputTitle = document.getElementById('bookFormTitle');
  const inputAuthor = document.getElementById('bookFormAuthor');
  const inputYear = document.getElementById('bookFormYear');
  const checkboxIsComplete = document.getElementById('bookFormIsComplete');

  // Button Element
  const bookItemIsCompleteButton = document.querySelector(
    '[data-testid="bookItemIsCompleteButton"]'
  );

  formCreate.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = inputTitle.value.trim();
    const author = inputAuthor.value.trim();
    const year = inputYear.value.trim();
    const isComplete = checkboxIsComplete.checked;

    appService.createBook(title, author, year, isComplete);
    formCreate.reset();
    appService.renderBooks();
    alert(`Buku dengan judul "${title}" berhasil ditambahkan`);
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-testid="bookItemIsCompleteButton"]')) {
      const bookItem = e.target.closest('[data-testid="bookItem"]');
      const bookId = bookItem.getAttribute('data-bookid');

      appService.updateStatusBookById(bookId);
      appService.renderBooks();
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-testid="bookItemDeleteButton"]')) {
      const bookItem = e.target.closest('[data-testid="bookItem"]');
      const bookId = bookItem.getAttribute('data-bookid');

      appService.deleteBookById(bookId);
      appService.renderBooks();
    }
  });
});
