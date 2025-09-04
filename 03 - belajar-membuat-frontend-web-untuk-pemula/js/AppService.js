import { Book } from './Book.js';

export class AppService {
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

  updateBookById(bookId, title, author, year, isComplete) {
    const storageData = this.getParsedStorageData();
    const indexBook = storageData.findIndex((book) => book.id === bookId);
    const book = storageData[indexBook];
    storageData[indexBook] = { ...book, title, author, year, isComplete };

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
          <a 
            data-testid="bookItemEditButton" 
            class="btn_actions"
            href="edit.html?bookId=${book.id}"
          >
            Edit Buku
          </a>
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
          <a 
            data-testid="bookItemEditButton" 
            class="btn_actions"
            href="edit.html?bookId=${book.id}"
          >
            Edit Buku
          </a>
        </div>
      `;

      completeBookList.append(bookItem);
    });
  }
}
