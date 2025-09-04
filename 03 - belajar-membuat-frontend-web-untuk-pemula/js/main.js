import { AppService } from './AppService.js';
import { STORAGE_NAME } from './constant.js';

function main() {
  const appService = new AppService(STORAGE_NAME);
  appService.initializeData();
  appService.renderBooks();

  const createBookForm = document.getElementById('bookForm');
  const inputTitle = document.getElementById('bookFormTitle');
  const inputAuthor = document.getElementById('bookFormAuthor');
  const inputYear = document.getElementById('bookFormYear');
  const checkboxIsComplete = document.getElementById('bookFormIsComplete');
  const searchBookForm = document.getElementById('searchBook');
  const searchBookTitleInput = document.getElementById('searchBookTitle');

  createBookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = inputTitle.value.trim();
    const author = inputAuthor.value.trim();
    const year = inputYear.value.trim();
    const isComplete = checkboxIsComplete.checked;

    appService.createBook(title, author, year, isComplete);
    createBookForm.reset();
    appService.renderBooks();
    alert(`Buku dengan judul "${title}" berhasil ditambahkan`);
  });

  document.addEventListener('click', (event) => {
    if (event.target.matches('[data-testid="bookItemIsCompleteButton"]')) {
      const bookItem = event.target.closest('[data-testid="bookItem"]');
      const bookId = bookItem.getAttribute('data-bookid');

      appService.updateStatusBookById(bookId);
      appService.renderBooks();
    }

    if (event.target.matches('[data-testid="bookItemDeleteButton"]')) {
      const bookItem = event.target.closest('[data-testid="bookItem"]');
      const bookId = bookItem.getAttribute('data-bookid');

      appService.deleteBookById(bookId);
      appService.renderBooks();
    }
  });

  searchBookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = searchBookTitleInput.value.trim();
    const books = appService.getBooksByTitle(title);

    appService.renderSearchBooks(books);
  });
}

document.addEventListener('DOMContentLoaded', main);
